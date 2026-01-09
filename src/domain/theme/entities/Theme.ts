// src/domain/theme/entities/Theme.ts
import { ThemeFactory } from "./ThemeFactory";
import { ThemeValidator } from "./ThemeValidator";
import { ThemeBusinessLogic } from "./ThemeBusinessLogic";
import { ThemeOperations } from "./ThemeOperations";
import { ThemeConverter } from "./ThemeConverter";
import type {
  UiThemeVersion,
  ThemeTokenStructure,
  ThemeUpdateProps,
  AccessibilityValidationResult,
  ComponentTokens,
  ThemeMode,
  UiThemeFormat
} from "./ThemeTypes";

/**
 * Theme Entity
 * Represents a complete design system theme with all token collections
 * Follows DDD principles with encapsulated business logic and validation
 * Uses composition to delegate responsibilities to specialized classes
 */
export class Theme {
  public readonly version: UiThemeVersion;
  public readonly color: ThemeTokenStructure['color'];
  public readonly spacing: ThemeTokenStructure['spacing'];
  public readonly typography: ThemeTokenStructure['typography'];
  public readonly extendedTokens?: Record<string, any>;

  // Composition: Delegate responsibilities to specialized classes
  private validator: ThemeValidator;
  private businessLogic: ThemeBusinessLogic;
  private operations: ThemeOperations;

  private constructor(props: ThemeTokenStructure) {
    this.version = props.version;
    this.color = Object.freeze({
      palette: props.color.palette,
      text: props.color.text,
      background: props.color.background,
      border: props.color.border
    });
    this.spacing = props.spacing;
    this.typography = props.typography;
    this.extendedTokens = props.extendedTokens ? Object.freeze({ ...props.extendedTokens }) : undefined;

    // Initialize composed dependencies
    this.validator = new ThemeValidator();
    this.businessLogic = ThemeBusinessLogic;
    this.operations = ThemeOperations;
  }

  /**
   * Creates a Theme from raw token objects
   * Delegates to ThemeFactory
   */
  public static create(props: ThemeTokenStructure): Theme {
    return ThemeFactory.create(props);
  }

  /**
   * Creates the default theme
   * Delegates to ThemeFactory
   */
  public static createDefault(): Theme {
    return ThemeFactory.createDefault();
  }

  /**
   * Business logic: Validates theme accessibility compliance
   * Delegates to ThemeValidator
   */
  public validateAccessibility(): AccessibilityValidationResult {
    return this.validator.validateAccessibility(this);
  }

  /**
   * Business logic: Gets complete token set for a component type
   * Delegates to ThemeBusinessLogic
   */
  public getTokensForComponent(componentType: "button" | "input" | "card"): ComponentTokens {
    return this.businessLogic.getTokensForComponent(this, componentType);
  }

  /**
   * Business logic: Checks if theme supports dark mode
   * Delegates to ThemeBusinessLogic
   */
  public supportsDarkMode(): boolean {
    return this.businessLogic.supportsDarkMode(this);
  }

  /**
   * Business logic: Gets theme mode (light/dark/auto)
   * Delegates to ThemeBusinessLogic
   */
  public getThemeMode(): ThemeMode {
    return this.businessLogic.getThemeMode(this);
  }

  /**
   * Creates a new Theme with updated tokens
   * Maintains immutability through ThemeOperations
   */
  public with(updates: ThemeUpdateProps): Theme {
    return this.operations.with(this, updates);
  }

  /**
   * Checks equality with another Theme
   * Delegates to ThemeOperations
   */
  public equals(other: Theme): boolean {
    return this.operations.equals(this, other);
  }

  /**
   * Converts to UiTheme format for external consumption
   * Uses ThemeConverter
   */
  public toUiTheme(): UiThemeFormat {
    const result = ThemeConverter.toUiTheme(this);
    return {
      ...result,
      version: result.version as UiThemeVersion
    };
  }

  /**
   * Additional business methods using composition
   */

  /**
   * Gets theme complexity score
   */
  public getComplexityScore(): number {
    return this.businessLogic.calculateComplexity(this);
  }

  /**
   * Checks compatibility with another theme
   */
  public isCompatibleWith(other: Theme): boolean {
    return this.businessLogic.isCompatibleWith(this, other);
  }

  /**
   * Gets theme recommendations
   */
  public getRecommendations(): string[] {
    return this.businessLogic.getRecommendations(this);
  }

  /**
   * Creates a diff with another theme
   */
  public diff(other: Theme): ThemeUpdateProps {
    return this.operations.diff(this, other);
  }

  /**
   * Validates comprehensive theme structure
   */
  public validate(): { isValid: boolean; isAccessible: boolean; errors: string[]; warnings: string[] } {
    return this.validator.validateTheme(this);
  }
}

// Re-export types for backward compatibility
export type { UiThemeVersion } from "./ThemeTypes";