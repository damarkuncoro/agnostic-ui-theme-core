import { Theme } from './Theme';
import { COMPONENT_TOKEN_CONFIGS } from './ThemeConstants';

/**
 * Component Token Service
 * Handles component-specific token resolution
 * Follows Single Responsibility Principle
 */
export class ComponentTokenService {
  /**
   * Gets complete token set for a component type
   */
  public static getTokensForComponent(
    theme: Theme,
    componentType: "button" | "input" | "card"
  ): {
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
  } {
    const config = COMPONENT_TOKEN_CONFIGS[componentType];
    if (!config) {
      throw new Error(`Unknown component type: ${componentType}`);
    }

    return {
      colors: this.resolveColorTokens(theme, config.colors),
      spacing: this.resolveSpacingTokens(theme, config.spacing),
      typography: this.resolveTypographyTokens(theme, config.typography)
    };
  }

  /**
   * Resolves color tokens from configuration
   */
  private static resolveColorTokens(
    theme: Theme,
    colorConfig: Record<string, string>
  ): {
    primary: string;
    secondary: string;
    text: string;
    background: string;
    border: string;
  } {
    const result: any = {};

    for (const [key, path] of Object.entries(colorConfig)) {
      result[key] = this.resolveTokenPath(theme, path);
    }

    return result;
  }

  /**
   * Resolves spacing tokens from configuration
   */
  private static resolveSpacingTokens(
    theme: Theme,
    spacingConfig: Record<string, string>
  ): {
    padding: string;
    margin: string;
    gap: string;
  } {
    const result: any = {};

    for (const [key, path] of Object.entries(spacingConfig)) {
      result[key] = this.resolveTokenPath(theme, path);
    }

    return result;
  }

  /**
   * Resolves typography tokens from configuration
   */
  private static resolveTypographyTokens(
    theme: Theme,
    typographyPath: string
  ): {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  } {
    const [category, type] = typographyPath.split('.');

    switch (category) {
      case 'interactive':
        return theme.typography.getTypographyForInteractive(type as any);
      case 'hierarchy':
        return theme.typography.getTypographyForHierarchy(type as any);
      default:
        throw new Error(`Unknown typography category: ${category}`);
    }
  }

  /**
   * Resolves a dot-notation token path
   */
  private static resolveTokenPath(theme: Theme, path: string): string {
    const parts = path.split('.');
    let current: any = theme;

    for (const part of parts) {
      if (current && typeof current === 'object') {
        // Handle special getters
        if (part === 'primary' && current.getPrimary) {
          current = current.getPrimary();
        } else if (part === 'secondary' && current.getSecondary) {
          current = current.getSecondary();
        } else if (part === 'margin' && current.getSpacingForContext) {
          current = current.getSpacingForContext('margin');
        } else if (part === 'gap' && current.getSpacingForContext) {
          current = current.getSpacingForContext('gap');
        } else if (typeof current.getSpacingForSize === 'function' && ['xs', 'sm', 'md', 'lg', 'xl'].includes(part)) {
          current = current.getSpacingForSize(part as any);
        } else {
          current = current[part];
        }
      } else {
        throw new Error(`Cannot resolve token path: ${path}`);
      }
    }

    if (typeof current !== 'string') {
      throw new Error(`Token path ${path} does not resolve to a string value`);
    }

    return current;
  }

  /**
   * Validates component token configuration
   */
  public static validateComponentTokens(
    theme: Theme,
    componentType: string
  ): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    try {
      this.getTokensForComponent(theme, componentType as any);
    } catch (error) {
      errors.push(`Component ${componentType}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return { isValid: errors.length === 0, errors };
  }
}