import { ColorPalette } from "../../tokens/color/ColorPalette";
import { TextColor } from "../../tokens/color/TextColor";
import { BackgroundColor } from "../../tokens/color/BackgroundColor";
import { BorderColor } from "../../tokens/color/BorderColor";
import { SpacingScale } from "../../tokens/spacing/SpacingScale";
import { TypographyScale } from "../../tokens/typography/TypographyScale";

/**
 * Theme version type - centralized for consistency
 */
export type UiThemeVersion = "2.1";

/**
 * Supported theme versions - DRY principle applied
 */
export const SUPPORTED_THEME_VERSIONS: readonly UiThemeVersion[] = ["2.1"] as const;

/**
 * Theme color structure
 */
export interface ThemeColorTokens {
  palette: ColorPalette;
  text: TextColor;
  background: BackgroundColor;
  border: BorderColor;
}

/**
 * Complete theme token structure
 */
export interface ThemeTokenStructure {
  version: UiThemeVersion;
  color: ThemeColorTokens;
  spacing: SpacingScale;
  typography: TypographyScale;
  extendedTokens?: Record<string, any>;
}

/**
 * Theme creation props
 */
export interface ThemeCreationProps extends ThemeTokenStructure {}

/**
 * Theme update props (partial)
 */
export interface ThemeUpdateProps {
  color?: Partial<ThemeColorTokens>;
  spacing?: SpacingScale;
  typography?: TypographyScale;
  extendedTokens?: Record<string, any>;
}

/**
 * Component token response
 */
export interface ComponentTokens {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    border: string;
  };
  spacing: {
    padding: string;
    margin: string;
    gap: string;
  };
  typography: {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  };
}

/**
 * Accessibility validation result
 */
export interface AccessibilityValidationResult {
  isAccessible: boolean;
  violations: string[];
}

/**
 * Theme mode detection result
 */
export type ThemeMode = "light" | "dark" | "auto";

/**
 * UiTheme format for external consumption
 */
export interface UiThemeFormat {
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