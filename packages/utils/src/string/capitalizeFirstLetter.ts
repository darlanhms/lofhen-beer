export function capitalizeFirstLetter(str: string): string {
  return String(str).charAt(0).toUpperCase() + str.slice(1);
}
