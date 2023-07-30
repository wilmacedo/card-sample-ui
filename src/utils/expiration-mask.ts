export function expirationMask(date: string) {
  return date
    .replace(/\D/g, "")
    .replace(/^(\d{2})/, "$1/")
    .replace(/^(0[1-9]|1[0-2])\/(\d{2}).*/, "$1/$2");
}
