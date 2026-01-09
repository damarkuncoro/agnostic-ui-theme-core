/**
 * Token Builder Constants
 * Centralized constants for token building operations
 * Follows DRY principle by extracting hardcoded values
 */

/**
 * Semantic color tokens for light mode
 */
export const LIGHT_MODE_COLORS = {
  text: {
    primary: "#1f2937",
    secondary: "#6b7280",
    muted: "#9ca3af",
    inverse: "#ffffff",
    disabled: "#d1d5db"
  },
  background: {
    surface: "#ffffff",
    elevated: "#f9fafb",
    muted: "#f3f4f6",
    inverse: "#1f2937"
  },
  border: {
    default: "#e5e7eb",
    subtle: "#f3f4f6",
    strong: "#d1d5db",
    focus: "#3b82f6"
  }
} as const;

/**
 * Semantic color tokens for dark mode
 */
export const DARK_MODE_COLORS = {
  text: {
    primary: "#f9fafb",
    secondary: "#d1d5db",
    muted: "#9ca3af",
    inverse: "#1f2937",
    disabled: "#6b7280"
  },
  background: {
    surface: "#1f2937",
    elevated: "#374151",
    muted: "#4b5563",
    inverse: "#f9fafb"
  },
  border: {
    default: "#4b5563",
    subtle: "#374151",
    strong: "#6b7280",
    focus: "#60a5fa"
  }
} as const;

/**
 * Spacing scale multipliers (relative to base unit)
 */
export const SPACING_MULTIPLIERS = [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32] as const;

/**
 * Semantic spacing multipliers
 */
export const SEMANTIC_SPACING_MULTIPLIERS = {
  xs: 1,    // 0.25rem
  sm: 4,    // 1rem
  md: 6,    // 1.5rem
  lg: 8,    // 2rem
  xl: 12   // 3rem
} as const;

/**
 * Typography scale sizes (relative to base size)
 */
export const TYPOGRAPHY_SIZES = [0.75, 0.875, 1, 1.125, 1.25, 1.5, 1.875, 2.25, 3] as const;

/**
 * Typography size keys
 */
export const TYPOGRAPHY_SIZE_KEYS = ["xs", "sm", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const;

/**
 * Standard font weights
 */
export const FONT_WEIGHTS = {
  thin: "100",
  light: "300",
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",
  black: "900"
} as const;

/**
 * Standard line heights
 */
export const LINE_HEIGHTS = {
  none: "1",
  tight: "1.25",
  snug: "1.375",
  normal: "1.5",
  relaxed: "1.625",
  loose: "2"
} as const;

/**
 * Default configuration values
 */
export const DEFAULT_CONFIG = {
  mode: "light" as const,
  primaryColor: "#3b82f6",
  baseSpacing: 0.25,
  baseFontSize: 1,
  modularScaleRatio: 1.25
} as const;

/**
 * Validation error messages
 */
export const VALIDATION_ERRORS = {
  MISSING_COLOR_PALETTE: "Missing color.palette tokens",
  MISSING_COLOR_TEXT: "Missing color.text tokens",
  MISSING_COLOR_BACKGROUND: "Missing color.background tokens",
  MISSING_COLOR_BORDER: "Missing color.border tokens",
  MISSING_SPACING_SCALE: "Missing spacing.scale tokens",
  MISSING_SPACING_SEMANTIC: "Missing spacing.semantic tokens",
  MISSING_TYPOGRAPHY_FONT_SIZE: "Missing typography.fontSize tokens",
  MISSING_TYPOGRAPHY_FONT_WEIGHT: "Missing typography.fontWeight tokens",
  MISSING_TYPOGRAPHY_LINE_HEIGHT: "Missing typography.lineHeight tokens"
} as const;