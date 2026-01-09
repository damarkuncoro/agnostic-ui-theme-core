import { SPACING_MULTIPLIERS, SEMANTIC_SPACING_MULTIPLIERS, DEFAULT_CONFIG } from "./TokenBuilderConstants";

/**
 * Spacing Token Builder
 * Handles spacing-specific token building logic
 * Follows Single Responsibility Principle
 */
export class SpacingTokenBuilder {
  /**
   * Builds spacing scale with consistent ratios
   */
  public buildSpacingScale(baseUnit: number = DEFAULT_CONFIG.baseSpacing): {
    scale: Record<string, string>;
    semantic: Record<string, string>;
  } {
    const scale: Record<string, string> = {};
    const semantic: Record<string, string> = {};

    // Generate scale using predefined multipliers
    SPACING_MULTIPLIERS.forEach(multiplier => {
      const key = multiplier === 0 ? "0" : multiplier.toString();
      scale[key] = `${multiplier * baseUnit}rem`;
    });

    // Generate semantic spacing
    Object.entries(SEMANTIC_SPACING_MULTIPLIERS).forEach(([key, multiplier]) => {
      semantic[key] = `${multiplier * baseUnit}rem`;
    });

    return { scale, semantic };
  }

  /**
   * Validates spacing token structure
   */
  public validateSpacingTokens(tokens: any): string[] {
    const errors: string[] = [];

    if (!tokens?.scale) {
      errors.push("Missing spacing.scale tokens");
    }
    if (!tokens?.semantic) {
      errors.push("Missing spacing.semantic tokens");
    }

    return errors;
  }
}