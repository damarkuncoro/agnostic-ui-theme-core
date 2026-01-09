// =================================================================
// DOMAIN LAYER EXPORTS
// Core business logic entities and value objects
// =================================================================

// Theme Entity and related (Composition-based architecture)
export { Theme } from '../domain/theme/entities/Theme'
export type { UiThemeVersion } from '../domain/theme/entities/Theme'

// Theme specialized classes (SOLID: Single Responsibility)
export { ThemeFactory } from '../domain/theme/entities/ThemeFactory'
export { ThemeValidator } from '../domain/theme/entities/ThemeValidator'
export { ThemeBusinessLogic } from '../domain/theme/entities/ThemeBusinessLogic'
export { ThemeOperations } from '../domain/theme/entities/ThemeOperations'

// Theme types (DRY: Centralized type definitions)
export type {
  UiThemeVersion as UiThemeVersionType,
  ThemeTokenStructure,
  ThemeCreationProps,
  ThemeUpdateProps,
  AccessibilityValidationResult,
  ComponentTokens,
  ThemeMode,
  UiThemeFormat
} from '../domain/theme/entities/ThemeTypes'

// Legacy theme classes (maintained for compatibility)
export { DarkModeTheme } from '../domain/theme/entities/DarkModeTheme'
export { ThemeComposition } from '../domain/theme/entities/ThemeComposition'
export { ThemeCompositionBuilder } from '../domain/theme/entities/ThemeCompositionBuilder'
export type { ThemeExtension } from '../domain/theme/entities/ThemeExtension'
export { ThemeTransformer, DarkModeThemeTransformer } from '../domain/theme/entities/ThemeTransformer'
export { ThemeConverter } from '../domain/theme/entities/ThemeConverter'
export { ComponentTokenService } from '../domain/theme/entities/ComponentTokenService'
export { THEME_SHADOWS, THEME_Z_INDEX, DARK_MODE_TRANSFORMS, COMPONENT_TOKEN_CONFIGS } from '../domain/theme/entities/ThemeConstants'

// Token entities (Value Objects)
export { ColorPalette } from '../domain/tokens/color/ColorPalette'
export { TextColor } from '../domain/tokens/color/TextColor'
export { BackgroundColor } from '../domain/tokens/color/BackgroundColor'
export { BorderColor } from '../domain/tokens/color/BorderColor'
export { SpacingScale } from '../domain/tokens/spacing/SpacingScale'
export { TypographyScale } from '../domain/tokens/typography/TypographyScale'