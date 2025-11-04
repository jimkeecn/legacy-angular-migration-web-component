import {
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  CUSTOM_ELEMENTS_SCHEMA,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { AgGridAngular } from "ag-grid-angular";
import { ColDef, ModuleRegistry, AllCommunityModule } from "ag-grid-community";

// Register AG Grid modules
ModuleRegistry.registerModules([AllCommunityModule]);

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: string;
}

@Component({
  selector: "app-user-management-element",
  standalone: true,
  imports: [CommonModule, AgGridAngular],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <div class="user-management-container">
      <div class="header">
        <h2>User Management (Angular 20)</h2>
        <p>View and manage system users - Web Component Version</p>
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
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
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
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class UserManagementElementComponent implements OnInit {
  @Input("user-data") set userData(value: string | User[] | null) {
    if (value) {
      if (typeof value === "string") {
        try {
          this.rowData = JSON.parse(value);
        } catch (e) {
          console.error("Failed to parse user data:", e);
        }
      } else if (Array.isArray(value)) {
        this.rowData = value;
      }
    }
  }

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
