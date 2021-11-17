export const updateObj = (source: any, target: any): any => {
  if (!target) return source
  if (!source) return target
  if (Array.isArray(source)) {
    return [...source, ...target]
  }
  return {
    ...source,
    ...(Object.entries(target).reduce((acc, [key, value]) => {
      if (typeof value === 'object') {
        return { ...acc, [key]: updateObj(source[key], value) }
      }
      return { ...acc, [key]: value }
    }, {}))
  }
}
