# AgriYield - Yield Revenue Hub

A harvest intelligence and field guidance ledger web application, reconstructed from [https://yield-revenue-hub.preview.emergentagent.com/](https://yield-revenue-hub.preview.emergentagent.com/).

---

## 📁 Project Structure & File Connections

```
yield-revenue-hub/
├── index.html                 # HTML shell, web fonts (Fraunces, Public Sans, Inter), root element
├── vite.config.js             # Vite build configuration with '@' path alias mapping to '/src'
├── package.json               # Project dependencies and dev/build scripts
├── .gitignore                 # Excludes node_modules and production build output (dist/)
├── README.md                  # This documentation
└── src/
    ├── index.jsx              # React 18 DOM root & TanStack Query provider
    ├── App.jsx                # Main application component, URL hash router, and views
    ├── farmerAuth.js          # Farmer profile management, registration, and demo session storage
    ├── i18n.js                # Bilingual dictionary & localization (English & हिन्दी)
    ├── sms.js                 # SMS alerts ledger & notification mock
    ├── App.css                # Primary design system, typography, animations, and card layouts
    ├── Access.css             # Sign up / Sign in onboarding & quick preview screen styles
    ├── mobileFix.css          # Mobile responsiveness enhancements for headers & alert logs
    └── index.css              # Tailwind base utilities and CSS reset
```

---

## 🔗 How Files & Views Are Connected

1. **HTML Entrypoint (`index.html`)**
   - Loads Google Fonts (*Fraunces*, *Public Sans*, *Inter*).
   - Mounts the `#root` container.
   - Bootstraps the application via `<script type="module" src="/src/index.jsx"></script>`.

2. **React Root (`src/index.jsx`)**
   - Imports global CSS resets (`@/index.css`).
   - Wraps the app in `@tanstack/react-query` `QueryClientProvider`.
   - Renders the root `App` component (`@/App`).

3. **Application & View Router (`src/App.jsx`)**
   - **URL Hash Routing**: Synchronizes with browser address bar hash (`#monitor`, `#planner`, `#actions`, `#review`).
   - **Authentication Gate (`AccessScreen`)**: If no active farmer profile exists, displays the login/signup screen with quick 1-click demo preview.
   - **Header Banner (`RevenueBanner`)**: Shows real-time season revenue, revenue at risk, and notification badges with clickable deep links to the views.
   - **Navigation Bar (`Nav`)**: Switches views with smooth animations (`framer-motion`), language switcher (English / Hindi), and sign-out.
   - **Views**:
     - `#monitor` (**Live Field Monitor**): Real-time field cards, live sensor readings (soil moisture, leaf wetness, temperature), gauge bars, and 5-day weather outlook.
     - `#planner` (**Harvest & Revenue Planner**): Interactive Recharts revenue & quality curve, harvest day slider simulator, and economic drivers.
     - `#actions` (**Action Center**): Prioritized decision list with financial impact calculations and Mark Done / Snooze controls.
     - `#review` (**Season Review**): Historical recommendation log, realized vs. recommended bar chart, and SMS alert history.
     - **Field Drawer**: Slide-out panel with 24-hour sensor timelines when clicking any field card.

4. **Farmer Profile & Session Management (`src/farmerAuth.js`)**
   - Stores farmer profiles in `localStorage` under `agriyield.demo.farmers.v1`.
   - Manages active session under `agriyield.demo.session.v1`.

5. **Multilingual Localization (`src/i18n.js`)**
   - Dynamic copy retrieval for English and Hindi across all screens and notifications.

6. **SMS Alert Ledger (`src/sms.js`)**
   - Persists automated and triggered SMS alerts in `localStorage` under `agriyield.demo.sms-alerts.v1`.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will be accessible at:
👉 **`http://localhost:3000`**

### 3. Build for Production
```bash
npm run build
```
Creates an optimized production bundle in the `dist/` folder.
