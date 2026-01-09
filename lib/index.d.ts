import './bootstrap';
export { Theme, UiThemeVersion } from './domain/theme/entities/Theme';
export { DarkModeTheme } from './domain/theme/entities/DarkModeTheme';
export { ThemeComposition } from './domain/theme/entities/ThemeComposition';
export { ThemeCompositionBuilder } from './domain/theme/entities/ThemeCompositionBuilder';
export type { ThemeExtension } from './domain/theme/entities/ThemeExtension';
export { ColorPalette } from './domain/tokens/color/ColorPalette';
export { TextColor } from './domain/tokens/color/TextColor';
export { BackgroundColor } from './domain/tokens/color/BackgroundColor';
export { BorderColor } from './domain/tokens/color/BorderColor';
export { SpacingScale } from './domain/tokens/spacing/SpacingScale';
export { TypographyScale } from './domain/tokens/typography/TypographyScale';
export { ThemeBuilderService } from './application/services/ThemeBuilderService';
export { ThemeValidatorService } from './application/services/ThemeValidatorService';
export { MergeThemesUseCase } from './application/use-cases/MergeThemesUseCase';
export type { MergeThemesRequest, MergeThemesResponse, MergePreviewResponse, ThemeMergePreview } from './application/use-cases/MergeThemesUseCase';
export { TokenBuilder } from './infrastructure/builders/TokenBuilder';
export { ThemePerformanceService } from './infrastructure/services/ThemePerformanceService';
export type { ThemePerformanceMetrics } from './infrastructure/services/ThemePerformanceService';
export { ThemePresets, ThemePresetBuilder } from './infrastructure/templates/ThemePresets';
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
/**
 * Creates a dark mode version of a theme
 */
export declare function createDarkModeTheme(lightTheme: UiTheme, customizations?: any): UiTheme;
/**
 * Merges multiple themes into one
 */
export declare function mergeThemes(themes: UiTheme[], options?: {
    extensions?: any[];
    forceMerge?: boolean;
}): Promise<UiTheme>;
/**
 * Creates a theme from a preset
 */
export declare function createThemeFromPreset(presetName: string, customizations?: any): UiTheme;
/**
 * Monitors theme performance
 */
export declare const themePerformance: {
    registerTheme: (theme: UiTheme, id?: string) => string;
    recordRender: (themeId: string, renderTime: number) => void;
    getMetrics: (themeId: string) => import("./infrastructure/services/ThemePerformanceService").ThemePerformanceMetrics | null;
    getSummary: () => {
        totalThemes: number;
        averageLoadTime: number;
        averageRenderTime: number;
        totalCacheHits: number;
        totalCacheMisses: number;
        cacheHitRate: number;
        totalMemoryUsage: number;
        topPerformingThemes: Array<{
            id: string;
            metrics: import("./infrastructure/services/ThemePerformanceService").ThemePerformanceMetrics;
        }>;
        slowThemes: Array<{
            id: string;
            metrics: import("./infrastructure/services/ThemePerformanceService").ThemePerformanceMetrics;
        }>;
    };
};
//# sourceMappingURL=index.d.ts.map