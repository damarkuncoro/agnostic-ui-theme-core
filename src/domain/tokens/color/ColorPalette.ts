// src/domain/tokens/color/ColorPalette.ts
/**
 * ColorPalette Value Object
 * Represents a complete color palette with semantic color mappings
 * Follows DDD principles with validation and immutability
 */
export class ColorPalette {
  public readonly neutral: Record<string, string>;
  public readonly primary: Record<string, string>;
  public readonly secondary: Record<string, string>;

  private constructor(props: {
    neutral: Record<string, string>;
    primary: Record<string, string>;
    secondary: Record<string, string>;
  }) {
    this.neutral = Object.freeze({ ...props.neutral });
    this.primary = Object.freeze({ ...props.primary });
    this.secondary = Object.freeze({ ...props.secondary });
  }

  /**
   * Creates a ColorPalette from raw color values
   */
  public static create(props: {
    neutral: Record<string, string>;
    primary: Record<string, string>;
    secondary: Record<string, string>;
  }): ColorPalette {
    // Validate color format
    const validateColor = (color: string, name: string) => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
        throw new Error(`Invalid color format for ${name}: ${color}. Must be hex format #RRGGBB`);
      }
    };

    // Validate all colors
    Object.entries(props.neutral).forEach(([key, value]) =>
      validateColor(value, `neutral.${key}`)
    );
    Object.entries(props.primary).forEach(([key, value]) =>
      validateColor(value, `primary.${key}`)
    );
    Object.entries(props.secondary).forEach(([key, value]) =>
      validateColor(value, `secondary.${key}`)
    );

    return new ColorPalette(props);
  }

  /**
   * Creates the default neutral color palette
   */
  public static createDefaultNeutral(): Record<string, string> {
    return {
      50: "#f9fafb",
      100: "#f3f4f6",
      200: "#e5e7eb",
      300: "#d1d5db",
      400: "#9ca3af",
      500: "#6b7280",
      600: "#4b5563",
      700: "#374151",
      800: "#1f2937",
      900: "#111827"
    };
  }

  /**
   * Creates the default primary color palette
   */
  public static createDefaultPrimary(): Record<string, string> {
    return { 500: "#3b82f6" };
  }

  /**
   * Creates the default secondary color palette
   */
  public static createDefaultSecondary(): Record<string, string> {
    return { 500: "#6b7280" };
  }

  /**
   * Creates the default complete color palette
   */
  public static createDefault(): ColorPalette {
    return ColorPalette.create({
      neutral: ColorPalette.createDefaultNeutral(),
      primary: ColorPalette.createDefaultPrimary(),
      secondary: ColorPalette.createDefaultSecondary()
    });
  }

  /**
   * Gets a neutral color by shade
   */
  public getNeutral(shade: string): string {
    const color = this.neutral[shade];
    if (!color) {
      throw new Error(`Neutral color shade '${shade}' not found`);
    }
    return color;
  }

  /**
   * Gets the primary color (usually the main shade)
   */
  public getPrimary(shade: string = "500"): string {
    const color = this.primary[shade];
    if (!color) {
      throw new Error(`Primary color shade '${shade}' not found`);
    }
    return color;
  }

  /**
   * Gets the secondary color (usually the main shade)
   */
  public getSecondary(shade: string = "500"): string {
    const color = this.secondary[shade];
    if (!color) {
      throw new Error(`Secondary color shade '${shade}' not found`);
    }
    return color;
  }

  /**
   * Checks equality with another ColorPalette
   */
  public equals(other: ColorPalette): boolean {
    return (
      JSON.stringify(this.neutral) === JSON.stringify(other.neutral) &&
      JSON.stringify(this.primary) === JSON.stringify(other.primary) &&
      JSON.stringify(this.secondary) === JSON.stringify(other.secondary)
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      neutral: { ...this.neutral },
      primary: { ...this.primary },
      secondary: { ...this.secondary }
    };
  }
}