// @ts-ignore
export const uniSort =  <T extends string>(a: T, b: T) => (a && b ? a.localeCompare(b) : a - b);