import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebComponentLoaderService {
  private loadedScripts = new Set<string>();
  private loadedComponents = new Set<string>();

  // Component-to-script mapping for lazy loading
  private componentScriptMap = {
    "web-components": {
      path: "/investor-detail/browser/main.js",
      styles: "/investor-detail/browser/styles.css",
    },
    "user-management-element": {
      path: "/user-management/browser/main.js",
      styles: "/user-management/browser/styles.css",
    },
    "department-overview-element": {
      path: "/department-overview/browser/main.js",
      styles: "/department-overview/browser/styles.css",
    },
  };

  /**
   * Load a specific web component on-demand
   * @param componentName The custom element name (e.g., 'web-components')
   * @returns Promise that resolves when component is loaded
   */
  async loadWebComponent(componentName?: string): Promise<void> {
    // If componentName is provided, use lazy loading
    if (componentName && this.componentScriptMap[componentName]) {
      return this.loadComponentLazy(componentName);
    }

    // Otherwise, fall back to loading all components (legacy behavior)
    return this.loadAllComponents();
  }

  /**
   * Load a specific component's script bundle
   * @param componentName The custom element name
   */
  private async loadComponentLazy(componentName: string): Promise<void> {
    // Check if already loaded
    if (this.loadedComponents.has(componentName)) {
      console.log(`ℹ️ Component '${componentName}' already loaded`);
      return;
    }

    try {
      const config = this.componentScriptMap[componentName];
      const baseUrl = environment.webComponentUrl;
      const timestamp = new Date().getTime();

      console.log(`🔄 Loading component: ${componentName}`);

      // Load styles first (optional)
      if (config.styles) {
        await this.loadStylesheet(
          `${componentName}-styles`,
          `${baseUrl}${config.styles}?v=${timestamp}`,
          true
        );
      }

      // Load the component script
      await this.loadScript(
        `${componentName}-script`,
        `${baseUrl}${config.path}?v=${timestamp}`,
        false
      );

      // Wait for custom element to register
      await this.waitForCustomElement(componentName, 5000);

      this.loadedComponents.add(componentName);
      console.log(`✅ Component '${componentName}' loaded and registered`);
    } catch (err) {
      console.error(`Failed to load component '${componentName}':`, err);
      throw new Error(
        `Failed to load the '${componentName}' web component. Please ensure the component server is running.`
      );
    }
  }

  /**
   * Load all web components at once (original behavior)
   * @returns Promise that resolves when scripts are loaded
   */
  private async loadAllComponents(): Promise<void> {
    try {
      // Always reload scripts during development
      const forceReload = !environment.production;

      if (this.loadedScripts.size === 0 || forceReload) {
        const baseUrl = environment.webComponentUrl;
        const timestamp = new Date().getTime();

        // Remove old scripts if they exist (for reload)
        if (forceReload) {
          this.removeExistingScripts();
        }

        // With zone.js removed from Angular 20 build, we only need main.js
        // The polyfills.js might still exist but should be empty or minimal
        // We'll try to load it but continue if it fails
        try {
          await this.loadScript(
            "wc-polyfills",
            `${baseUrl}/browser/polyfills.js?v=${timestamp}`,
            true // optional - don't fail if missing
          );
          console.log("✅ Polyfills loaded (if present)");
        } catch (e) {
          console.log(
            "ℹ️ No polyfills file or already loaded (expected after zone.js removal)"
          );
        }

        // Load the main application file (required)
        await this.loadScript(
          "wc-main",
          `${baseUrl}/browser/main.js?v=${timestamp}`,
          false // required
        );

        this.loadedScripts.add("wc-main");

        // Wait for custom elements to register
        await new Promise((resolve) => setTimeout(resolve, 1000));

        console.log("✅ All web component scripts loaded");
      } else {
        console.log("ℹ️ Web component scripts already loaded");
      }
    } catch (err) {
      console.error("Failed to load web component:", err);
      throw new Error(
        "Failed to load the Angular 20 web component. Please ensure the component server is running."
      );
    }
  }

  /**
   * Load a script dynamically
   * @param id Unique ID for the script element
   * @param src Script source URL
   * @param optional If true, don't throw error if script fails to load
   */
  private loadScript(
    id: string,
    src: string,
    optional: boolean = false
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const existing = document.getElementById(id);
      if (existing) {
        console.log(`Script ${id} already loaded`);
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.id = id;
      script.src = src;
      script.type = "module"; // Important: use type="module" for ES modules
      script.crossOrigin = "anonymous";

      script.onload = () => {
        console.log(`✅ Script loaded: ${src}`);
        resolve();
      };

      script.onerror = (error) => {
        console.error(`❌ Script load error: ${src}`, error);

        if (optional) {
          console.log(`ℹ️ Optional script failed to load, continuing: ${src}`);
          resolve(); // Don't fail for optional scripts
        } else {
          reject(new Error(`Failed to load required script: ${src}`));
        }
      };

      document.head.appendChild(script); // Append to head for modules
    });
  }

  /**
   * Remove existing web component scripts from DOM
   */
  private removeExistingScripts(): void {
    const scriptIds = ["wc-polyfills", "wc-main"];
    scriptIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        element.remove();
        this.loadedScripts.delete(id);
        console.log(`🗑️ Removed script: ${id}`);
      }
    });
  }

  /**
   * Verify that a custom element is registered
   * @param tagName The custom element tag name
   * @returns true if element is defined
   */
  isCustomElementDefined(tagName: string): boolean {
    const isDefined = !!customElements.get(tagName);
    if (isDefined) {
      console.log(`✅ Custom element '${tagName}' is defined`);
    } else {
      console.warn(`⚠️ Custom element '${tagName}' not found`);
    }
    return isDefined;
  }

  /**
   * Set data on a custom element using multiple approaches
   * @param selector The element selector
   * @param propertyName The property name (camelCase)
   * @param data The data to set (will be stringified if object)
   */
  setElementData(selector: string, propertyName: string, data: any): boolean {
    const element = document.querySelector(selector);

    if (!element) {
      console.warn(`⚠️ Element not found: ${selector}`);
      return false;
    }

    const dataStr = typeof data === "string" ? data : JSON.stringify(data);
    const kebabName = this.camelToKebab(propertyName);

    // Try multiple approaches to set the data
    // Approach 1: Direct property (camelCase)
    (element as any)[propertyName] = dataStr;

    // Approach 2: Try with kebab-case name
    (element as any)[kebabName] = dataStr;

    // Approach 3: setAttribute
    element.setAttribute(kebabName, dataStr);

    console.log(`✅ Data set on ${selector} via property '${propertyName}'`);
    return true;
  }

  /**
   * Convert camelCase to kebab-case
   */
  private camelToKebab(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }

  /**
   * Load a stylesheet dynamically
   * @param id Unique ID for the link element
   * @param href Stylesheet URL
   * @param optional If true, don't throw error if stylesheet fails to load
   */
  private loadStylesheet(
    id: string,
    href: string,
    optional: boolean = false
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if already loaded
      const existing = document.getElementById(id);
      if (existing) {
        console.log(`Stylesheet ${id} already loaded`);
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href = href;

      link.onload = () => {
        console.log(`✅ Stylesheet loaded: ${href}`);
        resolve();
      };

      link.onerror = (error) => {
        console.error(`❌ Stylesheet load error: ${href}`, error);

        if (optional) {
          console.log(
            `ℹ️ Optional stylesheet failed to load, continuing: ${href}`
          );
          resolve();
        } else {
          reject(new Error(`Failed to load required stylesheet: ${href}`));
        }
      };

      document.head.appendChild(link);
    });
  }

  /**
   * Wait for a custom element to be defined
   * @param tagName The custom element tag name
   * @param timeout Maximum time to wait in milliseconds
   */
  private async waitForCustomElement(
    tagName: string,
    timeout: number = 5000
  ): Promise<void> {
    const startTime = Date.now();

    while (!customElements.get(tagName)) {
      if (Date.now() - startTime > timeout) {
        throw new Error(
          `Timeout waiting for custom element '${tagName}' to be defined`
        );
      }
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    console.log(`✅ Custom element '${tagName}' is defined`);
  }

  /**
   * Reset the service state (useful for testing)
   */
  reset(): void {
    this.loadedScripts.clear();
    this.loadedComponents.clear();
  }
}
