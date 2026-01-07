// src/application/services/ThemeValidatorService.ts
import { Theme } from "../../domain/theme/entities/Theme";

/**
 * ThemeValidatorService Application Service
 * Handles comprehensive theme validation using domain business rules
 * Follows SOLID principles with single responsibility for validation
 */
export class ThemeValidatorService {
  /**
   * Validates a complete theme for consistency and accessibility
   * Application service that orchestrates all validation checks
   */
  public validateTheme(theme: Theme): {
    isValid: boolean;
    isAccessible: boolean;
    errors: string[];
    warnings: string[];
    accessibility: {
      isAccessible: boolean;
      violations: string[];
    };
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Version validation
    if (!["2.1"].includes(theme.version)) {
      errors.push(`Unsupported theme version: ${theme.version}`);
    }

    // Accessibility validation using domain business logic
    const accessibilityResult = theme.validateAccessibility();
    if (!accessibilityResult.isAccessible) {
      errors.push(...accessibilityResult.violations.map(v => `Accessibility: ${v}`));
    }

    // Theme consistency validation
    const consistencyResult = this.validateThemeConsistency(theme);
    errors.push(...consistencyResult.errors);
    warnings.push(...consistencyResult.warnings);

    // Color harmony validation
    const harmonyResult = this.validateColorHarmony(theme);
    warnings.push(...harmonyResult.warnings);

    return {
      isValid: errors.length === 0,
      isAccessible: accessibilityResult.isAccessible,
      errors,
      warnings,
      accessibility: accessibilityResult
    };
  }

  /**
   * Validates theme consistency across all token types
   */
  private validateThemeConsistency(theme: Theme): { errors: string[]; warnings: string[] } {
    const errors: string[] = [];
    const warnings: string[] = [];

    // Check if primary colors are used consistently
    const primaryPalette = theme.color.palette.getPrimary();
    const primaryText = theme.color.text.primary;

    // Warning if primary colors don't work well together
    if (primaryPalette === primaryText) {
      warnings.push("Primary palette and text colors are identical - may reduce visual hierarchy");
    }

    // Check spacing scale progression
    const spacingValidation = theme.spacing.validateProgression();
    if (!spacingValidation.isValid) {
      errors.push(...spacingValidation.violations);
    }

    // Check typography scale accessibility
    const typographyValidation = theme.typography.validateAccessibility();
    if (!typographyValidation.isAccessible) {
      errors.push(...typographyValidation.violations);
    }

    return { errors, warnings };
  }

  /**
   * Validates color harmony and relationships
   */
  private validateColorHarmony(theme: Theme): { warnings: string[] } {
    const warnings: string[] = [];

    // Check if neutral colors form a proper grayscale
    const neutral50 = theme.color.palette.neutral["50"];
    const neutral900 = theme.color.palette.neutral["900"];

    if (neutral50 && neutral900) {
      // Simplified check - in real implementation, use proper color space analysis
      if (neutral50 === neutral900) {
        warnings.push("Neutral color scale may not provide sufficient contrast range");
      }
    }

    // Check if primary and secondary colors work well together
    const primary = theme.color.palette.getPrimary();
    const secondary = theme.color.palette.getSecondary();

    if (primary === secondary) {
      warnings.push("Primary and secondary colors are identical - consider differentiation");
    }

    return { warnings };
  }

  /**
   * Validates theme for specific use cases
   */
  public validateForUseCase(theme: Theme, useCase: "web" | "mobile" | "print"): {
    isValid: boolean;
    errors: string[];
    warnings: string[];
  } {
    const errors: string[] = [];
    const warnings: string[] = [];

    switch (useCase) {
      case "web":
        // Web-specific validation
        if (theme.spacing.getScale("32") !== "8rem") {
          warnings.push("Large spacing values may not be suitable for web layouts");
        }
        break;

      case "mobile":
        // Mobile-specific validation
        const minTouchTarget = 2.75; // 44px in rem
        const buttonPadding = parseFloat(theme.spacing.getSpacingForSize("md").replace("rem", ""));

        if (buttonPadding * 2 < minTouchTarget) {
          warnings.push("Button padding may be too small for mobile touch targets");
        }
        break;

      case "print":
        // Print-specific validation
        const textColor = theme.color.text.primary;
        if (textColor !== "#000000") {
          warnings.push("Text color should typically be black for print");
        }
        break;
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * Generates validation report for documentation
   */
  public generateValidationReport(theme: Theme): string {
    const validation = this.validateTheme(theme);

    let report = `# Theme Validation Report\n\n`;
    report += `**Theme Version:** ${theme.version}\n`;
    report += `**Overall Valid:** ${validation.isValid ? "✅" : "❌"}\n`;
    report += `**Accessibility Compliant:** ${validation.isAccessible ? "✅" : "❌"}\n\n`;

    if (validation.errors.length > 0) {
      report += `## Errors (${validation.errors.length})\n`;
      validation.errors.forEach(error => {
        report += `- ❌ ${error}\n`;
      });
      report += "\n";
    }

    if (validation.warnings.length > 0) {
      report += `## Warnings (${validation.warnings.length})\n`;
      validation.warnings.forEach(warning => {
        report += `- ⚠️ ${warning}\n`;
      });
      report += "\n";
    }

    if (validation.accessibility.violations.length > 0) {
      report += `## Accessibility Issues (${validation.accessibility.violations.length})\n`;
      validation.accessibility.violations.forEach(violation => {
        report += `- ♿ ${violation}\n`;
      });
    }

    return report;
  }

  /**
   * Quick validation for development feedback
   */
  public quickValidate(theme: Theme): {
    status: "valid" | "warnings" | "errors";
    message: string;
  } {
    const validation = this.validateTheme(theme);

    if (!validation.isValid) {
      return {
        status: "errors",
        message: `${validation.errors.length} error(s) found. Check validation report for details.`
      };
    }

    if (validation.warnings.length > 0) {
      return {
        status: "warnings",
        message: `${validation.warnings.length} warning(s) found. Theme is valid but could be improved.`
      };
    }

    return {
      status: "valid",
      message: "Theme is valid and accessible. 🎉"
    };
  }
}