import './bootstrap';
export { Theme, UiThemeVersion } from './domain/theme/entities/Theme';
export { ColorPalette } from './domain/tokens/color/ColorPalette';
export { TextColor } from './domain/tokens/color/TextColor';
export { BackgroundColor } from './domain/tokens/color/BackgroundColor';
export { BorderColor } from './domain/tokens/color/BorderColor';
export { SpacingScale } from './domain/tokens/spacing/SpacingScale';
export { TypographyScale } from './domain/tokens/typography/TypographyScale';
export { ThemeBuilderService } from './application/services/ThemeBuilderService';
export { ThemeValidatorService } from './application/services/ThemeValidatorService';
export { TokenBuilder } from './infrastructure/builders/TokenBuilder';
export { getThemeBuilderService, getThemeValidatorService, getTokenBuilder, resetThemeServices } from './bootstrap';
import { UiThemeVersion } from './domain/theme/entities/Theme';
export interface UiTheme {
    version: UiThemeVersion;
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
}
export declare const themeCore: UiTheme;
export declare function validateTheme(theme: UiTheme): void;
/**
 * Creates a complete theme from minimal configuration
 * DRY: Uses TokenBuilder for consistent theme generation
 */
export declare function createTheme(config: {
    mode?: "light" | "dark";
    primaryColor?: string;
    baseSpacing?: number;
    baseFontSize?: number;
}): UiTheme;
/**
 * Validates theme accessibility and consistency
 */
export declare function validateThemeAccessibility(theme: UiTheme): {
    isValid: boolean;
    isAccessible: boolean;
    errors: string[];
    warnings: string[];
};
/**
 * Generates a validation report for documentation
 */
export declare function generateThemeReport(theme: UiTheme): string;
//# sourceMappingURL=index.d.ts.map