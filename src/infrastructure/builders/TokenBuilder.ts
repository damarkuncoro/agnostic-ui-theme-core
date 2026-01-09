// src/infrastructure/builders/TokenBuilder.ts
import { ColorTokenBuilder } from "./ColorTokenBuilder";
import { SpacingTokenBuilder } from "./SpacingTokenBuilder";
import { TypographyTokenBuilder } from "./TypographyTokenBuilder";
import { TokenValidator } from "./TokenValidator";
import { TokenMerger } from "./TokenMerger";
import { DEFAULT_CONFIG } from "./TokenBuilderConstants";

/**
 * TokenBuilder Infrastructure Service
 * Facade for token building operations using composition
 * Follows SOLID principles with single responsibility delegation
 */
export class TokenBuilder {
  private colorBuilder: ColorTokenBuilder;
  private spacingBuilder: SpacingTokenBuilder;
  private typographyBuilder: TypographyTokenBuilder;
  private validator: TokenValidator;
  private merger: TokenMerger;

  constructor() {
    this.colorBuilder = new ColorTokenBuilder();
    this.spacingBuilder = new SpacingTokenBuilder();
    this.typographyBuilder = new TypographyTokenBuilder();
    this.validator = new TokenValidator();
    this.merger = new TokenMerger();
  }

  /**
   * Builds color tokens from a base color
   * Delegates to ColorTokenBuilder
   */
  public static buildColorPalette(baseColor: string): {
    neutral: Record<string, string>;
    primary: Record<string, string>;
    secondary: Record<string, string>;
  } {
    const builder = new ColorTokenBuilder();
    return builder.buildColorPalette(baseColor);
  }

  /**
   * Builds semantic color tokens based on theme mode
   * Delegates to ColorTokenBuilder
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
    const builder = new ColorTokenBuilder();
    return builder.buildSemanticColors(mode);
  }

  /**
   * Builds spacing scale with consistent ratios
   * Delegates to SpacingTokenBuilder
   */
  public static buildSpacingScale(baseUnit: number = DEFAULT_CONFIG.baseSpacing): {
    scale: Record<string, string>;
    semantic: Record<string, string>;
  } {
    const builder = new SpacingTokenBuilder();
    return builder.buildSpacingScale(baseUnit);
  }

  /**
   * Builds typography scale with consistent type scale
   * Delegates to TypographyTokenBuilder
   */
  public static buildTypographyScale(baseSize: number = DEFAULT_CONFIG.baseFontSize): {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  } {
    const builder = new TypographyTokenBuilder();
    return builder.buildTypographyScale(baseSize);
  }

  /**
   * Builds complete theme tokens from minimal configuration
   * Orchestrates all token builders
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
    const instance = new TokenBuilder();

    const mode = config.mode ?? DEFAULT_CONFIG.mode;
    const primaryColor = config.primaryColor ?? DEFAULT_CONFIG.primaryColor;
    const baseSpacing = config.baseSpacing ?? DEFAULT_CONFIG.baseSpacing;
    const baseFontSize = config.baseFontSize ?? DEFAULT_CONFIG.baseFontSize;

    return {
      color: {
        palette: instance.colorBuilder.buildColorPalette(primaryColor),
        ...instance.colorBuilder.buildSemanticColors(mode)
      },
      spacing: instance.spacingBuilder.buildSpacingScale(baseSpacing),
      typography: instance.typographyBuilder.buildTypographyScale(baseFontSize)
    };
  }

  /**
   * Merges token configurations with proper precedence
   * Delegates to TokenMerger
   */
  public static mergeTokens<T extends Record<string, any>>(
    base: T,
    overrides: Partial<T>
  ): T {
    const merger = new TokenMerger();
    return merger.mergeTokens(base, overrides);
  }

  /**
   * Validates token structure without creating domain objects
   * Delegates to TokenValidator
   */
  public static validateTokenStructure(tokens: any): { isValid: boolean; errors: string[] } {
    const validator = new TokenValidator();
    return validator.validateTokenStructure(tokens);
  }
}