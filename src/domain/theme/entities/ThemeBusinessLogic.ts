import type { Theme } from "./Theme";
import type { ComponentTokens, ThemeMode } from "./ThemeTypes";
import { ComponentTokenService } from "./ComponentTokenService";

/**
 * Theme Business Logic
 * Contains all business rules and calculations for themes
 * Follows Single Responsibility Principle
 */
export class ThemeBusinessLogic {
  /**
   * Determines if theme supports dark mode
   */
  public static supportsDarkMode(theme: Theme): boolean {
    // A theme supports dark mode if it has appropriate inverse colors
    return (
      theme.color.text.inverse !== theme.color.text.primary &&
      theme.color.background.inverse !== theme.color.background.surface
    );
  }

  /**
   * Gets theme mode based on color analysis
   */
  public static getThemeMode(theme: Theme): ThemeMode {
    // Simplified logic - in real implementation, this would analyze color relationships
    const isDark = theme.color.background.surface === "#1f2937";
    const isLight = theme.color.background.surface === "#ffffff";

    if (isDark) return "dark";
    if (isLight) return "light";
    return "auto";
  }

  /**
   * Gets complete token set for a component type
   */
  public static getTokensForComponent(
    theme: Theme,
    componentType: "button" | "input" | "card"
  ): ComponentTokens {
    return ComponentTokenService.getTokensForComponent(theme, componentType);
  }

  /**
   * Calculates theme complexity score
   */
  public static calculateComplexity(theme: Theme): number {
    let score = 0;

    // Color complexity
    score += Object.keys(theme.color.palette.toObject()).length * 2;
    score += Object.keys(theme.color.text.toObject()).length;
    score += Object.keys(theme.color.background.toObject()).length;
    score += Object.keys(theme.color.border.toObject()).length;

    // Spacing complexity
    score += Object.keys(theme.spacing.scale).length;
    score += Object.keys(theme.spacing.semantic).length;

    // Typography complexity
    score += Object.keys(theme.typography.fontSize).length;
    score += Object.keys(theme.typography.fontWeight).length;
    score += Object.keys(theme.typography.lineHeight).length;

    // Extended tokens
    if (theme.extendedTokens) {
      score += Object.keys(theme.extendedTokens).length * 3;
    }

    return score;
  }

  /**
   * Checks if theme is compatible with another theme
   */
  public static isCompatibleWith(theme: Theme, otherTheme: Theme): boolean {
    // Same version
    if (theme.version !== otherTheme.version) {
      return false;
    }

    // Compatible color structures
    const themeColors = Object.keys(theme.color.palette.toObject());
    const otherColors = Object.keys(otherTheme.color.palette.toObject());

    return themeColors.length === otherColors.length &&
           themeColors.every(color => otherColors.includes(color));
  }

  /**
   * Gets theme recommendations based on analysis
   */
  public static getRecommendations(theme: Theme): string[] {
    const recommendations: string[] = [];
    const complexity = this.calculateComplexity(theme);

    if (complexity > 100) {
      recommendations.push("Consider simplifying the theme - high complexity may impact performance");
    }

    if (!this.supportsDarkMode(theme)) {
      recommendations.push("Consider adding dark mode support for better user experience");
    }

    const mode = this.getThemeMode(theme);
    if (mode === "auto") {
      recommendations.push("Theme mode detection is ambiguous - consider clarifying color relationships");
    }

    return recommendations;
  }
}