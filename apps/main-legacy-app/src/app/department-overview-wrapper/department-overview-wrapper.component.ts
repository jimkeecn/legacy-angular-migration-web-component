import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  DepartmentService,
  DepartmentNode,
} from "../services/department.service";

@Component({
  selector: "app-department-overview-wrapper",
  template: `
    <div class="wrapper-container">
      <div class="wrapper-header">
        <button (click)="goBack()" class="back-btn">← Back to Home</button>
        <h2>Department Overview (Angular 10 Legacy)</h2>
        <button (click)="switchToNew()" class="switch-btn">
          Switch to Angular 20 ⚡
        </button>
      </div>

      <div class="legacy-banner">
        <span
          >📊 This is the LEGACY Angular 10 version with ng-zorro Tree
          View!</span
        >
      </div>

      <app-department-overview
        [departments]="departments"
      ></app-department-overview>
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

      .legacy-banner {
        background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(245, 158, 11, 0.3);
      }
    `,
  ],
})
export class DepartmentOverviewWrapperComponent implements OnInit {
  departments: DepartmentNode[] = [];

  constructor(
    private router: Router,
    private departmentService: DepartmentService
  ) {}

  ngOnInit() {
    // Load department data from service
    this.departmentService.getDepartmentTree().subscribe((data) => {
      this.departments = data;
    });
  }

  goBack() {
    this.router.navigate(["/"]);
  }

  switchToNew() {
    this.router.navigate(["/department-overview", "new"]);
  }
}
