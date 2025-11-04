# Quick Start Guide: Running the Project# Hybrid Angular Upgrade Proof-of-Concept

## Prerequisites## 🎯 Objective

### Required SoftwareProve that a legacy Nx + Angular 10 application can gradually adopt Angular 20 features using Web Components (Angular Elements) without a full migration.

1. **Node Version Manager (nvm)**### What This Demo Shows

   - Windows: [nvm-windows](https://github.com/coreybutler/nvm-windows)

   - Mac/Linux: [nvm](https://github.com/nvm-sh/nvm)✅ How to build and serve both frameworks side-by-side

✅ How to hot-reload web-component changes during development

2. **Node.js Versions**✅ How to integrate the component into existing Angular 10 routes

   - Node 14.21.3 (for Angular 10)✅ How to prepare for CI/CD and version control of web-components

   - Node 24.8.0 (for Angular 20)✅ Real-world migration strategy from Angular 10 to Angular 20

3. **Package Manager**## 🚀 Quick Start

   - npm (comes with Node.js)

� **[DOCUMENTATION INDEX](DOCS-INDEX.md)** - Complete guide to all documentation

4. **Code Editor**

   - VS Code recommended### Essential Reading

---�📘 **New to this project?** Start here: [QUICKSTART.md](QUICKSTART.md)

🖼️ **What will I see?** Visual guide: [VISUAL-GUIDE.md](VISUAL-GUIDE.md)

## Installation Steps📊 **Track progress:** Implementation status: [PROGRESS.md](PROGRESS.md)

📝 **Complete details:** Implementation summary: [SUMMARY.md](SUMMARY.md)

### 1. Clone and Navigate to Project

## Project Structure

````bash

cd C:\Pansoftware\web-component-hooks```

```root/

 ├─ apps/

### 2. Install Node Versions │   ├─ main-legacy-app/          # Angular 10 + Nx

 │   │   ├─ src/app/login/

```bash │   │   ├─ src/app/investor-lookup/

# Install Node 14.21.3 for Angular 10 │   │   └─ src/app/investor-detail/  # old page

nvm install 14.21.3 │   └─ investor-detail-element/  # Angular 20 standalone app → web component

 ├─ dist/

# Install Node 24.8.0 for Angular 20 │   ├─ main-legacy-app/

nvm install 24.8.0 │   └─ investor-detail-element/

``` ├─ package.json

 └─ README.md

### 3. Install Dependencies for Angular 10 App```



```bash## Node & Environment Setup

cd apps/main-legacy-app

nvm use 14.21.31. Switch Node version for each project

npm install

```- Switch Node version for each project : `nvm use 14.21.3`

- Web Component (Angular 20) : `nvm use 24.8.0`

### 4. Install Dependencies for Angular 20 App

2. Install Dependencies

```bash   Each app maintains its own package.json and Angular CLI/Nx configuration.

cd ../investor-detail-element

nvm use 24.8.0## Main Application — Angular 10

npm install

```A simplified portal containing:



---- Login page

- Investor lookup page

## Running the Application- Investor detail page (legacy)

- Investor detail page (new) that loads the Angular 20 web-component dynamically.

You need **3 terminal windows** running simultaneously.

Key Steps

### Terminal 1: Angular 20 Build Watch

1.  Routing Setup

**Purpose:** Automatically rebuilds Angular 20 web component when files change

```ts

```bashconst routes: Routes = [

# Navigate to Angular 20 app  { path: "", redirectTo: "login", pathMatch: "full" },

cd apps/investor-detail-element  { path: "login", component: LoginComponent },

  { path: "investor-lookup", component: InvestorLookupComponent },

# Switch to Node 24.8.0  { path: "investor-detail", component: InvestorDetailLegacyComponent },

nvm use 24.8.0  {

    path: "investor-detail-new",

# Start build watch mode    component: InvestorDetailElementWrapperComponent,

npm run build:watch  },

```];

````

**Expected Output:**

````2. Dynamic Script Loader for Web Component

Initial chunk files | Names         |  Raw size

main.js             | main          |   1.20 MB | ```ts

polyfills.js        | polyfills     |  89.77 kB | // investor-detail-element-wrapper.component.ts

styles.css          | styles        | 300 bytes | import { Component, OnInit } from "@angular/core";



Application bundle generation complete. [0.983 seconds]@Component({

```  selector: "app-investor-detail-element-wrapper",

  template: `<investor-detail-element></investor-detail-element>`,

**Keep this terminal running!** It will rebuild automatically when you save files.})

export class InvestorDetailElementWrapperComponent implements OnInit {

---  async ngOnInit() {

    const scriptId = "investor-element-script";

### Terminal 2: Angular 20 File Server    if (!document.getElementById(scriptId)) {

      const script = document.createElement("script");

**Purpose:** Serves the built Angular 20 files on port 4201      script.id = scriptId;

      script.src = "http://localhost:4201/main.js"; // served from Angular 20 build

```bash      document.body.appendChild(script);

# Navigate to Angular 20 app    }

cd apps/investor-detail-element  }

}

# Switch to Node 24.8.0```

nvm use 24.8.0

3. Local Development Proxy

# Start HTTP server   Configure proxy.conf.json to allow CORS or proxy calls between ports 4200 to 4201.

npm run serve:dist   Run both servers concurrently:

````

```bash

**Expected Output:**npx concurrently "nx serve main-legacy-app" "nx serve investor-detail-element"

```

Starting up http-server, serving ../../dist/investor-detail-element

Available on:## Web Component — Angular 20

http://localhost:4201

Hit CTRL-C to stop the serverReplicate the Investor Detail Page UI and logic from the old app as a self-contained Angular Element.

````

### Setup

**Keep this terminal running!** It serves the web component files.

1. Create the Project

---

```bash

### Terminal 3: Angular 10 Dev Servernvm use 24.8.0

npx @angular/cli@20 new investor-detail-element --skip-git --style=scss

**Purpose:** Runs the main Angular 10 application on port 4200```



```bash2. Add Angular Elements

# Navigate to Angular 10 app

cd apps/main-legacy-app```bash

Add Angular Elements

# Switch to Node 14.21.3```

nvm use 14.21.3

3. Convert AppComponent to Web Component

# Start dev server

npm start```ts

```import { Injector, DoBootstrap } from "@angular/core";

import { createCustomElement } from "@angular/elements";

**Expected Output:**import { AppComponent } from "./app.component";

````

** Angular Live Development Server is listening on localhost:4200 **export class AppModule implements DoBootstrap {

: Compiled successfully. constructor(private injector: Injector) {}

```ngDoBootstrap() {

    const el = createCustomElement(AppComponent, { injector: this.injector });

**Keep this terminal running!** The Angular 10 app will auto-reload on changes.    customElements.define("investor-detail-element", el);

  }

---}

```

## Accessing the Application

4. Build Configuration

### Open in Browser Output target suitable for embedding:

Navigate to: **http://localhost:4200**```json

"outputPath": "dist/investor-detail-element",

### Application Flow"outputHashing": "none",

"scripts": [],

1. **Login Page** (`/login`)"styles": ["src/styles.scss"]

   - Default page```

   - Click "Login" to proceed

Run:

2. **Investor Lookup** (`/investor-lookup`)

   - Shows all investors by default```bash

   - Search functionality availableng build --watch

   - Two buttons per investor:```

     - **View (Legacy)** - Opens Angular 10 version

     - **View (New) 🚀** - Opens Angular 20 web component versionor serve live:

3. **Investor Detail - Legacy** (`/investor-detail?id=1`)```bash

   - Traditional Angular 10 componentng serve --port 4201

   - Styled with blue banner```

4. **Investor Detail - New** (`/investor-detail-new?id=1`)5. Expose Component via CDN/Localhost

   - Angular 20 web component The legacy app dynamically loads http://localhost:4201/main.js during dev.

   - Styled with green banner

   - Loaded dynamically from port 4201## Live-Development Workflow

---| Step | Action |

| ---- | ---------------------------------------------------------------------------------------------- |

## Verifying Everything Works| 1 | Run both apps concurrently. |

| 2 | Edit code in the Angular 20 component → webpack watch rebuilds instantly. |

### Check Console Logs| 3 | Legacy Angular 10 app auto-refreshes and loads the latest bundle from `http://localhost:4201`. |

| 4 | No manual rebuild/restart of the Angular 10 app needed. |

Open browser DevTools (F12) and check for these logs:

This setup mimics a monorepo-like DX while keeping framework versions isolated.

#### When visiting `/investor-detail-new?id=1`:

## Known Challenges & Mitigations

```

✅ Investor data loaded from Angular 10: John Smith### 1. Zone.js Conflicts

📤 Sending to web component (JSON): {"id":"1",...}

Loading Angular 20 web component...**Issue**: Both Angular 10 and Angular 20 use Zone.js, which can cause conflicts when loaded twice.

✅ Script loaded: http://localhost:4201/browser/polyfills.js

✅ Angular 20 Web Component "investor-detail-element" registered successfully**Solutions**:

✅ Script loaded: http://localhost:4201/browser/main.js

Angular 20 web component loaded successfully- Ensure Zone.js is loaded only once (in the Angular 10 host app)

✅ Custom element 'investor-detail-element' is defined- Configure Angular 20 web component to use `ngZone: 'noop'` if needed

🔧 setInvestorDataOnElement called- Test thoroughly for change detection issues

🔧 Element found: <investor-detail-element>

🔵 AppComponent constructor called### 2. Build Output Complexity

🔵 ngOnInit called

✅ Investor data received from parent (Angular 10): John Smith**Issue**: Angular 20 outputs multiple JS files (`runtime.js`, `polyfills.js`, `main.js`), not just a single bundle.

```

**Solutions**:

### Check Network Tab

- Load all required scripts in the correct order in the wrapper component

1. Open DevTools → Network tab- Use `--single-bundle=true` flag if available in Angular 20 build

2. Navigate to `/investor-detail-new?id=1`- Consider creating a custom webpack config to bundle into a single file

3. Should see successful requests:

   - `http://localhost:4201/browser/polyfills.js` - 200 OK### 3. Angular 20 Standalone Components

   - `http://localhost:4201/browser/main.js` - 200 OK

**Issue**: The example shows module-based code, but Angular 20 heavily favors standalone components.

---

**Modern Approach**:

## Development Workflow

````ts

### Making Changes to Angular 20 Component// main.ts in Angular 20 app

import { createCustomElement } from "@angular/elements";

1. **Edit file:** `apps/investor-detail-element/src/app/app.component.ts`import { createApplication } from "@angular/platform-browser";

2. **Save file** (Ctrl+S)import { AppComponent } from "./app/app.component";

3. **Watch Terminal 1** - You'll see:

   ```createApplication().then((appRef) => {

   Application bundle generation complete. [0.983 seconds]  const el = createCustomElement(AppComponent, {

   ```    injector: appRef.injector,

4. **Refresh browser** (F5 or Ctrl+R)  });

5. **See changes** immediately  customElements.define("investor-detail-element", el);

});

### Making Changes to Angular 10 App```



1. **Edit any file** in `apps/main-legacy-app/src/`### 4. Style Encapsulation

2. **Save file** (Ctrl+S)

3. **Browser auto-reloads** (webpack dev server)**Issue**: Styles from the Angular 20 component may leak into the Angular 10 app or vice versa.

4. **See changes** automatically

**Solutions**:

---

- Use Shadow DOM encapsulation: `encapsulation: ViewEncapsulation.ShadowDom`

## Troubleshooting- Test global styles carefully

- Namespace CSS classes if Shadow DOM isn't suitable

### Issue: "Cannot use import statement outside a module"

### 5. Bundle Size Concerns

**Solution:** The scripts are loaded with `type="module"`. Make sure Terminal 2 (http-server) is running.

**Issue**: Each app bundles its own Angular framework, significantly increasing payload size.

---

**Considerations**:

### Issue: 404 errors for main.js or polyfills.js

- Initial payload will be larger (2x Angular framework code)

**Cause:** Files are in `/browser/` subdirectory- Lazy-load the web component only when the route is accessed

- Monitor bundle sizes and consider Module Federation for better dependency sharing

**Check:**

```bash## 📦 What's Included

# Verify files exist

dir dist\investor-detail-element\browser\main.js### Applications

````

1. **main-legacy-app** (Angular 10)

**Solution:** Ensure Terminal 1 build completed successfully and Terminal 2 is serving from correct directory.

- Complete investor management portal

--- - Login, lookup, and detail pages

- Web component wrapper for Angular 20 integration

### Issue: Web component not showing data - Port: 4200

**Symptoms:** Seeing "No investor data provided" message2. **investor-detail-element** (Angular 20)

- Standalone web component

**Solutions:** - Modern Angular 20 features

1. **Hard refresh browser:** `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac) - Shadow DOM encapsulation

2. **Clear cache:** Open DevTools → Network → Check "Disable cache" - Port: 4201

3. **Check build:** Verify Terminal 1 shows recent build timestamp

4. **Check console:** Look for error messages in browser console### Documentation

---- **README.md** - This file (overview and technical details)

- **QUICKSTART.md** - Step-by-step setup and running guide

### Issue: "Angular 20 Web Component not registered"- **PROGRESS.md** - Detailed implementation progress tracker

- **apps/main-legacy-app/README.md** - Angular 10 app documentation

**Solution:**- **apps/investor-detail-element/README.md** - Angular 20 component documentation

1. Stop Terminal 2 (Ctrl+C)

2. Restart: `npm run serve:dist`### Helper Scripts

3. Hard refresh browser

- **start-legacy.ps1** - PowerShell script to run Angular 10 app

---- **start-element.ps1** - PowerShell script to run Angular 20 component

- **package.json** - Workspace-level npm scripts

### Issue: Wrong Node version

## 🎬 Live Demo Flow

**Symptom:**

````1. **Login** → Enter any credentials

The Angular CLI requires a minimum Node.js version of v20.192. **Investor Lookup** → Search for investors

```3. **View Details** → Choose between:

   - **Legacy Version** (Angular 10) - Yellow banner

**Solution:**   - **New Version** (Angular 20) - Green banner 🚀

```bash

# Check current version## 🏗️ Architecture Overview

node -v

````

# Switch to correct version┌─────────────────────────────────────────────────────────┐

nvm use 24.8.0 # for Angular 20│ Angular 10 App (Port 4200) │

# or│ ┌───────────────────────────────────────────────────┐ │

nvm use 14.21.3 # for Angular 10│ │ Login → Investor Lookup → Investor Detail │ │

````│ └───────────────────────────────────────────────────┘  │

│                                                          │

---│  ┌───────────────────────────────────────────────────┐  │

│  │  Web Component Wrapper                            │  │

### Issue: Port already in use│  │  ├─ Dynamic script loader                         │  │

│  │  ├─ Error handling & retry                        │  │

**Error:** `Port 4200 is already in use`│  │  └─ <investor-detail-element>                     │  │

│  └───────────────────────────────────────────────────┘  │

**Solution:**└─────────────────────────────────────────────────────────┘

```bash                          ↓

# Find process using port (Windows)              Loads script from port 4201

netstat -ano | findstr :4200                          ↓

┌─────────────────────────────────────────────────────────┐

# Kill process (replace PID with actual process ID)│  Angular 20 Web Component (Port 4201)                   │

taskkill /PID <PID> /F│  ┌───────────────────────────────────────────────────┐  │

│  │  Custom Element: <investor-detail-element>        │  │

# Or use a different port│  │  ├─ Standalone component                          │  │

ng serve --port 4201│  │  ├─ Shadow DOM encapsulation                      │  │

```│  │  ├─ @Input() investor-id                          │  │

│  │  └─ Modern Angular 20 features                    │  │

---│  └───────────────────────────────────────────────────┘  │

└─────────────────────────────────────────────────────────┘

### Issue: Changes not reflecting```



**Checklist:**## Optional Enhancements

- ✅ Terminal 1 (build:watch) is running

- ✅ Terminal 1 shows recent build completion### Webpack Dev Server Integration

- ✅ Terminal 2 (serve:dist) is running

- ✅ Terminal 3 (Angular 10) is runningYou can create a custom Webpack bridge in the Angular 10 app

- ✅ Hard refresh browser (Ctrl+Shift+R)

- ✅ Check Network tab - cache disabled- Use webpack-dev-middleware to watch the Angular 20 dist folder.

- Inject the built JS into the main app at runtime.

---- Enables faster iteration if ng serve ports conflict.



## Testing Different Investors### Module Federation Alternative



The app has 5 mock investors:If feasible, experiment with Nx's Module Federation plugin:



| ID | Name | Account | Status |- Allows dynamic import of Angular 20 code directly without packaging as a custom element.

|----|------|---------|--------|- Faster reloads, shared dependencies, but requires Webpack 5.

| 1 | John Smith | ACC-1001 | Active |- More complex setup but better for long-term scalability.

| 2 | Sarah Johnson | ACC-1002 | Active |

| 3 | Michael Brown | ACC-1003 | Active |## 🎓 Learning Outcomes

| 4 | Emily Davis | ACC-1004 | Inactive |

| 5 | Robert Wilson | ACC-1005 | Active |By exploring this project, you'll learn:



**Test URLs:**1. **Web Components** - How to create and integrate custom elements

- http://localhost:4200/investor-detail-new?id=12. **Angular Elements** - Converting Angular components to web components

- http://localhost:4200/investor-detail-new?id=23. **Shadow DOM** - Style encapsulation and isolation techniques

- http://localhost:4200/investor-detail-new?id=34. **Dynamic Loading** - Runtime script injection and error handling

- http://localhost:4200/investor-detail-new?id=45. **Gradual Migration** - Strategies for incremental framework upgrades

- http://localhost:4200/investor-detail-new?id=56. **Version Coexistence** - Running multiple Angular versions together



---## 📚 Additional Resources



## Stopping the Application- [Angular Elements Guide](https://angular.dev/guide/elements)

- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)

1. **Stop Angular 10 server** (Terminal 3): Press `Ctrl+C`- [Shadow DOM Spec](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM)

2. **Stop HTTP server** (Terminal 2): Press `Ctrl+C`- [Angular Migration Guide](https://angular.dev/reference/migrations)

3. **Stop build watch** (Terminal 1): Press `Ctrl+C`

## 🤝 Contributing

---

This is a proof-of-concept project. Feel free to:

## Quick Reference

- Experiment with the code

### Terminal Commands Summary- Add new features

- Try different migration patterns

```bash- Share your findings

# Terminal 1 - Angular 20 Build Watch

cd apps/investor-detail-element## 📄 License

nvm use 24.8.0

npm run build:watchMIT License - Feel free to use this for learning and experimentation.


# Terminal 2 - Angular 20 File Server
cd apps/investor-detail-element
nvm use 24.8.0
npm run serve:dist

# Terminal 3 - Angular 10 Dev Server
cd apps/main-legacy-app
nvm use 14.21.3
npm start
````

### Important URLs

- **Angular 10 App:** http://localhost:4200
- **Login Page:** http://localhost:4200/login
- **Investor Lookup:** http://localhost:4200/investor-lookup
- **Legacy Detail:** http://localhost:4200/investor-detail?id=1
- **New Detail (Web Component):** http://localhost:4200/investor-detail-new?id=1
- **Web Component Files:** http://localhost:4201/browser/

### Important Ports

- **4200** - Angular 10 main application
- **4201** - Angular 20 web component files (http-server)

---

## Next Steps

1. ✅ Verify all 3 terminals are running
2. ✅ Open http://localhost:4200
3. ✅ Navigate through the application
4. ✅ Compare Legacy vs New investor detail pages
5. ✅ Check browser console for logs
6. ✅ Try editing files and see hot-reload in action

**Enjoy exploring the hybrid Angular 10 + Angular 20 architecture!** 🚀
