// =================================================================
// UTILITY EXPORTS
// High-level utility functions for common use cases
// =================================================================

import { Theme, DarkModeTheme, ThemeComposition } from './domain'
import { MergeThemesUseCase } from './application'
import { ThemePresets } from './infrastructure'
import { getThemeBuilderService, getThemeValidatorService, getTokenBuilder } from '../bootstrap'

// =================================================================
// BASIC UTILITIES
// =================================================================

/**
 * Creates a complete theme from minimal configuration
 * DRY: Uses TokenBuilder for consistent theme generation
 */
export function createTheme(config: {
  mode?: "light" | "dark"
  primaryColor?: string
  baseSpacing?: number
  baseFontSize?: number
}): import('./legacy').UiTheme {
  const builder = getThemeBuilderService()
  const tokenBuilder = getTokenBuilder()

  const tokens = tokenBuilder.buildCompleteTokens(config)
  const theme = builder.buildTheme({
    color: tokens.color,
    spacing: tokens.spacing,
    typography: tokens.typography
  })

  return theme.toUiTheme()
}

/**
 * Validates theme accessibility and consistency
 */
export function validateThemeAccessibility(theme: import('./legacy').UiTheme): {
  isValid: boolean
  isAccessible: boolean
  errors: string[]
  warnings: string[]
} {
  const validator = getThemeValidatorService()
  const domainTheme = Theme.create({
    version: theme.version,
    color: {
      palette: require('./domain').ColorPalette.create(theme.tokens.color.palette as any),
      text: require('./domain').TextColor.create(theme.tokens.color.text as any),
      background: require('./domain').BackgroundColor.create(theme.tokens.color.background as any),
      border: require('./domain').BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: require('./domain').SpacingScale.create(theme.tokens.spacing),
    typography: require('./domain').TypographyScale.create(theme.tokens.typography)
  })

  return validator.validateTheme(domainTheme)
}

/**
 * Generates a validation report for documentation
 */
export function generateThemeReport(theme: import('./legacy').UiTheme): string {
  const validator = getThemeValidatorService()
  const domainTheme = Theme.create({
    version: theme.version,
    color: {
      palette: require('./domain').ColorPalette.create(theme.tokens.color.palette as any),
      text: require('./domain').TextColor.create(theme.tokens.color.text as any),
      background: require('./domain').BackgroundColor.create(theme.tokens.color.background as any),
      border: require('./domain').BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: require('./domain').SpacingScale.create(theme.tokens.spacing),
    typography: require('./domain').TypographyScale.create(theme.tokens.typography)
  })

  return validator.generateValidationReport(domainTheme)
}

// =================================================================
// ADVANCED UTILITIES
// =================================================================

/**
 * Creates a dark mode version of a theme
 */
export function createDarkModeTheme(lightTheme: import('./legacy').UiTheme, customizations?: any): import('./legacy').UiTheme {
  const domainTheme = Theme.create({
    version: lightTheme.version,
    color: {
      palette: require('./domain').ColorPalette.create(lightTheme.tokens.color.palette as any),
      text: require('./domain').TextColor.create(lightTheme.tokens.color.text as any),
      background: require('./domain').BackgroundColor.create(lightTheme.tokens.color.background as any),
      border: require('./domain').BorderColor.create(lightTheme.tokens.color.border as any)
    },
    spacing: require('./domain').SpacingScale.create(lightTheme.tokens.spacing),
    typography: require('./domain').TypographyScale.create(lightTheme.tokens.typography)
  });

  const darkTheme = DarkModeTheme.fromLightTheme(domainTheme, customizations);
  const result = darkTheme.toUiTheme();
  return {
    ...result,
    version: result.version as import('./legacy').UiTheme['version']
  };
}

/**
 * Merges multiple themes into one
 */
export async function mergeThemes(themes: import('./legacy').UiTheme[], options?: {
  extensions?: any[];
  forceMerge?: boolean;
}): Promise<import('./legacy').UiTheme> {
  const mergeUseCase = new MergeThemesUseCase(getThemeValidatorService());

  const domainThemes = themes.map(theme => Theme.create({
    version: theme.version,
    color: {
      palette: require('./domain').ColorPalette.create(theme.tokens.color.palette as any),
      text: require('./domain').TextColor.create(theme.tokens.color.text as any),
      background: require('./domain').BackgroundColor.create(theme.tokens.color.background as any),
      border: require('./domain').BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: require('./domain').SpacingScale.create(theme.tokens.spacing),
    typography: require('./domain').TypographyScale.create(theme.tokens.typography)
  }));

  const result = await mergeUseCase.execute({
    themes: domainThemes,
    extensions: options?.extensions,
    forceMerge: options?.forceMerge
  });

  if (!result.success || !result.mergedTheme) {
    throw new Error(result.message || 'Theme merge failed');
  }

  return result.mergedTheme.toUiTheme();
}

/**
 * Creates a theme from a preset
 */
export function createThemeFromPreset(presetName: string, customizations?: any): import('./legacy').UiTheme {
  const preset = ThemePresets.createPreset(presetName);

  if (customizations) {
    const extended = ThemeComposition.extend(preset.getTheme(), customizations);
    return extended.toUiTheme();
  }

  return preset.toUiTheme();
}

/**
 * Monitors theme performance
 */
export const themePerformance = {
  registerTheme: (theme: import('./legacy').UiTheme, id?: string) => {
    const { ThemePerformanceService } = require('./infrastructure');
    const performanceService = ThemePerformanceService.getInstance();
    const domainTheme = Theme.create({
      version: theme.version,
      color: {
        palette: require('./domain').ColorPalette.create(theme.tokens.color.palette as any),
        text: require('./domain').TextColor.create(theme.tokens.color.text as any),
        background: require('./domain').BackgroundColor.create(theme.tokens.color.background as any),
        border: require('./domain').BorderColor.create(theme.tokens.color.border as any)
      },
      spacing: require('./domain').SpacingScale.create(theme.tokens.spacing),
      typography: require('./domain').TypographyScale.create(theme.tokens.typography)
    });
    return performanceService.registerTheme(domainTheme, id);
  },

  recordRender: (themeId: string, renderTime: number) => {
    const { ThemePerformanceService } = require('./infrastructure');
    const performanceService = ThemePerformanceService.getInstance();
    performanceService.recordRender(themeId, renderTime);
  },

  getMetrics: (themeId: string) => {
    const { ThemePerformanceService } = require('./infrastructure');
    const performanceService = ThemePerformanceService.getInstance();
    return performanceService.getPerformanceMetrics(themeId);
  },

  getSummary: () => {
    const { ThemePerformanceService } = require('./infrastructure');
    const performanceService = ThemePerformanceService.getInstance();
    return performanceService.getPerformanceSummary();
  }
};