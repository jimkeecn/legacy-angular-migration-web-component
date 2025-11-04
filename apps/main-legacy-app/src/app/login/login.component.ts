import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Login</h2>
        <p class="subtitle">Angular 10 Legacy Application</p>

        <form (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              [(ngModel)]="username"
              name="username"
              placeholder="Enter username"
              required
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" [disabled]="!username || !password">
            Login
          </button>
        </form>

        <div class="info" *ngIf="username">
          <small>Demo: Any username/password will work</small>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .login-container {
        display: flex;
        justify-content: center;
        align-items: center;
        min-height: calc(100vh - 200px);
      }

      .login-card {
        background: white;
        padding: 40px;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
      }

      h2 {
        margin: 0 0 10px 0;
        color: #1e3a8a;
      }

      .subtitle {
        margin: 0 0 30px 0;
        color: #666;
        font-size: 14px;
      }

      .form-group {
        margin-bottom: 20px;
      }

      label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        color: #333;
      }

      input {
        width: 100%;
      }

      button {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        margin-top: 10px;
      }

      .info {
        margin-top: 20px;
        padding: 10px;
        background-color: #f0f9ff;
        border-radius: 4px;
        text-align: center;
      }

      .info small {
        color: #0369a1;
      }
    `,
  ],
})
export class LoginComponent {
  username = "";
  password = "";

  constructor(private router: Router) {}

  onLogin() {
    // Simple demo login - just navigate to investor lookup
    console.log("Login attempted with:", this.username);
    this.router.navigate(["/investor-lookup"]);
  }
}
