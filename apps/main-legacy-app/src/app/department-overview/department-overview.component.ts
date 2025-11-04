import { Component, OnInit, Input } from "@angular/core";
import { NzFormatEmitEvent, NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { DepartmentNode } from "../services/department.service";

@Component({
  selector: "app-department-overview",
  template: `
    <div class="department-overview-container">
      <div class="overview-header">
        <h3>Department Structure</h3>
        <div class="stats-row">
          <div class="stat-card">
            <span class="stat-label">Total Departments</span>
            <span class="stat-value">{{ totalDepartments }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Employees</span>
            <span class="stat-value">{{ totalEmployees }}</span>
          </div>
          <div class="stat-card">
            <span class="stat-label">Total Budget</span>
            <span class="stat-value">\${{ totalBudget | number }}</span>
          </div>
        </div>
      </div>

      <div class="search-box">
        <input
          nz-input
          placeholder="Search departments..."
          [(ngModel)]="searchValue"
          (ngModelChange)="onSearch($event)"
        />
      </div>

      <div class="tree-container">
        <nz-tree
          [nzData]="treeNodes"
          [nzExpandedKeys]="expandedKeys"
          [nzSelectedKeys]="selectedKeys"
          (nzClick)="onNodeClick($event)"
          (nzExpandChange)="onExpandChange($event)"
        >
        </nz-tree>
      </div>

      <div class="department-details" *ngIf="selectedDepartment">
        <h4>Department Details</h4>
        <div class="details-grid">
          <div class="detail-item">
            <label>Department:</label>
            <span>{{ selectedDepartment.title }}</span>
          </div>
          <div class="detail-item">
            <label>Department ID:</label>
            <span>{{ selectedDepartment.key }}</span>
          </div>
          <div class="detail-item">
            <label>Manager:</label>
            <span>{{ selectedDepartment.managerName || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Manager ID:</label>
            <span>{{ selectedDepartment.managerId || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Employees:</label>
            <span>{{ selectedDepartment.employeeCount || 0 }}</span>
          </div>
          <div class="detail-item">
            <label>Budget:</label>
            <span>\${{ selectedDepartment.budget | number }}</span>
          </div>
          <div class="detail-item">
            <label>Location:</label>
            <span>{{ selectedDepartment.location || "N/A" }}</span>
          </div>
          <div class="detail-item">
            <label>Type:</label>
            <span>{{
              selectedDepartment.children &&
              selectedDepartment.children.length > 0
                ? "Division"
                : "Department"
            }}</span>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
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

      ::ng-deep .ant-tree {
        background: transparent;
      }

      ::ng-deep .ant-tree-node-content-wrapper {
        padding: 4px 8px;
        border-radius: 4px;
        transition: all 0.3s;
      }

      ::ng-deep .ant-tree-node-content-wrapper:hover {
        background-color: #e0e7ff;
      }

      ::ng-deep .ant-tree-node-selected .ant-tree-node-content-wrapper {
        background-color: #667eea !important;
        color: white;
      }

      ::ng-deep .ant-tree-iconEle {
        margin-right: 8px;
      }

      .department-details {
        background: #f0f9ff;
        border: 1px solid #bae6fd;
        border-radius: 8px;
        padding: 20px;
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
export class DepartmentOverviewComponent implements OnInit {
  @Input() departments: DepartmentNode[] = [];

  treeNodes: NzTreeNodeOptions[] = [];
  expandedKeys: string[] = [];
  selectedKeys: string[] = [];
  selectedDepartment: DepartmentNode | null = null;
  searchValue: string = "";

  totalDepartments: number = 0;
  totalEmployees: number = 0;
  totalBudget: number = 0;

  ngOnInit() {
    this.initializeTree();
    this.calculateStatistics();
  }

  initializeTree() {
    this.treeNodes = this.convertToNzTreeNodes(this.departments);
    // Expand top-level nodes by default
    this.expandedKeys = this.departments.map((dept) => dept.key);
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
      this.selectedKeys = [node.key];
      this.selectedDepartment = node.origin as DepartmentNode;
    }
  }

  onExpandChange(event: NzFormatEmitEvent): void {
    const node = event.node;
    if (node && node.isExpanded) {
      this.expandedKeys.push(node.key);
    } else if (node) {
      this.expandedKeys = this.expandedKeys.filter((key) => key !== node.key);
    }
  }

  onSearch(value: string): void {
    if (!value) {
      this.treeNodes = this.convertToNzTreeNodes(this.departments);
      return;
    }

    const filtered = this.filterDepartments(
      this.departments,
      value.toLowerCase()
    );
    this.treeNodes = this.convertToNzTreeNodes(filtered);

    // Expand all nodes when searching
    this.expandAllNodes(this.treeNodes);
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
    nodes.forEach((node) => {
      this.expandedKeys.push(node.key);
      if (node.children) {
        this.expandAllNodes(node.children);
      }
    });
  }

  private calculateStatistics(): void {
    this.totalDepartments = this.countDepartments(this.departments);
    this.totalEmployees = this.sumEmployees(this.departments);
    this.totalBudget = this.sumBudget(this.departments);
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
