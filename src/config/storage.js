export function getStorageItem(key) {
  return localStorage.getItem(key);
}

export function setStorageItem(key, val) {
  localStorage.setItem(key, val);
}

export function removeStorageItem(key) {
  localStorage.removeItem(key);
}
