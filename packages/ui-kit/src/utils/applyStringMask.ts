/* eslint-disable radix */
/* eslint-disable no-plusplus */

function replaceString(string: string, index: number, replacement: string) {
  if (index >= string.length) {
    return string.valueOf();
  }

  return string.substring(0, index) + replacement + string.substring(index + 1);
}

export default function applyStringMask(string: string, mask: string, maskChar = '_'): string {
  const trimmedString = string.replace(' ', '');

  for (let index = 0; index < trimmedString.length; index++) {
    const foundValue = mask.indexOf(maskChar);
    if (foundValue < 0) {
      return mask;
    }

    mask = replaceString(mask, foundValue, trimmedString.charAt(index));
  }

  return mask;
}
