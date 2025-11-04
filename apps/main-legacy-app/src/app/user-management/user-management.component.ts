import { Component, OnInit, Input } from "@angular/core";
import { ColDef } from "ag-grid-community";
import { User } from "../services/user.service";

@Component({
  selector: "app-user-management",
  template: `
    <div class="user-management-container">
      <div class="header">
        <h2>User Management</h2>
        <p>View and manage system users</p>
      </div>

      <ag-grid-angular
        style="width: 100%; height: 600px;"
        class="ag-theme-alpine"
        [rowData]="rowData"
        [columnDefs]="columnDefs"
        [defaultColDef]="defaultColDef"
        [pagination]="true"
        [paginationPageSize]="20"
        [animateRows]="true"
      >
      </ag-grid-angular>
    </div>
  `,
  styles: [
    `
      .user-management-container {
        max-width: 1400px;
        margin: 0 auto;
      }

      .header {
        margin-bottom: 20px;
      }

      .header h2 {
        margin: 0 0 5px 0;
        color: #1e3a8a;
        font-size: 28px;
      }

      .header p {
        margin: 0;
        color: #6b7280;
        font-size: 16px;
      }
    `,
  ],
})
export class UserManagementComponent implements OnInit {
  @Input() users: User[] = [];

  rowData: User[] = [];
  columnDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    sortable: true,
    filter: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
  };

  ngOnInit() {
    this.setupColumns();
    // Use input data if provided
    if (this.users && this.users.length > 0) {
      this.rowData = this.users;
    }
  }

  private setupColumns() {
    this.columnDefs = [
      {
        headerName: "ID",
        field: "id",
        maxWidth: 80,
        flex: 0,
      },
      {
        headerName: "Username",
        field: "username",
        minWidth: 120,
      },
      {
        headerName: "First Name",
        field: "firstName",
        minWidth: 120,
      },
      {
        headerName: "Last Name",
        field: "lastName",
        minWidth: 120,
      },
      {
        headerName: "Email",
        field: "email",
        minWidth: 200,
      },
      {
        headerName: "Role",
        field: "role",
        minWidth: 120,
        cellStyle: (params) => {
          if (params.value === "Admin") {
            return { color: "#dc2626", fontWeight: "600" };
          } else if (params.value === "Manager") {
            return { color: "#f59e0b", fontWeight: "600" };
          }
          return { color: "#3b82f6", fontWeight: "600" };
        },
      },
      {
        headerName: "Department",
        field: "department",
        minWidth: 130,
      },
      {
        headerName: "Status",
        field: "status",
        minWidth: 100,
        cellStyle: (params) => {
          if (params.value === "Active") {
            return {
              backgroundColor: "#d1fae5",
              color: "#065f46",
              fontWeight: "600",
              textAlign: "center",
            };
          }
          return {
            backgroundColor: "#fee2e2",
            color: "#991b1b",
            fontWeight: "600",
            textAlign: "center",
          };
        },
      },
    ];
  }
}
