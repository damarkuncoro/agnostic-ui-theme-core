import type { Theme } from "./Theme";
import type { ThemeUpdateProps } from "./ThemeTypes";
import { ThemeFactory } from "./ThemeFactory";

/**
 * Theme Operations
 * Handles theme operations like equality checks, updates, and transformations
 * Follows Single Responsibility Principle
 */
export class ThemeOperations {
  /**
   * Creates a new Theme with updated tokens (immutable)
   */
  public static with(theme: Theme, updates: ThemeUpdateProps): Theme {
    return ThemeFactory.create({
      version: theme.version,
      color: {
        palette: updates.color?.palette ?? theme.color.palette,
        text: updates.color?.text ?? theme.color.text,
        background: updates.color?.background ?? theme.color.background,
        border: updates.color?.border ?? theme.color.border
      },
      spacing: updates.spacing ?? theme.spacing,
      typography: updates.typography ?? theme.typography,
      extendedTokens: updates.extendedTokens ?? theme.extendedTokens
    });
  }

  /**
   * Checks equality with another Theme
   */
  public static equals(theme: Theme, other: Theme): boolean {
    return (
      theme.version === other.version &&
      theme.color.palette.equals(other.color.palette) &&
      theme.color.text.equals(other.color.text) &&
      theme.color.background.equals(other.color.background) &&
      theme.color.border.equals(other.color.border) &&
      theme.spacing.equals(other.spacing) &&
      theme.typography.equals(other.typography) &&
      JSON.stringify(theme.extendedTokens) === JSON.stringify(other.extendedTokens)
    );
  }

  /**
   * Creates a copy of the theme
   */
  public static clone(theme: Theme): Theme {
    return ThemeFactory.create({
      version: theme.version,
      color: {
        palette: theme.color.palette, // Value objects are immutable
        text: theme.color.text,
        background: theme.color.background,
        border: theme.color.border
      },
      spacing: theme.spacing,
      typography: theme.typography,
      extendedTokens: theme.extendedTokens ? { ...theme.extendedTokens } : undefined
    });
  }

  /**
   * Merges two themes with precedence
   */
  public static merge(base: Theme, overrides: Partial<ThemeUpdateProps>): Theme {
    return this.with(base, overrides);
  }

  /**
   * Creates a theme diff between two themes
   */
  public static diff(theme: Theme, other: Theme): ThemeUpdateProps {
    const updates: ThemeUpdateProps = {};

    // Color differences
    if (!theme.color.palette.equals(other.color.palette)) {
      updates.color = { palette: other.color.palette };
    }
    if (!theme.color.text.equals(other.color.text)) {
      updates.color = { ...updates.color, text: other.color.text };
    }
    if (!theme.color.background.equals(other.color.background)) {
      updates.color = { ...updates.color, background: other.color.background };
    }
    if (!theme.color.border.equals(other.color.border)) {
      updates.color = { ...updates.color, border: other.color.border };
    }

    // Spacing differences
    if (!theme.spacing.equals(other.spacing)) {
      updates.spacing = other.spacing;
    }

    // Typography differences
    if (!theme.typography.equals(other.typography)) {
      updates.typography = other.typography;
    }

    // Extended tokens differences
    if (JSON.stringify(theme.extendedTokens) !== JSON.stringify(other.extendedTokens)) {
      updates.extendedTokens = other.extendedTokens;
    }

    return updates;
  }

  /**
   * Validates theme update props
   */
  public static validateUpdates(updates: ThemeUpdateProps): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate color updates
    if (updates.color) {
      if (updates.color.palette && typeof updates.color.palette !== 'object') {
        errors.push("Invalid palette in color updates");
      }
      if (updates.color.text && typeof updates.color.text !== 'object') {
        errors.push("Invalid text in color updates");
      }
      if (updates.color.background && typeof updates.color.background !== 'object') {
        errors.push("Invalid background in color updates");
      }
      if (updates.color.border && typeof updates.color.border !== 'object') {
        errors.push("Invalid border in color updates");
      }
    }

    // Validate extended tokens
    if (updates.extendedTokens && typeof updates.extendedTokens !== 'object') {
      errors.push("Extended tokens must be an object");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}