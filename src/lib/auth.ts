/**
 * Cybersecurity & Authentication Service for CSA × PivotRoots AI Solutions Hub
 * 
 * Provides:
 * - Web Crypto SHA-256 zero-plaintext verification (passwords are not compiled in cleartext into JS bundles)
 * - Rate limiting & brute force lockout defense
 * - Secure session management with expiration & revocation
 */

export type AuthRole = 'internal' | 'showcase';

export interface AuthSession {
  authenticated: boolean;
  role: AuthRole;
  timestamp: number;
}

// SHA-256 hashes of authorized internal access credentials
// (Matches: 'csa-internal-2026', 'csa_team_sec_2026_x89')
const INTERNAL_KEY_HASHES = new Set<string>([
  '71c27298e04a7a25fa030a1760343fec1baf3be1e593d32b325e3b5e13e38a72',
  '18e9ac21dd0a47c376737750addad483e17ee4b9a650a632786837a0ee6e6223',
]);

// SHA-256 hashes of client-safe showcase access credentials
// (Matches: 'csa-showcase-2026', 'csa2026', 'csa-2026', 'pivotroots', 'pivotroots2026', 'havas-ai-2026')
const SHOWCASE_KEY_HASHES = new Set<string>([
  '45a4617dfde6d78e17a035df1233e17f878337cfc18f974843255772e2ce2891',
  '93e9ef953f5325320eac88a09525c48962eeba31d6f72635ef8992dbcde08608',
  'da3dc6db8b81cc2a8fe69cf2f95c41133040f80c20a698401d993a9ae6ce05c2',
  '92facd20ef34d81a81bc87bfff36a84ef8628c4d7304872c0deb58fce561ea6c',
  '8b0514eeabdacd7ca973af04bf3004d3f542145840b6d2797ab5fa71074b84ee',
  '95cf833dbe85f41d05acd590bd88143c00725eea2b9d5bab9c5f90c2ecbf6af0',
]);

const SESSION_KEY = 'csa_hub_auth_session_v1';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

// Rate-limiting configuration
const MAX_ATTEMPTS = 5;
const LOCKOUT_SECONDS = 30;

interface RateLimitRecord {
  attempts: number;
  lockedUntil?: number;
}

const rateLimitMap: Record<string, RateLimitRecord> = {};

/**
 * Computes SHA-256 hex digest using browser Web Crypto API
 */
export async function sha256(message: string): Promise<string> {
  const clean = message.trim().toLowerCase();
  const msgBuffer = new TextEncoder().encode(clean);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Checks whether an action is currently rate-limited
 */
export function checkRateLimit(actionKey: string): { allowed: boolean; remainingSeconds: number } {
  const record = rateLimitMap[actionKey];
  if (!record) return { allowed: true, remainingSeconds: 0 };

  const now = Date.now();
  if (record.lockedUntil && record.lockedUntil > now) {
    return {
      allowed: false,
      remainingSeconds: Math.ceil((record.lockedUntil - now) / 1000),
    };
  }

  // Lockout expired
  if (record.lockedUntil && record.lockedUntil <= now) {
    delete rateLimitMap[actionKey];
    return { allowed: true, remainingSeconds: 0 };
  }

  return { allowed: true, remainingSeconds: 0 };
}

/**
 * Records a failed attempt and triggers lockout if max attempts exceeded
 */
export function recordFailedAttempt(actionKey: string): { locked: boolean; remainingSeconds: number } {
  const record = rateLimitMap[actionKey] || { attempts: 0 };
  record.attempts += 1;

  if (record.attempts >= MAX_ATTEMPTS) {
    const lockoutUntil = Date.now() + LOCKOUT_SECONDS * 1000;
    record.lockedUntil = lockoutUntil;
    rateLimitMap[actionKey] = record;
    return { locked: true, remainingSeconds: LOCKOUT_SECONDS };
  }

  rateLimitMap[actionKey] = record;
  return { locked: false, remainingSeconds: 0 };
}

/**
 * Resets rate limit for a successful action
 */
export function resetRateLimit(actionKey: string): void {
  delete rateLimitMap[actionKey];
}

/**
 * Verifies any login passphrase. Returns role if authorized.
 */
export async function verifyAccessPassphrase(
  input: string
): Promise<{ valid: boolean; role: AuthRole | null }> {
  const hash = await sha256(input);

  if (INTERNAL_KEY_HASHES.has(hash)) {
    return { valid: true, role: 'internal' };
  }

  if (SHOWCASE_KEY_HASHES.has(hash)) {
    return { valid: true, role: 'showcase' };
  }

  return { valid: false, role: null };
}

/**
 * Verifies if a passphrase specifically grants Internal Mode unlock
 */
export async function verifyInternalPassphrase(input: string): Promise<boolean> {
  const hash = await sha256(input);
  return INTERNAL_KEY_HASHES.has(hash);
}

/**
 * Retrieves valid authentication session from storage
 */
export function getAuthSession(): AuthSession | null {
  try {
    // Check sessionStorage first
    let raw = sessionStorage.getItem(SESSION_KEY);
    if (!raw) {
      raw = localStorage.getItem(SESSION_KEY);
    }
    if (!raw) return null;

    const session: AuthSession = JSON.parse(raw);
    const now = Date.now();

    // Check TTL
    if (!session.timestamp || now - session.timestamp > SESSION_TTL_MS) {
      destroyAuthSession();
      return null;
    }

    if (!session.authenticated || (session.role !== 'internal' && session.role !== 'showcase')) {
      destroyAuthSession();
      return null;
    }

    return session;
  } catch {
    destroyAuthSession();
    return null;
  }
}

/**
 * Saves authenticated session
 */
export function saveAuthSession(role: AuthRole, rememberMe: boolean): void {
  const session: AuthSession = {
    authenticated: true,
    role,
    timestamp: Date.now(),
  };

  const str = JSON.stringify(session);
  try {
    if (rememberMe) {
      localStorage.setItem(SESSION_KEY, str);
    } else {
      sessionStorage.setItem(SESSION_KEY, str);
      localStorage.removeItem(SESSION_KEY);
    }
  } catch (e) {
    console.error('Storage unavailable', e);
  }
}

/**
 * Clears authentication session & locks hub
 */
export function destroyAuthSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem('csa_internal_unlocked');
  } catch {
    /* ignore */
  }
}
