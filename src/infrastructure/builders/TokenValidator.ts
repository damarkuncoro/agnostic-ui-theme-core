import { VALIDATION_ERRORS } from "./TokenBuilderConstants";
import { ColorTokenBuilder } from "./ColorTokenBuilder";
import { SpacingTokenBuilder } from "./SpacingTokenBuilder";
import { TypographyTokenBuilder } from "./TypographyTokenBuilder";

/**
 * Token Validator
 * Handles token validation logic
 * Follows Single Responsibility Principle
 */
export class TokenValidator {
  private colorBuilder: ColorTokenBuilder;
  private spacingBuilder: SpacingTokenBuilder;
  private typographyBuilder: TypographyTokenBuilder;

  constructor() {
    this.colorBuilder = new ColorTokenBuilder();
    this.spacingBuilder = new SpacingTokenBuilder();
    this.typographyBuilder = new TypographyTokenBuilder();
  }

  /**
   * Validates complete token structure
   */
  public validateTokenStructure(tokens: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Validate color tokens
    if (tokens.color) {
      errors.push(...this.colorBuilder.validateColorTokens(tokens.color));
    } else {
      errors.push(VALIDATION_ERRORS.MISSING_COLOR_PALETTE);
      errors.push(VALIDATION_ERRORS.MISSING_COLOR_TEXT);
      errors.push(VALIDATION_ERRORS.MISSING_COLOR_BACKGROUND);
      errors.push(VALIDATION_ERRORS.MISSING_COLOR_BORDER);
    }

    // Validate spacing tokens
    if (tokens.spacing) {
      errors.push(...this.spacingBuilder.validateSpacingTokens(tokens.spacing));
    } else {
      errors.push(VALIDATION_ERRORS.MISSING_SPACING_SCALE);
      errors.push(VALIDATION_ERRORS.MISSING_SPACING_SEMANTIC);
    }

    // Validate typography tokens
    if (tokens.typography) {
      errors.push(...this.typographyBuilder.validateTypographyTokens(tokens.typography));
    } else {
      errors.push(VALIDATION_ERRORS.MISSING_TYPOGRAPHY_FONT_SIZE);
      errors.push(VALIDATION_ERRORS.MISSING_TYPOGRAPHY_FONT_WEIGHT);
      errors.push(VALIDATION_ERRORS.MISSING_TYPOGRAPHY_LINE_HEIGHT);
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  /**
   * Validates individual token sections
   */
  public validateColorTokens(tokens: any): { isValid: boolean; errors: string[] } {
    const errors = this.colorBuilder.validateColorTokens(tokens);
    return { isValid: errors.length === 0, errors };
  }

  public validateSpacingTokens(tokens: any): { isValid: boolean; errors: string[] } {
    const errors = this.spacingBuilder.validateSpacingTokens(tokens);
    return { isValid: errors.length === 0, errors };
  }

  public validateTypographyTokens(tokens: any): { isValid: boolean; errors: string[] } {
    const errors = this.typographyBuilder.validateTypographyTokens(tokens);
    return { isValid: errors.length === 0, errors };
  }
}