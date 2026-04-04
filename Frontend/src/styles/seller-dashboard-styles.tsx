/* ============================================================
   GLOBAL STYLES FOR SELLER DASHBOARD
   ============================================================ */
export const SellerDashboardGlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:         #f5f5f5;
      --white:      #ffffff;
      --black:      #0a0a0a;
      --ink:        #1a1a1a;
      --ink2:       #3a3a3a;
      --ink3:       #6a6a6a;
      --line:       #e0e0e0;
      --line2:      #cdcdcd;
      --hover-row:  #f9f9f9;
      --sidebar-bg: #111111;
      --sidebar-txt:#cccccc;
      --sidebar-act:#ffffff;
      --sidebar-hl: #2a2a2a;
      --tag-green-bg:  #f0faf2;
      --tag-green-txt: #1a6b30;
      --tag-red-bg:    #fff0f0;
      --tag-red-txt:   #b02020;
      --tag-blue-bg:   #f0f4ff;
      --tag-blue-txt:  #1a3acc;
      --tag-amber-bg:  #fffbf0;
      --tag-amber-txt: #8a5a00;
      --tag-gray-bg:   #f4f4f4;
      --tag-gray-txt:  #555555;
      --font: 'Inter', sans-serif;
      --radius: 8px;
      --shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
      --shadow-md: 0 4px 12px rgba(0,0,0,.10);
    }

    html, body, #root {
      height: 100%;
      background: var(--bg);
      font-family: var(--font);
      color: var(--ink);
      font-size: 14px;
      -webkit-font-smoothing: antialiased;
    }

    /* ── Shell Layout ── */
    .shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 220px;
      flex-shrink: 0;
      background: var(--sidebar-bg);
      display: flex;
      flex-direction: column;
      padding: 0;
      overflow-y: auto;
    }

    .sidebar__brand {
      padding: 24px 20px 20px;
      border-bottom: 1px solid #222;
    }
    .sidebar__brand-name {
      font-size: 17px;
      font-weight: 700;
      color: #fff;
      letter-spacing: -.3px;
    }
    .sidebar__brand-sub {
      font-size: 11px;
      color: #666;
      margin-top: 3px;
      letter-spacing: .5px;
      text-transform: uppercase;
    }

    .sidebar__section {
      padding: 20px 12px 8px;
    }
    .sidebar__section-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 1.2px;
      text-transform: uppercase;
      color: #444;
      padding: 0 8px;
      margin-bottom: 6px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 9px 10px;
      border-radius: 6px;
      cursor: pointer;
      color: var(--sidebar-txt);
      font-size: 13.5px;
      font-weight: 400;
      transition: background .15s, color .15s;
      user-select: none;
      border: none;
      background: none;
      width: 100%;
      text-align: left;
    }
    .nav-item:hover {
      background: #1e1e1e;
      color: #fff;
    }
    .nav-item--active {
      background: var(--sidebar-hl);
      color: var(--sidebar-act);
      font-weight: 500;
    }
    .nav-item__icon {
      width: 18px;
      height: 18px;
      flex-shrink: 0;
      opacity: .7;
    }
    .nav-item--active .nav-item__icon { opacity: 1; }

    .sidebar__footer {
      margin-top: auto;
      padding: 16px 12px;
      border-top: 1px solid #222;
    }
    .seller-chip {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 10px;
      border-radius: 6px;
      background: #1a1a1a;
    }
    .seller-chip__avatar {
      width: 30px; height: 30px;
      border-radius: 50%;
      background: #333;
      display: flex; align-items: center; justify-content: center;
      font-size: 13px; font-weight: 600; color: #aaa;
      flex-shrink: 0;
    }
    .seller-chip__name {
      font-size: 12.5px;
      font-weight: 500;
      color: #ccc;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .seller-chip__role {
      font-size: 10.5px;
      color: #555;
    }

    /* ── Main area ── */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      background: var(--bg);
    }

    /* ── Top bar ── */
    .topbar {
      height: 56px;
      background: var(--white);
      border-bottom: 1px solid var(--line);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      flex-shrink: 0;
    }
    .topbar__title {
      font-size: 15px;
      font-weight: 600;
      color: var(--ink);
    }
    .topbar__right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .topbar__badge {
      font-size: 12px;
      color: var(--ink3);
      background: var(--bg);
      border: 1px solid var(--line);
      border-radius: 20px;
      padding: 4px 12px;
    }

    /* ── Content area ── */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 28px;
    }

    /* ── Section header ── */
    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .section-head__left h2 {
      font-size: 17px;
      font-weight: 600;
      color: var(--ink);
    }
    .section-head__left p {
      font-size: 13px;
      color: var(--ink3);
      margin-top: 2px;
    }

    /* ── Buttons ── */
    .btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: var(--radius);
      font-family: var(--font);
      font-size: 13px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: all .15s;
    }
    .btn--dark {
      background: var(--black);
      color: #fff;
    }
    .btn--dark:hover { background: #333; }
    .btn--ghost {
      background: transparent;
      border: 1px solid var(--line2);
      color: var(--ink2);
    }
    .btn--ghost:hover { border-color: #aaa; }

    /* ── Search / filter bar ── */
    .toolbar {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    .search-box {
      flex: 1;
      max-width: 300px;
      position: relative;
    }
    .search-box__icon {
      position: absolute;
      left: 10px; top: 50%;
      transform: translateY(-50%);
      color: #aaa;
      pointer-events: none;
    }
    .search-box input {
      width: 100%;
      padding: 8px 10px 8px 32px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
      font-family: var(--font);
      font-size: 13px;
      color: var(--ink);
      outline: none;
      transition: border-color .15s;
    }
    .search-box input:focus { border-color: #aaa; }
    .search-box input::placeholder { color: #bbb; }

    .filter-select {
      padding: 8px 12px;
      border: 1px solid var(--line);
      border-radius: var(--radius);
      background: var(--white);
      font-family: var(--font);
      font-size: 13px;
      color: var(--ink2);
      outline: none;
      cursor: pointer;
    }

    /* ── Table wrapper ── */
    .table-wrap {
      background: var(--white);
      border: 1px solid var(--line);
      border-radius: 10px;
      overflow: hidden;
      box-shadow: var(--shadow);
    }

    .tbl {
      width: 100%;
      border-collapse: collapse;
    }
    .tbl thead tr {
      border-bottom: 1px solid var(--line);
      background: #fafafa;
    }
    .tbl th {
      padding: 11px 14px;
      font-size: 11.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .7px;
      color: var(--ink3);
      text-align: left;
      white-space: nowrap;
    }
    .tbl td {
      padding: 12px 14px;
      font-size: 13.5px;
      color: var(--ink2);
      vertical-align: middle;
      border-bottom: 1px solid var(--line);
    }
    .tbl tbody tr:last-child td { border-bottom: none; }
    .tbl tbody tr:hover td { background: var(--hover-row); }

    /* ── Product image cell ── */
    .prod-img {
      width: 44px; height: 44px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid var(--line);
      background: #f0f0f0;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
      flex-shrink: 0;
    }
    .prod-cell {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .prod-cell__name {
      font-weight: 500;
      color: var(--ink);
      font-size: 13.5px;
    }
    .prod-cell__id {
      font-size: 11.5px;
      color: #aaa;
      margin-top: 2px;
    }

    /* ── Tags / badges ── */
    .tag {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 3px 9px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      white-space: nowrap;
    }
    .tag--green  { background: var(--tag-green-bg);  color: var(--tag-green-txt); }
    .tag--red    { background: var(--tag-red-bg);    color: var(--tag-red-txt);   }
    .tag--blue   { background: var(--tag-blue-bg);   color: var(--tag-blue-txt);  }
    .tag--amber  { background: var(--tag-amber-bg);  color: var(--tag-amber-txt); }
    .tag--gray   { background: var(--tag-gray-bg);   color: var(--tag-gray-txt);  }
    .tag--black  { background: #111; color: #fff; }

    /* ── Variation chips ── */
    .var-list {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .var-chip {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 12.5px;
      color: var(--ink2);
      white-space: nowrap;
    }
    .var-chip__name {
      font-weight: 500;
      color: var(--ink);
    }
    .var-chip__price {
      color: var(--ink3);
    }

    /* ── Stock indicator ── */
    .stock-cell {
      display: flex;
      align-items: center;
      gap: 7px;
    }
    .stock-dot {
      width: 7px; height: 7px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .stock-dot--good   { background: #22a84a; }
    .stock-dot--low    { background: #e0a800; }
    .stock-dot--out    { background: #cc3333; }

    /* ── Order ID cell ── */
    .order-id {
      font-family: 'Courier New', monospace;
      font-size: 12.5px;
      color: var(--ink3);
    }
    .order-num {
      font-weight: 600;
      color: var(--ink);
    }

    /* ── Address cell ── */
    .addr-cell {
      font-size: 12.5px;
      line-height: 1.5;
      color: var(--ink2);
      max-width: 180px;
    }

    /* ── Empty state ── */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: var(--ink3);
    }
    .empty-state__icon { font-size: 36px; margin-bottom: 10px; }
    .empty-state__text { font-size: 14px; }

    /* ── Pagination row ── */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-top: 1px solid var(--line);
      font-size: 13px;
      color: var(--ink3);
      background: #fafafa;
    }
    .pagination__pages {
      display: flex;
      gap: 4px;
    }
    .page-btn {
      padding: 4px 10px;
      border: 1px solid var(--line);
      border-radius: 5px;
      background: var(--white);
      font-size: 12.5px;
      cursor: pointer;
      color: var(--ink2);
      transition: all .12s;
    }
    .page-btn:hover, .page-btn--active {
      background: var(--black);
      color: #fff;
      border-color: var(--black);
    }

    /* scrollbar */
    ::-webkit-scrollbar { width: 5px; height: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }
  `}</style>
);
