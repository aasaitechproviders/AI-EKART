// ── eKart Shared API & Auth ───────────────────────────────────────────────────
const API = 'https://apiv2.aasaitech.in'

function getToken() { return localStorage.getItem('ekart_token') }

async function apiFetch(path, opts = {}) {
  const token = getToken()
  const isFormData = opts.body instanceof FormData
  const headers = { 'Authorization': 'Bearer ' + token }
  if (!isFormData) headers['Content-Type'] = 'application/json'
  Object.assign(headers, opts.headers || {})
  const res = await fetch(API + path, { ...opts, headers })
  if (res.status === 401) { localStorage.removeItem('ekart_token'); location.replace('/'); return }
  if (!res.ok) { const e = await res.json().catch(() => ({ error: 'Error' })); throw new Error(e.error || 'Request failed') }
  return res.json()
}

async function requireAuth() {
  const token = getToken()
  if (!token) { location.replace('/'); return null }
  try {
    const user = await apiFetch('/auth/me')
    return user
  } catch { location.replace('/'); return null }
}

function logout() { localStorage.removeItem('ekart_token'); location.replace('/') }

function toast(msg, type = 'success') {
  let t = document.getElementById('ekart-toast')
  if (!t) {
    t = document.createElement('div')
    t.id = 'ekart-toast'
    t.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:14px 20px;border-radius:12px;font-size:13.5px;font-family:Outfit,sans-serif;font-weight:600;z-index:9999;display:none;box-shadow:0 8px 32px rgba(0,0,0,0.4);transition:all .3s;max-width:320px;'
    document.body.appendChild(t)
  }
  const styles = {
    success: 'background:#1a2e1a;border:1px solid rgba(52,211,153,0.4);color:#34d399;',
    error: 'background:#2e1a1a;border:1px solid rgba(248,113,113,0.4);color:#f87171;',
    info: 'background:#1a1c2b;border:1px solid rgba(108,99,255,0.4);color:#a78bfa;'
  }
  t.style.cssText += styles[type] || styles.success
  t.textContent = msg
  t.style.display = 'block'
  t.style.opacity = '1'
  clearTimeout(t._timer)
  t._timer = setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.style.display = 'none', 300) }, 3000)
}

function formatCurrency(amount, currency = 'INR') {
  const sym = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'
  return sym + parseFloat(amount || 0).toLocaleString('en-IN', { maximumFractionDigits: 2, minimumFractionDigits: 0 })
}

function timeAgo(date) {
  const d = new Date(date), now = new Date()
  const diff = Math.floor((now - d) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return Math.floor(diff/60) + 'm ago'
  if (diff < 86400) return Math.floor(diff/3600) + 'h ago'
  return Math.floor(diff/86400) + 'd ago'
}
