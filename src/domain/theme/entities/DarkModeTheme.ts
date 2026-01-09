// src/domain/theme/entities/DarkModeTheme.ts

import { Theme, UiThemeVersion } from './Theme';
import { DarkModeThemeTransformer } from './ThemeTransformer';
import { ThemeConverter } from './ThemeConverter';
import { TypographyScale } from '../../tokens/typography/TypographyScale';

/**
 * Dark Mode Theme Entity
 * Specialized theme entity for dark mode with optimized color schemes
 */
export class DarkModeTheme {
  private theme: Theme;
  private lightTheme: Theme;
  private transformer: DarkModeThemeTransformer;

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
      typography: Partial<any>;
    }>
  ) {
    this.lightTheme = lightTheme;
    this.transformer = new DarkModeThemeTransformer();

    // Apply dark mode transformations using the transformer
    this.theme = this.transformer.transform(lightTheme, darkOverrides);
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
    return ThemeConverter.toUiThemeWithMetadata(this.theme, {
      mode: 'dark' as const,
      lightThemeVersion: this.lightTheme.version
    });
  }
}