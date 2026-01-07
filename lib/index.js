// =================================================================
// Agnostic UI Theme Core - Domain-Driven Design Architecture
//
// This package provides enterprise-grade theme management with comprehensive
// token validation, accessibility compliance, and DDD principles.
// =================================================================
// Initialize bootstrap
import './bootstrap';
// =================================================================
// DDD ARCHITECTURE EXPORTS (New Enterprise APIs)
// =================================================================
// Domain Layer
export { Theme } from './domain/theme/entities/Theme';
export { ColorPalette } from './domain/tokens/color/ColorPalette';
export { TextColor } from './domain/tokens/color/TextColor';
export { BackgroundColor } from './domain/tokens/color/BackgroundColor';
export { BorderColor } from './domain/tokens/color/BorderColor';
export { SpacingScale } from './domain/tokens/spacing/SpacingScale';
export { TypographyScale } from './domain/tokens/typography/TypographyScale';
// Application Layer
export { ThemeBuilderService } from './application/services/ThemeBuilderService';
export { ThemeValidatorService } from './application/services/ThemeValidatorService';
// Infrastructure Layer
export { TokenBuilder } from './infrastructure/builders/TokenBuilder';
// Dependency Injection
export { getThemeBuilderService, getThemeValidatorService, getTokenBuilder, resetThemeServices } from './bootstrap';
// =================================================================
// LEGACY COMPATIBILITY EXPORTS (Maintained)
// =================================================================
import { Theme } from './domain/theme/entities/Theme';
import { ColorPalette } from './domain/tokens/color/ColorPalette';
import { TextColor } from './domain/tokens/color/TextColor';
import { BackgroundColor } from './domain/tokens/color/BackgroundColor';
import { BorderColor } from './domain/tokens/color/BorderColor';
import { SpacingScale } from './domain/tokens/spacing/SpacingScale';
import { TypographyScale } from './domain/tokens/typography/TypographyScale';
import { getThemeBuilderService, getThemeValidatorService, getTokenBuilder } from './bootstrap';
// Legacy defaults (now generated from DDD)
export const themeCore = (() => {
    const theme = Theme.createDefault();
    return theme.toUiTheme();
})();
// Legacy validation function (now uses DDD validator)
export function validateTheme(theme) {
    const validator = getThemeValidatorService();
    const domainTheme = Theme.create({
        version: theme.version,
        color: {
            palette: ColorPalette.create(theme.tokens.color.palette),
            text: TextColor.create(theme.tokens.color.text),
            background: BackgroundColor.create(theme.tokens.color.background),
            border: BorderColor.create(theme.tokens.color.border)
        },
        spacing: SpacingScale.create(theme.tokens.spacing),
        typography: TypographyScale.create(theme.tokens.typography)
    });
    const validation = validator.validateTheme(domainTheme);
    if (!validation.isValid) {
        throw new Error(`Theme validation failed: ${validation.errors.join(", ")}`);
    }
}
// =================================================================
// UTILITY EXPORTS
// =================================================================
/**
 * Creates a complete theme from minimal configuration
 * DRY: Uses TokenBuilder for consistent theme generation
 */
export function createTheme(config) {
    const builder = getThemeBuilderService();
    const tokenBuilder = getTokenBuilder();
    const tokens = tokenBuilder.buildCompleteTokens(config);
    const theme = builder.buildTheme({
        color: tokens.color,
        spacing: tokens.spacing,
        typography: tokens.typography
    });
    return theme.toUiTheme();
}
/**
 * Validates theme accessibility and consistency
 */
export function validateThemeAccessibility(theme) {
    const validator = getThemeValidatorService();
    const domainTheme = Theme.create({
        version: theme.version,
        color: {
            palette: ColorPalette.create(theme.tokens.color.palette),
            text: TextColor.create(theme.tokens.color.text),
            background: BackgroundColor.create(theme.tokens.color.background),
            border: BorderColor.create(theme.tokens.color.border)
        },
        spacing: SpacingScale.create(theme.tokens.spacing),
        typography: TypographyScale.create(theme.tokens.typography)
    });
    return validator.validateTheme(domainTheme);
}
/**
 * Generates a validation report for documentation
 */
export function generateThemeReport(theme) {
    const validator = getThemeValidatorService();
    const domainTheme = Theme.create({
        version: theme.version,
        color: {
            palette: ColorPalette.create(theme.tokens.color.palette),
            text: TextColor.create(theme.tokens.color.text),
            background: BackgroundColor.create(theme.tokens.color.background),
            border: BorderColor.create(theme.tokens.color.border)
        },
        spacing: SpacingScale.create(theme.tokens.spacing),
        typography: TypographyScale.create(theme.tokens.typography)
    });
    return validator.generateValidationReport(domainTheme);
}
//# sourceMappingURL=index.js.map