export function sanitize(input: string) {
  input = input.replace(/[^a-z0-9áéíóúñü \.,_-]/gim, "");
  return input.trim();
}
