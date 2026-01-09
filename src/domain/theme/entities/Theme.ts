// src/domain/theme/entities/Theme.ts
import { ColorPalette } from "../../tokens/color/ColorPalette";
import { TextColor } from "../../tokens/color/TextColor";
import { BackgroundColor } from "../../tokens/color/BackgroundColor";
import { BorderColor } from "../../tokens/color/BorderColor";
import { SpacingScale } from "../../tokens/spacing/SpacingScale";
import { TypographyScale } from "../../tokens/typography/TypographyScale";
import { ThemeConverter } from "./ThemeConverter";
import { ComponentTokenService } from "./ComponentTokenService";

/**
 * Theme version type
 */
export type UiThemeVersion = "2.1";

/**
 * Theme Entity
 * Represents a complete design system theme with all token collections
 * Follows DDD principles with encapsulated business logic and validation
 */
export class Theme {
  public readonly version: UiThemeVersion;
  public readonly color: {
    palette: ColorPalette;
    text: TextColor;
    background: BackgroundColor;
    border: BorderColor;
  };
  public readonly spacing: SpacingScale;
  public readonly typography: TypographyScale;

  // Extended tokens (optional)
  public readonly extendedTokens?: Record<string, any>;

  private constructor(props: {
    version: UiThemeVersion;
    color: {
      palette: ColorPalette;
      text: TextColor;
      background: BackgroundColor;
      border: BorderColor;
    };
    spacing: SpacingScale;
    typography: TypographyScale;
    extendedTokens?: Record<string, any>;
  }) {
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
  }

  /**
   * Creates a Theme from raw token objects
   */
  public static create(props: {
    version: UiThemeVersion;
    color: {
      palette: ColorPalette;
      text: TextColor;
      background: BackgroundColor;
      border: BorderColor;
    };
    spacing: SpacingScale;
    typography: TypographyScale;
    extendedTokens?: Record<string, any>;
  }): Theme {
    // Validate version
    if (!["2.1"].includes(props.version)) {
      throw new Error(`Unsupported theme version: ${props.version}. Supported: 2.1`);
    }

    return new Theme(props);
  }

  /**
   * Creates the default theme
   */
  public static createDefault(): Theme {
    return Theme.create({
      version: "2.1",
      color: {
        palette: ColorPalette.createDefault(),
        text: TextColor.createDefault(),
        background: BackgroundColor.createDefault(),
        border: BorderColor.createDefault()
      },
      spacing: SpacingScale.createDefault(),
      typography: TypographyScale.createDefault()
    });
  }

  /**
   * Business logic: Validates theme accessibility compliance
   */
  public validateAccessibility(): { isAccessible: boolean; violations: string[] } {
    const violations: string[] = [];

    // Validate text color contrast
    const textValidation = this.color.text.validateContrast();
    violations.push(...textValidation.violations);

    // Validate background hierarchy
    const backgroundValidation = this.color.background.validateHierarchy();
    violations.push(...backgroundValidation.violations);

    // Validate border hierarchy
    const borderValidation = this.color.border.validateHierarchy();
    violations.push(...borderValidation.violations);

    // Validate border focus accessibility
    const focusValidation = this.color.border.validateFocusAccessibility();
    violations.push(...focusValidation.issues);

    // Validate typography accessibility
    const typographyValidation = this.typography.validateAccessibility();
    violations.push(...typographyValidation.violations);

    // Validate spacing progression
    const spacingValidation = this.spacing.validateProgression();
    violations.push(...spacingValidation.violations);

    return {
      isAccessible: violations.length === 0,
      violations
    };
  }

  /**
   * Business logic: Gets complete token set for a component type
   */
  public getTokensForComponent(componentType: "button" | "input" | "card"): {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      background: string;
      border: string;
    };
    spacing: {
      padding: string;
      margin: string;
      gap: string;
    };
    typography: {
      fontSize: string;
      fontWeight: string;
      lineHeight: string;
    };
  } {
    return ComponentTokenService.getTokensForComponent(this, componentType);
  }

  /**
   * Business logic: Checks if theme supports dark mode
   */
  public supportsDarkMode(): boolean {
    // A theme supports dark mode if it has appropriate inverse colors
    return (
      this.color.text.inverse !== this.color.text.primary &&
      this.color.background.inverse !== this.color.background.surface
    );
  }

  /**
   * Business logic: Gets theme mode (light/dark/auto)
   */
  public getThemeMode(): "light" | "dark" | "auto" {
    // Simplified logic - in real implementation, this would analyze color relationships
    const isDark = this.color.background.surface === "#1f2937";
    const isLight = this.color.background.surface === "#ffffff";

    if (isDark) return "dark";
    if (isLight) return "light";
    return "auto";
  }

  /**
   * Creates a new Theme with updated tokens
   * Maintains immutability
   */
  public with(updates: Partial<{
    color: Partial<{
      palette: ColorPalette;
      text: TextColor;
      background: BackgroundColor;
      border: BorderColor;
    }>;
    spacing: SpacingScale;
    typography: TypographyScale;
    extendedTokens: Record<string, any>;
  }>): Theme {
    return Theme.create({
      version: this.version,
      color: {
        palette: updates.color?.palette ?? this.color.palette,
        text: updates.color?.text ?? this.color.text,
        background: updates.color?.background ?? this.color.background,
        border: updates.color?.border ?? this.color.border
      },
      spacing: updates.spacing ?? this.spacing,
      typography: updates.typography ?? this.typography,
      extendedTokens: updates.extendedTokens ?? this.extendedTokens
    });
  }

  /**
   * Checks equality with another Theme
   */
  public equals(other: Theme): boolean {
    return (
      this.version === other.version &&
      this.color.palette.equals(other.color.palette) &&
      this.color.text.equals(other.color.text) &&
      this.color.background.equals(other.color.background) &&
      this.color.border.equals(other.color.border) &&
      this.spacing.equals(other.spacing) &&
      this.typography.equals(other.typography) &&
      JSON.stringify(this.extendedTokens) === JSON.stringify(other.extendedTokens)
    );
  }

  /**
   * Converts to UiTheme format for external consumption
   */
  public toUiTheme(): {
    version: UiThemeVersion;
    tokens: {
      color: {
        palette: Record<string, Record<string, string>>;
        text: Record<string, string>;
        background: Record<string, string>;
        border: Record<string, string>;
      };
      spacing: {
        scale: Record<string, string>;
        semantic: Record<string, string>;
      };
      typography: {
        fontSize: Record<string, string>;
        fontWeight: Record<string, string>;
        lineHeight: Record<string, string>;
      };
      shadow: Record<string, string>;
      zIndex: Record<string, string>;
    };
  } {
    return ThemeConverter.toUiTheme(this);
  }
}