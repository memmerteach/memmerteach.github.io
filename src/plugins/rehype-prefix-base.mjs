export default function rehypePrefixBase({ base } = { base: "/" }) {
  const trimmed = base.replace(/\/$/, "");

  const prefix = (value) => {
    if (typeof value !== "string") return value;
    if (!value.startsWith("/") || value.startsWith("//")) return value;
    if (trimmed && (value === trimmed || value.startsWith(`${trimmed}/`))) return value;
    return `${trimmed}${value}`;
  };

  const rawAttrPattern = /(\b(?:src|href)\s*=\s*["'])(\/[^"'#?][^"']*)(["'])/g;

  const walk = (node) => {
    if (!node || typeof node !== "object") return;
    if (node.type === "element" && node.properties) {
      if (typeof node.properties.src === "string") node.properties.src = prefix(node.properties.src);
      if (typeof node.properties.href === "string") node.properties.href = prefix(node.properties.href);
    } else if (node.type === "raw" && typeof node.value === "string") {
      node.value = node.value.replace(rawAttrPattern, (_, pre, url, post) => `${pre}${prefix(url)}${post}`);
    }
    if (Array.isArray(node.children)) {
      for (const child of node.children) walk(child);
    }
  };

  return (tree) => walk(tree);
}
