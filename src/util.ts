export function isNumber(input?: string) {
  return input !== undefined && !Number.isNaN(parseInt(input, 10))
}
