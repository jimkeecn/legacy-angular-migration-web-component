import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="app-container">
      <header class="app-header">
        <div class="header-content">
          <div class="logo-section">
            <div class="logo-icon">🏢</div>
            <div class="logo-text">
              <h1>Hybrid Angular Platform</h1>
              <span class="version-badge">Angular 10 + 20</span>
            </div>
          </div>
          <nav class="main-nav">
            <a
              routerLink="/"
              routerLinkActive="active"
              [routerLinkActiveOptions]="{ exact: true }"
              class="nav-link"
            >
              <span class="nav-icon">🏠</span>
              <span class="nav-text">Home</span>
            </a>
            <a
              routerLink="/investor-lookup"
              routerLinkActive="active"
              class="nav-link"
            >
              <span class="nav-icon">🔍</span>
              <span class="nav-text">Investors</span>
            </a>
            <a routerLink="/login" routerLinkActive="active" class="nav-link">
              <span class="nav-icon">🔐</span>
              <span class="nav-text">Login</span>
            </a>
          </nav>
          <div class="header-actions">
            <button class="icon-btn" title="Help">❓</button>
            <button class="icon-btn" title="Settings">⚙️</button>
          </div>
        </div>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
      <footer class="app-footer">
        <div class="footer-content">
          <span>© 2025 Hybrid Angular Platform</span>
          <span class="footer-links">
            <a href="#" (click)="$event.preventDefault()">Documentation</a>
            <a href="#" (click)="$event.preventDefault()">Support</a>
          </span>
        </div>
      </footer>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        background-color: #f9fafb;
      }

      /* Header Styles */
      .app-header {
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        color: white;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        position: sticky;
        top: 0;
        z-index: 1000;
      }

      .header-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        align-items: center;
        padding: 0 20px;
        height: 70px;
        gap: 30px;
      }

      /* Logo Section */
      .logo-section {
        display: flex;
        align-items: center;
        gap: 12px;
        cursor: pointer;
        transition: transform 0.2s;
      }

      .logo-section:hover {
        transform: scale(1.02);
      }

      .logo-icon {
        font-size: 32px;
        line-height: 1;
      }

      .logo-text h1 {
        margin: 0;
        font-size: 20px;
        font-weight: 600;
        line-height: 1.2;
      }

      .version-badge {
        display: inline-block;
        font-size: 11px;
        background: rgba(255, 255, 255, 0.2);
        padding: 2px 8px;
        border-radius: 12px;
        font-weight: 500;
        margin-top: 2px;
      }

      /* Navigation */
      .main-nav {
        flex: 1;
        display: flex;
        align-items: center;
        gap: 8px;
      }

      .nav-link {
        display: flex;
        align-items: center;
        gap: 8px;
        color: white;
        text-decoration: none;
        padding: 10px 16px;
        border-radius: 8px;
        transition: all 0.2s;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
      }

      .nav-link:hover {
        background-color: rgba(255, 255, 255, 0.15);
        transform: translateY(-1px);
      }

      .nav-link.active {
        background-color: rgba(255, 255, 255, 0.25);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .nav-icon {
        font-size: 18px;
        line-height: 1;
      }

      .nav-text {
        line-height: 1;
      }

      .nav-divider {
        width: 1px;
        height: 30px;
        background: rgba(255, 255, 255, 0.3);
        margin: 0 10px;
      }

      .nav-label {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
      }

      /* Header Actions */
      .header-actions {
        display: flex;
        gap: 8px;
      }

      .icon-btn {
        background: rgba(255, 255, 255, 0.15);
        border: none;
        color: white;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        cursor: pointer;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .icon-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        transform: scale(1.05);
      }

      /* Main Content */
      .app-content {
        flex: 1;
        padding: 30px 20px;
        max-width: 1400px;
        width: 100%;
        margin: 0 auto;
      }

      /* Footer */
      .app-footer {
        background: white;
        border-top: 1px solid #e5e7eb;
        padding: 20px;
        margin-top: auto;
      }

      .footer-content {
        max-width: 1400px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        color: #6b7280;
      }

      .footer-links {
        display: flex;
        gap: 20px;
      }

      .footer-links a {
        color: #3b82f6;
        text-decoration: none;
        transition: color 0.2s;
      }

      .footer-links a:hover {
        color: #1e3a8a;
        text-decoration: underline;
      }

      /* Responsive Design */
      @media (max-width: 768px) {
        .header-content {
          flex-wrap: wrap;
          height: auto;
          padding: 15px 20px;
        }

        .logo-section {
          flex: 0 0 100%;
          margin-bottom: 10px;
        }

        .main-nav {
          flex: 1;
          overflow-x: auto;
        }

        .nav-text {
          display: none;
        }

        .nav-link {
          padding: 10px;
        }

        .footer-content {
          flex-direction: column;
          gap: 10px;
          text-align: center;
        }
      }
    `,
  ],
})
export class AppComponent {
  title = "main-legacy-app";
}
