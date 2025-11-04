import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { InvestorLookupComponent } from "./investor-lookup/investor-lookup.component";
import { InvestorDetailLegacyComponent } from "./investor-detail/investor-detail-legacy.component";
import { InvestorDetailElementWrapperComponent } from "./investor-detail-element-wrapper/investor-detail-element-wrapper.component";
import { UserManagementWrapperComponent } from "./user-management-wrapper/user-management-wrapper.component";
import { UserManagementElementWrapperComponent } from "./user-management-element-wrapper/user-management-element-wrapper.component";
import { DepartmentOverviewWrapperComponent } from "./department-overview-wrapper/department-overview-wrapper.component";
import { DepartmentOverviewElementWrapperComponent } from "./department-overview-element-wrapper/department-overview-element-wrapper.component";

const routes: Routes = [
  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "investor-lookup", component: InvestorLookupComponent },
  {
    path: "user-management",
    children: [
      { path: "", redirectTo: "legacy", pathMatch: "full" },
      { path: "legacy", component: UserManagementWrapperComponent },
      { path: "new", component: UserManagementElementWrapperComponent },
    ],
  },
  {
    path: "department-overview",
    children: [
      { path: "", redirectTo: "legacy", pathMatch: "full" },
      { path: "legacy", component: DepartmentOverviewWrapperComponent },
      { path: "new", component: DepartmentOverviewElementWrapperComponent },
    ],
  },
  {
    path: "investor-detail/:id",
    children: [
      { path: "", redirectTo: "legacy", pathMatch: "full" },
      { path: "legacy", component: InvestorDetailLegacyComponent },
      { path: "new", component: InvestorDetailElementWrapperComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
