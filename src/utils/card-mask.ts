export function cardMask(number: string) {
  const numericOnly = number.replace(/\D/g, "");

  return numericOnly
    .replace(/\W/gi, "")
    .replace(/(.{4})/g, "$1 ")
    .trim();
}
