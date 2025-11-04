import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

// Modern Angular 20 approach using standalone components and createApplication
(async () => {
  try {
    // Create the application
    const app = await createApplication({
      providers: [],
    });

    // Create the custom element
    const investorDetailElement = createCustomElement(AppComponent, {
      injector: app.injector,
    });

    // Define the custom element
    customElements.define("investor-detail-element", investorDetailElement);
  } catch (error) {
    // Failed to register web component
  }
})();
