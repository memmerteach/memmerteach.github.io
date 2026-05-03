const baseUrl: string = import.meta.env.BASE_URL;

export function withBase(path: string): string {
  if (!path) return path;
  if (/^[a-z][a-z0-9+\-.]*:|^\/\//i.test(path)) return path;
  if (!path.startsWith("/")) return path;
  const trimmed = baseUrl.replace(/\/$/, "");
  if (trimmed && (path === trimmed || path.startsWith(`${trimmed}/`))) return path;
  return `${trimmed}${path}`;
}
