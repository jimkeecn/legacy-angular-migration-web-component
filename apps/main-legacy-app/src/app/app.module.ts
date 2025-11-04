import { BrowserModule } from "@angular/platform-browser";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AgGridModule } from "ag-grid-angular";

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, AgGridModule],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
