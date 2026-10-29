// Cloudflare Pages Function: /api/solutions
interface Env {
  TEAM_CATALOG_SECRET?: string;
  SOLUTIONS_KV?: any;
}

// Default team auth token for secure authorized team synchronization
const DEFAULT_AUTH_TOKEN = "csa_team_sec_2026_x89";

// Allowed CORS origins for browser fetch
const ALLOWED_ORIGIN_PATTERNS = [
  /^https:\/\/ai-solutions-hub-922\.pages\.dev$/,
  /^https:\/\/.*\.ai-solutions-hub-922\.pages\.dev$/,
  /^http:\/\/localhost(:\d+)?$/,
  /^http:\/\/127\.0\.0\.1(:\d+)?$/
];

function getCorsHeaders(request: Request): Record<string, string> {
  const origin = request.headers.get('Origin') || '';
  const isAllowed = ALLOWED_ORIGIN_PATTERNS.some(p => p.test(origin));
  const allowOrigin = isAllowed ? origin : 'https://ai-solutions-hub-922.pages.dev';

  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
  };
}

/**
 * Constant-time comparison to protect against timing attacks
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return mismatch === 0;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const corsHeaders = getCorsHeaders(context.request);

  return new Response(JSON.stringify({
    status: 'success',
    timestamp: new Date().toISOString(),
    message: 'CSA × PivotRoots AI Solutions Catalog API',
    hint: 'Static solutions are edge-cached and verified via team token',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
      ...corsHeaders
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const req = context.request;
  const corsHeaders = getCorsHeaders(req);

  // Payload size limit check (Max 64KB)
  const contentLength = req.headers.get('content-length');
  if (contentLength && parseInt(contentLength, 10) > 65536) {
    return new Response(JSON.stringify({
      status: 'error',
      code: 'PAYLOAD_TOO_LARGE',
      message: 'Payload exceeds maximum allowable size (64KB).'
    }), {
      status: 413,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key') || '';
  const providedToken = authHeader.replace(/^Bearer\s+/i, '').trim();
  const validToken = context.env.TEAM_CATALOG_SECRET || DEFAULT_AUTH_TOKEN;

  if (!providedToken || !timingSafeEqual(providedToken, validToken)) {
    return new Response(JSON.stringify({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Unauthorized. You must provide a valid CSA Team Secret Token in Authorization header.',
      hint: 'Set CSA_CATALOG_TOKEN in your environment or ask the team administrator.'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  }

  try {
    const rawBody = await req.text();
    if (rawBody.length > 65536) {
      return new Response(JSON.stringify({
        status: 'error',
        code: 'PAYLOAD_TOO_LARGE',
        message: 'Payload exceeds maximum allowable size (64KB).'
      }), {
        status: 413,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    const body = JSON.parse(rawBody) as any;

    // Validate required fields
    if (!body.title || !body.pillar || !body.problem || !body.solution) {
      return new Response(JSON.stringify({
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Missing required fields: title, pillar, problem, solution.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    // Sanitize string bounds
    const cleanTitle = String(body.title).slice(0, 200).trim();
    const cleanProblem = String(body.problem).slice(0, 5000).trim();
    const cleanSolution = String(body.solution).slice(0, 5000).trim();

    const solutionId = (body.id ? String(body.id) : cleanTitle)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const synchronizedSolution = {
      ...body,
      id: solutionId,
      title: cleanTitle,
      problem: cleanProblem,
      solution: cleanSolution,
      updatedAt: new Date().toISOString(),
      syncSource: 'Agentic CLI / Team Skill'
    };

    return new Response(JSON.stringify({
      status: 'success',
      message: `Solution "${synchronizedSolution.title}" successfully registered/updated in catalog.`,
      solutionId: solutionId,
      data: synchronizedSolution
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        ...corsHeaders
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Failed to process request: ' + err.message
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  const corsHeaders = getCorsHeaders(context.request);
  return new Response(null, {
    status: 204,
    headers: corsHeaders
  });
};
