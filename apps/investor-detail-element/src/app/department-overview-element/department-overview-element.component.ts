import {
  Component,
  Input,
  ViewEncapsulation,
  OnInit,
  signal,
  computed,
  effect,
  HostBinding,
} from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzFormatEmitEvent, NzTreeNodeOptions } from "ng-zorro-antd/tree";

// Department Node Interface
export interface DepartmentNode {
  title: string;
  key: string;
  expanded?: boolean;
  children?: DepartmentNode[];
  isLeaf?: boolean;
  managerId?: string;
  managerName?: string;
  employeeCount?: number;
  budget?: number;
  location?: string;
}

@Component({
  selector: "department-overview-element",
  standalone: true,
  imports: [CommonModule, FormsModule, NzTreeModule, NzInputModule],
  encapsulation: ViewEncapsulation.Emulated, //This is important for ng-zorro global style from legacy application to affect the web component
  template: `
    <div class="department-overview-container">
      <div class="overview-header">
        <h3>Department Structure (Angular 20 with Signals 🎯)</h3>
        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-label">Total Departments</span>
            <span class="stat-value">{{ totalDepartments() }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Employees</span>
            <span class="stat-value">{{ totalEmployees() }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Budget</span>
            <span class="stat-value">\${{ totalBudget() | number }}</span>
          </div>
        </div>
      </div>

      <div class="search-box">
        <input
          nz-input
          placeholder="Search departments... (using signals)"
          [ngModel]="searchValue()"
          (ngModelChange)="onSearchChange($event)"
        />
      </div>

      <div class="tree-container">
        <nz-tree
          [nzData]="treeNodes()"
          [nzExpandedKeys]="expandedKeys()"
          [nzSelectedKeys]="selectedKeys()"
          (nzClick)="onNodeClick($event)"
          (nzExpandChange)="onExpandChange($event)"
        >
        </nz-tree>
      </div>

      <div class="department-details" *ngIf="selectedDepartment()">
        <h4>Department Details (Signal-based)</h4>
        <div class="details-grid">
          <div class="detail-item">
            <label>Department:</label>
            <span>{{ selectedDepartment()!.title }}</span>
          </div>
          <div class="detail-item">
            <label>Department ID:</label>
            <span>{{ selectedDepartment()!.key }}</span>
          </div>
          <div class="detail-item">
            <label>Manager:</label>
            <span>{{ selectedDepartment()!.managerName || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Manager ID:</label>
            <span>{{ selectedDepartment()!.managerId || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Employees:</label>
            <span>{{ selectedDepartment()!.employeeCount || 0 }}</span>
          </div>
          <div class="detail-item">
            <label>Budget:</label>
            <span>\${{ selectedDepartment()!.budget | number }}</span>
          </div>
          <div class="detail-item">
            <label>Location:</label>
            <span>{{ selectedDepartment()!.location || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Type:</label>
            <span>{{
              selectedDepartment()!.children &&
              selectedDepartment()!.children!.length > 0
                ? "Division"
                : "Department"
            }}</span>
          </div>
        </div>
      </div>

      <div class="signal-demo">
        <p>
          <strong>🎯 Signals Working!</strong> Search count:
          {{ searchCount() }} | Last search: "{{ lastSearchTerm() }}"
        </p>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
          "Helvetica Neue", Arial, sans-serif;
      }

      .department-overview-container {
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }

      .overview-header {
        margin-bottom: 20px;
      }

      .overview-header h3 {
        margin: 0 0 15px 0;
        color: #1e3a8a;
        font-size: 24px;
        font-weight: 600;
      }

      .stats-row {
        display: flex;
        gap: 15px;
        margin-bottom: 20px;
      }

      .stat-card {
        flex: 1;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }

      .stat-label {
        font-size: 12px;
        opacity: 0.9;
        margin-bottom: 5px;
      }

      .stat-value {
        font-size: 24px;
        font-weight: bold;
      }

      .search-box {
        margin-bottom: 20px;
      }

      .search-box input {
        width: 100%;
        max-width: 400px;
        padding: 8px 12px;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 14px;
      }

      .search-box input:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
      }

      .tree-container {
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
        max-height: 500px;
        overflow-y: auto;
      }

      /* ng-zorro tree specific styles */
      ::ng-deep nz-tree {
        display: block;
      }

      ::ng-deep .ant-tree {
        background: transparent;
      }

      ::ng-deep .ant-tree-node-content-wrapper {
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.3s;
        cursor: pointer;
      }

      ::ng-deep .ant-tree-node-content-wrapper:hover {
        background-color: #e0e7ff;
      }

      ::ng-deep .ant-tree-node-selected .ant-tree-node-content-wrapper,
      ::ng-deep .ant-tree-node-content-wrapper.ant-tree-node-selected {
        background-color: #667eea !important;
        color: white;
      }

      ::ng-deep .ant-tree-switcher {
        display: inline-block;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        cursor: pointer;
      }

      ::ng-deep .ant-tree-title {
        display: inline-block;
      }

      .department-details {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
        padding: 20px;
        margin-bottom: 20px;
      }

      .department-details h4 {
        margin: 0 0 15px 0;
        color: #1e3a8a;
        font-size: 18px;
        font-weight: 600;
      }

      .details-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
      }

      .detail-item {
        display: flex;
        flex-direction: column;
      }

      .detail-item label {
        font-size: 12px;
        color: #6b7280;
        margin-bottom: 4px;
        font-weight: 500;
      }

      .detail-item span {
        font-size: 14px;
        color: #111827;
        font-weight: 600;
      }

      .signal-demo {
        background: linear-gradient(135deg, #10b981 0%, #059669 100%);
        color: white;
        padding: 15px;
        border-radius: 8px;
        text-align: center;
      }

      .signal-demo p {
        margin: 0;
        font-size: 14px;
      }

      @media (max-width: 768px) {
        .stats-row {
          flex-direction: column;
        }

        .details-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class DepartmentOverviewElementComponent implements OnInit {
  // Disable animations at the host level to avoid BrowserModule conflict
  @HostBinding("@.disabled") animationsDisabled = true;

  // Signals for reactive state management
  private departmentsData = signal<DepartmentNode[]>([]);
  treeNodes = signal<NzTreeNodeOptions[]>([]);
  expandedKeys = signal<string[]>([]);
  selectedKeys = signal<string[]>([]);
  selectedDepartment = signal<DepartmentNode | null>(null);
  searchValue = signal<string>("");
  searchCount = signal<number>(0);
  lastSearchTerm = signal<string>("");

  // Computed signals for statistics
  totalDepartments = computed(() => {
    return this.countDepartments(this.departmentsData());
  });

  totalEmployees = computed(() => {
    return this.sumEmployees(this.departmentsData());
  });

  totalBudget = computed(() => {
    return this.sumBudget(this.departmentsData());
  });

  // Effect to log signal changes (demonstrates signal reactivity)
  constructor() {
    effect(() => {
      console.log(
        "🎯 Signal Effect: Search value changed to:",
        this.searchValue()
      );
      console.log("🎯 Signal Effect: Search count:", this.searchCount());
    });
  }

  @Input("department-data")
  set departmentData(value: string | DepartmentNode[] | null) {
    console.log("📥 Received department data:", typeof value);

    if (!value) {
      this.departmentsData.set([]);
      return;
    }

    let parsed: DepartmentNode[] = [];

    if (typeof value === "string") {
      try {
        parsed = JSON.parse(value);
      } catch (e) {
        console.error("Failed to parse department data:", e);
        return;
      }
    } else {
      parsed = value;
    }

    this.departmentsData.set(parsed);
    this.initializeTree();
  }

  ngOnInit() {
    console.log("🚀 DepartmentOverviewElement initialized with signals!");
  }

  initializeTree() {
    const departments = this.departmentsData();
    this.treeNodes.set(this.convertToNzTreeNodes(departments));
    // Expand top-level nodes by default
    this.expandedKeys.set(departments.map((dept) => dept.key));
  }

  convertToNzTreeNodes(nodes: DepartmentNode[]): NzTreeNodeOptions[] {
    return nodes.map((node) => ({
      title: node.title,
      key: node.key,
      expanded: node.expanded,
      isLeaf: node.isLeaf,
      children: node.children
        ? this.convertToNzTreeNodes(node.children)
        : undefined,
      // Store original node data
      origin: node,
    }));
  }

  onNodeClick(event: NzFormatEmitEvent): void {
    const node = event.node;
    if (node) {
      this.selectedKeys.set([node.key]);
      this.selectedDepartment.set(node.origin as DepartmentNode);
    }
  }

  onExpandChange(event: NzFormatEmitEvent): void {
    const node = event.node;
    if (node && node.isExpanded) {
      this.expandedKeys.update((keys) => [...keys, node.key]);
    } else if (node) {
      this.expandedKeys.update((keys) =>
        keys.filter((key) => key !== node.key)
      );
    }
  }

  onSearchChange(value: string): void {
    this.searchValue.set(value);
    this.searchCount.update((count) => count + 1);
    this.lastSearchTerm.set(value || "(empty)");

    if (!value) {
      this.treeNodes.set(this.convertToNzTreeNodes(this.departmentsData()));
      return;
    }

    const filtered = this.filterDepartments(
      this.departmentsData(),
      value.toLowerCase()
    );
    this.treeNodes.set(this.convertToNzTreeNodes(filtered));

    // Expand all nodes when searching
    this.expandAllNodes(this.treeNodes());
  }

  private filterDepartments(
    nodes: DepartmentNode[],
    searchTerm: string
  ): DepartmentNode[] {
    const filtered: DepartmentNode[] = [];

    for (const node of nodes) {
      const matches = node.title.toLowerCase().includes(searchTerm);
      let filteredChildren: DepartmentNode[] = [];

      if (node.children) {
        filteredChildren = this.filterDepartments(node.children, searchTerm);
      }

      if (matches || filteredChildren.length > 0) {
        filtered.push({
          ...node,
          expanded: true,
          children:
            filteredChildren.length > 0 ? filteredChildren : node.children,
        });
      }
    }

    return filtered;
  }

  private expandAllNodes(nodes: NzTreeNodeOptions[]): void {
    const allKeys: string[] = [];
    const collectKeys = (nodeList: NzTreeNodeOptions[]) => {
      nodeList.forEach((node) => {
        allKeys.push(node.key);
        if (node.children) {
          collectKeys(node.children);
        }
      });
    };
    collectKeys(nodes);
    this.expandedKeys.set(allKeys);
  }

  private countDepartments(nodes: DepartmentNode[]): number {
    let count = nodes.length;
    nodes.forEach((node) => {
      if (node.children) {
        count += this.countDepartments(node.children);
      }
    });
    return count;
  }

  private sumEmployees(nodes: DepartmentNode[]): number {
    let sum = 0;
    nodes.forEach((node) => {
      sum += node.employeeCount || 0;
      if (node.children) {
        sum += this.sumEmployees(node.children);
      }
    });
    return sum;
  }

  private sumBudget(nodes: DepartmentNode[]): number {
    let sum = 0;
    nodes.forEach((node) => {
      sum += node.budget || 0;
      if (node.children) {
        sum += this.sumBudget(node.children);
      }
    });
    return sum;
  }
}
