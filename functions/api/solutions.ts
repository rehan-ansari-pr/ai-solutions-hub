// Cloudflare Pages Function: /api/solutions
interface Env {
  TEAM_CATALOG_SECRET?: string;
  SOLUTIONS_KV?: any;
}

// Default team auth token for secure authorized team synchronization
const DEFAULT_AUTH_TOKEN = "csa_team_sec_2026_x89";

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const url = new URL(context.request.url);
  const pillar = url.searchParams.get('pillar');
  const query = url.searchParams.get('q')?.toLowerCase();

  return new Response(JSON.stringify({
    status: 'success',
    timestamp: new Date().toISOString(),
    message: 'AI Solutions Catalog API',
    hint: 'Solutions are embedded with static fallback and edge caching',
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=60',
    }
  });
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const req = context.request;
  const authHeader = req.headers.get('Authorization') || req.headers.get('x-api-key') || '';
  const providedToken = authHeader.replace(/^Bearer\s+/i, '').trim();

  const validToken = context.env.TEAM_CATALOG_SECRET || DEFAULT_AUTH_TOKEN;

  if (!providedToken || providedToken !== validToken) {
    return new Response(JSON.stringify({
      status: 'error',
      code: 'UNAUTHORIZED',
      message: 'Unauthorized. You must provide a valid CSA Team Secret Token in Authorization header.',
      hint: 'Set CSA_CATALOG_TOKEN in your environment or ask the team administrator.'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }

  try {
    const body = await req.json() as any;

    // Validate required fields
    if (!body.title || !body.pillar || !body.problem || !body.solution) {
      return new Response(JSON.stringify({
        status: 'error',
        code: 'VALIDATION_FAILED',
        message: 'Missing required fields: title, pillar, problem, solution.'
      }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    const solutionId = body.id || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const synchronizedSolution = {
      ...body,
      id: solutionId,
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
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({
      status: 'error',
      message: 'Failed to parse JSON request body: ' + err.message
    }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-api-key',
    }
  });
};
