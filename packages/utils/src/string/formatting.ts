export function onlyNumbers(str: string): string {
  return String(str).replace(/[^\d]/g, '');
}

export function onlyLetters(str: string): string {
  return String(str).replace(/[^\D]/g, '');
}
