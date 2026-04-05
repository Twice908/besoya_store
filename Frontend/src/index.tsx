/* ============================================================
   GlobalStyles.jsx  —  Drop-in replacement for BesoyaStore.jsx
   Matches the Seller Dashboard black & white theme.
   Replace the entire GlobalStyles component in BesoyaStore.jsx
   with this file's export. Nothing else needs to change.
   ============================================================ */

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@700;900&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* ── Core palette (B&W) ── */
      --bg:        #f5f5f5;
      --surface:   #ececec;
      --card:      #ffffff;
      --border:    #e0e0e0;
      --accent:    #111111;       /* primary black — replaces gold */
      --accent2:   #444444;       /* secondary dark grey */
      --text:      #1a1a1a;
      --muted:     #777777;
      --danger:    #cc3333;
      --success:   #1a7a35;
      --radius:    14px;
      --radius-add-prod: 8px;
      --font-head: 'Playfair Display', serif;
      --font-body: 'Inter', sans-serif;
      --shadow:    0 4px 24px rgba(0,0,0,.10), 0 1px 4px rgba(0,0,0,.06);
    }

    html, body, #root {
      height: 100%;
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-body);
      font-size: 15px;
      -webkit-font-smoothing: antialiased;
    }

    /* ── layout ── */
    .page {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      position: relative;
      overflow: hidden;
    }

    /* subtle geometric bg texture */
    .page::before, .page::after {
      content: '';
      position: fixed;
      border-radius: 50%;
      filter: blur(100px);
      pointer-events: none;
      z-index: 0;
    }
    .page::before {
      width: 500px; height: 500px;
      background: radial-gradient(circle, rgba(0,0,0,.05) 0%, transparent 70%);
      top: -160px; right: -160px;
    }
    .page::after {
      width: 400px; height: 400px;
      background: radial-gradient(circle, rgba(0,0,0,.04) 0%, transparent 70%);
      bottom: -120px; left: -120px;
    }

    /* ── card ── */
    .card {
      position: relative; z-index: 1;
      width: 100%; max-width: 520px;
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 24px;
      padding: 48px 44px;
      box-shadow: var(--shadow);
      animation: cardIn .4s cubic-bezier(.22,.68,0,1.2) both;
    }
    @keyframes cardIn {
      from { opacity:0; transform: translateY(24px) scale(.97); }
      to   { opacity:1; transform: translateY(0)    scale(1);   }
    }

    .card--wide { max-width: 680px; }

    /* ── brand ── */
    .brand {
      text-align: center;
      margin-bottom: 32px;
    }
    .brand__logo {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 6px;
    }
    .brand__icon {
      width: 40px; height: 40px;
      background: var(--accent);
      border-radius: 10px;
      display: flex; align-items: center; justify-content: center;
      font-size: 20px;
    }
    .brand__name {
      font-family: var(--font-head);
      font-size: 28px;
      font-weight: 900;
      letter-spacing: -.5px;
      color: var(--text);
    }
    .brand__name span { color: var(--accent2); }
    .brand__tagline {
      font-size: 11px;
      letter-spacing: 3px;
      text-transform: uppercase;
      color: var(--muted);
      margin-top: 4px;
    }

    /* ── welcome block ── */
    .welcome {
      text-align: center;
      margin-bottom: 36px;
    }
    .welcome__title {
      font-family: var(--font-head);
      font-size: 24px;
      font-weight: 700;
      line-height: 1.25;
      margin-bottom: 8px;
      color: var(--text);
    }
    .welcome__sub {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.6;
    }

    /* ── divider ── */
    .divider {
      display: flex; align-items: center; gap: 12px;
      margin: 28px 0;
    }
    .divider__line { flex: 1; height: 1px; background: var(--border); }
    .divider__text { color: var(--muted); font-size: 12px; letter-spacing: 1px; }

    /* ── form grid ── */
    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px 20px;
    }
    .form-grid .full { grid-column: 1 / -1; }

    /* ── field ── */
    .field { display: flex; flex-direction: column; gap: 6px; }
    .field__label {
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: .6px;
      text-transform: uppercase;
      color: var(--muted);
    }
    .field__wrap { position: relative; }
    .field__input {
      width: 100%;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius);
      padding: 12px 16px;
      color: var(--text);
      font-family: var(--font-body);
      font-size: 14px;
      outline: none;
      transition: border-color .15s, box-shadow .15s;
    }
    .field__input::placeholder { color: #bbb; }
    .field__input:focus {
      border-color: var(--accent);
      background: #fff;
      box-shadow: 0 0 0 3px rgba(0,0,0,.06);
    }
    .field__input--icon { padding-right: 44px; }
    .field__icon-btn {
      position: absolute; right: 12px; top: 50%;
      transform: translateY(-50%);
      background: none; border: none; cursor: pointer;
      color: var(--muted); font-size: 17px;
      display: flex; align-items: center; padding: 4px;
      transition: color .15s;
    }
    .field__icon-btn:hover { color: var(--accent); }

    /* select */
    .field__select {
      appearance: none;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23777' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 14px center;
      padding-right: 38px;
    }

    /* ── address group ── */
    .addr-section {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 18px;
      margin-top: 4px;
    }
    .addr-section__title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--accent2);
      margin-bottom: 14px;
    }

    /* ── radio pills ── */
    .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
    .pill { position: relative; }
    .pill input { position: absolute; opacity: 0; width: 0; height: 0; }
    .pill__label {
      display: flex; align-items: center; gap: 6px;
      padding: 8px 16px;
      border: 1.5px solid var(--border);
      border-radius: 40px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 500;
      color: var(--muted);
      transition: all .15s;
    }
    .pill input:checked + .pill__label {
      border-color: var(--accent);
      color: var(--accent);
      background: rgba(0,0,0,.04);
    }

    /* ── checkbox ── */
    .checkbox-row {
      display: flex; align-items: flex-start; gap: 10px;
      margin-top: 4px;
    }
    .checkbox-row input[type="checkbox"] {
      accent-color: var(--accent);
      width: 16px; height: 16px;
      margin-top: 2px; flex-shrink: 0; cursor: pointer;
    }
    .checkbox-row label {
      font-size: 13px; color: var(--muted); line-height: 1.5; cursor: pointer;
    }
    .checkbox-row label a { color: var(--accent); text-decoration: none; font-weight: 500; }
    .checkbox-row label a:hover { text-decoration: underline; }

    /* ── notice box ── */
    .notice {
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      padding: 11px 14px;
      font-size: 12.5px;
      color: var(--muted);
      display: flex; align-items: flex-start; gap: 8px;
      line-height: 1.5;
    }
    .notice__icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }

    /* ── buttons ── */
    .btn {
      width: 100%;
      padding: 13px 20px;
      border: none; border-radius: var(--radius);
      font-family: var(--font-body);
      font-size: 14.5px; font-weight: 600;
      cursor: pointer;
      transition: all .15s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
    }
    .btn--primary {
      background: var(--accent);
      color: #ffffff;
      letter-spacing: .2px;
    }
    .btn--primary:hover {
      background: #2a2a2a;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0,0,0,.18);
    }
    .btn--primary:active { transform: translateY(0); }
    .btn--outline {
      background: transparent;
      border: 1.5px solid var(--border);
      color: var(--text);
    }
    .btn--outline:hover {
      border-color: var(--accent);
      background: var(--surface);
    }
    .btn--success {
      background: #f0faf2;
      border: 1.5px solid #1a7a35;
      color: #1a7a35;
      cursor: default;
    }

    .section-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 0 14px;
      gap: 12px;
    }
    .section-head__left h2 {
      font-size: 24px;
      margin: 0;
      color: #111;
      font-weight: 700;
    }
    .section-head__left p {
      margin: 4px 0 0;
      color: #777;
      font-size: 14px;
    }

    .btn-add-prod {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 9px 20px;
      border-radius: 10px;
      font-family: var(--font);
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      border: none;
      transition: all .15s;
      background: #000;
      color: #fff;
    }
    .btn-add-prod:hover { background: #222; }

    .btn--dark {
      background: var(--accent);
      color: #fff;
    }
    .btn--dark:hover { background: #333; }
    .btn--ghost {
      background: transparent;
      border: 1px solid var(--line2);
      color: var(--ink2);
    }
    .btn--ghost:hover { border-color: #aaa; }

    /* ── links & footnotes ── */
    .form-foot {
      margin-top: 20px;
      text-align: center;
      font-size: 13.5px;
      color: var(--muted);
    }
    .form-foot a, .link-btn {
      color: var(--accent);
      text-decoration: none;
      background: none; border: none;
      cursor: pointer; font-size: inherit;
      font-family: inherit; font-weight: 600;
    }
    .link-btn:hover, .form-foot a:hover { text-decoration: underline; }

    .forgot-row {
      text-align: right;
      margin-top: -6px;
      margin-bottom: 10px;
    }

    /* ── success state ── */
    .success-box {
      text-align: center; padding: 16px 0;
    }
    .success-box__icon {
      font-size: 48px; margin-bottom: 12px;
      animation: popIn .4s cubic-bezier(.22,.68,0,1.4) both;
    }
    @keyframes popIn {
      from { transform: scale(0); opacity: 0; }
      to   { transform: scale(1); opacity: 1; }
    }
    .success-box__title {
      font-family: var(--font-head);
      font-size: 20px; font-weight: 700;
      margin-bottom: 6px;
      color: var(--text);
    }
    .success-box__text { color: var(--muted); font-size: 13.5px; line-height: 1.6; }

    /* ── field error ── */
    .field-error { font-size: 12px; color: var(--danger); margin-top: 2px; }

    /* ── dashboard / welcome page ── */
    .dash-page {
      min-height: 100vh;
      display: flex; flex-direction: column;
      align-items: center; justify-content: center;
      gap: 16px; text-align: center; padding: 40px;
      position: relative; z-index: 1;
    }
    .dash-page__heading {
      font-family: var(--font-head);
      font-size: 48px; font-weight: 900;
      letter-spacing: -1px; line-height: 1.1;
      color: var(--text);
    }
    .dash-page__heading span { color: var(--accent2); }
    .dash-page__sub { color: var(--muted); font-size: 15px; max-width: 340px; }
    .dash-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: #f0f0f0;
      border: 1px solid #ddd;
      border-radius: 40px; padding: 6px 16px;
      font-size: 13px; color: var(--accent2); font-weight: 500;
      margin-bottom: 8px;
    }

    /* ── scrollbar ── */
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: #ddd; border-radius: 3px; }

    /* ── SELLER DASHBOARD STYLES ── */
    .shell {
      display: flex;
      height: 100vh;
      overflow: hidden;
    }

    /* ── Sidebar ── */
    .sidebar {
      width: 220px;
      flex-shrink: 0;
      background: #111111;
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
      color: #cccccc;
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
      background: #2a2a2a;
      color: #ffffff;
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
      background: #f5f5f5;
    }

    /* ── Top bar ── */
    .topbar {
      height: 56px;
      background: #ffffff;
      border-bottom: 1px solid #e0e0e0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      flex-shrink: 0;
    }
    .topbar__title {
      font-size: 15px;
      font-weight: 600;
      color: #1a1a1a;
    }
    .topbar__right {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .topbar__badge {
      font-size: 12px;
      color: #6a6a6a;
      background: #f5f5f5;
      border: 1px solid #e0e0e0;
      border-radius: 20px;
      padding: 4px 12px;
    }

    /* ── Content area ── */
    .content {
      flex: 1;
      overflow-y: auto;
      padding: 28px;
    }

    /* ── Toolbar ── */
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
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #ffffff;
      font-family: var(--font-body);
      font-size: 13px;
      color: #1a1a1a;
      outline: none;
      transition: border-color .15s;
    }
    .search-box input:focus { border-color: #aaa; }
    .search-box input::placeholder { color: #bbb; }

    .filter-select {
      padding: 8px 12px;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      background: #ffffff;
      font-family: var(--font-body);
      font-size: 13px;
      color: #3a3a3a;
      outline: none;
      cursor: pointer;
    }

    /* ── Table wrapper ── */
    .table-wrap {
      background: #ffffff;
      border: 1px solid #e0e0e0;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.06);
    }
    @media (max-width: 768px) {
      .table-wrap {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
    }

    .tbl {
      width: 100%;
      border-collapse: collapse;
    }
    .tbl thead tr {
      border-bottom: 1px solid #e0e0e0;
      background: #fafafa;
    }
    .tbl th {
      padding: 11px 14px;
      font-size: 11.5px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: .7px;
      color: #6a6a6a;
      text-align: left;
      white-space: nowrap;
    }
    .tbl td {
      padding: 12px 14px;
      font-size: 13.5px;
      color: #3a3a3a;
      vertical-align: middle;
      border-bottom: 1px solid #e0e0e0;
    }
    .tbl tbody tr:last-child td { border-bottom: none; }
    .tbl tbody tr:hover td { background: #f9f9f9; }

    /* ── Product cells ── */
    .prod-img {
      width: 44px; height: 44px;
      border-radius: 6px;
      object-fit: cover;
      border: 1px solid #e0e0e0;
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
      color: #0a0a0a;
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
    .tag--green  { background: #f0faf2;  color: #1a6b30; }
    .tag--red    { background: #fff0f0;    color: #b02020;   }
    .tag--blue   { background: #f0f4ff;   color: #1a3acc;  }
    .tag--amber  { background: #fffbf0;  color: #8a5a00; }
    .tag--gray   { background: #f4f4f4;   color: #555555;  }
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
      color: #3a3a3a;
      white-space: nowrap;
    }
    .var-chip__name {
      font-weight: 500;
      color: #0a0a0a;
    }
    .var-chip__price {
      color: #6a6a6a;
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
      color: #6a6a6a;
    }
    .order-num {
      font-weight: 600;
      color: #0a0a0a;
    }

    /* ── Address cell ── */
    .addr-cell {
      font-size: 12.5px;
      line-height: 1.5;
      color: #3a3a3a;
      max-width: 180px;
    }

    /* ── Empty state ── */
    .empty-state {
      text-align: center;
      padding: 60px 20px;
      color: #6a6a6a;
    }
    .empty-state__icon { font-size: 36px; margin-bottom: 10px; }
    .empty-state__text { font-size: 14px; }

    /* ── Pagination row ── */
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      border-top: 1px solid #e0e0e0;
      font-size: 13px;
      color: #6a6a6a;
      background: #fafafa;
    }
    .pagination__pages {
      display: flex;
      gap: 4px;
    }
    .page-btn {
      padding: 4px 10px;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      background: #ffffff;
      font-size: 12.5px;
      cursor: pointer;
      color: #3a3a3a;
      transition: all .12s;
    }
    .page-btn:hover, .page-btn--active {
      background: #0a0a0a;
      color: #fff;
      border-color: #0a0a0a;
    }

    /* ============================================================
       HOME SCREEN STYLES (from reference HomeScreen.jsx)
       ============================================================ */
    .navbar {
      position: sticky;
      top: 0; z-index: 100;
      height: var(--nav-h);
      background: var(--card);
      border-bottom: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 28px;
      gap: 20px;
    }
    .nav-logo {
      display: flex;
      align-items: center;
      gap: 9px;
      flex-shrink: 0;
      text-decoration: none;
    }
    .nav-logo__icon { width: 36px; height: 36px; background: var(--accent); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 18px; flex-shrink: 0; }
    .nav-logo__name { font-family: var(--font-head); font-size: 22px; font-weight: 900; letter-spacing: -.4px; color: var(--text); white-space: nowrap; }
    .nav-logo__name span { color: var(--accent2); }
    .nav-search { flex: 1; max-width: 560px; display: flex; align-items: center; background: var(--surface); border: 1.5px solid var(--border); border-radius: 10px; overflow: hidden; transition: border-color .15s, box-shadow .15s; }
    .nav-search:focus-within { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(0,0,0,.06); background: #fff; }
    .nav-search__icon { padding: 0 12px; color: var(--muted); display: flex; align-items: center; flex-shrink: 0; }
    .nav-search__input { flex: 1; border: none; background: transparent; padding: 11px 0; font-family: var(--font-body); font-size: 14px; color: var(--text); outline: none; }
    .nav-search__input::placeholder { color: var(--muted2); }
    .nav-search__btn { background: var(--accent); color: #fff; border: none; padding: 0 20px; height: 44px; font-size: 13px; font-weight: 600; letter-spacing: .2px; transition: background .15s; white-space: nowrap; }
    .nav-search__btn:hover { background: #2a2a2a; }

    .home-search-wrapper {
      max-width: 1320px;
      margin: 0 auto;
      padding: 16px 28px 0;
    }
    .home-search-wrapper .nav-search {
      width: 100%;
      max-width: 100%;
      display: flex;
      align-items: center;
    }

    .nav-actions { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
    .nav-btn { display: flex; flex-direction: column; align-items: center; gap: 2px; background: none; border: none; padding: 6px 10px; border-radius: 8px; color: var(--text); transition: background .12s; }
    .nav-btn:hover { background: var(--surface); }
    .nav-btn__icon { position: relative; display: flex; align-items: center; justify-content: center; }
    .nav-btn__label { font-size: 10.5px; font-weight: 500; color: var(--muted); white-space: nowrap; }
    .nav-badge { position: absolute; top: -5px; right: -7px; background: var(--accent); color: #fff; font-size: 9.5px; font-weight: 700; width: 17px; height: 17px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
    .nav-profile { display: flex; align-items: center; gap: 8px; background: none; border: 1.5px solid var(--border); border-radius: 10px; padding: 6px 12px 6px 8px; color: var(--text); transition: border-color .15s, background .12s; }
    .nav-profile:hover { border-color: var(--accent); background: var(--surface); }
    .nav-profile__avatar { width: 28px; height: 28px; border-radius: 50%; background: var(--accent); color: #fff; font-size: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
    .nav-profile__name { font-size: 13px; font-weight: 500; max-width: 90px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

    /* Mobile navbar adjustments */
    @media (max-width: 768px) {
      .navbar {
        padding: 0 16px;
        gap: 12px;
      }
      .nav-logo__name {
        font-size: 18px;
      }
      .nav-search {
        max-width: none;
        flex: 1;
      }
      .nav-actions {
        gap: 4px;
        margin-left: 8px;
      }
      .nav-btn {
        padding: 6px 8px;
      }
      .nav-btn__label {
        font-size: 9px;
      }
      .nav-profile {
        padding: 6px 8px;
        gap: 6px;
      }
      .nav-profile__avatar {
        width: 24px;
        height: 24px;
        font-size: 10px;
      }
      .nav-profile__name {
        font-size: 12px;
        max-width: 60px;
      }
    }

    .cat-bar {
      position: sticky;
      top: var(--nav-h);
      z-index: 90;
      background: var(--card);
      border-bottom: 1px solid var(--border);
      height: var(--cat-h);
      display: flex;
      align-items: center;
      padding: 0 28px;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
    }
    .cat-bar::-webkit-scrollbar { display: none; }
    .cat-tab { display: flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 20px; border: none; background: transparent; font-family: var(--font-body); font-size: 13px; font-weight: 500; color: var(--muted); white-space: nowrap; transition: all .15s; flex-shrink: 0; }
    .cat-tab:hover { background: var(--surface); color: var(--text); }
    .cat-tab--active { background: var(--accent); color: #fff; }
    .cat-tab--active:hover { background: #2a2a2a; color: #fff; }
    .cat-tab__emoji { font-size: 15px; }

    .home-shell { max-width: 1320px; margin: 0 auto; padding: 0 28px; }

    .hero { margin: 24px 0; border-radius: var(--radius-lg); background: var(--accent); color: #fff; padding: 44px 52px; display: flex; align-items: center; justify-content: space-between; overflow: hidden; position: relative; }
    .hero::before { content: ''; position: absolute; width: 360px; height: 360px; border-radius: 50%; background: rgba(255,255,255,.04); right: -80px; top: -80px; }
    .hero::after { content: ''; position: absolute; width: 240px; height: 240px; border-radius: 50%; background: rgba(255,255,255,.04); right: 100px; bottom: -100px; }
    .hero__left { position: relative; z-index: 1; }
    .hero__eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 2.5px; text-transform: uppercase; opacity: .6; margin-bottom: 10px; }
    .hero__title { font-family: var(--font-head); font-size: 40px; font-weight: 900; line-height: 1.15; margin-bottom: 14px; letter-spacing: -.5px; }
    .hero__sub { font-size: 14.5px; opacity: .75; max-width: 380px; line-height: 1.6; margin-bottom: 24px; }
    .hero__cta { display: inline-flex; align-items: center; gap: 8px; background: #fff; color: var(--accent); border: none; border-radius: 10px; padding: 12px 24px; font-size: 14px; font-weight: 700; transition: transform .15s, box-shadow .15s; }
    .hero__cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(0,0,0,.25); }
    .hero__right { font-size: 110px; position: relative; z-index: 1; user-select: none; filter: drop-shadow(0 8px 20px rgba(0,0,0,.25)); }

    .section-head { display: flex; align-items: baseline; justify-content: space-between; margin-bottom: 16px; }
    .section-head__title { font-family: var(--font-head); font-size: 22px; font-weight: 700; letter-spacing: -.3px; }
    .section-head__link { font-size: 13px; font-weight: 500; color: var(--accent2); background: none; border: none; display: flex; align-items: center; gap: 4px; transition: color .12s; }
    .section-head__link:hover { color: var(--accent); }

    .filter-bar { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; flex-wrap: wrap; }
    .filter-chip { display: flex; align-items: center; gap: 5px; padding: 6px 14px; border: 1.5px solid var(--border); border-radius: 20px; background: var(--card); font-size: 12.5px; font-weight: 500; color: var(--text); transition: all .12s; }
    .filter-chip:hover, .filter-chip--active { border-color: var(--accent); background: var(--accent); color: #fff; }
    .filter-spacer { flex: 1; }
    .sort-select { padding: 7px 14px; border: 1.5px solid var(--border); border-radius: 8px; background: var(--card); font-family: var(--font-body); font-size: 13px; color: var(--text); outline: none; cursor: pointer; }
    .sort-select:focus { border-color: var(--accent); }

    .product-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; margin-bottom: 48px; }

    @media (max-width: 768px) {
      .product-grid { grid-template-columns: 1fr; }
    }

    .p-card { background: var(--card); border: 1px solid var(--border); border-radius: var(--radius-lg); overflow: hidden; display: flex; flex-direction: column; transition: transform .18s, box-shadow .18s, border-color .18s; animation: fadeUp .35s both; }
    .p-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--border2); }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
    .p-card:nth-child(1) { animation-delay: .04s; }
    .p-card:nth-child(2) { animation-delay: .08s; }
    .p-card:nth-child(3) { animation-delay: .12s; }
    .p-card:nth-child(4) { animation-delay: .16s; }
    .p-card:nth-child(5) { animation-delay: .20s; }
    .p-card:nth-child(6) { animation-delay: .24s; }
    .p-card:nth-child(7) { animation-delay: .28s; }
    .p-card:nth-child(8) { animation-delay: .32s; }
    .p-card:nth-child(9) { animation-delay: .36s; }
    .p-card:nth-child(10) { animation-delay: .40s; }
    .p-card:nth-child(11) { animation-delay: .44s; }
    .p-card:nth-child(12) { animation-delay: .48s; }
    .p-card__img-wrap { position: relative; background: var(--surface); height: 190px; display: flex; align-items: center; justify-content: center; font-size: 68px; overflow: hidden; }
    .p-card__img { width: 100%; height: 100%; object-fit: contain; object-position: center; display: block; }
    .p-card__img-placeholder { display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; }
    .p-card__badge { position: absolute; top: 10px; left: 10px; background: var(--accent); color: #fff; font-size: 10.5px; font-weight: 700; padding: 3px 8px; border-radius: 5px; letter-spacing: .3px; }
    .p-card__badge--sale { background: #cc3333; }
    .p-card__badge--new { background: #1a5fd4; }
    .p-card__badge--hot { background: #b36a00; }
    .p-card__wishlist { position: absolute; top: 10px; right: 10px; width: 30px; height: 30px; border-radius: 50%; border: 1px solid var(--border); background: var(--card); display: flex; align-items: center; justify-content: center; font-size: 14px; transition: all .15s; opacity: 0; }
    .p-card:hover .p-card__wishlist { opacity: 1; }
    .p-card__wishlist:hover { background: var(--accent); border-color: var(--accent); }
    .p-card__wishlist--active { opacity: 1 !important; color: #cc3333; }
    .p-card__body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; gap: 6px; }
    .p-card__category { font-size: 11px; font-weight: 600; letter-spacing: .8px; text-transform: uppercase; color: var(--muted); }
    .p-card__name { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.35; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .p-card__rating { display: flex; align-items: center; gap: 5px; }
    .p-card__stars { font-size: 12px; letter-spacing: 1px; }
    .p-card__rating-count { font-size: 11.5px; color: var(--muted); }
    .p-card__price-row { display: flex; align-items: baseline; gap: 7px; margin-top: 2px; }
    .p-card__price { font-size: 17px; font-weight: 700; color: var(--text); letter-spacing: -.3px; }
    .p-card__price-orig { font-size: 12.5px; color: var(--muted2); text-decoration: line-through; }
    .p-card__discount { font-size: 11.5px; font-weight: 600; color: var(--success); }
    .p-card__stock { font-size: 11.5px; color: var(--warn); font-weight: 500; }
    .p-card__stock--good { color: var(--success); }
    .p-card__stock--out { color: var(--danger); }
    .p-card__footer,
    .p-card__actions { padding: 12px 16px; border-top: 1px solid var(--border); display: flex; gap: 8px; flex-wrap: wrap; }
    .p-card__btn { flex: 1; min-width: 120px; padding: 9px 0; border-radius: 8px; font-size: 12.5px; font-weight: 600; border: none; transition: all .15s; display: flex; align-items: center; justify-content: center; gap: 5px; }
    .p-card__btn--cart { background: var(--accent); color: #fff; }
    .p-card__btn--cart:hover { background: #2a2a2a; }
    .p-card__btn--cart:active { transform: scale(.97); }
    .p-card__btn--view { background: var(--surface); color: var(--text); border: 1px solid var(--border); }
    .p-card__btn--view:hover { border-color: var(--accent2); }
    .p-card__btn--disabled { background: var(--surface); color: var(--muted2); cursor: not-allowed; }
    .p-card { cursor: pointer; }
    .p-card__btn { cursor: pointer; }
    .p-card__btn:disabled { cursor: not-allowed; }

    .cart-toast { position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%) translateY(80px); background: var(--accent); color: #fff; padding: 12px 22px; border-radius: 40px; font-size: 13.5px; font-weight: 500; box-shadow: 0 8px 28px rgba(0,0,0,.25); z-index: 999; white-space: nowrap; display: flex; align-items: center; gap: 8px; transition: transform .3s cubic-bezier(.22,.68,0,1.2), opacity .3s; opacity: 0; pointer-events: none; }
    .cart-toast--visible { transform: translateX(-50%) translateY(0); opacity: 1; }

    .cart-overlay { position: fixed; inset: 0; background: rgba(0,0,0,.35); z-index: 200; opacity: 0; pointer-events: none; transition: opacity .28s ease; }
    .cart-overlay--open { opacity: 1; pointer-events: all; }

    .cart-drawer { position: fixed; top: 0; right: 0; width: 400px; max-width: 100vw; height: 100vh; background: var(--card); border-left: 1px solid var(--border); box-shadow: -8px 0 40px rgba(0,0,0,.14); z-index: 201; display: flex; flex-direction: column; transform: translateX(100%); transition: transform .3s cubic-bezier(.4,0,.2,1); }
    .cart-drawer--open { transform: translateX(0); }
    .cart-drawer__head { display: flex; align-items: center; justify-content: space-between; padding: 20px 22px; border-bottom: 1px solid var(--border); flex-shrink: 0; }
    .cart-drawer__title { font-size: 16px; font-weight: 700; color: var(--text); display: flex; align-items: center; gap: 8px; }
    .cart-drawer__count { background: var(--accent); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 7px; border-radius: 20px; }
    .cart-drawer__close { width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: transparent; display: flex; align-items: center; justify-content: center; color: var(--muted); font-size: 18px; transition: all .15s; }
    .cart-drawer__close:hover { border-color: var(--accent); color: var(--accent); background: var(--surface); }

    .cart-empty { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 40px; text-align: center; }
    .cart-empty__icon { font-size: 52px; opacity: .35; }
    .cart-empty__title { font-size: 15px; font-weight: 600; color: var(--text); }
    .cart-empty__sub { font-size: 13px; color: var(--muted); line-height: 1.6; }

    .cart-items { flex: 1; overflow-y: auto; padding: 8px 0; }

    .cart-item { display: flex; align-items: flex-start; gap: 14px; padding: 14px 22px; border-bottom: 1px solid var(--border); transition: background .12s; }
    .cart-item:last-child { border-bottom: none; }
    .cart-item:hover { background: var(--surface); }
    .cart-item__img { width: 60px; height: 60px; border-radius: 10px; background: var(--surface); border: 1px solid var(--border); display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
    .cart-item__info { flex: 1; min-width: 0; }
    .cart-item__name { font-size: 13.5px; font-weight: 600; color: var(--text); line-height: 1.35; margin-bottom: 3px; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
    .cart-item__cat { font-size: 11px; color: var(--muted); text-transform: uppercase; letter-spacing: .5px; margin-bottom: 8px; }
    .cart-item__bottom { display: flex; align-items: center; justify-content: space-between; }
    .cart-item__price { font-size: 15px; font-weight: 700; color: var(--text); }
    .qty-stepper { display: flex; align-items: center; border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
    .qty-btn { width: 28px; height: 28px; border: none; background: var(--surface); color: var(--text); font-size: 16px; font-weight: 500; display: flex; align-items: center; justify-content: center; transition: background .12s; }
    .qty-btn:hover { background: var(--border2); }
    .qty-btn:disabled { color: var(--muted2); cursor: not-allowed; }
    .qty-val { width: 32px; height: 28px; text-align: center; font-size: 13px; font-weight: 600; color: var(--text); border-left: 1px solid var(--border); border-right: 1px solid var(--border); display: flex; align-items: center; justify-content: center; }
    .cart-item__remove { background: none; border: none; color: var(--muted2); font-size: 13px; padding: 4px 6px; border-radius: 5px; transition: color .12s, background .12s; }
    .cart-item__remove:hover { color: var(--danger); background: #fff0f0; }

    .cart-summary { border-top: 1px solid var(--border); padding: 18px 22px; flex-shrink: 0; }
    .cart-summary__row { display: flex; justify-content: space-between; font-size: 13.5px; color: var(--muted); margin-bottom: 7px; }
    .cart-summary__row--total { font-size: 16px; font-weight: 700; color: var(--text); border-top: 1px dashed var(--border); padding-top: 10px; margin-top: 6px; margin-bottom: 16px; }
    .cart-summary__row--total span:last-child { font-size: 18px; }
    .cart-checkout-btn { width: 100%; padding: 13px; background: var(--accent); color: #fff; border: none; border-radius: 10px; font-size: 14.5px; font-weight: 700; transition: background .15s, transform .12s; display: flex; align-items: center; justify-content: center; gap: 8px; }
    .cart-checkout-btn:hover { background: #2a2a2a; transform: translateY(-1px); }
    .cart-clear-btn { width: 100%; margin-top: 10px; padding: 9px; background: transparent; border: 1.5px solid var(--border); border-radius: 10px; font-size: 13px; font-weight: 500; color: var(--muted); transition: all .15s; }
    .cart-clear-btn:hover { border-color: var(--danger); color: var(--danger); }

    .footer { background: var(--accent); color: rgba(255,255,255,.85); padding: 52px 0 0; margin-top: 24px; }
    .footer-inner { max-width: 1320px; margin: 0 auto; padding: 0 28px; display: grid; grid-template-columns: 2fr 1fr 1fr 1fr 1fr; gap: 40px; }
    .footer-brand__logo { display: flex; align-items: center; gap: 9px; margin-bottom: 14px; }
    .footer-brand__icon { width: 34px; height: 34px; background: rgba(255,255,255,.15); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 17px; }
    .footer-brand__name { font-family: var(--font-head); font-size: 20px; font-weight: 900; color: #fff; }
    .footer-brand__desc { font-size: 13px; line-height: 1.7; color: rgba(255,255,255,.55); margin-bottom: 20px; max-width: 280px; }
    .footer-social { display: flex; gap: 8px; }
    .footer-social__btn { width: 34px; height: 34px; border-radius: 8px; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.12); display: flex; align-items: center; justify-content: center; font-size: 15px; transition: background .15s; }
    .footer-social__btn:hover { background: rgba(255,255,255,.2); }
    .footer-col__title { font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: rgba(255,255,255,.4); margin-bottom: 14px; }
    .footer-col__list { display: flex; flex-direction: column; gap: 9px; }
    .footer-col__link { font-size: 13.5px; color: rgba(255,255,255,.7); background: none; border: none; text-align: left; padding: 0; transition: color .12s; cursor: pointer; }
    .footer-col__link:hover { color: #fff; }
    .footer-bottom { margin-top: 44px; border-top: 1px solid rgba(255,255,255,.1); padding: 18px 28px; max-width: 1320px; margin-left: auto; margin-right: auto; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
    .footer-bottom__copy { font-size: 12.5px; color: rgba(255,255,255,.4); }
    .footer-bottom__payments { display: flex; align-items: center; gap: 6px; }
    .pay-chip { background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.12); border-radius: 5px; padding: 4px 10px; font-size: 11px; font-weight: 600; color: rgba(255,255,255,.6); }
    .footer-wrap { background: var(--accent); }

    /* ── responsive ── */
    @media (max-width: 900px) {
      .footer-inner { grid-template-columns: 1fr 1fr; }
      .footer-brand { grid-column: 1 / -1; }
      .hero__right { display: none; }
      .hero { padding: 36px; }
      .hero__title { font-size: 30px; }
    }
    @media (max-width: 600px) {
      .navbar { padding: 0 16px; gap: 12px; }
      .home-shell { padding: 0 16px; }
      .cat-bar { padding: 0 16px; }
      .footer-inner { padding: 0 16px; grid-template-columns: 1fr 1fr; gap: 28px; }
      .footer-bottom { padding: 16px 16px; }
      .product-grid { grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); gap: 14px; }
      .nav-logo__name { font-size: 18px; }
    }
    @media (max-width: 480px) {
      .product-grid { grid-template-columns: 1fr; }
      .checkout-layout { grid-template-columns: 1fr !important; }
      .checkout-summary { position: static !important; top: auto !important; }
    }
    @media (max-width: 580px) {
      .card { padding: 32px 24px; }
      .form-grid { grid-template-columns: 1fr; }
      .form-grid .full { grid-column: 1; }
      .sidebar { width: 180px; }
      .topbar { padding: 0 16px; }
      .content { padding: 16px; }
    }

    /* ============================================================
       PRODUCT DETAIL PAGE STYLES
       ============================================================ */
    /* ── Page shell ── */
    .pdp {
      min-height: 100vh;
      background: var(--bg);
      font-family: var(--font-body);
    }

    /* ── Sticky top navbar (reused layout) ── */
    .pdp-nav {
      position: sticky;
      top: 0; z-index: 100;
      height: 64px;
      background: var(--card);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 1px 3px rgba(0,0,0,.06);
      display: flex;
      align-items: center;
      padding: 0 36px;
      gap: 16px;
    }
    .pdp-nav__back {
      display: flex;
      align-items: center;
      gap: 8px;
      background: none;
      border: 1.5px solid var(--border);
      border-radius: 9px;
      padding: 7px 14px;
      font-size: 13px;
      font-weight: 500;
      color: var(--text);
      cursor: pointer;
      transition: all .15s;
    }
    .pdp-nav__back:hover {
      border-color: var(--accent);
      background: var(--surface);
    }
    .pdp-nav__crumb {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 13px;
      color: var(--muted);
    }
    .pdp-nav__crumb span { color: var(--text); font-weight: 500; }
    .pdp-nav__crumb-sep { color: var(--border2); }
    .pdp-nav__logo {
      margin-left: auto;
      display: flex;
      align-items: center;
      gap: 8px;
      font-family: var(--font-head);
      font-size: 20px;
      font-weight: 900;
      color: var(--text);
    }
    .pdp-nav__logo-icon {
      width: 32px; height: 32px;
      background: var(--accent);
      border-radius: 7px;
      display: flex; align-items: center; justify-content: center;
      font-size: 16px;
    }

    /* ── Main layout ── */
    .pdp-body {
      max-width: 1200px;
      margin: 0 auto;
      padding: 36px 36px 60px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 56px;
      align-items: start;
    }

    /* ============================================================
       LEFT — Image gallery
       ============================================================ */
    .pdp-gallery {
      position: sticky;
      top: 88px;
      display: flex;
      justify-content: center;
    }
    .pdp-main-img {
      width: 540px;
      max-width: 540px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      height: 420px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 140px;
      position: relative;
      overflow: hidden;
      margin-bottom: 14px;
      transition: background .2s;
    }
    .pdp-main-img__content,
    .pdp-main-img__fallback {
      width: 100%;
      height: 100%;
    }
    .pdp-main-img__content {
      object-fit: contain;
      object-position: center;
      display: block;
    }
    .pdp-main-img:hover { background: #e8e8e8; }
    .pdp-img-badge {
      position: absolute;
      top: 16px; left: 16px;
      padding: 4px 10px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .4px;
    }
    .pdp-img-badge--hot  { background: #b36a00; color: #fff; }
    .pdp-img-badge--sale { background: #cc3333; color: #fff; }
    .pdp-img-badge--new  { background: #1a5fd4; color: #fff; }
    .pdp-wish-btn {
      position: absolute;
      top: 16px; right: 16px;
      width: 40px; height: 40px;
      border-radius: 50%;
      border: 1.5px solid var(--border);
      background: var(--card);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      cursor: pointer;
      transition: all .15s;
      box-shadow: 0 2px 8px rgba(0,0,0,.08);
    }
    .pdp-wish-btn:hover { border-color: #cc3333; transform: scale(1.08); }
    .pdp-wish-btn--active { border-color: #cc3333; background: #fff0f0; }

    /* Thumbnail strip */
    .pdp-thumbs {
      display: flex;
      gap: 10px;
    }
    .pdp-thumb {
      flex: 1;
      height: 80px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      cursor: pointer;
      transition: all .15s;
      opacity: .6;
    }
    .pdp-thumb:hover { opacity: 1; border-color: var(--border2); }
    .pdp-thumb--active { border-color: var(--accent); opacity: 1; background: var(--card); }

    @media (max-width: 768px) {
      .pdp-nav {
        padding: 0 18px;
      }
      .pdp-body {
        padding: 24px 18px 42px;
        grid-template-columns: 1fr;
        gap: 28px;
      }
      .pdp-gallery {
        position: static;
        top: auto;
        display: flex;
        flex-direction: column;
        align-items: stretch;
      }
      .pdp-main-img {
        width: 100%;
        max-width: 100%;
        height: auto;
        min-height: 320px;
      }
      .pdp-main-img__content,
      .pdp-main-img__fallback {
        height: 100%;
      }
      .pdp-thumbs {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .pdp-thumb {
        flex: 1 1 calc(50% - 10px);
        min-width: calc(50% - 10px);
        height: 82px;
      }
      .pdp-wish-btn {
        top: 14px;
        right: 14px;
      }
    }

    /* ============================================================
       RIGHT — Product info
       ============================================================ */
    .pdp-info { display: flex; flex-direction: column; gap: 0; }

    /* Brand / seller */
    .pdp-seller {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 11.5px;
      font-weight: 600;
      letter-spacing: .8px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 10px;
    }
    .pdp-seller__dot {
      width: 6px; height: 6px;
      border-radius: 50%;
      background: var(--success);
    }

    /* Title */
    .pdp-title {
      font-family: var(--font-head);
      font-size: 30px;
      font-weight: 900;
      line-height: 1.2;
      letter-spacing: -.4px;
      color: var(--text);
      margin-bottom: 14px;
    }

    /* Rating row */
    .pdp-rating {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .pdp-stars {
      font-size: 16px;
      letter-spacing: 2px;
      color: #d4a800;
    }
    .pdp-rating__score {
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
    }
    .pdp-rating__count {
      font-size: 13px;
      color: var(--muted);
    }
    .pdp-rating__divider {
      color: var(--border2);
    }
    .pdp-rating__sold {
      font-size: 13px;
      color: var(--muted);
    }

    /* Divider line */
    .pdp-divider {
      height: 1px;
      background: var(--border);
      margin: 20px 0;
    }

    /* Price block */
    .pdp-price-block { margin-bottom: 20px; }
    .pdp-price-row {
      display: flex;
      align-items: baseline;
      gap: 12px;
      margin-bottom: 6px;
    }
    .pdp-price {
      font-size: 36px;
      font-weight: 800;
      color: var(--text);
      letter-spacing: -1px;
      line-height: 1;
    }
    .pdp-price-orig {
      font-size: 18px;
      color: var(--muted2);
      text-decoration: line-through;
    }
    .pdp-discount-pill {
      background: #edfbf0;
      color: var(--success);
      font-size: 13px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 20px;
    }
    .pdp-price-note {
      font-size: 12.5px;
      color: var(--muted);
    }
    .pdp-price-note strong { color: var(--success); }

    /* Offer chips */
    .pdp-offers {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px 16px;
      margin-bottom: 20px;
    }
    .pdp-offers__title {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 4px;
    }
    .pdp-offer-row {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 13px;
      color: var(--ink2);
      line-height: 1.5;
    }
    .pdp-offer-row__icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }
    .pdp-offer-row strong { color: var(--text); font-weight: 600; }

    /* Variation selector */
    .pdp-section-label {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: .8px;
      text-transform: uppercase;
      color: var(--muted);
      margin-bottom: 10px;
    }
    .pdp-variations {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }
    .pdp-var-btn {
      padding: 8px 18px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      background: var(--card);
      font-family: var(--font-body);
      font-size: 13.5px;
      font-weight: 500;
      color: var(--text);
      cursor: pointer;
      transition: all .15s;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .pdp-var-btn:hover { border-color: var(--accent2); }
    .pdp-var-btn--active {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
    }
    .pdp-var-btn__price {
      font-size: 11.5px;
      font-weight: 600;
      opacity: .8;
    }

    /* Quantity picker */
    .pdp-qty-row {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 22px;
    }
    .pdp-qty-stepper {
      display: flex;
      align-items: center;
      border: 1.5px solid var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .pdp-qty-btn {
      width: 40px; height: 40px;
      border: none;
      background: var(--surface);
      font-size: 20px;
      font-weight: 400;
      color: var(--text);
      cursor: pointer;
      display: flex; align-items: center; justify-content: center;
      transition: background .12s;
    }
    .pdp-qty-btn:hover { background: var(--border); }
    .pdp-qty-btn:disabled { color: var(--muted2); cursor: not-allowed; }
    .pdp-qty-val {
      width: 52px; height: 40px;
      display: flex; align-items: center; justify-content: center;
      font-size: 15px;
      font-weight: 700;
      color: var(--text);
      border-left: 1.5px solid var(--border);
      border-right: 1.5px solid var(--border);
    }
    .pdp-qty-label { font-size: 13px; color: var(--muted); }

    /* CTA buttons */
    .pdp-cta-row {
      display: flex;
      gap: 12px;
      margin-bottom: 24px;
    }
    .pdp-btn {
      flex: 1;
      padding: 14px 20px;
      border-radius: 12px;
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: all .15s;
      display: flex; align-items: center; justify-content: center; gap: 8px;
      border: none;
    }
    .pdp-btn--cart {
      background: var(--surface);
      border: 1.5px solid var(--border);
      color: var(--text);
    }
    .pdp-btn--cart:hover {
      border-color: var(--accent);
      background: var(--accent);
      color: #fff;
    }
    .pdp-btn--buy {
      background: var(--accent);
      color: #fff;
    }
    .pdp-btn--buy:hover {
      background: #2a2a2a;
      transform: translateY(-1px);
      box-shadow: 0 6px 20px rgba(0,0,0,.16);
    }
    .pdp-btn--disabled {
      background: var(--surface);
      color: var(--muted2);
      cursor: not-allowed;
      border: 1.5px solid var(--border);
    }

    /* Delivery info */
    .pdp-delivery {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 20px;
    }
    .pdp-delivery__row {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      font-size: 13.5px;
      color: var(--text);
    }
    .pdp-delivery__icon { font-size: 18px; flex-shrink: 0; }
    .pdp-delivery__label { font-weight: 600; display: block; margin-bottom: 2px; }
    .pdp-delivery__sub { font-size: 12px; color: var(--muted); }

    /* Stock status */
    .pdp-stock {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 13.5px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    .pdp-stock__dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }
    .pdp-stock--good .pdp-stock__dot { background: var(--success); }
    .pdp-stock--good { color: var(--success); }
    .pdp-stock--low  .pdp-stock__dot { background: #d4a800; }
    .pdp-stock--low  { color: #8a5a00; }
    .pdp-stock--out  .pdp-stock__dot { background: var(--danger); }
    .pdp-stock--out  { color: var(--danger); }

    /* ============================================================
       BOTTOM SECTION — Tabs (Description, Specs, Reviews)
       ============================================================ */
    .pdp-tabs-section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 36px 60px;
    }
    .pdp-tabs {
      display: flex;
      border-bottom: 2px solid var(--border);
      margin-bottom: 32px;
      gap: 0;
    }
    .pdp-tab {
      padding: 12px 24px;
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      cursor: pointer;
      position: relative;
      transition: color .15s;
    }
    .pdp-tab::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform .2s;
    }
    .pdp-tab--active { color: var(--accent); font-weight: 600; }
    .pdp-tab--active::after { transform: scaleX(1); }
    .pdp-tab:hover { color: var(--text); }

    /* Description tab */
    .pdp-desc {
      max-width: 720px;
    }
    .pdp-desc__lead {
      font-size: 16px;
      line-height: 1.75;
      color: var(--text);
      margin-bottom: 24px;
    }
    .pdp-desc__heading {
      font-family: var(--font-head);
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 12px;
      color: var(--text);
    }
    .pdp-desc__list {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 28px;
    }
    .pdp-desc__list li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 14px;
      color: var(--ink2, #3a3a3a);
      line-height: 1.5;
    }
    .pdp-desc__list li::before {
      content: '✓';
      font-weight: 700;
      color: var(--success);
      flex-shrink: 0;
      margin-top: 1px;
    }

    /* Specs tab */
    .pdp-specs-table {
      width: 100%;
      max-width: 680px;
      border-collapse: collapse;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid var(--border);
    }
    .pdp-specs-table tr:nth-child(even) td { background: var(--surface); }
    .pdp-specs-table td {
      padding: 12px 18px;
      font-size: 13.5px;
      border-bottom: 1px solid var(--border);
    }
    .pdp-specs-table tr:last-child td { border-bottom: none; }
    .pdp-specs-table td:first-child {
      font-weight: 600;
      color: var(--muted);
      width: 220px;
      white-space: nowrap;
    }
    .pdp-specs-table td:last-child { color: var(--text); }

    /* Reviews tab */
    .pdp-reviews {
      display: flex;
      flex-direction: column;
      gap: 20px;
      max-width: 720px;
    }
    .pdp-review-summary {
      display: flex;
      align-items: center;
      gap: 32px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 8px;
    }
    .pdp-review-summary__score {
      text-align: center;
      flex-shrink: 0;
    }
    .pdp-review-summary__num {
      font-family: var(--font-head);
      font-size: 52px;
      font-weight: 900;
      line-height: 1;
      color: var(--text);
    }
    .pdp-review-summary__stars { font-size: 18px; letter-spacing: 2px; color: #d4a800; margin: 4px 0; }
    .pdp-review-summary__count { font-size: 12px; color: var(--muted); }
    .pdp-rating-bars {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pdp-bar-row {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12.5px;
      color: var(--muted);
    }
    .pdp-bar-row__label { width: 24px; text-align: right; flex-shrink: 0; }
    .pdp-bar-track {
      flex: 1;
      height: 7px;
      background: var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .pdp-bar-fill {
      height: 100%;
      background: #d4a800;
      border-radius: 10px;
    }
    .pdp-bar-row__pct { width: 32px; flex-shrink: 0; color: var(--text); font-weight: 500; }

    .pdp-review-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px 22px;
    }
    .pdp-review-card__head {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .pdp-review-card__avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: var(--accent);
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .pdp-review-card__name {
      font-weight: 600;
      font-size: 14px;
      color: var(--text);
    }
    .pdp-review-card__date { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .pdp-review-card__stars { font-size: 14px; color: #d4a800; letter-spacing: 1.5px; margin-left: auto; }
    .pdp-review-card__title {
      font-size: 14px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 6px;
    }
    .pdp-review-card__body {
      font-size: 13.5px;
      color: var(--ink2, #3a3a3a);
      line-height: 1.65;
    }
    .pdp-review-card__verified {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--success);
      font-weight: 500;
      margin-top: 10px;
    }

    /* ============================================================
       RELATED PRODUCTS STRIP
       ============================================================ */
    .pdp-related {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 36px 60px;
    }
    .pdp-related__title {
      font-family: var(--font-head);
      font-size: 22px;
      font-weight: 700;
      margin-bottom: 18px;
    }
    .pdp-related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 16px;
    }
    .pdp-rel-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform .15s, box-shadow .15s;
    }
    .pdp-rel-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,0,0,.10);
    }
    .pdp-rel-card__img {
      height: 130px;
      background: var(--surface);
      display: flex; align-items: center; justify-content: center;
      font-size: 52px;
    }
    .pdp-rel-card__body { padding: 12px 14px; }
    .pdp-rel-card__name {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.35;
    }
    .pdp-rel-card__price {
      font-size: 14px;
      font-weight: 700;
      color: var(--text);
    }

    /* ============================================================
       RESPONSIVE
       ============================================================ */
    @media (max-width: 980px) {
      .pdp-main-img { width: min(100%, 480px); max-width: 480px; height: 360px; font-size: 110px; }
    }

    @media (max-width: 860px) {
      .pdp-body { grid-template-columns: 1fr; gap: 28px; padding: 24px 20px 48px; }
      .pdp-gallery { position: static; }
      .pdp-main-img { width: 100%; max-width: 100%; height: 300px; font-size: 100px; }
      .pdp-title { font-size: 24px; }
      .pdp-price { font-size: 28px; }
      .pdp-tabs-section { padding: 0 20px 48px; }
      .pdp-related { padding: 0 20px 48px; }
      .pdp-nav { padding: 0 20px; }
    }

    /* ── Tabs component styles ── */
    .pdp-tabs__header {
      display: flex;
      border-bottom: 2px solid var(--border);
      margin-bottom: 32px;
      gap: 0;
    }
    .pdp-tab-btn {
      padding: 12px 24px;
      background: none;
      border: none;
      font-family: var(--font-body);
      font-size: 14px;
      font-weight: 500;
      color: var(--muted);
      cursor: pointer;
      position: relative;
      transition: color .15s;
    }
    .pdp-tab-btn::after {
      content: '';
      position: absolute;
      bottom: -2px; left: 0; right: 0;
      height: 2px;
      background: var(--accent);
      transform: scaleX(0);
      transition: transform .2s;
    }
    .pdp-tab-btn--active { color: var(--accent); font-weight: 600; }
    .pdp-tab-btn--active::after { transform: scaleX(1); }
    .pdp-tab-btn:hover { color: var(--text); }

    .pdp-tabs__content {
      max-width: 720px;
    }

    .pdp-description {
      font-size: 14px;
      line-height: 1.6;
      color: var(--text);
    }

    .pdp-specs {
      max-width: 680px;
    }

    .pdp-reviews-summary {
      display: flex;
      align-items: center;
      gap: 32px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 24px 28px;
      margin-bottom: 24px;
    }
    .pdp-reviews-summary__rating {
      text-align: center;
      flex-shrink: 0;
    }
    .pdp-reviews-summary__score {
      font-family: var(--font-head);
      font-size: 52px;
      font-weight: 900;
      line-height: 1;
      color: var(--text);
    }
    .pdp-reviews-summary__count { font-size: 12px; color: var(--muted); }
    .pdp-reviews-summary__breakdown {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .pdp-reviews-bar {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 12.5px;
      color: var(--muted);
    }
    .pdp-reviews-bar__label { width: 24px; text-align: right; flex-shrink: 0; }
    .pdp-reviews-bar__track {
      flex: 1;
      height: 7px;
      background: var(--border);
      border-radius: 10px;
      overflow: hidden;
    }
    .pdp-reviews-bar__fill {
      height: 100%;
      background: #d4a800;
      border-radius: 10px;
    }
    .pdp-reviews-bar__count { width: 32px; flex-shrink: 0; color: var(--text); font-weight: 500; }

    .pdp-reviews-list {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .pdp-review {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      padding: 20px 22px;
    }
    .pdp-review__header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 12px;
    }
    .pdp-review__avatar {
      width: 38px; height: 38px;
      border-radius: 50%;
      background: var(--accent);
      color: #fff;
      font-size: 14px;
      font-weight: 700;
      display: flex; align-items: center; justify-content: center;
      flex-shrink: 0;
    }
    .pdp-review__meta {
      flex: 1;
    }
    .pdp-review__user {
      font-weight: 600;
      font-size: 14px;
      color: var(--text);
    }
    .pdp-review__date { font-size: 12px; color: var(--muted); margin-top: 2px; }
    .pdp-review__rating {
      margin-left: auto;
    }
    .pdp-review__text {
      font-size: 13.5px;
      color: var(--ink2, #3a3a3a);
      line-height: 1.65;
      margin-bottom: 12px;
    }
    .pdp-review__images {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .pdp-review__img {
      width: 60px; height: 60px;
      border-radius: 8px;
      object-fit: cover;
      border: 1px solid var(--border);
    }

    /* ── Related products styles ── */
    .pdp-related__grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(190px, 1fr));
      gap: 16px;
    }
    .pdp-related-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      cursor: pointer;
      transition: transform .15s, box-shadow .15s;
    }
    .pdp-related-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 24px rgba(0,0,0,.10);
    }
    .pdp-related-card__img {
      position: relative;
      height: 130px;
      background: var(--surface);
      display: flex; align-items: center; justify-content: center;
      font-size: 52px;
    }
    .pdp-related-card__badge {
      position: absolute;
      top: 8px; left: 8px;
      background: var(--accent);
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: .3px;
    }
    .pdp-related-card__content {
      padding: 12px 14px;
    }
    .pdp-related-card__title {
      font-size: 13px;
      font-weight: 600;
      color: var(--text);
      margin-bottom: 4px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      line-height: 1.35;
    }
    .pdp-related-card__rating {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-bottom: 6px;
    }
    .pdp-related-card__rating-text {
      font-size: 11px;
      color: var(--muted);
    }
    .pdp-related-card__price {
      display: flex;
      align-items: baseline;
      gap: 6px;
      margin-bottom: 8px;
    }
    .pdp-related-card__price-current {
      font-size: 14px;
      font-weight: 700;
      color: var(--text);
    }
    .pdp-related-card__price-original {
      font-size: 11px;
      color: var(--muted2);
      text-decoration: line-through;
    }
    .pdp-related-card__actions {
      display: flex;
      gap: 6px;
    }
    .pdp-related-card__btn {
      flex: 1;
      padding: 6px 8px;
      border-radius: 6px;
      font-size: 11px;
      font-weight: 600;
      border: none;
      cursor: pointer;
      transition: all .12s;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .pdp-related-card__btn--view {
      background: var(--surface);
      color: var(--text);
      border: 1px solid var(--border);
    }
    .pdp-related-card__btn--view:hover {
      border-color: var(--accent2);
    }
    .pdp-related-card__btn--cart {
      background: var(--accent);
      color: #fff;
    }
    .pdp-related-card__btn--cart:hover {
      background: #2a2a2a;
    }
    .pdp-related-card__btn--cart:disabled {
      background: var(--surface);
      color: var(--muted2);
      cursor: not-allowed;
    }
  `}</style>
);

export default GlobalStyles;
