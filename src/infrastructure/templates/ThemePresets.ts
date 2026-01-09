// src/infrastructure/templates/ThemePresets.ts

import { Theme } from '../../domain/theme/entities/Theme';
import { ThemeComposition } from '../../domain/theme/entities/ThemeComposition';
import { DarkModeTheme } from '../../domain/theme/entities/DarkModeTheme';

/**
 * Predefined theme presets for common design systems
 */
export class ThemePresets {
  /**
   * Corporate theme preset - Professional, conservative design
   */
  public static corporate(): ThemeComposition {
    const baseTheme = Theme.createDefault();

    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          primary: { 500: '#1f2937', 600: '#111827', 400: '#374151' },
          secondary: { 500: '#6b7280', 600: '#4b5563', 400: '#9ca3af' }
        },
        text: {
          primary: '#1f2937',
          secondary: '#4b5563'
        }
      },
      typography: {
        fontFamily: { base: '"Inter", "Segoe UI", system-ui, sans-serif' },
        fontWeight: { medium: '500', semibold: '600' }
      }
    });
  }

  /**
   * Minimal theme preset - Clean, minimal design
   */
  public static minimal(): ThemeComposition {
    const baseTheme = Theme.createDefault();

    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          primary: { 500: '#000000', 600: '#000000', 400: '#666666' },
          secondary: { 500: '#999999', 600: '#666666', 400: '#cccccc' }
        },
        background: {
          surface: '#ffffff',
          elevated: '#f8f9fa'
        },
        border: {
          default: '#e5e7eb'
        }
      },
      spacing: {
        semantic: {
          xs: '0.5rem',
          sm: '0.75rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem'
        }
      },
      typography: {
        fontFamily: { base: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
        fontSize: {
          base: '1rem',
          lg: '1.125rem'
        }
      }
    });
  }

  /**
   * Vibrant theme preset - Colorful, energetic design
   */
  public static vibrant(): ThemeComposition {
    const baseTheme = Theme.createDefault();

    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          primary: { 500: '#8b5cf6', 600: '#7c3aed', 400: '#a78bfa' },
          secondary: { 500: '#f59e0b', 600: '#d97706', 400: '#fbbf24' },
          success: { 500: '#10b981', 600: '#059669', 400: '#34d399' },
          warning: { 500: '#f59e0b', 600: '#d97706', 400: '#fbbf24' },
          error: { 500: '#ef4444', 600: '#dc2626', 400: '#f87171' }
        }
      },
      typography: {
        fontFamily: { base: '"Poppins", system-ui, sans-serif' }
      }
    });
  }

  /**
   * Retro theme preset - Nostalgic, vintage design
   */
  public static retro(): ThemeComposition {
    const baseTheme = Theme.createDefault();

    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          primary: { 500: '#d97706', 600: '#b45309', 400: '#f59e0b' },
          secondary: { 500: '#92400e', 600: '#78350f', 400: '#a16207' }
        },
        background: {
          surface: '#fef3c7',
          elevated: '#fde68a'
        }
      },
      typography: {
        fontFamily: { base: '"Courier New", monospace' },
        fontSize: {
          base: '0.95rem',
          lg: '1.1rem'
        }
      },
      radius: {
        semantic: {
          sm: '0.25rem',
          md: '0.5rem',
          lg: '1rem'
        }
      }
    });
  }

  /**
   * Tech theme preset - Modern, tech-focused design
   */
  public static tech(): ThemeComposition {
    const baseTheme = Theme.createDefault();

    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          primary: { 500: '#06b6d4', 600: '#0891b2', 400: '#22d3ee' },
          secondary: { 500: '#6366f1', 600: '#4f46e5', 400: '#818cf8' }
        },
        background: {
          surface: '#f8fafc',
          elevated: '#ffffff'
        }
      },
      typography: {
        fontFamily: { base: '"JetBrains Mono", "Fira Code", monospace' },
        fontSize: {
          xs: '0.8rem',
          sm: '0.9rem',
          base: '1rem',
          lg: '1.1rem'
        }
      },
      spacing: {
        semantic: {
          xs: '0.25rem',
          sm: '0.5rem',
          md: '1rem',
          lg: '1.5rem',
          xl: '2rem'
        }
      }
    });
  }

  /**
   * Creates a dark mode version of any preset
   */
  public static darkMode(preset: ThemeComposition): DarkModeTheme {
    return DarkModeTheme.fromLightTheme(preset.getTheme());
  }

  /**
   * Creates a high contrast version for accessibility
   */
  public static highContrast(baseTheme: Theme): ThemeComposition {
    return ThemeComposition.extend(baseTheme, {
      color: {
        text: {
          primary: '#000000',
          secondary: '#000000'
        },
        background: {
          surface: '#ffffff',
          elevated: '#ffffff'
        },
        border: {
          default: '#000000',
          strong: '#000000'
        }
      }
    });
  }

  /**
   * Creates a colorblind-friendly version
   */
  public static colorblindFriendly(baseTheme: Theme): ThemeComposition {
    return ThemeComposition.extend(baseTheme, {
      color: {
        palette: {
          // Use high contrast colors that work for various colorblindness types
          primary: { 500: '#000000', 600: '#000000', 400: '#666666' },
          secondary: { 500: '#666666', 600: '#333333', 400: '#999999' },
          success: { 500: '#000000', 600: '#000000', 400: '#666666' },
          warning: { 500: '#666666', 600: '#333333', 400: '#999999' },
          error: { 500: '#000000', 600: '#000000', 400: '#666666' }
        }
      }
    });
  }

  /**
   * Creates a reduced motion version for accessibility
   */
  public static reducedMotion(baseTheme: Theme): ThemeComposition {
    return ThemeComposition.extend(baseTheme, {
      metadata: {
        reducedMotion: true,
        animationDuration: '0ms'
      }
    });
  }

  /**
   * Gets all available preset names
   */
  public static getAvailablePresets(): string[] {
    return ['corporate', 'minimal', 'vibrant', 'retro', 'tech'];
  }

  /**
   * Creates a preset by name
   */
  public static createPreset(name: string): ThemeComposition {
    switch (name.toLowerCase()) {
      case 'corporate':
        return this.corporate();
      case 'minimal':
        return this.minimal();
      case 'vibrant':
        return this.vibrant();
      case 'retro':
        return this.retro();
      case 'tech':
        return this.tech();
      default:
        throw new Error(`Unknown preset: ${name}. Available presets: ${this.getAvailablePresets().join(', ')}`);
    }
  }

  /**
   * Creates a custom preset with builder pattern
   */
  public static custom(): ThemePresetBuilder {
    return new ThemePresetBuilder();
  }
}

/**
 * Builder for custom theme presets
 */
export class ThemePresetBuilder {
  private baseTheme: Theme = Theme.createDefault();
  private extensions: any[] = [];

  /**
   * Sets the base theme
   */
  public withBase(theme: Theme): ThemePresetBuilder {
    this.baseTheme = theme;
    return this;
  }

  /**
   * Adds color customizations
   */
  public withColors(colors: {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
  }): ThemePresetBuilder {
    if (colors.primary || colors.secondary) {
      const palette: any = {};
      if (colors.primary) {
        palette.primary = { 500: colors.primary };
      }
      if (colors.secondary) {
        palette.secondary = { 500: colors.secondary };
      }

      this.extensions.push({
        color: { palette }
      });
    }

    if (colors.background) {
      this.extensions.push({
        color: {
          background: { surface: colors.background }
        }
      });
    }

    if (colors.text) {
      this.extensions.push({
        color: {
          text: { primary: colors.text }
        }
      });
    }

    return this;
  }

  /**
   * Sets typography preferences
   */
  public withTypography(typography: {
    fontFamily?: string;
    fontSize?: 'sm' | 'md' | 'lg';
  }): ThemePresetBuilder {
    const extension: any = { typography: {} };

    if (typography.fontFamily) {
      extension.typography.fontFamily = { base: typography.fontFamily };
    }

    if (typography.fontSize) {
      const sizeMap = {
        sm: { base: '0.9rem', lg: '1rem' },
        md: { base: '1rem', lg: '1.125rem' },
        lg: { base: '1.1rem', lg: '1.25rem' }
      };
      extension.typography.fontSize = sizeMap[typography.fontSize];
    }

    this.extensions.push(extension);
    return this;
  }

  /**
   * Sets spacing preferences
   */
  public withSpacing(spacing: 'compact' | 'comfortable' | 'spacious'): ThemePresetBuilder {
    const spacingMap = {
      compact: {
        semantic: { xs: '0.25rem', sm: '0.5rem', md: '0.75rem', lg: '1rem', xl: '1.5rem' }
      },
      comfortable: {
        semantic: { xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1.5rem', xl: '2rem' }
      },
      spacious: {
        semantic: { xs: '0.75rem', sm: '1rem', md: '1.5rem', lg: '2rem', xl: '3rem' }
      }
    };

    this.extensions.push({
      spacing: spacingMap[spacing]
    });

    return this;
  }

  /**
   * Adds accessibility features
   */
  public withAccessibility(options: {
    highContrast?: boolean;
    reducedMotion?: boolean;
    colorblind?: boolean;
  }): ThemePresetBuilder {
    if (options.highContrast) {
      this.extensions.push({
        color: {
          text: { primary: '#000000' },
          background: { surface: '#ffffff' },
          border: { default: '#000000' }
        }
      });
    }

    if (options.reducedMotion) {
      this.extensions.push({
        metadata: { reducedMotion: true }
      });
    }

    if (options.colorblind) {
      this.extensions.push({
        color: {
          palette: {
            primary: { 500: '#000000' },
            secondary: { 500: '#666666' }
          }
        }
      });
    }

    return this;
  }

  /**
   * Builds the custom preset
   */
  public build(): ThemeComposition {
    return ThemeComposition.compose([this.baseTheme], this.extensions);
  }
}