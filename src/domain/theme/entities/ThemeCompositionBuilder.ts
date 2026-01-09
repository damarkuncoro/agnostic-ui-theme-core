import { Theme } from './Theme';
import { ThemeComposition } from './ThemeComposition';
import type { ThemeExtension } from './ThemeExtension';

/**
 * Theme Composition Builder
 * Fluent API for building complex theme compositions
 */
export class ThemeCompositionBuilder {
  private baseThemes: Theme[] = [];
  private extensions: ThemeExtension[] = [];

  /**
   * Adds a base theme to the composition
   */
  public withBase(theme: Theme): ThemeCompositionBuilder {
    this.baseThemes.push(theme);
    return this;
  }

  /**
   * Adds multiple base themes
   */
  public withBases(themes: Theme[]): ThemeCompositionBuilder {
    this.baseThemes.push(...themes);
    return this;
  }

  /**
   * Adds an extension to customize the theme
   */
  public extend(extension: ThemeExtension): ThemeCompositionBuilder {
    this.extensions.push(extension);
    return this;
  }

  /**
   * Builds the composed theme
   */
  public build(): ThemeComposition {
    if (this.baseThemes.length === 0) {
      throw new Error('At least one base theme is required');
    }
    return ThemeComposition.compose(this.baseThemes, this.extensions);
  }

  /**
   * Creates a preset composition for common use cases
   */
  public static preset(name: string): ThemeCompositionBuilder {
    const builder = new ThemeCompositionBuilder();

    switch (name) {
      case 'corporate':
        // Add corporate theme composition logic
        break;
      case 'minimal':
        // Add minimal theme composition logic
        break;
      case 'vibrant':
        // Add vibrant theme composition logic
        break;
      default:
        throw new Error(`Unknown preset: ${name}`);
    }

    return builder;
  }
}