// src/domain/theme/entities/ThemeComposition.ts

import { Theme } from './Theme';
import { ColorPalette } from '../../tokens/color/ColorPalette';
import { TextColor } from '../../tokens/color/TextColor';
import { BackgroundColor } from '../../tokens/color/BackgroundColor';
import { BorderColor } from '../../tokens/color/BorderColor';
import { SpacingScale } from '../../tokens/spacing/SpacingScale';
import { TypographyScale } from '../../tokens/typography/TypographyScale';

/**
 * Theme Composition Entity
 * Enables theme inheritance, extension, and composition patterns
 */
export class ThemeComposition extends Theme {
  private baseThemes: Theme[];
  private extensions: ThemeExtension[];

  constructor(
    baseThemes: Theme[],
    extensions: ThemeExtension[] = []
  ) {
    // Merge base themes
    const mergedTheme = ThemeComposition.mergeThemes(baseThemes);

    // Apply extensions
    const extendedTheme = ThemeComposition.applyExtensions(mergedTheme, extensions);

    super({
      version: extendedTheme.version,
      color: extendedTheme.color,
      spacing: extendedTheme.spacing,
      typography: extendedTheme.typography
    });

    this.baseThemes = [...baseThemes];
    this.extensions = [...extensions];
  }

  /**
   * Creates a composed theme from multiple base themes
   */
  public static compose(
    baseThemes: Theme[],
    extensions?: ThemeExtension[]
  ): ThemeComposition {
    return new ThemeComposition(baseThemes, extensions || []);
  }

  /**
   * Extends a theme with additional properties
   */
  public static extend(
    baseTheme: Theme,
    extension: ThemeExtension
  ): ThemeComposition {
    return new ThemeComposition([baseTheme], [extension]);
  }

  /**
   * Merges multiple themes into one
   */
  private static mergeThemes(themes: Theme[]): Theme {
    if (themes.length === 0) {
      throw new Error('At least one theme is required for composition');
    }

    if (themes.length === 1) {
      return themes[0];
    }

    // Start with the first theme
    let merged = themes[0];

    // Merge subsequent themes
    for (let i = 1; i < themes.length; i++) {
      merged = ThemeComposition.mergeTwoThemes(merged, themes[i]);
    }

    return merged;
  }

  /**
   * Merges two themes
   */
  private static mergeTwoThemes(theme1: Theme, theme2: Theme): Theme {
    return Theme.create({
      version: theme2.version, // Use the latest version
      color: {
        palette: ColorPalette.create({
          ...theme1.color.palette.toObject(),
          ...theme2.color.palette.toObject()
        }),
        text: TextColor.create({
          ...theme1.color.text.toObject(),
          ...theme2.color.text.toObject()
        }),
        background: BackgroundColor.create({
          ...theme1.color.background.toObject(),
          ...theme2.color.background.toObject()
        }),
        border: BorderColor.create({
          ...theme1.color.border.toObject(),
          ...theme2.color.border.toObject()
        })
      },
      spacing: SpacingScale.create({
        scale: { ...theme1.spacing.scale, ...theme2.spacing.scale },
        semantic: { ...theme1.spacing.semantic, ...theme2.spacing.semantic }
      }),
      typography: TypographyScale.create({
        fontSize: { ...theme1.typography.fontSize, ...theme2.typography.fontSize },
        fontWeight: { ...theme1.typography.fontWeight, ...theme2.typography.fontWeight },
        lineHeight: { ...theme1.typography.lineHeight, ...theme2.typography.lineHeight }
      })
    });
  }

  /**
   * Applies extensions to a theme
   */
  private static applyExtensions(
    baseTheme: Theme,
    extensions: ThemeExtension[]
  ): Theme {
    let extendedTheme = baseTheme;

    for (const extension of extensions) {
      extendedTheme = ThemeComposition.applyExtension(extendedTheme, extension);
    }

    return extendedTheme;
  }

  /**
   * Applies a single extension to a theme
   */
  private static applyExtension(
    theme: Theme,
    extension: ThemeExtension
  ): Theme {
    const themeData = {
      version: theme.version,
      color: theme.color,
      spacing: theme.spacing,
      typography: theme.typography
    };

    // Apply color overrides
    if (extension.color?.palette) {
      const currentPalette = theme.color.palette.toObject();
      themeData.color.palette = ColorPalette.create({
        ...currentPalette,
        ...extension.color.palette
      });
    }

    if (extension.color?.text) {
      const currentText = theme.color.text.toObject();
      themeData.color.text = TextColor.create({
        ...currentText,
        ...extension.color.text
      });
    }

    if (extension.color?.background) {
      const currentBg = theme.color.background.toObject();
      themeData.color.background = BackgroundColor.create({
        ...currentBg,
        ...extension.color.background
      });
    }

    if (extension.color?.border) {
      const currentBorder = theme.color.border.toObject();
      themeData.color.border = BorderColor.create({
        ...currentBorder,
        ...extension.color.border
      });
    }

    // Apply spacing overrides
    if (extension.spacing) {
      themeData.spacing = SpacingScale.create({
        scale: { ...theme.spacing.scale, ...extension.spacing.scale },
        semantic: { ...theme.spacing.semantic, ...extension.spacing.semantic }
      });
    }

    // Apply typography overrides
    if (extension.typography) {
      themeData.typography = TypographyScale.create({
        fontSize: { ...theme.typography.fontSize, ...extension.typography.fontSize },
        fontWeight: { ...theme.typography.fontWeight, ...extension.typography.fontWeight },
        lineHeight: { ...theme.typography.lineHeight, ...extension.typography.lineHeight }
      });
    }

    return Theme.create(themeData);
  }

  /**
   * Gets the base themes used in composition
   */
  public getBaseThemes(): Theme[] {
    return [...this.baseThemes];
  }

  /**
   * Gets the extensions applied to this theme
   */
  public getExtensions(): ThemeExtension[] {
    return [...this.extensions];
  }

  /**
   * Adds a new extension to the composition
   */
  public extend(extension: ThemeExtension): ThemeComposition {
    return new ThemeComposition(this.baseThemes, [...this.extensions, extension]);
  }

  /**
   * Creates a new composition by inheriting from this theme
   */
  public inherit(additionalThemes: Theme[]): ThemeComposition {
    return new ThemeComposition([...this.baseThemes, ...additionalThemes], this.extensions);
  }

  /**
   * Converts to UiTheme with composition metadata
   */
  public toUiTheme() {
    const uiTheme = super.toUiTheme();
    return {
      ...uiTheme,
      metadata: {
        ...uiTheme.metadata,
        composition: {
          baseThemeCount: this.baseThemes.length,
          extensionCount: this.extensions.length,
          baseThemeVersions: this.baseThemes.map(t => t.version)
        }
      }
    };
  }
}

/**
 * Theme Extension Interface
 * Defines properties that can be added or overridden in a theme
 */
export interface ThemeExtension {
  color?: {
    palette?: Record<string, Record<string, string>>;
    text?: Record<string, string>;
    background?: Record<string, string>;
    border?: Record<string, string>;
  };
  spacing?: {
    scale?: Record<string, string>;
    semantic?: Record<string, string>;
  };
  typography?: {
    fontSize?: Record<string, string>;
    fontWeight?: Record<string, string | number>;
    lineHeight?: Record<string, string | number>;
  };
  metadata?: Record<string, any>;
}

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