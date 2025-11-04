import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService, User } from "../services/user.service";
import { WebComponentLoaderService } from "../services/web-component-loader.service";

@Component({
  selector: "app-user-management-element-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <button (click)="goBack()" class="back-btn">← Back to Home</button>
        <h2>User Management (Angular 20 Web Component)</h2>
        <button (click)="switchToLegacy()" class="switch-btn">
          Switch to Legacy ⚡
        </button>
      </div>

      <div class="new-banner">
        <span
          >✨ This is the NEW Angular 20 version with ag-Grid loaded as a Web
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
      <user-management-element
        *ngIf="!loading && !error && userData"
        #webComponent
      >
      </user-management-element>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        max-width: 1400px;
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

      user-management-element {
        display: block;
        margin: 20px 0;
      }
    `,
  ],
})
export class UserManagementElementWrapperComponent
  implements OnInit, AfterViewInit
{
  @ViewChild("webComponent", { read: ElementRef }) webComponent?: ElementRef;

  userData: User[] = [];
  userDataJson: string = "";
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private webComponentLoader: WebComponentLoaderService
  ) {}

  ngOnInit() {
    // Load user data from service
    this.userData = this.userService.getAllUsers();

    if (this.userData && this.userData.length > 0) {
      // Convert to JSON string for passing to web component
      this.userDataJson = JSON.stringify(this.userData);
    } else {
      this.error = "No user data available";
    }

    this.loadWebComponent();
  }

  async loadWebComponent() {
    try {
      this.loading = true;
      this.error = null;

      // Use the shared service to load web component scripts
      await this.webComponentLoader.loadWebComponent("user-management");

      // Verify custom element is defined
      this.webComponentLoader.isCustomElementDefined("user-management-element");

      this.loading = false;

      // Set the data on the element
      setTimeout(() => {
        this.setUserDataOnElement();
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
    this.router.navigate(["/user-management"]);
  }

  retry() {
    this.loadWebComponent();
  }

  ngAfterViewInit() {
    // Element not ready yet
  }

  private setUserDataOnElement() {
    // Use the shared service to set data on the element
    this.webComponentLoader.setElementData(
      "user-management-element",
      "userData",
      this.userDataJson
    );
  }
}
