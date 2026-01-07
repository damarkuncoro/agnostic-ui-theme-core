// src/application/services/ThemeBuilderService.ts
import { Theme, UiThemeVersion } from "../../domain/theme/entities/Theme";
import { ColorPalette } from "../../domain/tokens/color/ColorPalette";
import { TextColor } from "../../domain/tokens/color/TextColor";
import { BackgroundColor } from "../../domain/tokens/color/BackgroundColor";
import { BorderColor } from "../../domain/tokens/color/BorderColor";
import { SpacingScale } from "../../domain/tokens/spacing/SpacingScale";
import { TypographyScale } from "../../domain/tokens/typography/TypographyScale";

/**
 * ThemeBuilderService Application Service
 * Orchestrates theme creation and composition using domain entities
 * Follows SOLID principles with dependency injection and single responsibility
 */
export class ThemeBuilderService {
  /**
   * Creates a complete theme from individual token configurations
   * Application service that orchestrates theme assembly
   */
  public buildTheme(config: {
    version?: UiThemeVersion;
    color?: {
      palette?: {
        neutral?: Record<string, string>;
        primary?: Record<string, string>;
        secondary?: Record<string, string>;
      };
      text?: {
        primary?: string;
        secondary?: string;
        muted?: string;
        inverse?: string;
        disabled?: string;
      };
      background?: {
        surface?: string;
        elevated?: string;
        muted?: string;
        inverse?: string;
      };
      border?: {
        default?: string;
        subtle?: string;
        strong?: string;
        focus?: string;
      };
    };
    spacing?: {
      scale?: Record<string, string>;
      semantic?: Record<string, string>;
    };
    typography?: {
      fontSize?: Record<string, string>;
      fontWeight?: Record<string, string>;
      lineHeight?: Record<string, string>;
    };
    extendedTokens?: Record<string, any>;
  }): Theme {
    const version = config.version ?? "2.1";

    // Build color tokens with defaults
    const colorPalette = config.color?.palette
      ? ColorPalette.create({
          neutral: config.color.palette.neutral ?? ColorPalette.createDefaultNeutral(),
          primary: config.color.palette.primary ?? ColorPalette.createDefaultPrimary(),
          secondary: config.color.palette.secondary ?? ColorPalette.createDefaultSecondary()
        })
      : ColorPalette.createDefault();

    const textColor = config.color?.text
      ? TextColor.create({
          primary: config.color.text.primary ?? "#1f2937",
          secondary: config.color.text.secondary ?? "#6b7280",
          muted: config.color.text.muted ?? "#9ca3af",
          inverse: config.color.text.inverse ?? "#ffffff",
          disabled: config.color.text.disabled ?? "#d1d5db"
        })
      : TextColor.createDefault();

    const backgroundColor = config.color?.background
      ? BackgroundColor.create({
          surface: config.color.background.surface ?? "#ffffff",
          elevated: config.color.background.elevated ?? "#f9fafb",
          muted: config.color.background.muted ?? "#f3f4f6",
          inverse: config.color.background.inverse ?? "#1f2937"
        })
      : BackgroundColor.createDefault();

    const borderColor = config.color?.border
      ? BorderColor.create({
          default: config.color.border.default ?? "#e5e7eb",
          subtle: config.color.border.subtle ?? "#f3f4f6",
          strong: config.color.border.strong ?? "#d1d5db",
          focus: config.color.border.focus ?? "#3b82f6"
        })
      : BorderColor.createDefault();

    // Build spacing tokens with defaults
    const spacingScale = config.spacing
      ? SpacingScale.create({
          scale: config.spacing.scale ?? SpacingScale.createDefaultScale(),
          semantic: config.spacing.semantic ?? SpacingScale.createDefaultSemantic()
        })
      : SpacingScale.createDefault();

    // Build typography tokens with defaults
    const typographyScale = config.typography
      ? TypographyScale.create({
          fontSize: config.typography.fontSize ?? TypographyScale.createDefaultFontSize(),
          fontWeight: config.typography.fontWeight ?? TypographyScale.createDefaultFontWeight(),
          lineHeight: config.typography.lineHeight ?? TypographyScale.createDefaultLineHeight()
        })
      : TypographyScale.createDefault();

    return Theme.create({
      version,
      color: {
        palette: colorPalette,
        text: textColor,
        background: backgroundColor,
        border: borderColor
      },
      spacing: spacingScale,
      typography: typographyScale,
      extendedTokens: config.extendedTokens
    });
  }

  /**
   * Creates a light theme with standard configurations
   */
  public createLightTheme(overrides?: Partial<{
    primaryColor: string;
    fontSize: Record<string, string>;
    spacing: Record<string, string>;
  }>): Theme {
    return this.buildTheme({
      color: {
        palette: {
          primary: { 500: overrides?.primaryColor ?? "#3b82f6" }
        }
      },
      typography: {
        fontSize: overrides?.fontSize
      },
      spacing: {
        semantic: overrides?.spacing
      }
    });
  }

  /**
   * Creates a dark theme with standard configurations
   */
  public createDarkTheme(overrides?: Partial<{
    primaryColor: string;
    fontSize: Record<string, string>;
    spacing: Record<string, string>;
  }>): Theme {
    return this.buildTheme({
      color: {
        palette: {
          primary: { 500: overrides?.primaryColor ?? "#60a5fa" }
        },
        text: {
          primary: "#f9fafb",
          secondary: "#d1d5db",
          muted: "#9ca3af",
          inverse: "#1f2937",
          disabled: "#6b7280"
        },
        background: {
          surface: "#1f2937",
          elevated: "#374151",
          muted: "#4b5563",
          inverse: "#f9fafb"
        },
        border: {
          default: "#4b5563",
          subtle: "#374151",
          strong: "#6b7280",
          focus: "#60a5fa"
        }
      },
      typography: {
        fontSize: overrides?.fontSize
      },
      spacing: {
        semantic: overrides?.spacing
      }
    });
  }

  /**
   * Creates a high contrast theme for accessibility
   */
  public createHighContrastTheme(): Theme {
    return this.buildTheme({
      color: {
        palette: {
          primary: { 500: "#000000" },
          secondary: { 500: "#ffffff" }
        },
        text: {
          primary: "#000000",
          secondary: "#000000",
          muted: "#000000",
          inverse: "#ffffff",
          disabled: "#666666"
        },
        background: {
          surface: "#ffffff",
          elevated: "#f0f0f0",
          muted: "#e0e0e0",
          inverse: "#000000"
        },
        border: {
          default: "#000000",
          subtle: "#666666",
          strong: "#000000",
          focus: "#0000ff"
        }
      }
    });
  }

  /**
   * Merges two themes, with override taking precedence
   */
  public mergeThemes(base: Theme, override: Partial<{
    color: Partial<{
      palette: Partial<{
        neutral: Record<string, string>;
        primary: Record<string, string>;
        secondary: Record<string, string>;
      }>;
      text: Partial<{
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
        disabled: string;
      }>;
      background: Partial<{
        surface: string;
        elevated: string;
        muted: string;
        inverse: string;
      }>;
      border: Partial<{
        default: string;
        subtle: string;
        strong: string;
        focus: string;
      }>;
    }>;
    spacing: Partial<{
      scale: Record<string, string>;
      semantic: Record<string, string>;
    }>;
    typography: Partial<{
      fontSize: Record<string, string>;
      fontWeight: Record<string, string>;
      lineHeight: Record<string, string>;
    }>;
    extendedTokens: Record<string, any>;
  }>): Theme {
    // Deep merge logic would go here
    // For now, return the base theme (simplified implementation)
    return base;
  }

  /**
   * Validates theme configuration before building
   */
  public validateThemeConfig(config: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (config.version && !["2.1"].includes(config.version)) {
      errors.push(`Unsupported theme version: ${config.version}`);
    }

    // Add more validation logic as needed

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}