import { Injectable } from "@angular/core";

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  status: string;
}

@Injectable({
  providedIn: "root",
})
export class UserService {
  private users: User[] = [
    {
      id: 1,
      username: "jsmith",
      email: "john.smith@company.com",
      firstName: "John",
      lastName: "Smith",
      role: "Admin",
      department: "IT",
      status: "Active",
    },
    {
      id: 2,
      username: "sjohnson",
      email: "sarah.johnson@company.com",
      firstName: "Sarah",
      lastName: "Johnson",
      role: "Manager",
      department: "Finance",
      status: "Active",
    },
    {
      id: 3,
      username: "mbrown",
      email: "michael.brown@company.com",
      firstName: "Michael",
      lastName: "Brown",
      role: "User",
      department: "Sales",
      status: "Active",
    },
    {
      id: 4,
      username: "edavis",
      email: "emily.davis@company.com",
      firstName: "Emily",
      lastName: "Davis",
      role: "User",
      department: "HR",
      status: "Inactive",
    },
    {
      id: 5,
      username: "rwilson",
      email: "robert.wilson@company.com",
      firstName: "Robert",
      lastName: "Wilson",
      role: "Manager",
      department: "Operations",
      status: "Active",
    },
    {
      id: 6,
      username: "lgarcia",
      email: "linda.garcia@company.com",
      firstName: "Linda",
      lastName: "Garcia",
      role: "User",
      department: "Marketing",
      status: "Active",
    },
    {
      id: 7,
      username: "dmartinez",
      email: "david.martinez@company.com",
      firstName: "David",
      lastName: "Martinez",
      role: "Admin",
      department: "IT",
      status: "Active",
    },
    {
      id: 8,
      username: "jrodriguez",
      email: "jennifer.rodriguez@company.com",
      firstName: "Jennifer",
      lastName: "Rodriguez",
      role: "User",
      department: "Finance",
      status: "Active",
    },
    {
      id: 9,
      username: "athompson",
      email: "alice.thompson@company.com",
      firstName: "Alice",
      lastName: "Thompson",
      role: "Manager",
      department: "Sales",
      status: "Active",
    },
    {
      id: 10,
      username: "bwhite",
      email: "brian.white@company.com",
      firstName: "Brian",
      lastName: "White",
      role: "User",
      department: "HR",
      status: "Inactive",
    },
    {
      id: 11,
      username: "charris",
      email: "carol.harris@company.com",
      firstName: "Carol",
      lastName: "Harris",
      role: "User",
      department: "Operations",
      status: "Active",
    },
    {
      id: 12,
      username: "dclark",
      email: "daniel.clark@company.com",
      firstName: "Daniel",
      lastName: "Clark",
      role: "Manager",
      department: "Marketing",
      status: "Active",
    },
  ];

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  getUsersByDepartment(department: string): User[] {
    return this.users.filter((user) => user.department === department);
  }

  getUsersByRole(role: string): User[] {
    return this.users.filter((user) => user.role === role);
  }

  getActiveUsers(): User[] {
    return this.users.filter((user) => user.status === "Active");
  }
}
