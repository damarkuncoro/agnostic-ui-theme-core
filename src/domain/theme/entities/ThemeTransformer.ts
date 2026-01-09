import { Theme } from './Theme';
import { DARK_MODE_TRANSFORMS } from './ThemeConstants';

/**
 * Theme Transformer Base Class
 * Abstract base class for theme transformations
 * Follows Template Method pattern and SOLID principles
 */
export abstract class ThemeTransformer {
  /**
   * Template method for transforming a theme
   */
  public transform(theme: Theme, overrides?: any): Theme {
    const transformedColors = this.transformColors(theme);
    const mergedColors = this.mergeOverrides(transformedColors, overrides);
    return this.createTransformedTheme(theme, mergedColors, overrides);
  }

  /**
   * Abstract method for color transformation logic
   */
  protected abstract transformColors(theme: Theme): {
    palette: Record<string, Record<string, string>>;
    text: Record<string, string>;
    background: Record<string, string>;
    border: Record<string, string>;
  };

  /**
   * Hook method for merging overrides - can be overridden by subclasses
   */
  protected mergeOverrides(
    transformedColors: {
      palette: Record<string, Record<string, string>>;
      text: Record<string, string>;
      background: Record<string, string>;
      border: Record<string, string>;
    },
    overrides?: any
  ): typeof transformedColors {
    if (!overrides?.color) return transformedColors;

    const result = { ...transformedColors };

    // Merge palette overrides
    if (overrides.color.palette) {
      const paletteOverrides: Record<string, Record<string, string>> = {};
      for (const [key, value] of Object.entries(overrides.color.palette)) {
        if (value) {
          paletteOverrides[key] = value as Record<string, string>;
        }
      }
      result.palette = { ...result.palette, ...paletteOverrides };
    }

    // Merge text overrides
    if (overrides.color.text) {
      const textOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.text)) {
        if (value) {
          textOverrides[key] = value as string;
        }
      }
      result.text = { ...result.text, ...textOverrides };
    }

    // Merge background overrides
    if (overrides.color.background) {
      const backgroundOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.background)) {
        if (value) {
          backgroundOverrides[key] = value as string;
        }
      }
      result.background = { ...result.background, ...backgroundOverrides };
    }

    // Merge border overrides
    if (overrides.color.border) {
      const borderOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.border)) {
        if (value) {
          borderOverrides[key] = value as string;
        }
      }
      result.border = { ...result.border, ...borderOverrides };
    }

    return result;
  }

  /**
   * Factory method for creating the transformed theme
   */
  protected abstract createTransformedTheme(
    originalTheme: Theme,
    transformedColors: {
      palette: Record<string, Record<string, string>>;
      text: Record<string, string>;
      background: Record<string, string>;
      border: Record<string, string>;
    },
    overrides?: any
  ): Theme;

  /**
   * Utility method for lightening colors
   */
  protected lightenColor(color: string, factor: number): string {
    if (color.startsWith('#')) {
      const hex = color.substring(1);
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      const newR = Math.min(255, Math.round(r + (255 - r) * factor));
      const newG = Math.min(255, Math.round(g + (255 - g) * factor));
      const newB = Math.min(255, Math.round(b + (255 - b) * factor));

      return `#${newR.toString(16).padStart(2, '0')}${newG.toString(16).padStart(2, '0')}${newB.toString(16).padStart(2, '0')}`;
    }
    return color;
  }
}

/**
 * Dark Mode Theme Transformer
 * Concrete implementation for dark mode transformations
 */
export class DarkModeThemeTransformer extends ThemeTransformer {
  protected transformColors(theme: Theme): {
    palette: Record<string, Record<string, string>>;
    text: Record<string, string>;
    background: Record<string, string>;
    border: Record<string, string>;
  } {
    // Transform palette colors
    const transformedPalette: Record<string, Record<string, string>> = {};

    for (const [colorName, variants] of Object.entries(theme.color.palette.toObject())) {
      transformedPalette[colorName] = {};

      for (const [variant, value] of Object.entries(variants)) {
        transformedPalette[colorName][variant] = this.transformColorForDarkMode(value, variant);
      }
    }

    return {
      palette: transformedPalette,
      text: DARK_MODE_TRANSFORMS.textColors,
      background: DARK_MODE_TRANSFORMS.backgroundColors,
      border: DARK_MODE_TRANSFORMS.borderColors
    };
  }

  private transformColorForDarkMode(color: string, variant: string): string {
    // For primary colors, slightly lighten for better contrast
    if (variant === '500') {
      return this.lightenColor(color, DARK_MODE_TRANSFORMS.primaryLightenFactor);
    }
    // For darker variants, lighten more
    if (['600', '700', '800', '900'].includes(variant)) {
      return this.lightenColor(color, DARK_MODE_TRANSFORMS.darkVariantsLightenFactor);
    }
    // For lighter variants, keep similar or slightly adjust
    return color;
  }

  protected createTransformedTheme(
    originalTheme: Theme,
    transformedColors: {
      palette: Record<string, Record<string, string>>;
      text: Record<string, string>;
      background: Record<string, string>;
      border: Record<string, string>;
    },
    overrides?: any
  ): Theme {
    const { ColorPalette, TextColor, BackgroundColor, BorderColor, SpacingScale, TypographyScale } = this.getTokenClasses();

    return this.createThemeFromTokens(
      ColorPalette,
      TextColor,
      BackgroundColor,
      BorderColor,
      SpacingScale,
      TypographyScale,
      originalTheme,
      transformedColors,
      overrides
    );
  }

  // Dependency injection point - can be overridden for testing
  protected getTokenClasses() {
    return {
      ColorPalette: require('../../tokens/color/ColorPalette').ColorPalette,
      TextColor: require('../../tokens/color/TextColor').TextColor,
      BackgroundColor: require('../../tokens/color/BackgroundColor').BackgroundColor,
      BorderColor: require('../../tokens/color/BorderColor').BorderColor,
      SpacingScale: require('../../tokens/spacing/SpacingScale').SpacingScale,
      TypographyScale: require('../../tokens/typography/TypographyScale').TypographyScale
    };
  }

  // Extracted method for theme creation to follow DRY
  protected createThemeFromTokens(
    ColorPalette: any,
    TextColor: any,
    BackgroundColor: any,
    BorderColor: any,
    SpacingScale: any,
    TypographyScale: any,
    originalTheme: Theme,
    transformedColors: any,
    overrides?: any
  ) {
    return require('./Theme').Theme.create({
      version: originalTheme.version,
      color: {
        palette: ColorPalette.create({
          neutral: transformedColors.palette.neutral || originalTheme.color.palette.toObject().neutral,
          primary: transformedColors.palette.primary || originalTheme.color.palette.toObject().primary,
          secondary: transformedColors.palette.secondary || originalTheme.color.palette.toObject().secondary
        }),
        text: TextColor.create({
          primary: transformedColors.text.primary || originalTheme.color.text.toObject().primary,
          secondary: transformedColors.text.secondary || originalTheme.color.text.toObject().secondary,
          muted: transformedColors.text.muted || originalTheme.color.text.toObject().muted,
          inverse: transformedColors.text.inverse || originalTheme.color.text.toObject().inverse,
          disabled: transformedColors.text.disabled || originalTheme.color.text.toObject().disabled
        }),
        background: BackgroundColor.create({
          surface: transformedColors.background.surface || originalTheme.color.background.toObject().surface,
          elevated: transformedColors.background.elevated || originalTheme.color.background.toObject().elevated,
          muted: transformedColors.background.muted || originalTheme.color.background.toObject().muted,
          inverse: transformedColors.background.inverse || originalTheme.color.background.toObject().inverse
        }),
        border: BorderColor.create({
          default: transformedColors.border.default || originalTheme.color.border.toObject().default,
          subtle: transformedColors.border.subtle || originalTheme.color.border.toObject().subtle,
          strong: transformedColors.border.strong || originalTheme.color.border.toObject().strong,
          focus: transformedColors.border.focus || originalTheme.color.border.toObject().focus
        })
      },
      spacing: overrides?.spacing ? SpacingScale.create({
        scale: overrides.spacing.scale ? { ...originalTheme.spacing.scale, ...overrides.spacing.scale } : originalTheme.spacing.scale,
        semantic: overrides.spacing.semantic ? { ...originalTheme.spacing.semantic, ...overrides.spacing.semantic } : originalTheme.spacing.semantic
      }) : originalTheme.spacing,
      typography: overrides?.typography ? TypographyScale.create({
        fontSize: overrides.typography.fontSize ? { ...originalTheme.typography.fontSize, ...overrides.typography.fontSize } : originalTheme.typography.fontSize,
        fontWeight: overrides.typography.fontWeight ? Object.fromEntries(
          Object.entries({ ...originalTheme.typography.fontWeight, ...overrides.typography.fontWeight })
            .map(([key, value]) => [key, String(value)])
        ) : originalTheme.typography.fontWeight,
        lineHeight: overrides.typography.lineHeight ? { ...originalTheme.typography.lineHeight, ...overrides.typography.lineHeight } : originalTheme.typography.lineHeight
      }) : originalTheme.typography
    });
  }
}