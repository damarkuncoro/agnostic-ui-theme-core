// src/domain/theme/entities/ThemeComposition.ts

import { Theme } from './Theme';
import { ColorPalette } from '../../tokens/color/ColorPalette';
import { TextColor } from '../../tokens/color/TextColor';
import { BackgroundColor } from '../../tokens/color/BackgroundColor';
import { BorderColor } from '../../tokens/color/BorderColor';
import { SpacingScale } from '../../tokens/spacing/SpacingScale';
import { TypographyScale } from '../../tokens/typography/TypographyScale';
import type { ThemeExtension } from './ThemeExtension';

/**
 * Theme Composition Entity
 * Enables theme inheritance, extension, and composition patterns
 */
export class ThemeComposition {
  private theme: Theme;
  private baseThemes: Theme[];
  private extensions: ThemeExtension[];

  constructor(
    baseThemes: Theme[],
    extensions: ThemeExtension[] = []
  ) {
    this.baseThemes = [...baseThemes];
    this.extensions = [...extensions];

    // Merge base themes
    const mergedTheme = ThemeComposition.mergeThemes(baseThemes);

    // Apply extensions
    this.theme = ThemeComposition.applyExtensions(mergedTheme, extensions);
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
      const scale = extension.spacing.scale ? { ...theme.spacing.scale, ...extension.spacing.scale } : theme.spacing.scale;
      const semantic = extension.spacing.semantic ? { ...theme.spacing.semantic, ...extension.spacing.semantic } : theme.spacing.semantic;

      themeData.spacing = SpacingScale.create({
        scale,
        semantic
      });
    }

    // Apply radius overrides (if supported by theme)
    // Note: Radius is not part of the current Theme entity, so we skip it for now
    // This could be extended in the future when radius is added to the Theme entity

    // Apply typography overrides
    if (extension.typography) {
      const currentTypography = theme.typography;
      const fontSize = extension.typography.fontSize
        ? { ...currentTypography.fontSize, ...extension.typography.fontSize }
        : currentTypography.fontSize;
      const fontWeight = extension.typography?.fontWeight
        ? Object.keys({ ...currentTypography.fontWeight, ...extension.typography.fontWeight })
            .reduce((acc, key) => {
              const currentValue = currentTypography.fontWeight[key];
              const extensionValue = extension.typography?.fontWeight?.[key];
              acc[key] = String(extensionValue !== undefined ? extensionValue : currentValue);
              return acc;
            }, {} as Record<string, string>)
        : currentTypography.fontWeight;
      const lineHeight = extension.typography.lineHeight
        ? Object.fromEntries(
            Object.entries({ ...currentTypography.lineHeight, ...extension.typography.lineHeight })
              .map(([key, value]) => [key, String(value)])
          )
        : currentTypography.lineHeight;

      themeData.typography = TypographyScale.create({
        fontSize,
        fontWeight,
        lineHeight
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
   * Gets the underlying theme
   */
  public getTheme(): Theme {
    return this.theme;
  }

  /**
   * Converts to UiTheme with composition metadata
   */
  public toUiTheme() {
    const uiTheme = this.theme.toUiTheme();
    return {
      ...uiTheme,
      metadata: {
        composition: {
          baseThemeCount: this.baseThemes.length,
          extensionCount: this.extensions.length,
          baseThemeVersions: this.baseThemes.map(t => t.version)
        }
      }
    };
  }
}
