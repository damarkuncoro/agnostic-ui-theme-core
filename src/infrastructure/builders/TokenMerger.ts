/**
 * Token Merger
 * Handles token merging logic with proper precedence
 * Follows Single Responsibility Principle
 */
export class TokenMerger {
  /**
   * Merges token configurations with proper precedence
   */
  public mergeTokens<T extends Record<string, any>>(
    base: T,
    overrides: Partial<T>
  ): T {
    const result = { ...base } as any;

    for (const [key, value] of Object.entries(overrides)) {
      if (value && typeof value === "object" && !Array.isArray(value)) {
        // Deep merge for nested objects
        result[key] = this.mergeTokens(result[key] || {}, value);
      } else {
        // Direct replacement for primitives
        result[key] = value;
      }
    }

    return result;
  }

  /**
   * Merges multiple token sets with precedence (last wins)
   */
  public mergeMultipleTokens<T extends Record<string, any>>(...tokenSets: T[]): T {
    if (tokenSets.length === 0) {
      return {} as T;
    }

    if (tokenSets.length === 1) {
      return { ...tokenSets[0] };
    }

    let result = { ...tokenSets[0] };

    for (let i = 1; i < tokenSets.length; i++) {
      result = this.mergeTokens(result, tokenSets[i]);
    }

    return result;
  }
}