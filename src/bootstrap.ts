// src/bootstrap.ts
import { ThemeBuilderService } from "./application/services/ThemeBuilderService";
import { ThemeValidatorService } from "./application/services/ThemeValidatorService";
import { TokenBuilder } from "./infrastructure/builders/TokenBuilder";

/**
 * Dependency Injection Container
 * Provides singleton instances of application services
 */

// Singleton instances
let themeBuilderServiceInstance: ThemeBuilderService | null = null;
let themeValidatorServiceInstance: ThemeValidatorService | null = null;

/**
 * Gets the ThemeBuilderService instance
 * Creates singleton with proper dependency injection
 */
export function getThemeBuilderService(): ThemeBuilderService {
  if (!themeBuilderServiceInstance) {
    themeBuilderServiceInstance = new ThemeBuilderService();
  }
  return themeBuilderServiceInstance;
}

/**
 * Gets the ThemeValidatorService instance
 * Creates singleton with proper dependency injection
 */
export function getThemeValidatorService(): ThemeValidatorService {
  if (!themeValidatorServiceInstance) {
    themeValidatorServiceInstance = new ThemeValidatorService();
  }
  return themeValidatorServiceInstance;
}

/**
 * Gets the TokenBuilder class
 * For direct infrastructure access when needed
 */
export function getTokenBuilder(): typeof TokenBuilder {
  return TokenBuilder;
}

/**
 * Resets all singleton instances
 * Useful for testing
 */
export function resetThemeServices(): void {
  themeBuilderServiceInstance = null;
  themeValidatorServiceInstance = null;
}