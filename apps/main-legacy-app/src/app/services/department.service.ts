import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
export interface DepartmentNode {
  title: string;
  key: string;
  expanded?: boolean;
  children?: DepartmentNode[];
  icon?: string;
  isLeaf?: boolean;
  // Additional department information
  managerId?: string;
  managerName?: string;
  employeeCount?: number;
  budget?: number;
  location?: string;
}
@Injectable({
  providedIn: "root",
})
export class DepartmentService {
  private departmentTree: DepartmentNode[] = [
    {
      title: "Executive Office",
      key: "100",
      expanded: true,
      managerName: "John Smith",
      managerId: "EMP001",
      employeeCount: 5,
      budget: 5000000,
      location: "Floor 10",
      children: [
        {
          title: "CEO Office",
          key: "110",
          managerName: "John Smith",
          managerId: "EMP001",
          employeeCount: 3,
          budget: 3000000,
          location: "Floor 10-A",
          isLeaf: true,
        },
        {
          title: "Legal Department",
          key: "120",
          managerName: "Sarah Johnson",
          managerId: "EMP002",
          employeeCount: 8,
          budget: 1200000,
          location: "Floor 10-B",
          isLeaf: true,
        },
      ],
    },
    {
      title: "Technology Division",
      key: "200",
      expanded: true,
      managerName: "Michael Chen",
      managerId: "EMP010",
      employeeCount: 150,
      budget: 15000000,
      location: "Floor 5-8",
      children: [
        {
          title: "Engineering",
          key: "210",
          managerName: "David Lee",
          managerId: "EMP011",
          employeeCount: 80,
          budget: 8000000,
          location: "Floor 5-6",
          children: [
            {
              title: "Frontend Team",
              key: "211",
              managerName: "Emily Wong",
              managerId: "EMP012",
              employeeCount: 25,
              budget: 2500000,
              location: "Floor 5",
              isLeaf: true,
            },
            {
              title: "Backend Team",
              key: "212",
              managerName: "Robert Taylor",
              managerId: "EMP013",
              employeeCount: 30,
              budget: 3000000,
              location: "Floor 5",
              isLeaf: true,
            },
            {
              title: "DevOps Team",
              key: "213",
              managerName: "Lisa Martinez",
              managerId: "EMP014",
              employeeCount: 15,
              budget: 1800000,
              location: "Floor 6",
              isLeaf: true,
            },
            {
              title: "Mobile Team",
              key: "214",
              managerName: "Alex Kim",
              managerId: "EMP015",
              employeeCount: 10,
              budget: 700000,
              location: "Floor 6",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Product Management",
          key: "220",
          managerName: "Jennifer Brown",
          managerId: "EMP020",
          employeeCount: 20,
          budget: 2200000,
          location: "Floor 7",
          children: [
            {
              title: "Product Strategy",
              key: "221",
              managerName: "Tom Wilson",
              managerId: "EMP021",
              employeeCount: 8,
              budget: 900000,
              location: "Floor 7-A",
              isLeaf: true,
            },
            {
              title: "UX/UI Design",
              key: "222",
              managerName: "Sophia Davis",
              managerId: "EMP022",
              employeeCount: 12,
              budget: 1300000,
              location: "Floor 7-B",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Quality Assurance",
          key: "230",
          managerName: "James Anderson",
          managerId: "EMP030",
          employeeCount: 25,
          budget: 2000000,
          location: "Floor 8",
          children: [
            {
              title: "Manual QA",
              key: "231",
              managerName: "Maria Garcia",
              managerId: "EMP031",
              employeeCount: 15,
              budget: 1100000,
              location: "Floor 8-A",
              isLeaf: true,
            },
            {
              title: "Automation QA",
              key: "232",
              managerName: "Chris Lee",
              managerId: "EMP032",
              employeeCount: 10,
              budget: 900000,
              location: "Floor 8-B",
              isLeaf: true,
            },
          ],
        },
        {
          title: "IT Support",
          key: "240",
          managerName: "Kevin White",
          managerId: "EMP040",
          employeeCount: 25,
          budget: 2800000,
          location: "Floor 8-C",
          isLeaf: true,
        },
      ],
    },
    {
      title: "Business Operations",
      key: "300",
      expanded: false,
      managerName: "Patricia Harris",
      managerId: "EMP050",
      employeeCount: 120,
      budget: 12000000,
      location: "Floor 3-4",
      children: [
        {
          title: "Sales",
          key: "310",
          managerName: "Daniel Miller",
          managerId: "EMP051",
          employeeCount: 45,
          budget: 4500000,
          location: "Floor 3",
          children: [
            {
              title: "Enterprise Sales",
              key: "311",
              managerName: "Karen Thompson",
              managerId: "EMP052",
              employeeCount: 20,
              budget: 2200000,
              location: "Floor 3-A",
              isLeaf: true,
            },
            {
              title: "SMB Sales",
              key: "312",
              managerName: "Brian Martinez",
              managerId: "EMP053",
              employeeCount: 25,
              budget: 2300000,
              location: "Floor 3-B",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Marketing",
          key: "320",
          managerName: "Amanda Rodriguez",
          managerId: "EMP060",
          employeeCount: 35,
          budget: 4000000,
          location: "Floor 4",
          children: [
            {
              title: "Digital Marketing",
              key: "321",
              managerName: "Ryan Clark",
              managerId: "EMP061",
              employeeCount: 15,
              budget: 1800000,
              location: "Floor 4-A",
              isLeaf: true,
            },
            {
              title: "Content Marketing",
              key: "322",
              managerName: "Nicole Lewis",
              managerId: "EMP062",
              employeeCount: 12,
              budget: 1200000,
              location: "Floor 4-B",
              isLeaf: true,
            },
            {
              title: "Brand Management",
              key: "323",
              managerName: "Steven Walker",
              managerId: "EMP063",
              employeeCount: 8,
              budget: 1000000,
              location: "Floor 4-C",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Customer Success",
          key: "330",
          managerName: "Michelle Hall",
          managerId: "EMP070",
          employeeCount: 40,
          budget: 3500000,
          location: "Floor 2",
          children: [
            {
              title: "Support Team",
              key: "331",
              managerName: "Eric Young",
              managerId: "EMP071",
              employeeCount: 25,
              budget: 2000000,
              location: "Floor 2-A",
              isLeaf: true,
            },
            {
              title: "Account Management",
              key: "332",
              managerName: "Laura King",
              managerId: "EMP072",
              employeeCount: 15,
              budget: 1500000,
              location: "Floor 2-B",
              isLeaf: true,
            },
          ],
        },
      ],
    },
    {
      title: "Corporate Services",
      key: "400",
      expanded: false,
      managerName: "Richard Wright",
      managerId: "EMP080",
      employeeCount: 60,
      budget: 7000000,
      location: "Floor 1-2",
      children: [
        {
          title: "Human Resources",
          key: "410",
          managerName: "Angela Scott",
          managerId: "EMP081",
          employeeCount: 20,
          budget: 2500000,
          location: "Floor 1",
          children: [
            {
              title: "Recruitment",
              key: "411",
              managerName: "Jessica Green",
              managerId: "EMP082",
              employeeCount: 10,
              budget: 1200000,
              location: "Floor 1-A",
              isLeaf: true,
            },
            {
              title: "HR Operations",
              key: "412",
              managerName: "Mark Adams",
              managerId: "EMP083",
              employeeCount: 10,
              budget: 1300000,
              location: "Floor 1-B",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Finance",
          key: "420",
          managerName: "Charles Baker",
          managerId: "EMP090",
          employeeCount: 25,
          budget: 3000000,
          location: "Floor 2",
          children: [
            {
              title: "Accounting",
              key: "421",
              managerName: "Susan Nelson",
              managerId: "EMP091",
              employeeCount: 15,
              budget: 1700000,
              location: "Floor 2-A",
              isLeaf: true,
            },
            {
              title: "Financial Planning",
              key: "422",
              managerName: "Paul Carter",
              managerId: "EMP092",
              employeeCount: 10,
              budget: 1300000,
              location: "Floor 2-B",
              isLeaf: true,
            },
          ],
        },
        {
          title: "Facilities",
          key: "430",
          managerName: "Nancy Mitchell",
          managerId: "EMP100",
          employeeCount: 15,
          budget: 1500000,
          location: "Floor 1-C",
          isLeaf: true,
        },
      ],
    },
  ];
  constructor() {}
  /**
   * Get the complete department tree structure
   */
  getDepartmentTree(): Observable<DepartmentNode[]> {
    return of(this.departmentTree);
  }
  /**
   * Get a specific department node by key
   */
  getDepartmentByKey(key: string): DepartmentNode | undefined {
    return this.findNodeByKey(this.departmentTree, key);
  }
  /**
   * Get all leaf departments (departments without children)
   */
  getLeafDepartments(): DepartmentNode[] {
    const leaves: DepartmentNode[] = [];
    this.collectLeaves(this.departmentTree, leaves);
    return leaves;
  }
  /**
   * Get total employee count across all departments
   */
  getTotalEmployeeCount(): number {
    return this.sumEmployeeCount(this.departmentTree);
  }
  /**
   * Get total budget across all departments
   */
  getTotalBudget(): number {
    return this.sumBudget(this.departmentTree);
  }
  /**
   * Search departments by title
   */
  searchDepartments(searchTerm: string): DepartmentNode[] {
    const results: DepartmentNode[] = [];
    this.searchNodes(this.departmentTree, searchTerm.toLowerCase(), results);
    return results;
  }
  // Private helper methods
  private findNodeByKey(
    nodes: DepartmentNode[],
    key: string
  ): DepartmentNode | undefined {
    for (const node of nodes) {
      if (node.key === key) {
        return node;
      }
      if (node.children) {
        const found = this.findNodeByKey(node.children, key);
        if (found) {
          return found;
        }
      }
    }
    return undefined;
  }
  private collectLeaves(nodes: DepartmentNode[], leaves: DepartmentNode[]) {
    for (const node of nodes) {
      if (node.isLeaf || !node.children || node.children.length === 0) {
        leaves.push(node);
      } else {
        this.collectLeaves(node.children, leaves);
      }
    }
  }
  private sumEmployeeCount(nodes: DepartmentNode[]): number {
    let total = 0;
    for (const node of nodes) {
      total += node.employeeCount || 0;
      if (node.children) {
        total += this.sumEmployeeCount(node.children);
      }
    }
    return total;
  }
  private sumBudget(nodes: DepartmentNode[]): number {
    let total = 0;
    for (const node of nodes) {
      total += node.budget || 0;
      if (node.children) {
        total += this.sumBudget(node.children);
      }
    }
    return total;
  }
  private searchNodes(
    nodes: DepartmentNode[],
    searchTerm: string,
    results: DepartmentNode[]
  ) {
    for (const node of nodes) {
      if (node.title.toLowerCase().includes(searchTerm)) {
        results.push(node);
      }
      if (node.children) {
        this.searchNodes(node.children, searchTerm, results);
      }
    }
  }
}
