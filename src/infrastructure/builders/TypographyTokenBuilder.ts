import {
  TYPOGRAPHY_SIZES,
  TYPOGRAPHY_SIZE_KEYS,
  FONT_WEIGHTS,
  LINE_HEIGHTS,
  DEFAULT_CONFIG
} from "./TokenBuilderConstants";

/**
 * Typography Token Builder
 * Handles typography-specific token building logic
 * Follows Single Responsibility Principle
 */
export class TypographyTokenBuilder {
  /**
   * Builds typography scale with consistent type scale
   */
  public buildTypographyScale(
    baseSize: number = DEFAULT_CONFIG.baseFontSize,
    ratio: number = DEFAULT_CONFIG.modularScaleRatio
  ): {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  } {
    const fontSize: Record<string, string> = {};

    // Generate font sizes using predefined sizes
    TYPOGRAPHY_SIZES.forEach((size, index) => {
      const key = TYPOGRAPHY_SIZE_KEYS[index];
      if (key) {
        fontSize[key] = `${size * baseSize}rem`;
      }
    });

    return {
      fontSize,
      fontWeight: { ...FONT_WEIGHTS },
      lineHeight: { ...LINE_HEIGHTS }
    };
  }

  /**
   * Validates typography token structure
   */
  public validateTypographyTokens(tokens: any): string[] {
    const errors: string[] = [];

    if (!tokens?.fontSize) {
      errors.push("Missing typography.fontSize tokens");
    }
    if (!tokens?.fontWeight) {
      errors.push("Missing typography.fontWeight tokens");
    }
    if (!tokens?.lineHeight) {
      errors.push("Missing typography.lineHeight tokens");
    }

    return errors;
  }
}