export function checkIsUrl(url: string) {
  try {
    new URL(url)
    return true
  } catch (e) {
    return false
  }
}