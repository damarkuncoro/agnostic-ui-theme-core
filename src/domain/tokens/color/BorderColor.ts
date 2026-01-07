// src/domain/tokens/color/BorderColor.ts
/**
 * BorderColor Value Object
 * Represents semantic border color mappings
 * Follows DDD principles with validation and business rules
 */
export class BorderColor {
  public readonly default: string;
  public readonly subtle: string;
  public readonly strong: string;
  public readonly focus: string;

  private constructor(props: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  }) {
    this.default = props.default;
    this.subtle = props.subtle;
    this.strong = props.strong;
    this.focus = props.focus;
  }

  /**
   * Creates a BorderColor from raw color values
   */
  public static create(props: {
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  }): BorderColor {
    // Validate all colors are valid hex colors
    const validateColor = (color: string, name: string) => {
      if (!/^#[0-9a-fA-F]{6}$/.test(color)) {
        throw new Error(`Invalid border color format for ${name}: ${color}. Must be hex format #RRGGBB`);
      }
    };

    Object.entries(props).forEach(([key, value]) =>
      validateColor(value, `border.${key}`)
    );

    return new BorderColor(props);
  }

  /**
   * Creates default border colors
   */
  public static createDefault(): BorderColor {
    return BorderColor.create({
      default: "#e5e7eb",   // neutral-200
      subtle: "#f3f4f6",    // neutral-100
      strong: "#d1d5db",    // neutral-300
      focus: "#3b82f6"      // blue-500
    });
  }

  /**
   * Business rule: Gets appropriate border color for emphasis level
   */
  public getColorForEmphasis(emphasis: "subtle" | "default" | "strong"): string {
    switch (emphasis) {
      case "subtle":
        return this.subtle;
      case "strong":
        return this.strong;
      case "default":
      default:
        return this.default;
    }
  }

  /**
   * Business rule: Gets appropriate border color for interactive states
   */
  public getColorForState(state: "normal" | "focus" | "error" | "success"): string {
    switch (state) {
      case "focus":
        return this.focus;
      case "error":
        return "#ef4444"; // red-500 (could be made configurable)
      case "success":
        return "#10b981"; // emerald-500 (could be made configurable)
      case "normal":
      default:
        return this.default;
    }
  }

  /**
   * Business rule: Validates border color hierarchy
   */
  public validateHierarchy(): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Subtle should be lighter than default
    // Default should be lighter than strong
    // Focus should be distinctly different for accessibility

    if (this.subtle === this.default) {
      violations.push("Subtle and default border colors should be different");
    }

    if (this.default === this.strong) {
      violations.push("Default and strong border colors should be different");
    }

    if (this.focus === this.default) {
      violations.push("Focus border color should be different from default for accessibility");
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * Business rule: Checks if focus color meets accessibility contrast requirements
   * Note: This is a simplified check - real implementation would use proper contrast calculation
   */
  public validateFocusAccessibility(): { isAccessible: boolean; issues: string[] } {
    const issues: string[] = [];

    // Focus color should be a blue/violet tone for consistency
    if (!this.focus.match(/^#(3[0-9a-f]|4[0-9a-f]|5[0-9a-f]|6[0-9a-f]|7[0-9a-f]|8[0-9a-f]|9[0-9a-f]|a[0-9a-f]|b[0-9a-f])[0-9a-f]{5}$/i)) {
      issues.push("Focus color should typically be in blue/violet range for accessibility");
    }

    return {
      isAccessible: issues.length === 0,
      issues
    };
  }

  /**
   * Creates a new BorderColor with updated properties
   * Maintains immutability
   */
  public with(updates: Partial<{
    default: string;
    subtle: string;
    strong: string;
    focus: string;
  }>): BorderColor {
    return BorderColor.create({
      default: updates.default ?? this.default,
      subtle: updates.subtle ?? this.subtle,
      strong: updates.strong ?? this.strong,
      focus: updates.focus ?? this.focus
    });
  }

  /**
   * Checks equality with another BorderColor
   */
  public equals(other: BorderColor): boolean {
    return (
      this.default === other.default &&
      this.subtle === other.subtle &&
      this.strong === other.strong &&
      this.focus === other.focus
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      default: this.default,
      subtle: this.subtle,
      strong: this.strong,
      focus: this.focus
    };
  }
}