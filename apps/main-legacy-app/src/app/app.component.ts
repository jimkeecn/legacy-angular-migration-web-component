import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>Legacy Angular 10 Application</h1>
        <nav>
          <a routerLink="/login" routerLinkActive="active">Login</a>
          <a routerLink="/investor-lookup" routerLinkActive="active"
            >Investor Lookup</a
          >
          <a routerLink="/investor-detail" routerLinkActive="active"
            >Investor Detail (Legacy)</a
          >
          <a routerLink="/investor-detail-new" routerLinkActive="active"
            >Investor Detail (New)</a
          >
        </nav>
      </header>
      <main class="app-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [
    `
      .app-container {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .app-header {
        background-color: #1e3a8a;
        color: white;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .app-header h1 {
        margin: 0 0 15px 0;
        font-size: 24px;
      }

      .app-header nav {
        display: flex;
        gap: 20px;
      }

      .app-header nav a {
        color: white;
        text-decoration: none;
        padding: 8px 16px;
        border-radius: 4px;
        transition: background-color 0.3s;
      }

      .app-header nav a:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .app-header nav a.active {
        background-color: rgba(255, 255, 255, 0.2);
        font-weight: bold;
      }

      .app-content {
        flex: 1;
        padding: 20px;
      }
    `,
  ],
})
export class AppComponent {
  title = "main-legacy-app";
}
