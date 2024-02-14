export const loadFromStorage = (key: string) => {
  const item = localStorage.getItem(key)
  if (item) {
    return JSON.parse(item)
  }
  return null
}

export const setToStorage = (key: string, data: any): void => {
  localStorage.setItem(key, JSON.stringify(data))
}

export const clearStorage = (key: string) => localStorage.removeItem(key)
