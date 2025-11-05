import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { provideZonelessChangeDetection } from "@angular/core";
import { DepartmentOverviewElementComponent } from "./app/department-overview-element/department-overview-element.component";
import { provideAnimations } from "@angular/platform-browser/animations";

// Department Overview Web Component - Standalone Bundle (Zoneless)
(async () => {
  try {
    const app = await createApplication({
      providers: [provideZonelessChangeDetection(), provideAnimations()],
    });

    const departmentOverviewElement = createCustomElement(
      DepartmentOverviewElementComponent,
      {
        injector: app.injector,
      }
    );

    customElements.define(
      "department-overview-element",
      departmentOverviewElement
    );
    console.log("✅ Department Overview Web Component registered");
  } catch (error) {
    console.error("❌ Failed to register department-overview-element:", error);
  }
})();
