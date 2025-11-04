import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { UserManagementElementComponent } from "./app/user-management-element/user-management-element.component";
import { provideAnimations } from "@angular/platform-browser/animations";

// User Management Web Component - Standalone Bundle
(async () => {
  try {
    const app = await createApplication({
      providers: [provideAnimations()],
    });

    const userManagementElement = createCustomElement(
      UserManagementElementComponent,
      {
        injector: app.injector,
      }
    );

    customElements.define("user-management-element", userManagementElement);
    console.log("✅ User Management Web Component registered");
  } catch (error) {
    console.error("❌ Failed to register user-management-element:", error);
  }
})();
