import { createCustomElement } from "@angular/elements";
import { createApplication } from "@angular/platform-browser";
import { provideZonelessChangeDetection } from "@angular/core";
import { AppComponent } from "./app/app.component";
import { provideAnimations } from "@angular/platform-browser/animations";

// Investor Detail Web Component - Standalone Bundle (Zoneless)
(async () => {
  try {
    const app = await createApplication({
      providers: [provideZonelessChangeDetection(), provideAnimations()],
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
