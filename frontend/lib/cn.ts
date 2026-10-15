/**
 * Minimal class-name joiner.
 *
 * Deliberately not `clsx` + `tailwind-merge`. Two dependencies to concatenate
 * strings is not a trade worth making on a project whose dependency count is
 * itself a security policy. If class conflicts ever become a real problem,
 * revisit — but solve the problem that exists, not the one that might.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
