import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { InvestorService, InvestorDetail } from "../services/investor.service";
import { WebComponentLoaderService } from "../services/web-component-loader.service";

@Component({
  selector: "app-web-components-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <button (click)="goBack()" class="back-btn">← Back to Lookup</button>
        <h2>Investor Details (Angular 20 Web Component)</h2>
        <button (click)="switchToLegacy()" class="switch-btn">
          Switch to Angular 10 ⚡
        </button>
      </div>

      <div class="new-banner">
        <span
          >✨ This is the NEW Angular 20 version loaded as a Web
          Component!</span
        >
      </div>

      <div class="loading-message" *ngIf="loading">
        <p>Loading Angular 20 Web Component...</p>
      </div>

      <div class="error-message" *ngIf="error">
        <p>{{ error }}</p>
        <small>Make sure the Angular 20 app is running on port 4201</small>
        <button (click)="retry()">Retry</button>
      </div>

      <!-- Web Component will be rendered here -->
      <web-components *ngIf="!loading && !error && investorData" #webComponent>
      </web-components>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        max-width: 900px;
        margin: 0 auto;
      }

      .wrapper-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        gap: 15px;
      }

      .wrapper-header h2 {
        flex: 1;
        margin: 0;
        color: #1e3a8a;
        text-align: center;
      }

      .back-btn {
        flex-shrink: 0;
        background-color: #6b7280;
        padding: 10px 20px;
      }

      .back-btn:hover {
        background-color: #4b5563;
      }

      .switch-btn {
        flex-shrink: 0;
        background-color: #f59e0b;
        padding: 10px 20px;
        font-weight: bold;
      }

      .switch-btn:hover {
        background-color: #d97706;
      }

      .new-banner {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(16, 185, 129, 0.3);
      }

      .loading-message {
        text-align: center;
        padding: 60px 20px;
        background: white;
        border-radius: 8px;
        color: #666;
      }

      .loading-message p {
        margin: 0;
        font-size: 18px;
      }

      .error-message {
        text-align: center;
        padding: 40px 20px;
        background: #fee2e2;
        border: 2px solid #ef4444;
        border-radius: 8px;
        color: #991b1b;
      }

      .error-message p {
        margin: 0 0 10px 0;
        font-size: 16px;
        font-weight: bold;
      }

      .error-message small {
        display: block;
        margin-bottom: 20px;
        color: #7f1d1d;
      }

      .error-message button {
        background-color: #ef4444;
      }

      .error-message button:hover {
        background-color: #dc2626;
      }

      web-components {
        display: block;
        margin: 20px 0;
      }
    `,
  ],
})
export class InvestorDetailElementWrapperComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("webComponent", { read: ElementRef }) webComponent?: ElementRef;

  investorId: string | null = null;
  investorData: InvestorDetail | undefined;
  investorDataJson: string = "";
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investorService: InvestorService,
    private webComponentLoader: WebComponentLoaderService
  ) {}

  ngOnInit() {
    this.route.parent?.params.subscribe((params) => {
      this.investorId = params["id"];

      // Load investor data from service
      if (this.investorId) {
        this.investorData = this.investorService.getInvestorById(
          this.investorId
        );

        if (this.investorData) {
          // Convert to JSON string for passing to web component
          this.investorDataJson = JSON.stringify(this.investorData);
        } else {
          this.error = `Investor not found with ID: ${this.investorId}`;
        }
      }
    });

    this.loadWebComponent();
  }

  async loadWebComponent() {
    try {
      this.loading = true;
      this.error = null;

      // Use lazy loading for this specific component
      await this.webComponentLoader.loadWebComponent("web-components");

      // Verify custom element is defined
      this.webComponentLoader.isCustomElementDefined("web-components");

      this.loading = false;

      // After loading completes and element renders, set the data
      setTimeout(() => {
        this.setInvestorDataOnElement();
      }, 100);
    } catch (err) {
      console.error("Failed to load web component:", err);
      this.error =
        "Failed to load the Angular 20 web component. Please ensure the component server is running on port 4201.";
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(["/investor-lookup"]);
  }

  switchToLegacy() {
    if (this.investorId) {
      this.router.navigate(["/investor-detail", this.investorId, "legacy"]);
    }
  }

  retry() {
    this.loadWebComponent();
  }

  ngAfterViewInit() {
    // This runs too early (before loading=false), so we use setTimeout in loadWebComponent instead
    console.log("🔧 ngAfterViewInit called (element not ready yet)");
  }

  private setInvestorDataOnElement() {
    // Use the shared service to set data on the element
    this.webComponentLoader.setElementData(
      "web-components",
      "investorData",
      this.investorDataJson
    );
  }
}
