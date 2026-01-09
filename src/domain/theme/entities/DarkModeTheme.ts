// src/domain/theme/entities/DarkModeTheme.ts

import { Theme, UiThemeVersion } from './Theme';
import { ColorPalette } from '../../tokens/color/ColorPalette';
import { TextColor } from '../../tokens/color/TextColor';
import { BackgroundColor } from '../../tokens/color/BackgroundColor';
import { BorderColor } from '../../tokens/color/BorderColor';
import { SpacingScale } from '../../tokens/spacing/SpacingScale';
import { TypographyScale } from '../../tokens/typography/TypographyScale';

/**
 * Dark Mode Theme Entity
 * Specialized theme entity for dark mode with optimized color schemes
 */
export class DarkModeTheme {
  private theme: Theme;
  private lightTheme: Theme;

  constructor(
    lightTheme: Theme,
    darkOverrides?: Partial<{
      color: {
        palette: Partial<Record<string, Record<string, string>>>;
        text: Partial<Record<string, string>>;
        background: Partial<Record<string, string>>;
        border: Partial<Record<string, string>>;
      };
      spacing: {
        scale?: Record<string, string>;
        semantic?: Record<string, string>;
      };
      typography: Partial<TypographyScale>;
    }>
  ) {
    this.lightTheme = lightTheme;

    // Apply dark mode transformations
    this.theme = this.applyDarkModeTransformations(lightTheme, darkOverrides);
  }

  /**
   * Creates a dark mode theme from a light theme
   */
  public static fromLightTheme(
    lightTheme: Theme,
    customizations?: Partial<{
      color: {
        palette: Partial<Record<string, Record<string, string>>>;
        text: Partial<Record<string, string>>;
        background: Partial<Record<string, string>>;
        border: Partial<Record<string, string>>;
      };
      spacing: {
        scale?: Record<string, string>;
        semantic?: Record<string, string>;
      };
      typography: Partial<TypographyScale>;
    }>
  ): DarkModeTheme {
    return new DarkModeTheme(lightTheme, customizations);
  }

  /**
   * Applies dark mode color transformations
   */
  private applyDarkModeTransformations(
    lightTheme: Theme,
    overrides?: Partial<{
      color: {
        palette: Partial<Record<string, Record<string, string>>>;
        text: Partial<Record<string, string>>;
        background: Partial<Record<string, string>>;
        border: Partial<Record<string, string>>;
      };
      spacing: Partial<SpacingScale>;
      typography: Partial<TypographyScale>;
    }>
  ): Theme {
    // Transform colors for dark mode
    const transformedColors = this.transformColorsForDarkMode(lightTheme);

    // Apply custom overrides if provided
    if (overrides?.color?.palette) {
      // Merge palette overrides, filtering out undefined values
      const paletteOverrides: Record<string, Record<string, string>> = {};
      for (const [key, value] of Object.entries(overrides.color.palette)) {
        if (value) {
          paletteOverrides[key] = value;
        }
      }
      transformedColors.palette = { ...transformedColors.palette, ...paletteOverrides };
    }
    if (overrides?.color?.text) {
      // Merge text overrides, filtering out undefined values
      const textOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.text)) {
        if (value) {
          textOverrides[key] = value;
        }
      }
      transformedColors.text = { ...transformedColors.text, ...textOverrides };
    }
    if (overrides?.color?.background) {
      // Merge background overrides, filtering out undefined values
      const backgroundOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.background)) {
        if (value) {
          backgroundOverrides[key] = value;
        }
      }
      transformedColors.background = { ...transformedColors.background, ...backgroundOverrides };
    }
    if (overrides?.color?.border) {
      // Merge border overrides, filtering out undefined values
      const borderOverrides: Record<string, string> = {};
      for (const [key, value] of Object.entries(overrides.color.border)) {
        if (value) {
          borderOverrides[key] = value;
        }
      }
      transformedColors.border = { ...transformedColors.border, ...borderOverrides };
    }

    // Create new theme with transformed colors
    return Theme.create({
      version: lightTheme.version,
      color: {
        palette: ColorPalette.create({
          neutral: transformedColors.palette.neutral || lightTheme.color.palette.toObject().neutral,
          primary: transformedColors.palette.primary || lightTheme.color.palette.toObject().primary,
          secondary: transformedColors.palette.secondary || lightTheme.color.palette.toObject().secondary
        }),
        text: TextColor.create({
          primary: transformedColors.text.primary || lightTheme.color.text.toObject().primary,
          secondary: transformedColors.text.secondary || lightTheme.color.text.toObject().secondary,
          muted: transformedColors.text.muted || lightTheme.color.text.toObject().muted,
          inverse: transformedColors.text.inverse || lightTheme.color.text.toObject().inverse,
          disabled: transformedColors.text.disabled || lightTheme.color.text.toObject().disabled
        }),
        background: BackgroundColor.create({
          surface: transformedColors.background.surface || lightTheme.color.background.toObject().surface,
          elevated: transformedColors.background.elevated || lightTheme.color.background.toObject().elevated,
          muted: transformedColors.background.muted || lightTheme.color.background.toObject().muted,
          inverse: transformedColors.background.inverse || lightTheme.color.background.toObject().inverse
        }),
        border: BorderColor.create({
          default: transformedColors.border.default || lightTheme.color.border.toObject().default,
          subtle: transformedColors.border.subtle || lightTheme.color.border.toObject().subtle,
          strong: transformedColors.border.strong || lightTheme.color.border.toObject().strong,
          focus: transformedColors.border.focus || lightTheme.color.border.toObject().focus
        })
      },
      spacing: overrides?.spacing ? SpacingScale.create({
        scale: overrides.spacing.scale ? { ...lightTheme.spacing.scale, ...overrides.spacing.scale } : lightTheme.spacing.scale,
        semantic: overrides.spacing.semantic ? { ...lightTheme.spacing.semantic, ...overrides.spacing.semantic } : lightTheme.spacing.semantic
      }) : lightTheme.spacing,
      typography: overrides?.typography ? TypographyScale.create({
        fontSize: overrides.typography.fontSize ? { ...lightTheme.typography.fontSize, ...overrides.typography.fontSize } : lightTheme.typography.fontSize,
        fontWeight: overrides.typography.fontWeight ? Object.fromEntries(
          Object.entries({ ...lightTheme.typography.fontWeight, ...overrides.typography.fontWeight })
            .map(([key, value]) => [key, String(value)])
        ) : lightTheme.typography.fontWeight,
        lineHeight: overrides.typography.lineHeight ? { ...lightTheme.typography.lineHeight, ...overrides.typography.lineHeight } : lightTheme.typography.lineHeight
      }) : lightTheme.typography
    });
  }

  /**
   * Transforms colors for optimal dark mode experience
   */
  private transformColorsForDarkMode(lightTheme: Theme): {
    palette: Record<string, Record<string, string>>;
    text: Record<string, string>;
    background: Record<string, string>;
    border: Record<string, string>;
  } {
    // Transform palette colors
    const transformedPalette: Record<string, Record<string, string>> = {};

    for (const [colorName, variants] of Object.entries(lightTheme.color.palette.toObject())) {
      transformedPalette[colorName] = {};

      for (const [variant, value] of Object.entries(variants)) {
        // Apply dark mode transformations based on variant
        transformedPalette[colorName][variant] = this.transformColorForDarkMode(value, variant);
      }
    }

    // Transform text colors for dark backgrounds
    const textColors = lightTheme.color.text.toObject();
    const transformedText: Record<string, string> = {};

    for (const [key, value] of Object.entries(textColors)) {
      transformedText[key] = this.transformTextColorForDarkMode(value, key);
    }

    // Transform background colors
    const bgColors = lightTheme.color.background.toObject();
    const transformedBg: Record<string, string> = {};

    for (const [key, value] of Object.entries(bgColors)) {
      transformedBg[key] = this.transformBackgroundColorForDarkMode(value, key);
    }

    // Transform border colors
    const borderColors = lightTheme.color.border.toObject();
    const transformedBorder: Record<string, string> = {};

    for (const [key, value] of Object.entries(borderColors)) {
      transformedBorder[key] = this.transformBorderColorForDarkMode(value, key);
    }

    return {
      palette: transformedPalette,
      text: transformedText,
      background: transformedBg,
      border: transformedBorder
    };
  }

  /**
   * Transforms individual color for dark mode
   */
  private transformColorForDarkMode(color: string, variant: string): string {
    // For primary colors, slightly lighten for better contrast
    if (variant === '500') {
      return this.lightenColor(color, 0.1);
    }
    // For darker variants, lighten more
    if (['600', '700', '800', '900'].includes(variant)) {
      return this.lightenColor(color, 0.2);
    }
    // For lighter variants, keep similar or slightly adjust
    return color;
  }

  /**
   * Transforms text color for dark mode
   */
  private transformTextColorForDarkMode(color: string, type: string): string {
    switch (type) {
      case 'primary':
        return '#ffffff'; // Pure white for primary text
      case 'secondary':
        return '#e5e7eb'; // Light gray for secondary text
      case 'muted':
        return '#9ca3af'; // Medium gray for muted text
      case 'inverse':
        return '#1f2937'; // Dark gray for inverse text
      case 'disabled':
        return '#6b7280'; // Gray for disabled text
      default:
        return color;
    }
  }

  /**
   * Transforms background color for dark mode
   */
  private transformBackgroundColorForDarkMode(color: string, type: string): string {
    switch (type) {
      case 'surface':
        return '#1f2937'; // Dark blue-gray for surface
      case 'elevated':
        return '#374151'; // Slightly lighter for elevated surfaces
      case 'muted':
        return '#111827'; // Very dark for muted backgrounds
      case 'inverse':
        return '#ffffff'; // White for inverse backgrounds
      default:
        return color;
    }
  }

  /**
   * Transforms border color for dark mode
   */
  private transformBorderColorForDarkMode(color: string, type: string): string {
    switch (type) {
      case 'default':
        return '#374151'; // Dark gray for default borders
      case 'subtle':
        return '#1f2937'; // Very dark for subtle borders
      case 'strong':
        return '#4b5563'; // Medium dark for strong borders
      case 'focus':
        return '#3b82f6'; // Keep focus color bright for accessibility
      default:
        return color;
    }
  }

  /**
   * Lightens a color by a given factor
   */
  private lightenColor(color: string, factor: number): string {
    // Simple color lightening - in a real implementation,
    // you'd use a proper color manipulation library
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

  /**
   * Gets the original light theme
   */
  public getLightTheme(): Theme {
    return this.lightTheme;
  }

  /**
   * Checks if this is a dark mode theme
   */
  public isDarkMode(): boolean {
    return true;
  }

  /**
   * Gets the underlying theme
   */
  public getTheme(): Theme {
    return this.theme;
  }

  /**
   * Converts to UiTheme with dark mode metadata
   */
  public toUiTheme() {
    const uiTheme = this.theme.toUiTheme();
    return {
      ...uiTheme,
      metadata: {
        mode: 'dark' as const,
        lightThemeVersion: this.lightTheme.version
      }
    };
  }
}