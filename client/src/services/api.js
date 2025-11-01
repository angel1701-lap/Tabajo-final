const BASE_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:3000/api'

export async function get(path) {
  const res = await fetch(`${BASE_URL}${path}`)
  if (!res.ok) throw new Error(`GET ${path} ${res.status}`)
  return res.json()
}

export async function getTopProducts() {
  return get('/top-products')
}

export async function getMonthlySales() {
  return get('/monthly-sales')
}

export async function getPrediction(productId) {
  const q = productId ? `?productId=${encodeURIComponent(productId)}` : ''
  return get(`/predict${q}`)
}
