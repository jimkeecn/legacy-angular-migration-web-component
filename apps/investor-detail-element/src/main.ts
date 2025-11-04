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

    console.log(
      '✅ Angular 20 Web Component "investor-detail-element" registered successfully'
    );

    // Test creating an instance to verify it works
    console.log("🧪 Testing custom element creation...");
    const testElement = document.createElement("investor-detail-element");
    console.log("🧪 Test element created:", testElement);

    // Add to body temporarily to trigger connectedCallback
    document.body.appendChild(testElement);
    console.log("🧪 Test element appended to body");

    // Remove it after a moment
    setTimeout(() => {
      document.body.removeChild(testElement);
      console.log("🧪 Test element removed");
    }, 1000);
  } catch (error) {
    console.error("❌ Failed to register web component:", error);
  }
})();
