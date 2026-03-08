// ── eKart Shared Navigation ───────────────────────────────────────────────────
// Call renderNav(activePage) after DOM ready

const NAV_ITEMS = [
  { id: 'stores',       label: 'My Stores',    icon: '🏪', href: 'home.html',         section: 'merchant' },
  { id: 'products',     label: 'Products',     icon: '📦', href: 'products.html',     section: 'merchant' },
  { id: 'categories',   label: 'Categories',   icon: '🗂️', href: 'categories.html',   section: 'merchant' },
  { id: 'orders',       label: 'Orders',       icon: '📋', href: 'orders.html',       section: 'merchant' },
  { id: 'coupons',      label: 'Coupons',      icon: '🎟️', href: 'coupons.html',      section: 'merchant' },
  { id: 'analytics',    label: 'Analytics',    icon: '📊', href: 'analytics.html',    section: 'merchant' },
  { id: 'marketing',    label: 'Marketing',    icon: '📣', href: 'marketing.html',    section: 'merchant' },
  { id: 'ai-assistant', label: 'AI Assistant', icon: '🤖', href: 'ai-assistant.html', section: 'ai' },
]

const NAV_CSS = `
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Mono:wght@400;500&display=swap');
  :root {
    --accent: #6c63ff;
    --accent2: #a78bfa;
    --bg: #080910;
    --surface: #0f1018;
    --surface2: #161824;
    --surface3: #1e2030;
    --border: rgba(255,255,255,0.06);
    --border2: rgba(255,255,255,0.1);
    --text: #f0f2ff;
    --text2: #8892a4;
    --text3: #4a5568;
    --green: #34d399;
    --red: #f87171;
    --yellow: #fbbf24;
    --blue: #60a5fa;
    --sidebar-w: 220px;
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Outfit', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
  }

  /* ── SIDEBAR ── */
  .sidebar {
    width: var(--sidebar-w);
    min-height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0; left: 0; bottom: 0;
    z-index: 200;
    overflow-y: auto;
  }
  .sidebar-logo {
    padding: 22px 20px 18px;
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.04em;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 8px;
    text-decoration: none;
    color: var(--text);
  }
  .sidebar-logo .logo-k { color: var(--accent); }
  .sidebar-logo .logo-dot {
    width: 7px; height: 7px;
    background: var(--accent);
    border-radius: 50%;
    display: inline-block;
    animation: logopulse 2s infinite;
  }
  @keyframes logopulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }

  .sidebar-user {
    padding: 14px 16px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .sidebar-avatar {
    width: 32px; height: 32px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 700; color: white;
    flex-shrink: 0; overflow: hidden;
  }
  .sidebar-avatar img { width: 100%; height: 100%; object-fit: cover; }
  .sidebar-user-name { font-size: 12.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--text); }
  .sidebar-user-email { font-size: 10.5px; color: var(--text3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  .nav-section { padding: 16px 10px 6px; }
  .nav-section-label {
    font-size: 9.5px;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text3);
    padding: 0 10px;
    margin-bottom: 6px;
  }
  .nav-item {
    display: flex;
    align-items: center;
    gap: 9px;
    padding: 8px 10px;
    border-radius: 9px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text2);
    cursor: pointer;
    transition: all .15s;
    text-decoration: none;
    margin-bottom: 2px;
  }
  .nav-item:hover { background: var(--surface2); color: var(--text); }
  .nav-item.active {
    background: rgba(108,99,255,0.14);
    color: var(--accent2);
    font-weight: 700;
  }
  .nav-item .nav-icon { font-size: 15px; width: 20px; text-align: center; flex-shrink: 0; }
  .nav-item.active .nav-icon { filter: drop-shadow(0 0 6px rgba(108,99,255,0.6)); }

  .sidebar-bottom {
    margin-top: auto;
    padding: 16px;
    border-top: 1px solid var(--border);
  }
  .btn-logout {
    width: 100%;
    padding: 8px 12px;
    background: none;
    border: 1px solid var(--border2);
    border-radius: 8px;
    color: var(--text3);
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;
    font-family: 'Outfit', sans-serif;
    transition: all .15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
  }
  .btn-logout:hover { border-color: var(--red); color: var(--red); background: rgba(248,113,113,0.06); }

  /* ── MAIN CONTENT WRAPPER ── */
  .main-wrap {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* ── TOPBAR ── */
  .topbar {
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    padding: 0 28px;
    height: 58px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    top: 0;
    z-index: 100;
  }
  .topbar-left { display: flex; align-items: center; gap: 12px; }
  .topbar-title { font-size: 15px; font-weight: 800; letter-spacing: -0.02em; }
  .topbar-right { display: flex; align-items: center; gap: 10px; }
  .store-select-wrap { display: flex; align-items: center; gap: 8px; }
  .store-select-label { font-size: 11px; font-weight: 700; color: var(--text3); text-transform: uppercase; letter-spacing: 0.08em; }
  .store-selector {
    background: var(--surface2);
    border: 1px solid var(--border2);
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    outline: none;
    cursor: pointer;
    max-width: 160px;
  }
  .store-selector option { background: var(--surface2); }

  /* ── SHARED BUTTONS ── */
  .btn {
    display: inline-flex; align-items: center; gap: 7px;
    padding: 8px 16px;
    border-radius: 9px;
    font-size: 13px; font-weight: 700;
    cursor: pointer; border: none;
    font-family: 'Outfit', sans-serif;
    transition: all .15s; text-decoration: none;
  }
  .btn-primary { background: var(--accent); color: white; }
  .btn-primary:hover { background: #7b74ff; box-shadow: 0 4px 16px rgba(108,99,255,0.35); }
  .btn-secondary { background: var(--surface2); color: var(--text2); border: 1px solid var(--border2); }
  .btn-secondary:hover { color: var(--text); background: var(--surface3); }
  .btn-danger { background: rgba(248,113,113,0.1); color: var(--red); border: 1px solid rgba(248,113,113,0.2); }
  .btn-danger:hover { background: rgba(248,113,113,0.18); }
  .btn-sm { padding: 5px 11px; font-size: 11.5px; }
  .btn-ai {
    background: linear-gradient(135deg, #6c63ff, #a78bfa);
    color: white; border: none;
    display: inline-flex; align-items: center; gap: 6px;
    padding: 8px 16px; border-radius: 9px;
    font-size: 13px; font-weight: 700;
    cursor: pointer; font-family: 'Outfit', sans-serif;
    transition: all .2s;
  }
  .btn-ai:hover { transform: translateY(-1px); box-shadow: 0 4px 18px rgba(108,99,255,0.45); }
  .btn-ai:disabled { opacity: 0.6; cursor: wait; transform: none; }
  .btn-ai-sm { padding: 5px 11px; font-size: 11.5px; }

  /* ── CONTENT AREA ── */
  .content { padding: 24px 28px; flex: 1; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,0.75);
    z-index: 1000;
    display: none;
    align-items: center;
    justify-content: center;
    padding: 20px;
    backdrop-filter: blur(6px);
  }
  .modal-overlay.open { display: flex; }
  .modal {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 20px;
    padding: 28px;
    width: 100%;
    max-width: 520px;
    max-height: 90vh;
    overflow-y: auto;
  }
  .modal h2 { font-size: 17px; font-weight: 800; margin-bottom: 22px; }
  .modal-footer { display: flex; gap: 10px; justify-content: flex-end; margin-top: 22px; padding-top: 16px; border-top: 1px solid var(--border); }

  /* ── FORM FIELDS ── */
  .field { margin-bottom: 14px; }
  .field label { display: block; font-size: 11.5px; font-weight: 700; color: var(--text2); margin-bottom: 6px; letter-spacing: 0.03em; }
  .field input, .field textarea, .field select {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border2);
    border-radius: 9px;
    padding: 10px 13px;
    font-size: 13.5px;
    color: var(--text);
    font-family: 'Outfit', sans-serif;
    outline: none;
    transition: border-color .15s;
  }
  .field input:focus, .field textarea:focus, .field select:focus { border-color: var(--accent); }
  .field textarea { resize: vertical; min-height: 80px; line-height: 1.6; }
  .field select option { background: var(--surface2); }
  .field-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .field-hint { font-size: 11px; color: var(--text3); margin-top: 5px; }

  /* ── TABLE ── */
  .table-wrap {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }
  table { width: 100%; border-collapse: collapse; font-size: 13px; }
  thead tr { background: var(--surface2); }
  th { padding: 10px 16px; text-align: left; font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text3); white-space: nowrap; }
  td { padding: 12px 16px; border-bottom: 1px solid var(--border); vertical-align: middle; }
  tr:last-child td { border-bottom: none; }
  tr:hover td { background: rgba(255,255,255,0.015); }

  /* ── STATUS BADGES ── */
  .badge {
    display: inline-flex; align-items: center; gap: 4px;
    padding: 3px 10px; border-radius: 6px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.03em;
  }
  .badge-green { background: rgba(52,211,153,0.1); color: var(--green); border: 1px solid rgba(52,211,153,0.2); }
  .badge-yellow { background: rgba(251,191,36,0.1); color: var(--yellow); border: 1px solid rgba(251,191,36,0.2); }
  .badge-purple { background: rgba(108,99,255,0.1); color: var(--accent2); border: 1px solid rgba(108,99,255,0.2); }
  .badge-blue { background: rgba(96,165,250,0.1); color: var(--blue); border: 1px solid rgba(96,165,250,0.2); }
  .badge-red { background: rgba(248,113,113,0.1); color: var(--red); border: 1px solid rgba(248,113,113,0.2); }
  .badge-gray { background: rgba(148,163,184,0.08); color: var(--text3); border: 1px solid var(--border); }

  /* ── EMPTY STATE ── */
  .empty-state { text-align: center; padding: 60px 20px; color: var(--text3); }
  .empty-state .empty-icon { font-size: 44px; margin-bottom: 14px; }
  .empty-state h3 { font-size: 15px; font-weight: 700; color: var(--text2); margin-bottom: 6px; }
  .empty-state p { font-size: 13px; line-height: 1.6; }

  /* ── TOOLBAR ── */
  .toolbar { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; flex-wrap: wrap; }
  .search-field {
    flex: 1; min-width: 200px;
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 9px;
    padding: 8px 14px 8px 36px;
    font-size: 13px; color: var(--text);
    font-family: 'Outfit', sans-serif;
    outline: none; transition: border-color .15s;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%234a5568' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.099zm-5.242 1.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: 12px center;
  }
  .search-field:focus { border-color: var(--accent); }
  .filter-select {
    background: var(--surface);
    border: 1px solid var(--border2);
    border-radius: 9px;
    padding: 8px 12px;
    font-size: 12.5px; font-weight: 600;
    color: var(--text2);
    font-family: 'Outfit', sans-serif;
    outline: none; cursor: pointer;
  }
  .filter-select option { background: var(--surface2); }

  /* ── SECTION CARD ── */
  .section-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    overflow: hidden;
  }
  .section-card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .section-card-title { font-size: 13px; font-weight: 800; color: var(--text2); letter-spacing: 0.03em; }

  /* ── LOADING SPINNER ── */
  .spinner { width: 32px; height: 32px; border: 3px solid var(--border2); border-top-color: var(--accent); border-radius: 50%; animation: spin .7s linear infinite; margin: 40px auto; display: block; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ── MOBILE ── */
  @media(max-width:768px) {
    .sidebar { transform: translateX(-100%); transition: transform .3s; }
    .sidebar.open { transform: translateX(0); }
    .main-wrap { margin-left: 0; }
    .content { padding: 16px; }
    .field-row { grid-template-columns: 1fr; }
  }

  /* ── SKELETON ── */
  @keyframes shimmer-slide {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  .skel {
    background: var(--surface2);
    border-radius: 7px;
    position: relative;
    overflow: hidden;
  }
  .skel::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.04) 50%, transparent 100%);
    animation: shimmer-slide 1.4s infinite;
  }
  .skel-sidebar {
    width: var(--sidebar-w);
    min-height: 100vh;
    background: var(--surface);
    border-right: 1px solid var(--border);
    position: fixed;
    top: 0; left: 0; bottom: 0;
    padding: 22px 16px 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    z-index: 200;
  }
  .skel-logo { height: 28px; width: 80px; }
  .skel-user-row { display: flex; align-items: center; gap: 10px; padding: 10px 0; border-bottom: 1px solid var(--border); margin-bottom: 6px; }
  .skel-avatar { width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0; }
  .skel-user-text { display: flex; flex-direction: column; gap: 5px; flex: 1; }
  .skel-label { height: 8px; width: 50px; margin-bottom: 8px; margin-top: 6px; }
  .skel-nav-item { height: 34px; border-radius: 9px; }
  .skel-main {
    margin-left: var(--sidebar-w);
    flex: 1;
    min-height: 100vh;
  }
  .skel-topbar {
    height: 58px;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    padding: 0 28px;
    gap: 12px;
  }
  .skel-topbar-title { height: 16px; width: 120px; }
  .skel-topbar-pill { height: 32px; width: 160px; border-radius: 8px; margin-left: auto; }
  .skel-content { padding: 24px 28px; display: flex; flex-direction: column; gap: 14px; }
  .skel-row { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .skel-card { height: 80px; border-radius: 14px; }
  .skel-table-head { height: 40px; border-radius: 8px; }
  .skel-table-row { height: 56px; border-radius: 8px; }
  /* Fade out when real content is ready */
  .skel-wrapper {
    transition: opacity 0.2s ease;
  }
  .skel-wrapper.fade-out {
    opacity: 0;
    pointer-events: none;
  }
  </style>
`

async function renderNav(activePage, onStoreChange) {
  const mountEl = document.getElementById('nav-mount')
  if (!mountEl) return

  // Inject CSS
  document.head.insertAdjacentHTML('beforeend', NAV_CSS)

  // ── STEP 1: Render skeleton IMMEDIATELY (no API wait) ──────────────────────
  const skeletonNavItems = NAV_ITEMS.map(item => {
    if (item.section === 'merchant' && item.id === 'stores') return `
      <div style="height:8px;width:50px;" class="skel skel-label"></div>
      <div class="skel skel-nav-item" style="background:${activePage===item.id?'rgba(108,99,255,0.14)':''}"></div>`
    if (item.section === 'ai' && item.id === 'ai-assistant') return `
      <div style="height:8px;width:50px;" class="skel skel-label"></div>
      <div class="skel skel-nav-item" style="background:${activePage===item.id?'rgba(108,99,255,0.14)':''}"></div>`
    return `<div class="skel skel-nav-item" style="background:${activePage===item.id?'rgba(108,99,255,0.14)':''}"></div>`
  }).join('')

  const pageTitle = NAV_ITEMS.find(i => i.id === activePage)?.label || 'Dashboard'
  const showStoreSelector = activePage !== 'stores'

  mountEl.innerHTML = `
    <div class="skel-wrapper" id="skelWrapper">
      <div class="skel-sidebar">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;padding-bottom:16px;border-bottom:1px solid var(--border);">
          <div class="skel skel-logo"></div>
        </div>
        <div class="skel-user-row">
          <div class="skel skel-avatar"></div>
          <div class="skel-user-text">
            <div class="skel" style="height:11px;width:90px;border-radius:5px;"></div>
            <div class="skel" style="height:9px;width:120px;border-radius:5px;"></div>
          </div>
        </div>
        ${skeletonNavItems}
        <div style="margin-top:auto;padding-top:12px;border-top:1px solid var(--border);">
          <div class="skel" style="height:34px;border-radius:8px;"></div>
        </div>
      </div>
      <div class="skel-main">
        <div class="skel-topbar">
          <div class="skel skel-topbar-title"></div>
          ${showStoreSelector ? '<div class="skel skel-topbar-pill"></div>' : ''}
        </div>
        <div class="skel-content">
          <div class="skel-row">
            <div class="skel skel-card"></div>
            <div class="skel skel-card"></div>
            <div class="skel skel-card"></div>
            <div class="skel skel-card"></div>
          </div>
          <div class="skel skel-table-head"></div>
          <div class="skel skel-table-row"></div>
          <div class="skel skel-table-row"></div>
          <div class="skel skel-table-row"></div>
          <div class="skel skel-table-row" style="opacity:.6;"></div>
          <div class="skel skel-table-row" style="opacity:.35;"></div>
        </div>
      </div>
    </div>
    <div id="realContent" style="display:none;"></div>
  `

  // ── STEP 2: Fetch data in background ──────────────────────────────────────
  const token = getToken()
  if (!token) { location.replace('/'); return }
  let user = null, stores = []
  try {
    [user, stores] = await Promise.all([
      apiFetch('/auth/me'),
      apiFetch('/stores')
    ])
  } catch { location.replace('/'); return }

  // Store selector state
  let currentStoreId = sessionStorage.getItem('ekart_current_store') || (stores[0]?._id || '')
  if (!stores.find(s => s._id === currentStoreId) && stores.length) {
    currentStoreId = stores[0]._id
    sessionStorage.setItem('ekart_current_store', currentStoreId)
  }

  const avatarHtml = user.avatar
    ? `<img src="${user.avatar}" alt="">`
    : `<span>${(user.name || 'U')[0].toUpperCase()}</span>`

  const navItemsHtml = NAV_ITEMS.map(item => {
    if (item.section === 'merchant' && item.id === 'stores') return `
      <div class="nav-section">
        <div class="nav-section-label">Merchant</div>
        <a class="nav-item ${activePage === item.id ? 'active' : ''}" href="${item.href}">
          <span class="nav-icon">${item.icon}</span>${item.label}
        </a>`
    if (item.section === 'ai' && item.id === 'ai-assistant') return `
      </div>
      <div class="nav-section">
        <div class="nav-section-label">AI Tools</div>
        <a class="nav-item ${activePage === item.id ? 'active' : ''}" href="${item.href}">
          <span class="nav-icon">${item.icon}</span>${item.label}
        </a>
      </div>`
    return `<a class="nav-item ${activePage === item.id ? 'active' : ''}" href="${item.href}">
      <span class="nav-icon">${item.icon}</span>${item.label}
    </a>`
  }).join('')

  const storeOptionsHtml = stores.map(s =>
    `<option value="${s._id}" ${s._id === currentStoreId ? 'selected' : ''}>${s.name}</option>`
  ).join('')

  const pageTitle = NAV_ITEMS.find(i => i.id === activePage)?.label || 'Dashboard'
  const showStoreSelector = activePage !== 'stores'

  // ── STEP 3: Build real HTML and swap out skeleton ─────────────────────────
  const realHTML = `
    <div class="sidebar" id="sidebar">
      <a class="sidebar-logo" href="home.html">
        e<span class="logo-k">K</span>art
        <span class="logo-dot"></span>
      </a>
      <div class="sidebar-user">
        <div class="sidebar-avatar">${avatarHtml}</div>
        <div>
          <div class="sidebar-user-name">${user.name || 'User'}</div>
          <div class="sidebar-user-email">${user.email || ''}</div>
        </div>
      </div>
      ${navItemsHtml}
      <div class="sidebar-bottom">
        <button class="btn-logout" onclick="logout()">↩ Logout</button>
      </div>
    </div>
    <div class="main-wrap">
      <div class="topbar">
        <div class="topbar-left">
          <span class="topbar-title">${pageTitle}</span>
        </div>
        <div class="topbar-right" id="topbar-right">
          ${showStoreSelector && stores.length ? `
            <div class="store-select-wrap">
              <span class="store-select-label">Store</span>
              <select class="store-selector" id="store-selector" onchange="handleStoreChange(this.value)">
                ${storeOptionsHtml}
              </select>
            </div>` : ''}
          <div id="topbar-actions"></div>
        </div>
      </div>
      <div class="content" id="page-content">
      </div>
    </div>
  `

  // Fade skeleton out, show real layout
  const skelWrapper = document.getElementById('skelWrapper')
  const realContent = document.getElementById('realContent')

  realContent.innerHTML = realHTML
  realContent.style.display = 'contents'

  // Short delay so browser paints real content before we hide skeleton
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      skelWrapper.classList.add('fade-out')
      setTimeout(() => skelWrapper.remove(), 200)
    })
  })

  // Store change handler
  window.handleStoreChange = (id) => {
    sessionStorage.setItem('ekart_current_store', id)
    if (typeof onStoreChange === 'function') onStoreChange(id)
  }

  // Close modals on overlay click
  document.addEventListener('click', e => {
    if (e.target.classList.contains('modal-overlay')) e.target.classList.remove('open')
  })

  return { user, stores, currentStoreId }
}

function getCurrentStoreId() { return sessionStorage.getItem('ekart_current_store') || '' }
function setTopbarActions(html) {
  const el = document.getElementById('topbar-actions')
  if (el) el.innerHTML = html
}
function openModal(id) { document.getElementById(id)?.classList.add('open') }
function closeModal(id) { document.getElementById(id)?.classList.remove('open') }

function statusBadge(status) {
  const map = {
    active: 'badge-green', delivered: 'badge-green', published: 'badge-green',
    pending: 'badge-yellow', draft: 'badge-yellow',
    confirmed: 'badge-purple', processing: 'badge-purple',
    shipped: 'badge-blue',
    cancelled: 'badge-red', archived: 'badge-red',
  }
  return `<span class="badge ${map[status] || 'badge-gray'}">${status}</span>`
}
