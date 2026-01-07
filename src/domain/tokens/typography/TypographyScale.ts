// src/domain/tokens/typography/TypographyScale.ts
/**
 * TypographyScale Value Object
 * Represents a complete typography scale with semantic mappings
 * Follows DDD principles with validation and business rules
 */
export class TypographyScale {
  public readonly fontSize: Record<string, string>;
  public readonly fontWeight: Record<string, string>;
  public readonly lineHeight: Record<string, string>;

  private constructor(props: {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  }) {
    this.fontSize = Object.freeze({ ...props.fontSize });
    this.fontWeight = Object.freeze({ ...props.fontWeight });
    this.lineHeight = Object.freeze({ ...props.lineHeight });
  }

  /**
   * Creates a TypographyScale from raw typography values
   */
  public static create(props: {
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  }): TypographyScale {
    // Validate fontSize format (rem units)
    const validateFontSize = (size: string, name: string) => {
      if (!/^\d+(\.\d+)?rem$/.test(size)) {
        throw new Error(`Invalid font size format for ${name}: ${size}. Must be in rem units (e.g., "1rem", "0.875rem")`);
      }
    };

    // Validate fontWeight format (numeric strings)
    const validateFontWeight = (weight: string, name: string) => {
      const numWeight = parseInt(weight);
      if (isNaN(numWeight) || numWeight < 100 || numWeight > 900) {
        throw new Error(`Invalid font weight for ${name}: ${weight}. Must be between 100-900`);
      }
    };

    // Validate lineHeight format (unitless numbers or rem)
    const validateLineHeight = (height: string, name: string) => {
      if (!/^(\d+(\.\d+)?)(rem)?$/.test(height)) {
        throw new Error(`Invalid line height format for ${name}: ${height}. Must be unitless number or rem unit`);
      }
    };

    // Validate all font sizes
    Object.entries(props.fontSize).forEach(([key, value]) =>
      validateFontSize(value, `fontSize.${key}`)
    );

    // Validate all font weights
    Object.entries(props.fontWeight).forEach(([key, value]) =>
      validateFontWeight(value, `fontWeight.${key}`)
    );

    // Validate all line heights
    Object.entries(props.lineHeight).forEach(([key, value]) =>
      validateLineHeight(value, `lineHeight.${key}`)
    );

    return new TypographyScale(props);
  }

  /**
   * Creates the default font size scale
   */
  public static createDefaultFontSize(): Record<string, string> {
    return {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem"
    };
  }

  /**
   * Creates the default font weight scale
   */
  public static createDefaultFontWeight(): Record<string, string> {
    return {
      thin: "100",
      light: "300",
      normal: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
      extrabold: "800",
      black: "900"
    };
  }

  /**
   * Creates the default line height scale
   */
  public static createDefaultLineHeight(): Record<string, string> {
    return {
      none: "1",
      tight: "1.25",
      snug: "1.375",
      normal: "1.5",
      relaxed: "1.625",
      loose: "2"
    };
  }

  /**
   * Creates the default complete typography scale
   */
  public static createDefault(): TypographyScale {
    return TypographyScale.create({
      fontSize: TypographyScale.createDefaultFontSize(),
      fontWeight: TypographyScale.createDefaultFontWeight(),
      lineHeight: TypographyScale.createDefaultLineHeight()
    });
  }

  /**
   * Gets a font size by key
   */
  public getFontSize(key: string): string {
    const size = this.fontSize[key];
    if (!size) {
      throw new Error(`Font size key '${key}' not found`);
    }
    return size;
  }

  /**
   * Gets a font weight by key
   */
  public getFontWeight(key: string): string {
    const weight = this.fontWeight[key];
    if (!weight) {
      throw new Error(`Font weight key '${key}' not found`);
    }
    return weight;
  }

  /**
   * Gets a line height by key
   */
  public getLineHeight(key: string): string {
    const height = this.lineHeight[key];
    if (!height) {
      throw new Error(`Line height key '${key}' not found`);
    }
    return height;
  }

  /**
   * Business rule: Gets appropriate typography for text hierarchy
   */
  public getTypographyForHierarchy(level: "body" | "heading1" | "heading2" | "heading3" | "caption"): {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  } {
    const hierarchyMap = {
      body: { size: "base", weight: "normal", height: "normal" },
      heading1: { size: "4xl", weight: "bold", height: "tight" },
      heading2: { size: "3xl", weight: "semibold", height: "tight" },
      heading3: { size: "2xl", weight: "semibold", height: "snug" },
      caption: { size: "sm", weight: "normal", height: "normal" }
    };

    const config = hierarchyMap[level];
    return {
      fontSize: this.getFontSize(config.size),
      fontWeight: this.getFontWeight(config.weight),
      lineHeight: this.getLineHeight(config.height)
    };
  }

  /**
   * Business rule: Gets appropriate typography for interactive elements
   */
  public getTypographyForInteractive(type: "button" | "link" | "input"): {
    fontSize: string;
    fontWeight: string;
    lineHeight: string;
  } {
    const interactiveMap = {
      button: { size: "base", weight: "medium", height: "none" },
      link: { size: "base", weight: "normal", height: "normal" },
      input: { size: "base", weight: "normal", height: "normal" }
    };

    const config = interactiveMap[type];
    return {
      fontSize: this.getFontSize(config.size),
      fontWeight: this.getFontWeight(config.weight),
      lineHeight: this.getLineHeight(config.height)
    };
  }

  /**
   * Business rule: Validates typography scale accessibility
   */
  public validateAccessibility(): { isAccessible: boolean; violations: string[] } {
    const violations: string[] = [];

    // Check minimum font sizes for readability
    const minFontSize = Math.min(
      ...Object.values(this.fontSize).map(size => parseFloat(size.replace('rem', '')))
    );

    if (minFontSize < 0.75) {
      violations.push("Minimum font size should be at least 0.75rem (12px) for accessibility");
    }

    // Check font weight range
    const weights = Object.values(this.fontWeight).map(w => parseInt(w));
    const minWeight = Math.min(...weights);
    const maxWeight = Math.max(...weights);

    if (minWeight < 100 || maxWeight > 900) {
      violations.push("Font weights should be between 100-900");
    }

    // Check line height ratios
    const heights = Object.values(this.lineHeight).map(h => parseFloat(h));
    const minHeight = Math.min(...heights);
    const maxHeight = Math.max(...heights);

    if (minHeight < 1) {
      violations.push("Minimum line height should be at least 1 for readability");
    }

    if (maxHeight > 3) {
      violations.push("Maximum line height should not exceed 3 for reasonable layouts");
    }

    return {
      isAccessible: violations.length === 0,
      violations
    };
  }

  /**
   * Creates a new TypographyScale with updated properties
   * Maintains immutability
   */
  public with(updates: Partial<{
    fontSize: Record<string, string>;
    fontWeight: Record<string, string>;
    lineHeight: Record<string, string>;
  }>): TypographyScale {
    return TypographyScale.create({
      fontSize: updates.fontSize ?? this.fontSize,
      fontWeight: updates.fontWeight ?? this.fontWeight,
      lineHeight: updates.lineHeight ?? this.lineHeight
    });
  }

  /**
   * Checks equality with another TypographyScale
   */
  public equals(other: TypographyScale): boolean {
    return (
      JSON.stringify(this.fontSize) === JSON.stringify(other.fontSize) &&
      JSON.stringify(this.fontWeight) === JSON.stringify(other.fontWeight) &&
      JSON.stringify(this.lineHeight) === JSON.stringify(other.lineHeight)
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      fontSize: { ...this.fontSize },
      fontWeight: { ...this.fontWeight },
      lineHeight: { ...this.lineHeight }
    };
  }
}