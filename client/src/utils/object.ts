export const isEqual = (a: any, b: any) => {
  return JSON.stringify(a) === JSON.stringify(b)
}