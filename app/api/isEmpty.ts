export function isEmpty(arr: string[]) {
  for (let str of arr) {
    if (str == "") {
      return true;
    }
  }
  return false;
}
