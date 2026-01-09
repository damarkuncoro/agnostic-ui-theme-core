// =================================================================
// Agnostic UI Theme Core - Domain-Driven Design Architecture
//
// This package provides enterprise-grade theme management with comprehensive
// token validation, accessibility compliance, and DDD principles.
// =================================================================

// Initialize bootstrap
import './bootstrap'

// =================================================================
// DDD ARCHITECTURE EXPORTS (New Enterprise APIs)
// =================================================================

// Domain Layer
export { Theme, UiThemeVersion } from './domain/theme/entities/Theme'
export { DarkModeTheme } from './domain/theme/entities/DarkModeTheme'
export { ThemeComposition } from './domain/theme/entities/ThemeComposition'
export { ThemeCompositionBuilder } from './domain/theme/entities/ThemeCompositionBuilder'
export type { ThemeExtension } from './domain/theme/entities/ThemeExtension'
export { ColorPalette } from './domain/tokens/color/ColorPalette'
export { TextColor } from './domain/tokens/color/TextColor'
export { BackgroundColor } from './domain/tokens/color/BackgroundColor'
export { BorderColor } from './domain/tokens/color/BorderColor'
export { SpacingScale } from './domain/tokens/spacing/SpacingScale'
export { TypographyScale } from './domain/tokens/typography/TypographyScale'

// Application Layer
export { ThemeBuilderService } from './application/services/ThemeBuilderService'
export { ThemeValidatorService } from './application/services/ThemeValidatorService'
export { MergeThemesUseCase } from './application/use-cases/MergeThemesUseCase'
export type {
  MergeThemesRequest,
  MergeThemesResponse,
  MergePreviewResponse,
  ThemeMergePreview
} from './application/use-cases/MergeThemesUseCase'

// Infrastructure Layer
export { TokenBuilder } from './infrastructure/builders/TokenBuilder'
export { ThemePerformanceService } from './infrastructure/services/ThemePerformanceService'
export type { ThemePerformanceMetrics } from './infrastructure/services/ThemePerformanceService'
export { ThemePresets, ThemePresetBuilder } from './infrastructure/templates/ThemePresets'

// Dependency Injection
export {
  getThemeBuilderService,
  getThemeValidatorService,
  getTokenBuilder,
  resetThemeServices
} from './bootstrap'

// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================

import { Theme, UiThemeVersion } from './domain/theme/entities/Theme'
import { DarkModeTheme } from './domain/theme/entities/DarkModeTheme'
import { ThemeComposition } from './domain/theme/entities/ThemeComposition'
import { ColorPalette } from './domain/tokens/color/ColorPalette'
import { TextColor } from './domain/tokens/color/TextColor'
import { BackgroundColor } from './domain/tokens/color/BackgroundColor'
import { BorderColor } from './domain/tokens/color/BorderColor'
import { SpacingScale } from './domain/tokens/spacing/SpacingScale'
import { TypographyScale } from './domain/tokens/typography/TypographyScale'
import { MergeThemesUseCase } from './application/use-cases/MergeThemesUseCase'
import { ThemePerformanceService } from './infrastructure/services/ThemePerformanceService'
import { ThemePresets } from './infrastructure/templates/ThemePresets'
import { getThemeBuilderService, getThemeValidatorService, getTokenBuilder } from './bootstrap'

// Legacy theme interface (now powered by DDD)
export interface UiTheme {
  version: UiThemeVersion
  tokens: {
    color: {
      palette: Record<string, Record<string, string>>
      text: Record<string, string>
      background: Record<string, string>
      border: Record<string, string>
    }
    spacing: {
      scale: Record<string, string>
      semantic: Record<string, string>
    }
    typography: {
      fontSize: Record<string, string>
      fontWeight: Record<string, string>
      lineHeight: Record<string, string>
    }
    shadow: Record<string, string>
    zIndex: Record<string, string>
  }
}

// Legacy defaults (now generated from DDD)
export const themeCore: UiTheme = (() => {
  const theme = Theme.createDefault()
  return theme.toUiTheme()
})()

// Legacy validation function (now uses DDD validator)
export function validateTheme(theme: UiTheme): void {
  const validator = getThemeValidatorService()
  const domainTheme = Theme.create({
    version: theme.version,
    color: {
      palette: ColorPalette.create(theme.tokens.color.palette as any),
      text: TextColor.create(theme.tokens.color.text as any),
      background: BackgroundColor.create(theme.tokens.color.background as any),
      border: BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: SpacingScale.create(theme.tokens.spacing),
    typography: TypographyScale.create(theme.tokens.typography)
  })

  const validation = validator.validateTheme(domainTheme)
  if (!validation.isValid) {
    throw new Error(`Theme validation failed: ${validation.errors.join(", ")}`)
  }
}

// =================================================================
// UTILITY EXPORTS
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
}): UiTheme {
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
export function validateThemeAccessibility(theme: UiTheme): {
  isValid: boolean
  isAccessible: boolean
  errors: string[]
  warnings: string[]
} {
  const validator = getThemeValidatorService()
  const domainTheme = Theme.create({
    version: theme.version,
    color: {
      palette: ColorPalette.create(theme.tokens.color.palette as any),
      text: TextColor.create(theme.tokens.color.text as any),
      background: BackgroundColor.create(theme.tokens.color.background as any),
      border: BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: SpacingScale.create(theme.tokens.spacing),
    typography: TypographyScale.create(theme.tokens.typography)
  })

  return validator.validateTheme(domainTheme)
}

/**
 * Generates a validation report for documentation
 */
export function generateThemeReport(theme: UiTheme): string {
  const validator = getThemeValidatorService()
  const domainTheme = Theme.create({
    version: theme.version,
    color: {
      palette: ColorPalette.create(theme.tokens.color.palette as any),
      text: TextColor.create(theme.tokens.color.text as any),
      background: BackgroundColor.create(theme.tokens.color.background as any),
      border: BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: SpacingScale.create(theme.tokens.spacing),
    typography: TypographyScale.create(theme.tokens.typography)
  })

  return validator.generateValidationReport(domainTheme)
}

// =================================================================
// ENHANCED UTILITY FUNCTIONS (New Advanced Features)
// =================================================================

/**
 * Creates a dark mode version of a theme
 */
export function createDarkModeTheme(lightTheme: UiTheme, customizations?: any): UiTheme {
  const domainTheme = Theme.create({
    version: lightTheme.version,
    color: {
      palette: ColorPalette.create(lightTheme.tokens.color.palette as any),
      text: TextColor.create(lightTheme.tokens.color.text as any),
      background: BackgroundColor.create(lightTheme.tokens.color.background as any),
      border: BorderColor.create(lightTheme.tokens.color.border as any)
    },
    spacing: SpacingScale.create(lightTheme.tokens.spacing),
    typography: TypographyScale.create(lightTheme.tokens.typography)
  });

  const darkTheme = DarkModeTheme.fromLightTheme(domainTheme, customizations);
  return darkTheme.toUiTheme();
}

/**
 * Merges multiple themes into one
 */
export async function mergeThemes(themes: UiTheme[], options?: {
  extensions?: any[];
  forceMerge?: boolean;
}): Promise<UiTheme> {
  const mergeUseCase = new MergeThemesUseCase(getThemeValidatorService());

  const domainThemes = themes.map(theme => Theme.create({
    version: theme.version,
    color: {
      palette: ColorPalette.create(theme.tokens.color.palette as any),
      text: TextColor.create(theme.tokens.color.text as any),
      background: BackgroundColor.create(theme.tokens.color.background as any),
      border: BorderColor.create(theme.tokens.color.border as any)
    },
    spacing: SpacingScale.create(theme.tokens.spacing),
    typography: TypographyScale.create(theme.tokens.typography)
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
export function createThemeFromPreset(presetName: string, customizations?: any): UiTheme {
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
  registerTheme: (theme: UiTheme, id?: string) => {
    const performanceService = ThemePerformanceService.getInstance();
    const domainTheme = Theme.create({
      version: theme.version,
      color: {
        palette: ColorPalette.create(theme.tokens.color.palette as any),
        text: TextColor.create(theme.tokens.color.text as any),
        background: BackgroundColor.create(theme.tokens.color.background as any),
        border: BorderColor.create(theme.tokens.color.border as any)
      },
      spacing: SpacingScale.create(theme.tokens.spacing),
      typography: TypographyScale.create(theme.tokens.typography)
    });
    return performanceService.registerTheme(domainTheme, id);
  },

  recordRender: (themeId: string, renderTime: number) => {
    const performanceService = ThemePerformanceService.getInstance();
    performanceService.recordRender(themeId, renderTime);
  },

  getMetrics: (themeId: string) => {
    const performanceService = ThemePerformanceService.getInstance();
    return performanceService.getPerformanceMetrics(themeId);
  },

  getSummary: () => {
    const performanceService = ThemePerformanceService.getInstance();
    return performanceService.getPerformanceSummary();
  }
};
