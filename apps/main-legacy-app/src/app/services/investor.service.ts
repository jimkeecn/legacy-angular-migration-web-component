import { Injectable } from "@angular/core";

export interface InvestorDetail {
  id: string;
  name: string;
  accountNumber: string;
  balance: number;
  status: string;
  email: string;
  phone: string;
  address: string;
  joinDate: string;
}

@Injectable({
  providedIn: "root",
})
export class InvestorService {
  private mockInvestors: InvestorDetail[] = [
    {
      id: "1",
      name: "John Smith",
      accountNumber: "ACC-1001",
      balance: 125000,
      status: "Active",
      email: "john.smith@email.com",
      phone: "(555) 123-4567",
      address: "123 Main St, New York, NY 10001",
      joinDate: "January 15, 2020",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      accountNumber: "ACC-1002",
      balance: 87500,
      status: "Active",
      email: "sarah.j@email.com",
      phone: "(555) 234-5678",
      address: "456 Oak Ave, Los Angeles, CA 90001",
      joinDate: "March 22, 2019",
    },
    {
      id: "3",
      name: "Michael Brown",
      accountNumber: "ACC-1003",
      balance: 245000,
      status: "Active",
      email: "mbrown@email.com",
      phone: "(555) 345-6789",
      address: "789 Pine Rd, Chicago, IL 60601",
      joinDate: "June 8, 2018",
    },
    {
      id: "4",
      name: "Emily Davis",
      accountNumber: "ACC-1004",
      balance: 52000,
      status: "Inactive",
      email: "emily.davis@email.com",
      phone: "(555) 456-7890",
      address: "321 Elm St, Houston, TX 77001",
      joinDate: "September 12, 2021",
    },
    {
      id: "5",
      name: "Robert Wilson",
      accountNumber: "ACC-1005",
      balance: 198000,
      status: "Active",
      email: "rwilson@email.com",
      phone: "(555) 567-8901",
      address: "654 Maple Dr, Phoenix, AZ 85001",
      joinDate: "November 30, 2017",
    },
  ];

  getInvestorById(id: string): InvestorDetail | undefined {
    return this.mockInvestors.find((inv) => inv.id === id);
  }

  getAllInvestors(): InvestorDetail[] {
    return this.mockInvestors;
  }
}
