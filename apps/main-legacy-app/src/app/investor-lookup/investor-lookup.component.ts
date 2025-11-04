import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

interface Investor {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  status: string;
}

@Component({
  selector: "app-investor-lookup",
  template: `
    <div class="container">
      <h2>Investor Lookup</h2>
      <p class="description">Search for investors in the system</p>

      <div class="search-section">
        <input
          type="text"
          [(ngModel)]="searchTerm"
          placeholder="Search by name or account number..."
          (input)="onSearch()"
        />
        <button (click)="onSearch()">Search</button>
      </div>

      <div class="results-section">
        <h3>{{ searchTerm ? "Search Results" : "All Investors" }}</h3>

        <div class="investor-list" *ngIf="filteredInvestors.length > 0">
          <div class="investor-card" *ngFor="let investor of filteredInvestors">
            <div class="investor-info">
              <h4>{{ investor.name }}</h4>
              <p><strong>Account:</strong> {{ investor.accountNumber }}</p>
              <p><strong>Balance:</strong> {{ investor.balance | currency }}</p>
              <p>
                <strong>Status:</strong>
                <span [class]="'status-' + investor.status.toLowerCase()">
                  {{ investor.status }}
                </span>
              </p>
            </div>
            <div class="investor-actions">
              <button (click)="viewDetails(investor.id, 'legacy')">
                View (Legacy)
              </button>
              <button (click)="viewDetails(investor.id, 'new')" class="btn-new">
                View (New) 🚀
              </button>
            </div>
          </div>
        </div>

        <div class="no-results" *ngIf="filteredInvestors.length === 0">
          <p>No investors found matching "{{ searchTerm }}"</p>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 1000px;
        margin: 0 auto;
      }

      h2 {
        color: #1e3a8a;
        margin-bottom: 10px;
      }

      .description {
        color: #666;
        margin-bottom: 30px;
      }

      .search-section {
        display: flex;
        gap: 10px;
        margin-bottom: 30px;
      }

      .search-section input {
        flex: 1;
        padding: 12px;
      }

      .search-section button {
        padding: 12px 24px;
      }

      .results-section h3 {
        margin-bottom: 20px;
        color: #333;
      }

      .investor-list {
        display: flex;
        flex-direction: column;
        gap: 15px;
      }

      .investor-card {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .investor-info h4 {
        margin: 0 0 10px 0;
        color: #1e3a8a;
      }

      .investor-info p {
        margin: 5px 0;
        font-size: 14px;
        color: #666;
      }

      .investor-actions {
        display: flex;
        gap: 10px;
      }

      .btn-new {
        background-color: #10b981;
      }

      .btn-new:hover {
        background-color: #059669;
      }

      .status-active {
        color: #10b981;
        font-weight: bold;
      }

      .status-inactive {
        color: #ef4444;
        font-weight: bold;
      }

      .no-results {
        text-align: center;
        padding: 40px;
        background: white;
        border-radius: 8px;
        color: #666;
      }
    `,
  ],
})
export class InvestorLookupComponent implements OnInit {
  searchTerm = "";

  // Mock investor data
  investors: Investor[] = [
    {
      id: "1",
      name: "John Smith",
      accountNumber: "ACC-1001",
      balance: 125000,
      status: "Active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      accountNumber: "ACC-1002",
      balance: 87500,
      status: "Active",
    },
    {
      id: "3",
      name: "Michael Brown",
      accountNumber: "ACC-1003",
      balance: 245000,
      status: "Active",
    },
    {
      id: "4",
      name: "Emily Davis",
      accountNumber: "ACC-1004",
      balance: 52000,
      status: "Inactive",
    },
    {
      id: "5",
      name: "Robert Wilson",
      accountNumber: "ACC-1005",
      balance: 198000,
      status: "Active",
    },
  ];

  filteredInvestors: Investor[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    // Show all investors by default
    this.filteredInvestors = this.investors;
  }

  onSearch() {
    if (!this.searchTerm.trim()) {
      // Show all investors when search is cleared
      this.filteredInvestors = this.investors;
      return;
    }

    const term = this.searchTerm.toLowerCase();
    this.filteredInvestors = this.investors.filter(
      (investor) =>
        investor.name.toLowerCase().includes(term) ||
        investor.accountNumber.toLowerCase().includes(term)
    );
  }

  viewDetails(investorId: string, version: "legacy" | "new") {
    this.router.navigate(["/investor-detail", investorId, version]);
  }
}
