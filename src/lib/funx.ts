export const indexOfRegExp = function iRe(regex: RegExp, array: any[]) {
  return array.findIndex((element) => regex.test(element));
};

export const sarahJessicaParker = function sJP(
  array: any[],
  start: number,
  end: number,
  regex: RegExp = /(\s{2,})/g,
  replaced: string = " ",
) {
  return array.slice(start, end).join("").replace(regex, replaced);
};
