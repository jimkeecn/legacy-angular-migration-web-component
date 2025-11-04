# Implementation Guide: Angular 10 to Angular 20 Migration Using Web Components

## Project Overview

This project demonstrates a gradual migration strategy from Angular 10 to Angular 20 using **Angular Elements (Web Components)**. Instead of a full rewrite, individual features can be incrementally upgraded to Angular 20 while maintaining compatibility with the existing Angular 10 application.

---

## Architecture

### High-Level Design

```
┌─────────────────────────────────────────────────────────────┐
│                  Angular 10 Legacy Application               │
│                      (Port 4200)                             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Login → Investor Lookup → Detail Pages               │  │
│  │                                                        │  │
│  │  ┌──────────────────────────────────────┐             │  │
│  │  │  Investor Detail Wrapper Component   │             │  │
│  │  │  - Loads Angular 20 web component    │             │  │
│  │  │  - Passes investor data as JSON      │             │  │
│  │  │  - Handles routing & navigation      │             │  │
│  │  └──────────────────────────────────────┘             │  │
│  │                    ↓                                   │  │
│  │       <web-components                         │  │
│  │         [investor-data]="jsonData">                    │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              ↓
                    (Dynamic Script Loading)
                              ↓
┌─────────────────────────────────────────────────────────────┐
│          Angular 20 Web Component (Custom Element)          │
│                      (Port 4201)                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  <web-components>                            │  │
│  │    - Standalone Component                             │  │
│  │    - Shadow DOM Encapsulation                         │  │
│  │    - Receives data via @Input('investor-data')        │  │
│  │    - Modern Angular 20 Features                       │  │
│  │    - Hot Module Replacement (HMR)                     │  │
│  └───────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Key Components

### 1. Angular 10 Legacy Application (`apps/main-legacy-app`)

#### Structure

```
apps/main-legacy-app/
├── src/
│   ├── app/
│   │   ├── login/
│   │   │   └── login.component.ts
│   │   ├── investor-lookup/
│   │   │   └── investor-lookup.component.ts
│   │   ├── investor-detail/
│   │   │   └── investor-detail-legacy.component.ts
│   │   ├── web-components-wrapper/
│   │   │   └── web-components-wrapper.component.ts
│   │   ├── services/
│   │   │   └── investor.service.ts
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   └── environments/
│       └── environment.ts
├── angular.json
└── package.json
```

#### Key Files

**`investor.service.ts`** - Shared data service

```typescript
@Injectable({ providedIn: "root" })
export class InvestorService {
  getInvestorById(id: string): InvestorDetail | undefined {
    // Returns investor data
  }
}
```

**`web-components-wrapper.component.ts`** - Web Component Host

- Loads Angular 20 scripts dynamically
- Fetches investor data from service
- Passes data to web component as JSON
- Handles routing and navigation

**`app.module.ts`** - Module configuration

- Includes `CUSTOM_ELEMENTS_SCHEMA` to allow custom elements
- Registers all components and services

---

### 2. Angular 20 Web Component (`apps/web-components`)

#### Structure

```
apps/web-components/
├── src/
│   ├── app/
│   │   ├── services/
│   │   │   └── investor-data.service.ts
│   │   └── app.component.ts
│   ├── main.ts
│   └── styles.css
├── angular.json
└── package.json
```

#### Key Files

**`main.ts`** - Custom Element Registration

```typescript
import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

(async () => {
  const app = await createApplication({ providers: [] });
  const element = createCustomElement(AppComponent, {
    injector: app.injector,
  });
  customElements.define("web-components", element);
})();
```

**`app.component.ts`** - Standalone Component

- `@Input('investor-data')` receives JSON string from parent
- `ViewEncapsulation.ShadowDom` for style isolation
- Parses and displays investor information
- No external dependencies on Angular 10 app

---

## Technical Implementation Details

### 1. Data Flow

```
Angular 10 App
    ↓
InvestorService.getInvestorById(id)
    ↓
InvestorDetail object
    ↓
JSON.stringify(data)
    ↓
<web-components [investor-data]="jsonString">
    ↓
Web Component @Input setter
    ↓
JSON.parse(jsonString)
    ↓
Display in Shadow DOM
```

### 2. Script Loading Strategy

The wrapper component dynamically loads Angular 20 scripts:

```typescript
async loadWebComponent() {
  // Load polyfills
  await this.loadScript('wc-polyfills',
    `${baseUrl}/browser/polyfills.js`);

  // Load main application
  await this.loadScript('wc-main',
    `${baseUrl}/browser/main.js`);

  // Wait for custom element registration
  await new Promise(resolve => setTimeout(resolve, 1000));
}
```

**Why this approach?**

- Lazy loading: Web component only loads when needed
- No build conflicts between Angular versions
- Independent deployment of each version

### 3. Shadow DOM Encapsulation

```typescript
@Component({
  encapsulation: ViewEncapsulation.ShadowDom,
  // ...
})
```

**Benefits:**

- CSS isolation (no style conflicts)
- Scoped DOM tree
- True component encapsulation

### 4. Custom Element Schema

```typescript
@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  // ...
})
```

This allows Angular 10 to accept the `<web-components>` tag without errors.

---

## Build Configuration

### Angular 10 (Legacy App)

**`angular.json`**

```json
{
  "outputPath": "dist/main-legacy-app",
  "builder": "@angular-devkit/build-angular:browser"
}
```

**`package.json`**

```json
{
  "scripts": {
    "start": "ng serve --port 4200"
  },
  "dependencies": {
    "@angular/core": "~10.2.5",
    "typescript": "~4.0.2"
  }
}
```

### Angular 20 (Web Component)

**`angular.json`**

```json
{
  "outputPath": "../../dist/web-components",
  "builder": "@angular-devkit/build-angular:application"
}
```

**Output Structure:**

```
dist/web-components/
├── browser/
│   ├── main.js
│   ├── polyfills.js
│   ├── styles.css
│   └── *.map files
└── prerendered-routes.json
```

**`package.json`**

```json
{
  "scripts": {
    "build:dev": "ng build --configuration development",
    "build:watch": "ng build --watch --configuration development",
    "serve:dist": "http-server ../../dist/web-components -p 4201 --cors"
  },
  "dependencies": {
    "@angular/core": "^20.0.0",
    "@angular/elements": "^20.0.0",
    "typescript": "~5.8.2"
  }
}
```

---

## Development Workflow

### Terminal 1: Angular 20 Build Watch

```bash
cd apps/web-components
nvm use 24.8.0
npm run build:watch
```

- Watches for file changes
- Rebuilds automatically
- Outputs to `dist/web-components/browser/`

### Terminal 2: Angular 20 File Server

```bash
cd apps/web-components
nvm use 24.8.0
npm run serve:dist
```

- Serves built files on port 4201
- CORS enabled
- Automatically serves latest build

### Terminal 3: Angular 10 Dev Server

```bash
cd apps/main-legacy-app
nvm use 14.21.3
npm start
```

- Runs on port 4200
- Hot reload enabled
- Loads web component from port 4201

### Development Cycle

1. **Edit Angular 20 component** → Save file
2. **Build watch detects change** → Rebuilds (1-2 seconds)
3. **File server serves new files** → No restart needed
4. **Refresh browser** → See changes immediately

---

## Key Challenges & Solutions

### Challenge 1: TypeScript Version Conflicts

**Problem:** Angular 20.3.x requires TypeScript ≥5.8
**Solution:** Updated Angular 20 app to use `"typescript": "~5.8.2"`

### Challenge 2: File Path Issues

**Problem:** Angular 20's application builder outputs to `browser/` subdirectory
**Solution:** Updated script URLs to include `/browser/` prefix:

```typescript
`${baseUrl}/browser/main.js`;
```

### Challenge 3: Component Not Initializing

**Problem:** `ChangeDetectionStrategy.OnPush` prevented component initialization
**Solution:** Removed OnPush strategy for web components (use default change detection)

### Challenge 4: Data Not Passing to Component

**Problem:** Setting attributes after element creation didn't trigger inputs
**Solution:** Use setTimeout to set properties after element is in DOM:

```typescript
setTimeout(() => {
  element["investorData"] = jsonString;
}, 100);
```

### Challenge 5: Browser Caching

**Problem:** Old JavaScript files cached during development
**Solution:** Hard refresh (Ctrl+Shift+R) or disable cache in DevTools

---

## Migration Strategy

### Phase 1: Setup Infrastructure ✅

- Create separate Angular 20 project
- Configure build outputs
- Set up dual development servers

### Phase 2: Create First Web Component ✅

- Build investor detail as standalone component
- Register as custom element
- Test in isolation

### Phase 3: Integrate with Angular 10 ✅

- Create wrapper component
- Implement dynamic script loading
- Pass data between applications

### Phase 4: Production Optimization (Future)

- Implement cache busting strategy
- Optimize bundle sizes
- Add error boundaries
- Set up CI/CD pipeline

### Phase 5: Gradual Migration (Future)

- Migrate additional components one by one
- Eventually replace entire Angular 10 app
- Maintain backward compatibility throughout

---

## Benefits of This Approach

1. **Incremental Migration**

   - No big bang rewrite
   - Reduce risk
   - Continuous delivery

2. **Independent Development**

   - Teams can work on different versions
   - No merge conflicts between Angular versions
   - Separate testing and deployment

3. **Modern Features**

   - Use Angular 20 features immediately
   - Better performance
   - Latest tooling and APIs

4. **Proven Technology**

   - Web Components are standard
   - Broad browser support
   - Framework agnostic

5. **Flexibility**
   - Can integrate with other frameworks
   - Easy to reverse if needed
   - Modular architecture

---

## Technical Considerations

### Performance

- **Initial Load:** Slightly slower due to dual framework bootstrap
- **Runtime:** Excellent with Shadow DOM isolation
- **Bundle Size:** Manageable with lazy loading

### Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Shadow DOM v1 required
- No IE11 support

### SEO

- SSR possible with Angular Universal
- Web components crawlable by modern search engines

### Testing

- Angular 10: Jasmine/Karma
- Angular 20: Jest recommended
- E2E: Cypress or Playwright

---

## Future Enhancements

1. **State Management**

   - Shared state between Angular versions
   - Use RxJS observables or custom events

2. **Routing Integration**

   - Deep linking support
   - Browser history management

3. **Performance Monitoring**

   - Track web component load times
   - Monitor memory usage

4. **Developer Experience**
   - Add debugging tools
   - Improve error messages
   - Create component library

---

## Conclusion

This implementation proves that gradual Angular migration using Web Components is:

- ✅ Technically feasible
- ✅ Maintainable in production
- ✅ Scalable for large applications
- ✅ Low risk compared to full rewrites

The approach allows teams to adopt modern Angular features while maintaining existing functionality, making it ideal for enterprise applications with large codebases.
