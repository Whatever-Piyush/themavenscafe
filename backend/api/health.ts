/**
 * Health check — the only server-side logic in V1.
 *
 * It exists for two honest reasons, not to make this folder look substantial:
 *
 *   1. It is a deployment smoke test. After a deploy, hitting /api/health
 *      confirms the serverless runtime is alive and the frontend can reach
 *      backend code, which is the one thing you cannot tell by looking at a
 *      statically rendered page.
 *
 *   2. It proves the frontend/backend boundary is wired correctly, so the first
 *      piece of real server logic has a working path to follow rather than a
 *      pattern someone has to invent under pressure.
 *
 * Note what it does NOT report: no version numbers, no dependency list, no
 * environment details, no uptime. A health endpoint that enumerates your stack
 * is reconnaissance for anyone who asks. "Alive" is the entire useful answer.
 */

export interface HealthStatus {
  status: 'ok';
  timestamp: string;
}

export function getHealth(): HealthStatus {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
  };
}
