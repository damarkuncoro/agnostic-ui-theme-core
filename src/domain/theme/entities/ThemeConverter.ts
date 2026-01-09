import { Theme } from './Theme';
import { THEME_SHADOWS, THEME_Z_INDEX } from './ThemeConstants';

/**
 * Theme Converter
 * Handles conversion from domain Theme to external UiTheme format
 * Follows Single Responsibility Principle
 */
export class ThemeConverter {
  /**
   * Converts a Theme entity to UiTheme format
   */
  public static toUiTheme(theme: Theme): {
    version: string;
    tokens: {
      color: {
        palette: Record<string, Record<string, string>>;
        text: Record<string, string>;
        background: Record<string, string>;
        border: Record<string, string>;
      };
      spacing: {
        scale: Record<string, string>;
        semantic: Record<string, string>;
      };
      typography: {
        fontSize: Record<string, string>;
        fontWeight: Record<string, string>;
        lineHeight: Record<string, string>;
      };
      shadow: Record<string, string>;
      zIndex: Record<string, string>;
    };
  } {
    return {
      version: theme.version,
      tokens: {
        color: {
          palette: theme.color.palette.toObject(),
          text: theme.color.text.toObject(),
          background: theme.color.background.toObject(),
          border: theme.color.border.toObject()
        },
        spacing: theme.spacing.toObject(),
        typography: theme.typography.toObject(),
        shadow: THEME_SHADOWS,
        zIndex: THEME_Z_INDEX
      }
    };
  }

  /**
   * Converts with additional metadata
   */
  public static toUiThemeWithMetadata(
    theme: Theme,
    metadata?: Record<string, any>
  ): ReturnType<typeof ThemeConverter.toUiTheme> & { metadata?: Record<string, any> } {
    const uiTheme = this.toUiTheme(theme);
    return metadata ? { ...uiTheme, metadata } : uiTheme;
  }

  /**
   * Validates UiTheme structure
   */
  public static validateUiTheme(uiTheme: any): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!uiTheme || typeof uiTheme !== 'object') {
      errors.push('UiTheme must be an object');
      return { isValid: false, errors };
    }

    if (!uiTheme.version || typeof uiTheme.version !== 'string') {
      errors.push('UiTheme must have a valid version string');
    }

    if (!uiTheme.tokens || typeof uiTheme.tokens !== 'object') {
      errors.push('UiTheme must have tokens object');
      return { isValid: false, errors };
    }

    // Validate required token sections
    const requiredSections = ['color', 'spacing', 'typography', 'shadow', 'zIndex'];
    for (const section of requiredSections) {
      if (!uiTheme.tokens[section]) {
        errors.push(`UiTheme tokens must include ${section}`);
      }
    }

    return { isValid: errors.length === 0, errors };
  }
}