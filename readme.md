# Web Component Hooks - Hybrid Angular Migration

Proof-of-concept for migrating Angular 10 to Angular 20 using Web Components.

## Architecture

- **Angular 10 (Legacy)**: Main host application on port 4200
- **Angular 20 (Web Components)**: Standalone components loaded dynamically on port 4201
- **Hybrid Approach**: Users can switch between legacy and new versions of each feature

## Features

### Investor Detail

- Display investor information with portfolio data
- Uses Angular 20 web component with signals

### User Management

- ag-Grid table with user data (ID, name, email, role, department)
- Full CRUD operations simulation

### Department Overview

- ng-zorro tree view displaying hierarchical department structure
- Search functionality with live statistics
- Signal-based reactivity demo

## Tech Stack

| Component         | Angular 10 | Angular 20 |
| ----------------- | ---------- | ---------- |
| **Version**       | v10.2.5    | v20.0.0    |
| **Node**          | 14.21.3    | 24.8.0     |
| **TypeScript**    | 4.0.2      | 5.8.2      |
| **ag-Grid**       | v25.3.0    | v34.3.1    |
| **ng-zorro-antd** | v10.2.2    | v20.4.0    |

## Quick Start

### Development Mode (All Components)

```bash
# Terminal 1 - Start Angular 10 legacy app
npm run start:legacy

# Terminal 2 - Start Angular 20 web components (all in one bundle)
npm run start:element
```

- Legacy app: http://localhost:4200
- Web components: http://localhost:4201

### Production Build (All Components)

```bash
# Build both apps
npm run build:prod

# Serve production builds
npm run serve:prod
```

- Production app: http://localhost:4206
- Production web components: http://localhost:4205

### Lazy Loading Mode (Separate Bundles)

```bash
# Build separate component bundles
npm run build:lazy

# Serve lazy-loaded components in one terminal
npm run serve:lazy:components

# Serve legacy application in another terminal
npm run serve:lazy:legacy
```

- Production app: http://localhost:4206
- Component bundles served from: http://localhost:4205
  - Investor Detail: `/investor-detail/browser/main.js`
  - User Management: `/user-management/browser/main.js`
  - Department Overview: `/department-overview/browser/main.js`

**Benefits of Lazy Loading:**

- Each component loads only when navigated to
- Reduced initial bundle size
- Each component can be deployed to separate CDN
- Independent versioning per component

## Key Solutions

### Zone.js Conflict

- Angular 20 `polyfills.ts` is empty - uses Angular 10's zone.js

### Animation Issues

- `provideAnimations()` in Angular 20 `main.ts`
- `@HostBinding("@.disabled")` in components to disable animations

### Styling Isolation

- `ViewEncapsulation.Emulated` with `:host ::ng-deep` scoping
- Prevents style leakage between legacy and web components

### Node Version Management

- Use `NODE_OPTIONS=--openssl-legacy-provider` for Angular 10 production builds
- Switch Node versions as needed (nvm)

## Project Structure

```
apps/
├── main-legacy-app/          # Angular 10 host application
│   ├── src/app/
│   │   ├── investor-detail/
│   │   ├── user-management/
│   │   ├── department-overview/
│   │   └── services/
│   └── dist/main-legacy-app/ # Production build output
│
└── web-components/  # Angular 20 web components
    ├── src/app/
    │   ├── web-components/
    │   ├── user-management-element/
    │   └── department-overview-element/
    └── dist/web-components/ # Production build output
```

## Web Component Registration

Three custom elements registered in Angular 20:

- `<web-components>`
- `<user-management-element>`
- `<department-overview-element>`

## Testing Checklist

- ✅ Navigation between all pages
- ✅ Switch between legacy/new versions
- ✅ ag-Grid sorting, filtering, pagination
- ✅ ng-zorro tree expand/collapse and search
- ✅ Signal reactivity (search count, statistics)
- ✅ No zone.js or animation errors
- ✅ Styling isolation (no leakage)
- ✅ Lazy loading - separate component bundles

## Lazy Loading Implementation

**Status**: ✅ Implemented

Each web component now has its own entry point and builds to a separate bundle:

### Entry Points:

- `src/main-investor.ts` → `dist/web-components/investor-detail/browser/main.js`
- `src/main-user.ts` → `dist/web-components/user-management/browser/main.js`
- `src/main-department.ts` → `dist/web-components/department-overview/browser/main.js`

### Build Configurations:

- `build-investor`: Investor detail component only
- `build-user`: User management with ag-Grid dependencies
- `build-department`: Department overview with ng-zorro dependencies

### WebComponentLoaderService:

- Component-to-script mapping for route-based loading
- `loadWebComponent(componentName)` loads only the required component
- Automatic custom element registration detection
- Separate stylesheet loading per component

### CDN Deployment Ready:

- Each bundle is independently deployable
- No shared chunks between components
- Output hashing disabled for predictable file names
- Perfect for CDN distribution with separate versioning
