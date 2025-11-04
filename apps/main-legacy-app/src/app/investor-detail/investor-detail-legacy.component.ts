import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InvestorService, InvestorDetail } from "../services/investor.service";

@Component({
  selector: "app-investor-detail-legacy",
  template: `
    <div class="container">
      <div class="header">
        <h2>Investor Details (Legacy Angular 10)</h2>
        <button (click)="goBack()">← Back to Lookup</button>
      </div>

      <div class="legacy-banner">
        <span>⚠️ This is the OLD Angular 10 version</span>
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

        <div class="actions">
          <button (click)="viewNewVersion()">
            Try New Version (Angular 20) 🚀
          </button>
        </div>
      </div>

      <div class="error" *ngIf="!investor">
        <p>Investor not found</p>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 900px;
        margin: 0 auto;
      }

      .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
      }

      .header h2 {
        margin: 0;
        color: #1e3a8a;
      }

      .legacy-banner {
        background-color: #fef3c7;
        border: 2px solid #f59e0b;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        color: #92400e;
      }

      .detail-card {
        background: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .detail-section {
        margin-bottom: 30px;
        padding-bottom: 20px;
        border-bottom: 1px solid #e5e7eb;
      }

      .detail-section:last-child {
        border-bottom: none;
      }

      .detail-section h3 {
        margin: 0 0 20px 0;
        color: #374151;
        font-size: 18px;
      }

      .detail-row {
        display: flex;
        margin-bottom: 15px;
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
        font-size: 20px;
        font-weight: bold;
        color: #10b981;
      }

      .status-active {
        color: #10b981;
        font-weight: bold;
      }

      .status-inactive {
        color: #ef4444;
        font-weight: bold;
      }

      .actions {
        margin-top: 30px;
        text-align: center;
      }

      .actions button {
        background-color: #10b981;
        padding: 14px 28px;
        font-size: 16px;
      }

      .actions button:hover {
        background-color: #059669;
      }

      .error {
        text-align: center;
        padding: 40px;
        background: white;
        border-radius: 8px;
        color: #ef4444;
      }
    `,
  ],
})
export class InvestorDetailLegacyComponent implements OnInit {
  investor: InvestorDetail | null = null;
  investorId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investorService: InvestorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.investorId = params["id"];
      if (this.investorId) {
        this.loadInvestorDetails(this.investorId);
      }
    });
  }

  loadInvestorDetails(id: string) {
    this.investor = this.investorService.getInvestorById(id) || null;
  }

  goBack() {
    this.router.navigate(["/investor-lookup"]);
  }

  viewNewVersion() {
    this.router.navigate(["/investor-detail-new"], {
      queryParams: { id: this.investorId },
    });
  }
}
