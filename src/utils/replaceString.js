export function withlimit(str, count = 8) {
  if (str.length < count) return str;

  return str.slice(0, count) + '...';
}
