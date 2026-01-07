// src/domain/tokens/color/TextColor.ts
/**
 * TextColor Value Object
 * Represents semantic text color mappings
 * Follows DDD principles with validation and business rules
 */
export class TextColor {
  public readonly primary: string;
  public readonly secondary: string;
  public readonly muted: string;
  public readonly inverse: string;
  public readonly disabled: string;

  private constructor(props: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    disabled: string;
  }) {
    this.primary = props.primary;
    this.secondary = props.secondary;
    this.muted = props.muted;
    this.inverse = props.inverse;
    this.disabled = props.disabled;
  }

  /**
   * Creates a TextColor from raw color values
   */
  public static create(props: {
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    disabled: string;
  }): TextColor {
    // Validate all colors are valid hex colors
    const validateColor = (color: string, name: string) => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
        throw new Error(`Invalid text color format for ${name}: ${color}. Must be hex format #RRGGBB`);
      }
    };

    Object.entries(props).forEach(([key, value]) =>
      validateColor(value, `text.${key}`)
    );

    return new TextColor(props);
  }

  /**
   * Creates default text colors based on a neutral palette
   */
  public static createDefault(): TextColor {
    return TextColor.create({
      primary: "#1f2937",    // neutral-800
      secondary: "#6b7280",  // neutral-500
      muted: "#9ca3af",      // neutral-400
      inverse: "#ffffff",    // white
      disabled: "#d1d5db"    // neutral-300
    });
  }

  /**
   * Business rule: Gets appropriate text color for emphasis level
   */
  public getColorForEmphasis(emphasis: "high" | "medium" | "low"): string {
    switch (emphasis) {
      case "high":
        return this.primary;
      case "medium":
        return this.secondary;
      case "low":
        return this.muted;
      default:
        return this.primary;
    }
  }

  /**
   * Business rule: Gets appropriate text color for interactive states
   */
  public getColorForState(state: "normal" | "disabled" | "inverse"): string {
    switch (state) {
      case "disabled":
        return this.disabled;
      case "inverse":
        return this.inverse;
      case "normal":
      default:
        return this.primary;
    }
  }

  /**
   * Business rule: Validates contrast ratios for accessibility
   * Note: This is a simplified check - real implementation would use color libraries
   */
  public validateContrast(): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Simplified contrast validation
    // In real implementation, use proper color contrast calculation
    if (this.primary === this.secondary) {
      violations.push("Primary and secondary text colors should be different");
    }

    if (this.inverse === "#ffffff" && this.primary === "#1f2937") {
      // This is acceptable for dark on light theme
    } else if (this.inverse === "#000000" && this.primary === "#f9fafb") {
      // This would be acceptable for light on dark theme
    } else {
      violations.push("Inverse and primary colors may not provide sufficient contrast");
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * Creates a new TextColor with updated properties
   * Maintains immutability
   */
  public with(updates: Partial<{
    primary: string;
    secondary: string;
    muted: string;
    inverse: string;
    disabled: string;
  }>): TextColor {
    return TextColor.create({
      primary: updates.primary ?? this.primary,
      secondary: updates.secondary ?? this.secondary,
      muted: updates.muted ?? this.muted,
      inverse: updates.inverse ?? this.inverse,
      disabled: updates.disabled ?? this.disabled
    });
  }

  /**
   * Checks equality with another TextColor
   */
  public equals(other: TextColor): boolean {
    return (
      this.primary === other.primary &&
      this.secondary === other.secondary &&
      this.muted === other.muted &&
      this.inverse === other.inverse &&
      this.disabled === other.disabled
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      primary: this.primary,
      secondary: this.secondary,
      muted: this.muted,
      inverse: this.inverse,
      disabled: this.disabled
    };
  }
}