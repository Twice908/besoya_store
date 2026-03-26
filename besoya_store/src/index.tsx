// /* ============================================================
//    STYLES — inject once into <head> via a <style> tag or import
//    as a CSS module / styled-components.  Here they live in a
//    <style> block rendered by the root component so the file
//    stays self-contained.
//    ============================================================ */

// const GlobalStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

//     *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//     :root {
//       --bg:        #050d1a;
//       --surface:   #091428;
//       --card:      #0d1e38;
//       --border:    #1a3358;
//       --accent:    #f5c400;        /* vivid dark yellow */
//       --accent2:   #e0a800;        /* deeper amber yellow */
//       --text:      #e8f0ff;
//       --muted:     #6b85b0;
//       --danger:    #e05555;
//       --success:   #3dbf72;
//       --radius:    14px;
//       --font-head: 'Playfair Display', serif;
//       --font-body: 'DM Sans', sans-serif;
//       --shadow:    0 24px 64px rgba(0,5,30,.7);
//     }

//     html, body, #root {
//       height: 100%;
//       background: var(--bg);
//       color: var(--text);
//       font-family: var(--font-body);
//       font-size: 15px;
//       -webkit-font-smoothing: antialiased;
//     }

//     /* ---------- layout ---------- */
//     .page {
//       min-height: 100vh;
//       display: flex;
//       align-items: center;
//       justify-content: center;
//       padding: 40px 20px;
//       position: relative;
//       overflow: hidden;
//     }

//     /* decorative blobs */
//     .page::before, .page::after {
//       content: '';
//       position: fixed;
//       border-radius: 50%;
//       filter: blur(120px);
//       pointer-events: none;
//       z-index: 0;
//     }
//     .page::before {
//       width: 520px; height: 520px;
//       background: radial-gradient(circle, rgba(0,80,220,.18) 0%, transparent 70%);
//       top: -140px; right: -140px;
//     }
//     .page::after {
//       width: 420px; height: 420px;
//       background: radial-gradient(circle, rgba(245,196,0,.10) 0%, transparent 70%);
//       bottom: -100px; left: -100px;
//     }

//     /* ---------- card ---------- */
//     .card {
//       position: relative; z-index: 1;
//       width: 100%; max-width: 520px;
//       background: var(--card);
//       border: 1px solid var(--border);
//       border-radius: 24px;
//       padding: 48px 44px;
//       box-shadow: var(--shadow);
//       animation: cardIn .45s cubic-bezier(.22,.68,0,1.2) both;
//     }
//     @keyframes cardIn {
//       from { opacity:0; transform: translateY(28px) scale(.97); }
//       to   { opacity:1; transform: translateY(0)    scale(1);   }
//     }

//     /* wide card for signup */
//     .card--wide { max-width: 680px; }

//     /* ---------- brand ---------- */
//     .brand {
//       text-align: center;
//       margin-bottom: 32px;
//     }
//     .brand__logo {
//       display: inline-flex;
//       align-items: center;
//       gap: 10px;
//       margin-bottom: 6px;
//     }
//     .brand__icon {
//       width: 40px; height: 40px;
//       background: linear-gradient(135deg, #1a5fd4, #f5c400);
//       border-radius: 10px;
//       display: flex; align-items: center; justify-content: center;
//       font-size: 20px;
//     }
//     .brand__name {
//       font-family: var(--font-head);
//       font-size: 28px;
//       font-weight: 900;
//       letter-spacing: -.5px;
//       color: var(--text);
//     }
//     .brand__name span { color: var(--accent); }
//     .brand__tagline {
//       font-size: 12px;
//       letter-spacing: 3px;
//       text-transform: uppercase;
//       color: var(--muted);
//       margin-top: 4px;
//     }

//     /* ---------- welcome block ---------- */
//     .welcome {
//       text-align: center;
//       margin-bottom: 36px;
//     }
//     .welcome__title {
//       font-family: var(--font-head);
//       font-size: 26px;
//       font-weight: 700;
//       line-height: 1.25;
//       margin-bottom: 8px;
//     }
//     .welcome__sub {
//       color: var(--muted);
//       font-size: 14px;
//       line-height: 1.6;
//     }

//     /* ---------- divider ---------- */
//     .divider {
//       display: flex; align-items: center; gap: 12px;
//       margin: 28px 0;
//     }
//     .divider__line { flex: 1; height: 1px; background: var(--border); }
//     .divider__text { color: var(--muted); font-size: 12px; letter-spacing: 1px; }

//     /* ---------- form grid ---------- */
//     .form-grid {
//       display: grid;
//       grid-template-columns: 1fr 1fr;
//       gap: 16px 20px;
//     }
//     .form-grid .full { grid-column: 1 / -1; }

//     /* ---------- field ---------- */
//     .field { display: flex; flex-direction: column; gap: 6px; }
//     .field__label {
//       font-size: 12px;
//       font-weight: 600;
//       letter-spacing: .6px;
//       text-transform: uppercase;
//       color: var(--muted);
//     }
//     .field__wrap { position: relative; }
//     .field__input {
//       width: 100%;
//       background: var(--surface);
//       border: 1.5px solid var(--border);
//       border-radius: var(--radius);
//       padding: 12px 16px;
//       color: var(--text);
//       font-family: var(--font-body);
//       font-size: 14.5px;
//       outline: none;
//       transition: border-color .2s, box-shadow .2s;
//     }
//     .field__input::placeholder { color: #4a4540; }
//     .field__input:focus {
//       border-color: var(--accent);
//       box-shadow: 0 0 0 3px rgba(232,200,122,.12);
//     }
//     .field__input--icon { padding-right: 44px; }
//     .field__icon-btn {
//       position: absolute; right: 12px; top: 50%;
//       transform: translateY(-50%);
//       background: none; border: none; cursor: pointer;
//       color: var(--muted); font-size: 17px;
//       display: flex; align-items: center; padding: 4px;
//       transition: color .2s;
//     }
//     .field__icon-btn:hover { color: var(--accent); }

//     /* select */
//     .field__select {
//       appearance: none;
//       background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238a8077' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
//       background-repeat: no-repeat;
//       background-position: right 14px center;
//       padding-right: 38px;
//     }

//     /* ---------- address group ---------- */
//     .addr-section {
//       background: var(--surface);
//       border: 1px solid var(--border);
//       border-radius: var(--radius);
//       padding: 18px;
//       margin-top: 4px;
//     }
//     .addr-section__title {
//       font-size: 11px;
//       font-weight: 700;
//       letter-spacing: 1.5px;
//       text-transform: uppercase;
//       color: var(--accent);
//       margin-bottom: 14px;
//     }

//     /* ---------- radio pills ---------- */
//     .pill-group { display: flex; gap: 10px; flex-wrap: wrap; }
//     .pill {
//       position: relative;
//     }
//     .pill input { position: absolute; opacity: 0; width: 0; height: 0; }
//     .pill__label {
//       display: flex; align-items: center; gap: 6px;
//       padding: 8px 16px;
//       border: 1.5px solid var(--border);
//       border-radius: 40px;
//       cursor: pointer;
//       font-size: 13px;
//       font-weight: 500;
//       color: var(--muted);
//       transition: all .2s;
//     }
//     .pill input:checked + .pill__label {
//       border-color: var(--accent);
//       color: var(--accent);
//       background: rgba(232,200,122,.08);
//     }

//     /* ---------- checkbox ---------- */
//     .checkbox-row {
//       display: flex; align-items: flex-start; gap: 10px;
//       margin-top: 4px;
//     }
//     .checkbox-row input[type="checkbox"] {
//       accent-color: var(--accent);
//       width: 16px; height: 16px;
//       margin-top: 2px; flex-shrink: 0; cursor: pointer;
//     }
//     .checkbox-row label {
//       font-size: 13px; color: var(--muted); line-height: 1.5; cursor: pointer;
//     }
//     .checkbox-row label a { color: var(--accent); text-decoration: none; }
//     .checkbox-row label a:hover { text-decoration: underline; }

//     /* ---------- notice box ---------- */
//     .notice {
//       background: rgba(26,95,212,.10);
//       border: 1px solid rgba(26,95,212,.25);
//       border-radius: 10px;
//       padding: 11px 14px;
//       font-size: 12.5px;
//       color: #7aabff;
//       display: flex; align-items: flex-start; gap: 8px;
//       line-height: 1.5;
//     }
//     .notice__icon { font-size: 15px; flex-shrink: 0; margin-top: 1px; }

//     /* ---------- buttons ---------- */
//     .btn {
//       width: 100%;
//       padding: 14px 20px;
//       border: none; border-radius: var(--radius);
//       font-family: var(--font-body);
//       font-size: 15px; font-weight: 600;
//       cursor: pointer;
//       transition: all .2s;
//       display: flex; align-items: center; justify-content: center; gap: 8px;
//     }
//     .btn--primary {
//       background: linear-gradient(135deg, #1a5fd4 0%, #0a3d9e 100%);
//       color: #ffffff;
//       letter-spacing: .3px;
//     }
//     .btn--primary:hover {
//       transform: translateY(-1px);
//       box-shadow: 0 8px 24px rgba(26,95,212,.4);
//     }
//     .btn--primary:active { transform: translateY(0); }
//     .btn--outline {
//       background: transparent;
//       border: 1.5px solid var(--border);
//       color: var(--text);
//     }
//     .btn--outline:hover {
//       border-color: var(--accent);
//       color: var(--accent);
//     }
//     .btn--success {
//       background: rgba(91,186,111,.12);
//       border: 1.5px solid var(--success);
//       color: var(--success);
//       cursor: default;
//     }

//     /* ---------- links & footnotes ---------- */
//     .form-foot {
//       margin-top: 20px;
//       text-align: center;
//       font-size: 13.5px;
//       color: var(--muted);
//     }
//     .form-foot a, .link-btn {
//       color: var(--accent);
//       text-decoration: none;
//       background: none; border: none;
//       cursor: pointer; font-size: inherit;
//       font-family: inherit; font-weight: 500;
//     }
//     .link-btn:hover, .form-foot a:hover { text-decoration: underline; }

//     .forgot-row {
//       text-align: right;
//       margin-top: -6px;
//       margin-bottom: 10px;
//     }

//     /* ---------- success state ---------- */
//     .success-box {
//       text-align: center; padding: 16px 0;
//     }
//     .success-box__icon {
//       font-size: 48px; margin-bottom: 12px;
//       animation: popIn .4s cubic-bezier(.22,.68,0,1.4) both;
//     }
//     @keyframes popIn {
//       from { transform: scale(0); opacity: 0; }
//       to   { transform: scale(1); opacity: 1; }
//     }
//     .success-box__title {
//       font-family: var(--font-head);
//       font-size: 20px; font-weight: 700;
//       margin-bottom: 6px;
//     }
//     .success-box__text { color: var(--muted); font-size: 13.5px; line-height: 1.6; }

//     /* ---------- error message ---------- */
//     .field-error { font-size: 12px; color: var(--danger); margin-top: 2px; }

//     /* ---------- welcome / dashboard page ---------- */
//     .dash-page {
//       min-height: 100vh;
//       display: flex; flex-direction: column;
//       align-items: center; justify-content: center;
//       gap: 16px; text-align: center; padding: 40px;
//       position: relative; z-index: 1;
//     }
//     .dash-page__heading {
//       font-family: var(--font-head);
//       font-size: 48px; font-weight: 900;
//       letter-spacing: -1px;
//       line-height: 1.1;
//     }
//     .dash-page__heading span { color: var(--accent); }
//     .dash-page__sub { color: var(--muted); font-size: 15px; max-width: 340px; }
//     .dash-badge {
//       display: inline-flex; align-items: center; gap: 8px;
//       background: rgba(245,196,0,.10);
//       border: 1px solid rgba(245,196,0,.25);
//       border-radius: 40px; padding: 6px 16px;
//       font-size: 13px; color: var(--accent); font-weight: 500;
//       margin-bottom: 8px;
//     }

//     /* ---------- scrollbar ---------- */
//     ::-webkit-scrollbar { width: 6px; }
//     ::-webkit-scrollbar-track { background: var(--surface); }
//     ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

//     /* ---------- responsive ---------- */
//     @media (max-width: 580px) {
//       .card { padding: 32px 24px; }
//       .form-grid { grid-template-columns: 1fr; }
//       .form-grid .full { grid-column: 1; }
//     }
//   `}</style>
// );

// export default GlobalStyles;


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

    /* ── responsive ── */
    @media (max-width: 580px) {
      .card { padding: 32px 24px; }
      .form-grid { grid-template-columns: 1fr; }
      .form-grid .full { grid-column: 1; }
      .sidebar { width: 180px; }
      .topbar { padding: 0 16px; }
      .content { padding: 16px; }
    }
  `}</style>
);

export default GlobalStyles;
