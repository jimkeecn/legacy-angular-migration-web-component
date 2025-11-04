import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "../../environments/environment";
import { InvestorService, InvestorDetail } from "../services/investor.service";

@Component({
  selector: "app-investor-detail-element-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <h2>Investor Details (Angular 20 Web Component)</h2>
        <button (click)="goBack()">← Back to Lookup</button>
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
      <investor-detail-element
        *ngIf="!loading && !error && investorData"
        #webComponent
      >
      </investor-detail-element>

      <div class="actions" *ngIf="!loading && !error">
        <button (click)="viewLegacyVersion()" class="btn-legacy">
          View Legacy Version (Angular 10)
        </button>
      </div>
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
      }

      .wrapper-header h2 {
        margin: 0;
        color: #1e3a8a;
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

      .actions {
        margin-top: 30px;
        text-align: center;
      }

      .btn-legacy {
        background-color: #f59e0b;
      }

      .btn-legacy:hover {
        background-color: #d97706;
      }

      investor-detail-element {
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
  private scriptLoaded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private investorService: InvestorService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.investorId = params["id"];

      // Load investor data from service
      if (this.investorId) {
        this.investorData = this.investorService.getInvestorById(
          this.investorId
        );

        if (this.investorData) {
          // Convert to JSON string for passing to web component
          this.investorDataJson = JSON.stringify(this.investorData);
          console.log(
            "✅ Investor data loaded from Angular 10:",
            this.investorData.name
          );
          console.log(
            "📤 Sending to web component (JSON):",
            this.investorDataJson
          );
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

      // Always reload scripts during development (comment out for production)
      const forceReload = !environment.production;
      
      if (!this.scriptLoaded || forceReload) {
        console.log("Loading Angular 20 web component...");

        // Angular 20's new application builder outputs to browser/ subfolder
        const baseUrl = environment.webComponentUrl;
        const timestamp = new Date().getTime();

        // Remove old scripts if they exist (for reload)
        const oldPolyfills = document.getElementById("wc-polyfills");
        const oldMain = document.getElementById("wc-main");
        if (oldPolyfills) oldPolyfills.remove();
        if (oldMain) oldMain.remove();

        // Load polyfills first (if needed)
        try {
          await this.loadScript(
            "wc-polyfills",
            `${baseUrl}/browser/polyfills.js?v=${timestamp}`
          );
        } catch (e) {
          console.log("Polyfills already loaded or not needed");
        }

        // Load the main application file with cache busting
        await this.loadScript("wc-main", `${baseUrl}/browser/main.js?v=${timestamp}`);

        this.scriptLoaded = true;
        console.log("Angular 20 web component loaded successfully");

        // Wait longer for custom element to fully register
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Verify custom element is defined
        if (customElements.get("investor-detail-element")) {
          console.log("✅ Custom element 'investor-detail-element' is defined");
        } else {
          console.warn("⚠️ Custom element 'investor-detail-element' not found");
        }
      }

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

  private loadScript(id: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const existing = document.getElementById(id);
      if (existing) {
        console.log(`Script ${id} already loaded`);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.type = "module"; // Important: use type="module" for ES modules
      script.crossOrigin = "anonymous";

      script.onload = () => {
        console.log(`✅ Script loaded: ${src}`);
        resolve();
      };

      script.onerror = (error) => {
        console.error(`❌ Script load error: ${src}`, error);
        reject(new Error(`Failed to load script: ${src}`));
      };

      document.head.appendChild(script); // Append to head for modules
    });
  }

  goBack() {
    this.router.navigate(["/investor-lookup"]);
  }

  viewLegacyVersion() {
    this.router.navigate(["/investor-detail"], {
      queryParams: { id: this.investorId },
    });
  }

  retry() {
    this.loadWebComponent();
  }

  ngAfterViewInit() {
    // This runs too early (before loading=false), so we use setTimeout in loadWebComponent instead
    console.log("🔧 ngAfterViewInit called (element not ready yet)");
  }

  private setInvestorDataOnElement() {
    console.log("🔧 setInvestorDataOnElement called");

    // Query the element directly since ViewChild won't work with dynamic rendering
    const element = document.querySelector("investor-detail-element");

    if (element) {
      console.log("🔧 Element found:", element);
      console.log("🔧 Element tag:", element.tagName);

      if (this.investorDataJson) {
        // Try multiple approaches to set the data
        console.log("🔧 Attempting to set investorData property");
        console.log("🔧 Data to set:", this.investorDataJson);

        // Approach 1: Direct property (camelCase)
        (element as any)["investorData"] = this.investorDataJson;

        // Approach 2: Try with hyphenated name
        (element as any)["investor-data"] = this.investorDataJson;

        // Approach 3: setAttribute
        element.setAttribute("investor-data", this.investorDataJson);

        console.log(
          "📊 investorData property:",
          (element as any)["investorData"]
        );
        console.log(
          "📊 investor-data property:",
          (element as any)["investor-data"]
        );
        console.log(
          "📊 investor-data attribute:",
          element.getAttribute("investor-data")
        );
      }
    } else {
      console.warn("⚠️ Element not found in DOM");
    }
  }
}
