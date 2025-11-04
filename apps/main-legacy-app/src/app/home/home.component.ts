import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  template: `
    <div class="home-container">
      <div class="welcome-section">
        <h1>Welcome to Hybrid Angular Platform</h1>
        <p class="subtitle">
          Experience the seamless integration of Angular 10 and Angular 20
        </p>
      </div>

      <div class="cards-grid">
        <div class="feature-card" (click)="navigateTo('/investor-lookup')">
          <div class="card-icon">🔍</div>
          <h3>Investor Lookup</h3>
          <p>Search and browse through investor accounts</p>
          <button class="card-btn">View Investors →</button>
        </div>

        <div class="feature-card" (click)="navigateTo('/user-management')">
          <div class="card-icon">👥</div>
          <h3>User Management</h3>
          <p>View and manage system users with ag-Grid</p>
          <button class="card-btn">Manage Users →</button>
        </div>

        <div class="feature-card" (click)="navigateTo('/department-overview')">
          <div class="card-icon">🏛️</div>
          <h3>Department Overview</h3>
          <p>Explore organizational structure with ng-zorro tree view</p>
          <button class="card-btn">View Departments →</button>
        </div>

        <div class="feature-card demo-card">
          <div class="card-icon">⚡</div>
          <h3>Version Comparison</h3>
          <p>Compare Angular 10 (Legacy) vs Angular 20 (Web Component)</p>
          <div class="version-badges">
            <span class="badge badge-legacy">Angular 10</span>
            <span class="badge badge-new">Angular 20</span>
          </div>
        </div>

        <div class="feature-card info-card">
          <div class="card-icon">📊</div>
          <h3>Key Features</h3>
          <ul class="features-list">
            <li>✅ Side-by-side framework integration</li>
            <li>✅ Hot-reload development workflow</li>
            <li>✅ Shadow DOM encapsulation</li>
            <li>✅ Seamless version switching</li>
          </ul>
        </div>
      </div>

      <div class="info-section">
        <div class="info-box">
          <h4>🎯 How It Works</h4>
          <p>
            This application demonstrates a hybrid approach where Angular 10
            (legacy) and Angular 20 (modern) work together using Web Components.
            Navigate through investor records and switch between framework
            versions seamlessly.
          </p>
        </div>

        <div class="quick-links">
          <h4>Quick Navigation</h4>
          <div class="links-grid">
            <a (click)="navigateTo('/investor-lookup')" class="quick-link">
              <span class="link-icon">🔍</span>
              <span>Investor Lookup</span>
            </a>
            <a (click)="navigateTo('/user-management')" class="quick-link">
              <span class="link-icon">👥</span>
              <span>User Management</span>
            </a>
            <a (click)="navigateTo('/department-overview')" class="quick-link">
              <span class="link-icon">🏛️</span>
              <span>Department Overview</span>
            </a>
            <a (click)="navigateTo('/login')" class="quick-link">
              <span class="link-icon">🔐</span>
              <span>Login Page</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-container {
        max-width: 1200px;
        margin: 0 auto;
      }

      .welcome-section {
        text-align: center;
        margin-bottom: 50px;
        padding: 40px 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 16px;
        color: white;
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
      }

      .welcome-section h1 {
        margin: 0 0 15px 0;
        font-size: 42px;
        font-weight: 700;
      }

      .subtitle {
        margin: 0;
        font-size: 18px;
        opacity: 0.95;
      }

      .cards-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 25px;
        margin-bottom: 40px;
      }

      .feature-card {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        border-color: #3b82f6;
      }

      .demo-card {
        cursor: default;
      }

      .demo-card:hover {
        border-color: transparent;
      }

      .info-card {
        cursor: default;
      }

      .info-card:hover {
        border-color: transparent;
      }

      .card-icon {
        font-size: 48px;
        margin-bottom: 15px;
      }

      .feature-card h3 {
        margin: 0 0 10px 0;
        color: #1e3a8a;
        font-size: 24px;
      }

      .feature-card p {
        color: #6b7280;
        margin: 0 0 20px 0;
        line-height: 1.6;
      }

      .card-btn {
        background: linear-gradient(135deg, #3b82f6 0%, #1e3a8a 100%);
        color: white;
        border: none;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        width: 100%;
      }

      .card-btn:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
      }

      .version-badges {
        display: flex;
        gap: 10px;
        justify-content: center;
      }

      .badge {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 20px;
        font-size: 13px;
        font-weight: 600;
      }

      .badge-legacy {
        background: #fef3c7;
        color: #92400e;
      }

      .badge-new {
        background: #d1fae5;
        color: #065f46;
      }

      .features-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }

      .features-list li {
        padding: 8px 0;
        color: #374151;
        font-size: 15px;
      }

      .info-section {
        display: grid;
        grid-template-columns: 2fr 1fr;
        gap: 25px;
        margin-top: 40px;
      }

      .info-box {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .info-box h4 {
        margin: 0 0 15px 0;
        color: #1e3a8a;
        font-size: 20px;
      }

      .info-box p {
        margin: 0;
        color: #6b7280;
        line-height: 1.7;
      }

      .quick-links {
        background: white;
        padding: 30px;
        border-radius: 12px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .quick-links h4 {
        margin: 0 0 20px 0;
        color: #1e3a8a;
        font-size: 20px;
      }

      .links-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .quick-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 16px;
        background: #f3f4f6;
        border-radius: 8px;
        text-decoration: none;
        color: #374151;
        transition: all 0.2s;
        cursor: pointer;
      }

      .quick-link:hover {
        background: #e5e7eb;
        transform: translateX(5px);
      }

      .link-icon {
        font-size: 24px;
      }

      @media (max-width: 768px) {
        .welcome-section h1 {
          font-size: 32px;
        }

        .cards-grid {
          grid-template-columns: 1fr;
        }

        .info-section {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateTo(route: string) {
    this.router.navigate([route]);
  }
}
