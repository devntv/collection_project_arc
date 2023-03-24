function screenOrientation(window) {
  if (typeof window !== 'undefined' && window.orientation === 90 || window.orientation === -90) {
    return true
  }
  return false
}

export default screenOrientation


