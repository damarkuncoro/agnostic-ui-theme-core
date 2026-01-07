// src/infrastructure/builders/TokenBuilder.ts
import { ColorPalette } from "../../domain/tokens/color/ColorPalette";
import { TextColor } from "../../domain/tokens/color/TextColor";
import { BackgroundColor } from "../../domain/tokens/color/BackgroundColor";
import { BorderColor } from "../../domain/tokens/color/BorderColor";
import { SpacingScale } from "../../domain/tokens/spacing/SpacingScale";
import { TypographyScale } from "../../domain/tokens/typography/TypographyScale";

/**
 * TokenBuilder Infrastructure Service
 * Provides reusable token creation logic following DRY principles
 * Centralizes common token building patterns and defaults
 */
export class TokenBuilder {
  /**
   * Builds color tokens from a base color using standard color theory
   * DRY: Eliminates repetitive color palette creation
   */
  public static buildColorPalette(baseColor: string): {
    neutral: Record<string, string>;
    primary: Record<string, string>;
    secondary: Record<string, string>;
  } {
    // Simplified color palette generation
    // In real implementation, use proper color manipulation libraries
    return {
      neutral: ColorPalette.createDefaultNeutral(),
      primary: { 500: baseColor },
      secondary: ColorPalette.createDefaultSecondary()
    };
  }

  /**
   * Builds semantic color tokens based on theme mode
   * DRY: Standardizes semantic color relationships
   */
  public static buildSemanticColors(mode: "light" | "dark" = "light"): {
    text: {
      primary: string;
      secondary: string;
      muted: string;
      inverse: string;
      disabled: string;
    };
    background: {
      surface: string;
      elevated: string;
      muted: string;
      inverse: string;
    };
    border: {
      default: string;
      subtle: string;
      strong: string;
      focus: string;
    };
  } {
    if (mode === "dark") {
      return {
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
      };
    }

    // Light mode (default)
    return {
      text: {
        primary: "#1f2937",
        secondary: "#6b7280",
        muted: "#9ca3af",
        inverse: "#ffffff",
        disabled: "#d1d5db"
      },
      background: {
        surface: "#ffffff",
        elevated: "#f9fafb",
        muted: "#f3f4f6",
        inverse: "#1f2937"
      },
      border: {
        default: "#e5e7eb",
        subtle: "#f3f4f6",
        strong: "#d1d5db",
        focus: "#3b82f6"
      }
    };
  }

  /**
   * Builds spacing scale with consistent ratios
   * DRY: Standardizes spacing scale generation
   */
  public static buildSpacingScale(baseUnit: number = 0.25): {
    scale: Record<string, string>;
    semantic: Record<string, string>;
  } {
    const scale: Record<string, string> = {};
    const semantic: Record<string, string> = {};

    // Generate scale (powers of 2)
    [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32].forEach((multiplier, index) => {
      const key = multiplier === 0 ? "0" : multiplier.toString();
      scale[key] = `${multiplier * baseUnit}rem`;
    });

    // Generate semantic spacing
    semantic.xs = `${1 * baseUnit}rem`;    // 0.25rem
    semantic.sm = `${4 * baseUnit}rem`;    // 1rem
    semantic.md = `${6 * baseUnit}rem`;    // 1.5rem
    semantic.lg = `${8 * baseUnit}rem`;    // 2rem
    semantic.xl = `${12 * baseUnit}rem`;   // 3rem

    return { scale, semantic };
  }

  /**
   * Builds typography scale with consistent type scale
   * DRY: Standardizes typography scale generation
   */
  public static buildTypographyScale(baseSize: number = 1): {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  } {
    // Modular scale (1.25 ratio)
    const ratio = 1.25;
    const sizes = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3];

    const fontSize: Record<string, string> = {};
    const sizeKeys = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"];

    sizes.forEach((size, index) => {
      fontSize[sizeKeys[index]] = `${size * baseSize}rem`;
    });

    // Standard font weights
    const fontWeight: Record<string, string> = {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    };

    // Standard line heights
    const lineHeight: Record<string, string> = {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2"
    };

    return { fontSize, fontWeight, lineHeight };
  }

  /**
   * Builds complete theme tokens from minimal configuration
   * DRY: Provides one-stop token generation
   */
  public static buildCompleteTokens(config: {
    mode?: "light" | "dark";
    primaryColor?: string;
    baseSpacing?: number;
    baseFontSize?: number;
  } = {}): {
    color: {
      palette: { neutral: Record<string, string>; primary: Record<string, string>; secondary: Record<string, string> };
      text: { primary: string; secondary: string; muted: string; inverse: string; disabled: string };
      background: { surface: string; elevated: string; muted: string; inverse: string };
      border: { default: string; subtle: string; strong: string; focus: string };
    };
    spacing: { scale: Record<string, string>; semantic: Record<string, string> };
    typography: { fontSize: Record<string, string>; fontWeight: Record<string, string>; lineHeight: Record<string, string> };
  } {
    const mode = config.mode ?? "light";
    const primaryColor = config.primaryColor ?? "#3b82f6";
    const baseSpacing = config.baseSpacing ?? 0.25;
    const baseFontSize = config.baseFontSize ?? 1;

    return {
      color: {
        palette: this.buildColorPalette(primaryColor),
        ...this.buildSemanticColors(mode)
      },
      spacing: this.buildSpacingScale(baseSpacing),
      typography: this.buildTypographyScale(baseFontSize)
    };
  }

  /**
   * Merges token configurations with proper precedence
   * DRY: Standardizes token merging logic
   */
  public static mergeTokens<T extends Record<string, any>>(
    base: T,
    overrides: Partial<T>
  ): T {
    const result = { ...base } as any;

    for (const [key, value] of Object.entries(overrides)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        // Deep merge for nested objects
        result[key] = this.mergeTokens(result[key] || {}, value);
      } else {
        // Direct replacement for primitives
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * Validates token structure without creating domain objects
   * DRY: Reusable validation logic
   */
  public static validateTokenStructure(tokens: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate color tokens
    if (!tokens.color?.palette) {
      errors.push("Missing color.palette tokens");
    }
    if (!tokens.color?.text) {
      errors.push("Missing color.text tokens");
    }
    if (!tokens.color?.background) {
      errors.push("Missing color.background tokens");
    }
    if (!tokens.color?.border) {
      errors.push("Missing color.border tokens");
    }

    // Validate spacing tokens
    if (!tokens.spacing?.scale) {
      errors.push("Missing spacing.scale tokens");
    }
    if (!tokens.spacing?.semantic) {
      errors.push("Missing spacing.semantic tokens");
    }

    // Validate typography tokens
    if (!tokens.typography?.fontSize) {
      errors.push("Missing typography.fontSize tokens");
    }
    if (!tokens.typography?.fontWeight) {
      errors.push("Missing typography.fontWeight tokens");
    }
    if (!tokens.typography?.lineHeight) {
      errors.push("Missing typography.lineHeight tokens");
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}