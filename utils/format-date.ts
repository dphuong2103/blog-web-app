export function formatDate(input: string | number): string {
  const date = new Date(input);
  if (typeof input === "number") {
    date.setUTCSeconds(input);
  }
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
