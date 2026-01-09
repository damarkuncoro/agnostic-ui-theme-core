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
export class DarkModeTheme extends Theme {
  private lightTheme: Theme;

  constructor(
    lightTheme: Theme,
    darkOverrides?: Partial<{
      color: {
        palette: Partial<ColorPalette>;
        text: Partial<TextColor>;
        background: Partial<BackgroundColor>;
        border: Partial<BorderColor>;
      };
      spacing: Partial<SpacingScale>;
      typography: Partial<TypographyScale>;
    }>
  ) {
    // Start with light theme as base
    super({
      version: lightTheme.version,
      color: lightTheme.color,
      spacing: lightTheme.spacing,
      typography: lightTheme.typography
    });

    this.lightTheme = lightTheme;

    // Apply dark mode transformations
    this.applyDarkModeTransformations(darkOverrides);
  }

  /**
   * Creates a dark mode theme from a light theme
   */
  public static fromLightTheme(
    lightTheme: Theme,
    customizations?: Partial<{
      color: {
        palette: Partial<ColorPalette>;
        text: Partial<TextColor>;
        background: Partial<BackgroundColor>;
        border: Partial<BorderColor>;
      };
      spacing: Partial<SpacingScale>;
      typography: Partial<TypographyScale>;
    }>
  ): DarkModeTheme {
    return new DarkModeTheme(lightTheme, customizations);
  }

  /**
   * Applies dark mode color transformations
   */
  private applyDarkModeTransformations(
    overrides?: Partial<{
      color: {
        palette: Partial<ColorPalette>;
        text: Partial<TextColor>;
        background: Partial<BackgroundColor>;
        border: Partial<BorderColor>;
      };
      spacing: Partial<SpacingScale>;
      typography: Partial<TypographyScale>;
    }>
  ): void {
    // Transform colors for dark mode
    this.transformColorsForDarkMode();

    // Apply custom overrides if provided
    if (overrides?.color?.palette) {
      this.color.palette = { ...this.color.palette, ...overrides.color.palette };
    }
    if (overrides?.color?.text) {
      this.color.text = { ...this.color.text, ...overrides.color.text };
    }
    if (overrides?.color?.background) {
      this.color.background = { ...this.color.background, ...overrides.color.background };
    }
    if (overrides?.color?.border) {
      this.color.border = { ...this.color.border, ...overrides.color.border };
    }

    // Apply spacing and typography overrides
    if (overrides?.spacing) {
      this.spacing = { ...this.spacing, ...overrides.spacing };
    }
    if (overrides?.typography) {
      this.typography = { ...this.typography, ...overrides.typography };
    }
  }

  /**
   * Transforms colors for optimal dark mode experience
   */
  private transformColorsForDarkMode(): void {
    // Transform palette colors
    const transformedPalette: Record<string, Record<string, string>> = {};

    for (const [colorName, variants] of Object.entries(this.color.palette.toObject())) {
      transformedPalette[colorName] = {};

      for (const [variant, value] of Object.entries(variants)) {
        // Apply dark mode transformations based on variant
        transformedPalette[colorName][variant] = this.transformColorForDarkMode(value, variant);
      }
    }

    this.color.palette = ColorPalette.create(transformedPalette);

    // Transform text colors for dark backgrounds
    const textColors = this.color.text.toObject();
    const transformedText: Record<string, string> = {};

    for (const [key, value] of Object.entries(textColors)) {
      transformedText[key] = this.transformTextColorForDarkMode(value, key);
    }

    this.color.text = TextColor.create(transformedText);

    // Transform background colors
    const bgColors = this.color.background.toObject();
    const transformedBg: Record<string, string> = {};

    for (const [key, value] of Object.entries(bgColors)) {
      transformedBg[key] = this.transformBackgroundColorForDarkMode(value, key);
    }

    this.color.background = BackgroundColor.create(transformedBg);

    // Transform border colors
    const borderColors = this.color.border.toObject();
    const transformedBorder: Record<string, string> = {};

    for (const [key, value] of Object.entries(borderColors)) {
      transformedBorder[key] = this.transformBorderColorForDarkMode(value, key);
    }

    this.color.border = BorderColor.create(transformedBorder);
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
   * Converts to UiTheme with dark mode metadata
   */
  public toUiTheme() {
    const uiTheme = super.toUiTheme();
    return {
      ...uiTheme,
      metadata: {
        ...uiTheme.metadata,
        mode: 'dark' as const,
        lightThemeVersion: this.lightTheme.version
      }
    };
  }
}