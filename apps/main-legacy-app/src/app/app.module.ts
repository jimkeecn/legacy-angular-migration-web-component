import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { NzInputModule } from "ng-zorro-antd/input";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { InvestorLookupComponent } from "./investor-lookup/investor-lookup.component";
import { InvestorDetailLegacyComponent } from "./investor-detail/investor-detail-legacy.component";
import { InvestorDetailElementWrapperComponent } from "./investor-detail-element-wrapper/investor-detail-element-wrapper.component";
import { UserManagementComponent } from "./user-management/user-management.component";
import { UserManagementWrapperComponent } from "./user-management-wrapper/user-management-wrapper.component";
import { UserManagementElementWrapperComponent } from "./user-management-element-wrapper/user-management-element-wrapper.component";
import { DepartmentOverviewComponent } from "./department-overview/department-overview.component";
import { DepartmentOverviewWrapperComponent } from "./department-overview-wrapper/department-overview-wrapper.component";
import { DepartmentOverviewElementWrapperComponent } from "./department-overview-element-wrapper/department-overview-element-wrapper.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    InvestorLookupComponent,
    InvestorDetailLegacyComponent,
    InvestorDetailElementWrapperComponent,
    UserManagementComponent,
    UserManagementWrapperComponent,
    UserManagementElementWrapperComponent,
    DepartmentOverviewComponent,
    DepartmentOverviewWrapperComponent,
    DepartmentOverviewElementWrapperComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule,
    NzTreeModule,
    NzInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
