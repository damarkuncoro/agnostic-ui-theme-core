// src/domain/tokens/spacing/SpacingScale.ts
/**
 * SpacingScale Value Object
 * Represents a complete spacing scale with semantic mappings
 * Follows DDD principles with validation and business rules
 */
export class SpacingScale {
  public readonly scale: Record<string, string>;
  public readonly semantic: Record<string, string>;

  private constructor(props: {
    scale: Record<string, string>;
    semantic: Record<string, string>;
  }) {
    this.scale = Object.freeze({ ...props.scale });
    this.semantic = Object.freeze({ ...props.semantic });
  }

  /**
   * Creates a SpacingScale from raw spacing values
   */
  public static create(props: {
    scale: Record<string, string>;
    semantic: Record<string, string>;
  }): SpacingScale {
    // Validate spacing format (rem units)
    const validateSpacing = (spacing: string, name: string) => {
      if (!/^\d+(\.\d+)?rem$/.test(spacing)) {
        throw new Error(`Invalid spacing format for ${name}: ${spacing}. Must be in rem units (e.g., "1rem", "0.5rem")`);
      }
    };

    // Validate all scale values
    Object.entries(props.scale).forEach(([key, value]) =>
      validateSpacing(value, `scale.${key}`)
    );

    // Validate all semantic values
    Object.entries(props.semantic).forEach(([key, value]) =>
      validateSpacing(value, `semantic.${key}`)
    );

    return new SpacingScale(props);
  }

  /**
   * Creates the default spacing scale
   */
  public static createDefaultScale(): Record<string, string> {
    return {
      0: "0rem",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
      24: "6rem",
      32: "8rem"
    };
  }

  /**
   * Creates the default semantic spacing
   */
  public static createDefaultSemantic(): Record<string, string> {
    return {
      xs: "0.5rem",
      sm: "0.75rem",
      md: "1rem",
      lg: "1.5rem",
      xl: "2rem"
    };
  }

  /**
   * Creates the default complete spacing scale
   */
  public static createDefault(): SpacingScale {
    return SpacingScale.create({
      scale: SpacingScale.createDefaultScale(),
      semantic: SpacingScale.createDefaultSemantic()
    });
  }

  /**
   * Gets a spacing value by scale key
   */
  public getScale(key: string): string {
    const spacing = this.scale[key];
    if (!spacing) {
      throw new Error(`Spacing scale key '${key}' not found`);
    }
    return spacing;
  }

  /**
   * Gets a semantic spacing value
   */
  public getSemantic(key: string): string {
    const spacing = this.semantic[key];
    if (!spacing) {
      throw new Error(`Semantic spacing key '${key}' not found`);
    }
    return spacing;
  }

  /**
   * Business rule: Gets appropriate spacing for component size
   */
  public getSpacingForSize(size: "xs" | "sm" | "md" | "lg" | "xl"): string {
    const sizeMap = {
      xs: "xs",
      sm: "sm",
      md: "md",
      lg: "lg",
      xl: "xl"
    };
    return this.getSemantic(sizeMap[size]);
  }

  /**
   * Business rule: Gets appropriate spacing for layout context
   */
  public getSpacingForContext(context: "padding" | "margin" | "gap"): string {
    const contextMap = {
      padding: "sm",
      margin: "md",
      gap: "md"
    };
    return this.getSemantic(contextMap[context]);
  }

  /**
   * Business rule: Validates spacing scale progression
   */
  public validateProgression(): { isValid: boolean; violations: string[] } {
    const violations: string[] = [];

    // Convert rem to numbers for comparison
    const scaleValues = Object.entries(this.scale)
      .map(([key, value]) => ({ key, value: parseFloat(value.replace('rem', '')) }))
      .sort((a, b) => a.value - b.value);

    // Check that scale values are monotonically increasing
    for (let i = 1; i < scaleValues.length; i++) {
      if (scaleValues[i].value <= scaleValues[i - 1].value) {
        violations.push(`Spacing scale not monotonically increasing at ${scaleValues[i].key}`);
      }
    }

    // Check semantic values are reasonable
    const semanticValues = Object.values(this.semantic).map(v => parseFloat(v.replace('rem', '')));
    const minSemantic = Math.min(...semanticValues);
    const maxSemantic = Math.max(...semanticValues);

    if (minSemantic < 0.25) {
      violations.push("Minimum semantic spacing should be at least 0.25rem for touch targets");
    }

    if (maxSemantic > 4) {
      violations.push("Maximum semantic spacing should not exceed 4rem for reasonable layouts");
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * Creates a new SpacingScale with updated properties
   * Maintains immutability
   */
  public with(updates: Partial<{
    scale: Record<string, string>;
    semantic: Record<string, string>;
  }>): SpacingScale {
    return SpacingScale.create({
      scale: updates.scale ?? this.scale,
      semantic: updates.semantic ?? this.semantic
    });
  }

  /**
   * Checks equality with another SpacingScale
   */
  public equals(other: SpacingScale): boolean {
    return (
      JSON.stringify(this.scale) === JSON.stringify(other.scale) &&
      JSON.stringify(this.semantic) === JSON.stringify(other.semantic)
    );
  }

  /**
   * Converts to plain object for serialization
   */
  public toObject() {
    return {
      scale: { ...this.scale },
      semantic: { ...this.semantic }
    };
  }
}