import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";

// Investor Detail Web Component - Standalone Bundle
(async () => {
  try {
    const app = await createApplication({
      providers: [provideAnimations()],
    });

    const investorDetailElement = createCustomElement(AppComponent, {
      injector: app.injector,
    });

    customElements.define("web-components", investorDetailElement);
    console.log("✅ Investor Detail Web Component registered");
  } catch (error) {
    console.error("❌ Failed to register web-components:", error);
  }
})();
