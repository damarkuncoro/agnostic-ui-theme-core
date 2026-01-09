import { ColorPalette } from "../../domain/tokens/color/ColorPalette";
import { LIGHT_MODE_COLORS, DARK_MODE_COLORS, DEFAULT_CONFIG } from "./TokenBuilderConstants";

/**
 * Color Token Builder
 * Handles color-specific token building logic
 * Follows Single Responsibility Principle
 */
export class ColorTokenBuilder {
  /**
   * Builds color palette from base color
   */
  public buildColorPalette(baseColor: string = DEFAULT_CONFIG.primaryColor): {
    neutral: Record<string, string>;
    primary: Record<string, string>;
    secondary: Record<string, string>;
  } {
    return {
      neutral: ColorPalette.createDefaultNeutral(),
      primary: { 500: baseColor },
      secondary: ColorPalette.createDefaultSecondary()
    };
  }

  /**
   * Builds semantic colors based on theme mode
   */
  public buildSemanticColors(mode: "light" | "dark" = "light"): {
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
    return mode === "dark" ? DARK_MODE_COLORS : LIGHT_MODE_COLORS;
  }

  /**
   * Validates color token structure
   */
  public validateColorTokens(tokens: any): string[] {
    const errors: string[] = [];

    if (!tokens?.palette) {
      errors.push("Missing color.palette tokens");
    }
    if (!tokens?.text) {
      errors.push("Missing color.text tokens");
    }
    if (!tokens?.background) {
      errors.push("Missing color.background tokens");
    }
    if (!tokens?.border) {
      errors.push("Missing color.border tokens");
    }

    return errors;
  }
}