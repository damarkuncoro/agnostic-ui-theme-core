/**
 * Theme Constants
 * Centralized constants for theme-related values
 * Follows DRY principle by extracting hardcoded values
 */

/**
 * Shadow scale constants
 */
export const THEME_SHADOWS = {
  sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)"
} as const;

/**
 * Z-index scale constants
 */
export const THEME_Z_INDEX = {
  0: "0",
  10: "10",
  20: "20",
  30: "30",
  40: "40",
  50: "50",
  auto: "auto"
} as const;

/**
 * Default color transformation factors for dark mode
 */
export const DARK_MODE_TRANSFORMS = {
  primaryLightenFactor: 0.1,
  darkVariantsLightenFactor: 0.2,
  textColors: {
    primary: '#ffffff',
    secondary: '#e5e7eb',
    muted: '#9ca3af',
    inverse: '#1f2937',
    disabled: '#6b7280'
  },
  backgroundColors: {
    surface: '#1f2937',
    elevated: '#374151',
    muted: '#111827',
    inverse: '#ffffff'
  },
  borderColors: {
    default: '#374151',
    subtle: '#1f2937',
    strong: '#4b5563',
    focus: '#3b82f6' // Keep bright for accessibility
  }
} as const;

/**
 * Component token configurations
 */
export const COMPONENT_TOKEN_CONFIGS = {
  button: {
    colors: {
      primary: 'palette.primary',
      secondary: 'palette.secondary',
      text: 'text.primary',
      background: 'background.surface',
      border: 'border.default'
    },
    spacing: {
      padding: 'spacing.sm',
      margin: 'spacing.margin',
      gap: 'spacing.gap'
    },
    typography: 'interactive.button'
  },
  input: {
    colors: {
      primary: 'palette.primary',
      secondary: 'palette.secondary',
      text: 'text.primary',
      background: 'background.surface',
      border: 'border.default'
    },
    spacing: {
      padding: 'spacing.md',
      margin: 'spacing.margin',
      gap: 'spacing.gap'
    },
    typography: 'interactive.input'
  },
  card: {
    colors: {
      primary: 'palette.primary',
      secondary: 'palette.secondary',
      text: 'text.primary',
      background: 'background.elevated',
      border: 'border.subtle'
    },
    spacing: {
      padding: 'spacing.lg',
      margin: 'spacing.margin',
      gap: 'spacing.gap'
    },
    typography: 'hierarchy.body'
  }
} as const;