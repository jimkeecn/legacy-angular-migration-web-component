import {
  Component,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { InvestorDetail } from "./services/investor-data.service";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [CommonModule],
  providers: [],
  encapsulation: ViewEncapsulation.ShadowDom, // Use Shadow DOM for style isolation
  template: `
    <div class="component-container">
      <div class="header-banner">
        <span>🚀 Powered by Angular 20 (Web Component)</span>
      </div>

      <div class="detail-card" *ngIf="investor">
        <div class="detail-section">
          <h3>Personal Information</h3>
          <div class="detail-row">
            <label>Name:</label>
            <span>{{ investor.name }}</span>
          </div>
          <div class="detail-row">
            <label>Account Number:</label>
            <span>{{ investor.accountNumber }}</span>
          </div>
          <div class="detail-row">
            <label>Status:</label>
            <span [class]="'status-' + investor.status.toLowerCase()">
              {{ investor.status }}
            </span>
          </div>
        </div>

        <div class="detail-section">
          <h3>Contact Information</h3>
          <div class="detail-row">
            <label>Email:</label>
            <span>{{ investor.email }}</span>
          </div>
          <div class="detail-row">
            <label>Phone:</label>
            <span>{{ investor.phone }}</span>
          </div>
          <div class="detail-row">
            <label>Address:</label>
            <span>{{ investor.address }}</span>
          </div>
        </div>

        <div class="detail-section">
          <h3>Account Information</h3>
          <div class="detail-row">
            <label>Current Balance:</label>
            <span class="balance">{{ investor.balance | currency }}</span>
          </div>
          <div class="detail-row">
            <label>Member Since:</label>
            <span>{{ investor.joinDate }}</span>
          </div>
        </div>

        <div class="features">
          <h4>✨ Angular 20 Features:</h4>
          <ul>
            <li>Standalone Component Architecture</li>
            <li>Shadow DOM Encapsulation</li>
            <li>Custom Element (Web Component)</li>
            <li>Hot Module Replacement</li>
            <li>Improved Performance</li>
          </ul>
        </div>
      </div>

      <div class="info" *ngIf="!investor">
        <p>
          ℹ️ No investor data provided. Please specify an investor-data
          attribute.
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
      }

      * {
        box-sizing: border-box;
      }

      .component-container {
        max-width: 100%;
      }

      .header-banner {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
        animation: slideIn 0.5s ease-out;
      }

      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .detail-card {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        animation: fadeIn 0.6s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      .detail-section {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 2px solid #e5e7eb;
      }

      .detail-section:last-of-type {
        border-bottom: none;
      }

      .detail-section h3 {
        margin: 0 0 20px 0;
        color: #1e3a8a;
        font-size: 18px;
        font-weight: 600;
      }

      .detail-row {
        display: flex;
        margin-bottom: 15px;
        align-items: flex-start;
      }

      .detail-row label {
        flex: 0 0 200px;
        font-weight: 600;
        color: #6b7280;
      }

      .detail-row span {
        flex: 1;
        color: #111827;
      }

      .balance {
        font-size: 24px;
        font-weight: bold;
        color: #10b981;
      }

      .status-active {
        color: #10b981;
        font-weight: bold;
        padding: 4px 12px;
        background-color: #d1fae5;
        border-radius: 4px;
        display: inline-block;
      }

      .status-inactive {
        color: #ef4444;
        font-weight: bold;
        padding: 4px 12px;
        background-color: #fee2e2;
        border-radius: 4px;
        display: inline-block;
      }

      .features {
        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
        padding: 20px;
        border-radius: 8px;
        margin-top: 20px;
      }

      .features h4 {
        margin: 0 0 15px 0;
        color: #0369a1;
        font-size: 16px;
      }

      .features ul {
        margin: 0;
        padding-left: 20px;
        color: #0c4a6e;
      }

      .features li {
        margin-bottom: 8px;
      }

      .error {
        text-align: center;
        padding: 40px;
        background: #fee2e2;
        border: 2px solid #ef4444;
        border-radius: 8px;
        color: #991b1b;
      }

      .error p {
        margin: 0;
        font-size: 16px;
        font-weight: bold;
      }

      .info {
        text-align: center;
        padding: 40px;
        background: #f0f9ff;
        border: 2px solid #0369a1;
        border-radius: 8px;
        color: #0c4a6e;
      }

      .info p {
        margin: 0;
        font-size: 16px;
      }
    `,
  ],
})
export class AppComponent implements OnInit, OnChanges {
  @Input("investor-data") investorData?: string | InvestorDetail;

  investor: InvestorDetail | undefined;

  constructor() {}

  ngOnInit() {
    // Process the investor data
    this.processInvestorData();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes["investorData"]) {
      this.processInvestorData();
    }
  }

  private processInvestorData() {
    const value = this.investorData;

    if (typeof value === "string") {
      try {
        this.investor = JSON.parse(value);
      } catch (e) {
        // Failed to parse investor data
      }
    } else if (value) {
      this.investor = value;
    }
  }
}
