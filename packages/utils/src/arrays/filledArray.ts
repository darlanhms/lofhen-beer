export function filledArray(possibleArray?: unknown): possibleArray is Array<any> {
  if (possibleArray && Array.isArray(possibleArray) && possibleArray.length > 0) {
    return true;
  }

  return false;
}
