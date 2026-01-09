import type { Theme } from "./Theme";
import type { AccessibilityValidationResult } from "./ThemeTypes";

/**
 * Theme Validator
 * Handles all theme validation logic following Strategy pattern
 * Follows Single Responsibility Principle
 */
export class ThemeValidator {
  /**
   * Validates theme accessibility compliance
   */
  public validateAccessibility(theme: Theme): AccessibilityValidationResult {
    const violations: string[] = [];

    // Validate text color contrast
    const textValidation = theme.color.text.validateContrast();
    violations.push(...textValidation.violations);

    // Validate background hierarchy
    const backgroundValidation = theme.color.background.validateHierarchy();
    violations.push(...backgroundValidation.violations);

    // Validate border hierarchy
    const borderValidation = theme.color.border.validateHierarchy();
    violations.push(...borderValidation.violations);

    // Validate border focus accessibility
    const focusValidation = theme.color.border.validateFocusAccessibility();
    violations.push(...focusValidation.issues);

    // Validate typography accessibility
    const typographyValidation = theme.typography.validateAccessibility();
    violations.push(...typographyValidation.violations);

    // Validate spacing progression
    const spacingValidation = theme.spacing.validateProgression();
    violations.push(...spacingValidation.violations);

    return {
      isAccessible: violations.length === 0,
      violations
    };
  }

  /**
   * Validates theme version compatibility
   */
  public validateVersion(version: string): { isValid: boolean; error?: string } {
    const supportedVersions = ["2.1"];

    if (!supportedVersions.includes(version)) {
      return {
        isValid: false,
        error: `Unsupported theme version: ${version}. Supported: ${supportedVersions.join(", ")}`
      };
    }

    return { isValid: true };
  }

  /**
   * Comprehensive theme validation
   */
  public validateTheme(theme: Theme): {
    isValid: boolean;
    isAccessible: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Version validation
    const versionValidation = this.validateVersion(theme.version);
    if (!versionValidation.isValid) {
      errors.push(versionValidation.error!);
    }

    // Accessibility validation
    const accessibilityValidation = this.validateAccessibility(theme);
    if (!accessibilityValidation.isAccessible) {
      warnings.push(...accessibilityValidation.violations.map(v => `Accessibility: ${v}`));
    }

    // Token structure validation
    if (!theme.color.palette) {
      errors.push("Missing color palette tokens");
    }
    if (!theme.color.text) {
      errors.push("Missing text color tokens");
    }
    if (!theme.color.background) {
      errors.push("Missing background color tokens");
    }
    if (!theme.color.border) {
      errors.push("Missing border color tokens");
    }
    if (!theme.spacing) {
      errors.push("Missing spacing tokens");
    }
    if (!theme.typography) {
      errors.push("Missing typography tokens");
    }

    return {
      isValid: errors.length === 0,
      isAccessible: accessibilityValidation.isAccessible,
      errors,
      warnings
    };
  }
}