import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import {
  DepartmentService,
  DepartmentNode,
} from "../services/department.service";
import { WebComponentLoaderService } from "../services/web-component-loader.service";

@Component({
  selector: "app-department-overview-element-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <button (click)="goBack()" class="back-btn">← Back to Home</button>
        <h2>Department Overview (Angular 20 Web Component)</h2>
        <button (click)="switchToLegacy()" class="switch-btn">
          Switch to Legacy ⚡
        </button>
      </div>

      <div class="new-banner">
        <span
          >✨ This is the NEW Angular 20 version with ng-zorro loaded as a Web
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
      <department-overview-element
        *ngIf="!loading && !error && departmentData"
        #webComponent
      >
      </department-overview-element>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        max-width: 1400px;
        margin: 0 auto;
        padding: 20px;
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

      .back-btn,
      .switch-btn {
        flex-shrink: 0;
        padding: 10px 20px;
        border: none;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
      }

      .back-btn {
        background-color: #6b7280;
        color: white;
      }

      .back-btn:hover {
        background-color: #4b5563;
      }

      .switch-btn {
        background-color: #f59e0b;
        color: white;
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
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        cursor: pointer;
      }

      .error-message button:hover {
        background-color: #dc2626;
      }

      department-overview-element {
        display: block;
        margin: 20px 0;
      }
    `,
  ],
})
export class DepartmentOverviewElementWrapperComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("webComponent", { read: ElementRef }) webComponent?: ElementRef;

  departmentData: DepartmentNode[] = [];
  departmentDataJson: string = "";
  loading = true;
  error: string | null = null;

  constructor(
    private router: Router,
    private departmentService: DepartmentService,
    private webComponentLoader: WebComponentLoaderService
  ) {}

  ngOnInit() {
    // Load department data from service
    this.departmentService.getDepartmentTree().subscribe((data) => {
      this.departmentData = data;

      if (this.departmentData && this.departmentData.length > 0) {
        // Convert to JSON string for passing to web component
        this.departmentDataJson = JSON.stringify(this.departmentData);
      } else {
        this.error = "No department data available";
      }
    });

    this.loadWebComponent();
  }

  async loadWebComponent() {
    try {
      this.loading = true;
      this.error = null;

      // Use lazy loading for this specific component
      await this.webComponentLoader.loadWebComponent(
        "department-overview-element"
      );

      // Verify custom element is defined
      this.webComponentLoader.isCustomElementDefined(
        "department-overview-element"
      );

      this.loading = false;

      // Set the data on the element
      setTimeout(() => {
        this.setDepartmentDataOnElement();
      }, 100);
    } catch (err) {
      console.error("Failed to load web component:", err);
      this.error =
        "Failed to load the Angular 20 web component. Please ensure the component server is running on port 4201.";
      this.loading = false;
    }
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  switchToLegacy() {
    this.router.navigate(["/department-overview", "legacy"]);
  }

  retry() {
    this.loadWebComponent();
  }

  ngAfterViewInit() {
    // Element not ready yet
  }

  private setDepartmentDataOnElement() {
    // Use the shared service to set data on the element
    this.webComponentLoader.setElementData(
      "department-overview-element",
      "departmentData",
      this.departmentDataJson
    );
  }
}
