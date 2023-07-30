export function cardMask(number: string) {
  return number
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
