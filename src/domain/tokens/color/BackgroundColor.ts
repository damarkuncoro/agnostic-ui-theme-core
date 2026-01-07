// src/domain/tokens/color/BackgroundColor.ts
/**
 * BackgroundColor Value Object
 * Represents semantic background color mappings
 * Follows DDD principles with validation and business rules
 */
export class BackgroundColor {
  public readonly surface: string;
  public readonly elevated: string;
  public readonly muted: string;
  public readonly inverse: string;

  private constructor(props: {
    surface: string;
    elevated: string;
    muted: string;
    inverse: string;
  }) {
    this.surface = props.surface;
    this.elevated = props.elevated;
    this.muted = props.muted;
    this.inverse = props.inverse;
  }

  /**
   * Creates a BackgroundColor from raw color values
   */
  public static create(props: {
    surface: string;
    elevated: string;
    muted: string;
    inverse: string;
  }): BackgroundColor {
    // Validate all colors are valid hex colors
    const validateColor = (color: string, name: string) => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
        throw new Error(`Invalid background color format for ${name}: ${color}. Must be hex format #RRGGBB`);
      }
    };

    Object.entries(props).forEach(([key, value]) =>
      validateColor(value, `background.${key}`)
    );

    return new BackgroundColor(props);
  }

  /**
   * Creates default background colors
   */
  public static createDefault(): BackgroundColor {
    return BackgroundColor.create({
      surface: "#ffffff",   // white
      elevated: "#f9fafb",   // neutral-50
      muted: "#f3f4f6",      // neutral-100
      inverse: "#1f2937"     // neutral-800
    });
  }

  /**
   * Business rule: Gets appropriate background for elevation level
   */
  public getColorForElevation(elevation: "none" | "low" | "medium" | "high"): string {
    switch (elevation) {
      case "none":
        return this.surface;
      case "low":
        return this.elevated;
      case "medium":
        return this.muted;
      case "high":
        return this.inverse;
      default:
        return this.surface;
    }
  }

  /**
   * Business rule: Gets appropriate background for semantic context
   */
  public getColorForContext(context: "primary" | "secondary" | "muted" | "inverse"): string {
    switch (context) {
      case "primary":
        return this.surface;
      case "secondary":
        return this.elevated;
      case "muted":
        return this.muted;
      case "inverse":
        return this.inverse;
      default:
        return this.surface;
    }
  }

  /**
   * Business rule: Validates background hierarchy for proper contrast
   */
  public validateHierarchy(): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Surface should be the lightest (usually white)
    // Elevated should be slightly darker than surface
    // Muted should be darker than elevated
    // Inverse should be the darkest

    const colors = [this.surface, this.elevated, this.muted, this.inverse];

    // Simplified validation - in real implementation, use luminance calculation
    if (colors[0] === colors[1]) {
      violations.push("Surface and elevated backgrounds should be different");
    }

    if (this.inverse === this.surface) {
      violations.push("Inverse background should be different from surface");
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * Creates a new BackgroundColor with updated properties
   * Maintains immutability
   */
  public with(updates: Partial<{
    surface: string;
    elevated: string;
    muted: string;
    inverse: string;
  }>): BackgroundColor {
    return BackgroundColor.create({
      surface: updates.surface ?? this.surface,
      elevated: updates.elevated ?? this.elevated,
      muted: updates.muted ?? this.muted,
      inverse: updates.inverse ?? this.inverse
    });
  }

  /**
   * Checks equality with another BackgroundColor
   */
  public equals(other: BackgroundColor): boolean {
    return (
      this.surface === other.surface &&
      this.elevated === other.elevated &&
      this.muted === other.muted &&
      this.inverse === other.inverse
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      surface: this.surface,
      elevated: this.elevated,
      muted: this.muted,
      inverse: this.inverse
    };
  }
}