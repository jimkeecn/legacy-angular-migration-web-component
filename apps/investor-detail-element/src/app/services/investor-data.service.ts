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
