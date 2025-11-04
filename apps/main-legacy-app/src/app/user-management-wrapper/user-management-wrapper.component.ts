import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { UserService, User } from "../services/user.service";

@Component({
  selector: "app-user-management-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <button (click)="goBack()" class="back-btn">← Back to Home</button>
        <h2>User Management (Legacy Angular 10)</h2>
        <button (click)="switchToNew()" class="switch-btn">
          Switch to Angular 20 🚀
        </button>
      </div>

      <div class="legacy-banner">
        <span>⚠️ This is the OLD Angular 10 version with ag-Grid</span>
      </div>

      <app-user-management [users]="users"></app-user-management>
    </div>
  `,
  styles: [
    `
      .wrapper-container {
        width: 100%;
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
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 14px;
      }

      .back-btn:hover {
        background-color: #4b5563;
      }

      .switch-btn {
        flex-shrink: 0;
        background-color: #10b981;
        padding: 10px 20px;
        font-weight: bold;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        font-size: 14px;
      }

      .switch-btn:hover {
        background-color: #059669;
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
    `,
  ],
})
export class UserManagementWrapperComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  private loadUsers() {
    this.users = this.userService.getAllUsers();
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  switchToNew() {
    this.router.navigate(["/user-management/new"]);
  }
}
