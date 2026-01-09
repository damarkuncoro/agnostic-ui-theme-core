// =================================================================
// LEGACY COMPATIBILITY EXPORTS
// Deprecated exports for backward compatibility
// =================================================================

// Legacy theme interface (now powered by DDD)
export interface UiTheme {
  version: import('./domain').UiThemeVersion
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
  const { Theme } = require('../domain/theme/entities/Theme')
  const theme = Theme.createDefault()
  return theme.toUiTheme()
})()

// Legacy validation function (now uses DDD validator)
export function validateTheme(theme: UiTheme): void {
  const { Theme, ColorPalette, TextColor, BackgroundColor, BorderColor, SpacingScale, TypographyScale } = require('../exports/domain')
  const { getThemeValidatorService } = require('../bootstrap')

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

  const validator = getThemeValidatorService()
  const validation = validator.validateTheme(domainTheme)
  if (!validation.isValid) {
    throw new Error(`Theme validation failed: ${validation.errors.join(", ")}`)
  }
}