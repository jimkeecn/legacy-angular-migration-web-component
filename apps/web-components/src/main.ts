import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { provideZonelessChangeDetection } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { UserManagementElementComponent } from "./app/user-management-element/user-management-element.component";
import { DepartmentOverviewElementComponent } from "./app/department-overview-element/department-overview-element.component";
import { provideAnimations } from "@angular/platform-browser/animations";

// Modern Angular 20 approach using standalone components and createApplication (Zoneless)
(async () => {
  try {
    // Create the application
    const app = await createApplication({
      providers: [provideZonelessChangeDetection(), provideAnimations()],
    });

    // Create the custom elements
    const investorDetailElement = createCustomElement(AppComponent, {
      injector: app.injector,
    });

    const userManagementElement = createCustomElement(
      UserManagementElementComponent,
      {
        injector: app.injector,
      }
    );

    const departmentOverviewElement = createCustomElement(
      DepartmentOverviewElementComponent,
      {
        injector: app.injector,
      }
    );

    // Define the custom elements
    customElements.define("web-components", investorDetailElement);
    customElements.define("user-management-element", userManagementElement);
    customElements.define(
      "department-overview-element",
      departmentOverviewElement
    );
  } catch (error) {
    // Failed to register web component
  }
})();
