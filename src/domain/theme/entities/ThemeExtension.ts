/**
 * Theme Extension Interface
 * Defines properties that can be added or overridden in a theme
 */
export interface ThemeExtension {
  color?: {
    palette?: Record<string, Record<string, string>>;
    text?: Record<string, string>;
    background?: Record<string, string>;
    border?: Record<string, string>;
  };
  spacing?: {
    scale?: Record<string, string>;
    semantic?: Record<string, string>;
  };
  radius?: {
    scale?: Record<string, string>;
    semantic?: Record<string, string>;
  };
  typography?: {
    fontFamily?: Record<string, string>;
    fontSize?: Record<string, string>;
    fontWeight?: Record<string, string | number>;
    lineHeight?: Record<string, string | number>;
  };
  metadata?: Record<string, any>;
}