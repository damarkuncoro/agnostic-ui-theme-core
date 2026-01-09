// =================================================================
// DOMAIN LAYER EXPORTS
// Core business logic entities and value objects
// =================================================================

export { Theme, UiThemeVersion } from '../domain/theme/entities/Theme'
export { DarkModeTheme } from '../domain/theme/entities/DarkModeTheme'
export { ThemeComposition } from '../domain/theme/entities/ThemeComposition'
export { ThemeCompositionBuilder } from '../domain/theme/entities/ThemeCompositionBuilder'
export type { ThemeExtension } from '../domain/theme/entities/ThemeExtension'
export { ThemeTransformer, DarkModeThemeTransformer } from '../domain/theme/entities/ThemeTransformer'
export { ThemeConverter } from '../domain/theme/entities/ThemeConverter'
export { ComponentTokenService } from '../domain/theme/entities/ComponentTokenService'
export { THEME_SHADOWS, THEME_Z_INDEX, DARK_MODE_TRANSFORMS, COMPONENT_TOKEN_CONFIGS } from '../domain/theme/entities/ThemeConstants'

// Token entities
export { ColorPalette } from '../domain/tokens/color/ColorPalette'
export { TextColor } from '../domain/tokens/color/TextColor'
export { BackgroundColor } from '../domain/tokens/color/BackgroundColor'
export { BorderColor } from '../domain/tokens/color/BorderColor'
export { SpacingScale } from '../domain/tokens/spacing/SpacingScale'
export { TypographyScale } from '../domain/tokens/typography/TypographyScale'