// src/application/use-cases/MergeThemesUseCase.ts

import { Theme } from '../../domain/theme/entities/Theme';
import { ThemeComposition } from '../../domain/theme/entities/ThemeComposition';
import { ThemeValidatorService } from '../services/ThemeValidatorService';

/**
 * Use Case: Merge Themes
 * Orchestrates the merging of multiple themes with validation and conflict resolution
 */
export class MergeThemesUseCase {
  constructor(
    private validator: ThemeValidatorService
  ) {}

  /**
   * Merges multiple themes into a single composed theme
   */
  public async execute(request: MergeThemesRequest): Promise<MergeThemesResponse> {
    try {
      // Validate all input themes
      const validationResults = await Promise.all(
        request.themes.map(theme => this.validator.validateTheme(theme))
      );

      const invalidThemes = validationResults.filter(result => !result.isValid);
      if (invalidThemes.length > 0) {
        return {
          success: false,
          error: 'INVALID_THEMES',
          message: `Some themes failed validation: ${invalidThemes.map(r => r.errors.join(', ')).join('; ')}`,
          mergedTheme: null
        };
      }

      // Check for version compatibility
      const versions = request.themes.map(t => t.version);
      const hasVersionConflicts = new Set(versions).size > 1;

      if (hasVersionConflicts && !request.forceMerge) {
        return {
          success: false,
          error: 'VERSION_CONFLICT',
          message: `Theme version conflict detected: ${versions.join(', ')}. Use forceMerge to override.`,
          mergedTheme: null
        };
      }

      // Create composed theme
      const mergedTheme = ThemeComposition.compose(request.themes, request.extensions);

      // Validate the merged result
      const finalValidation = await this.validator.validateTheme(mergedTheme.getTheme());
      if (!finalValidation.isValid) {
        return {
          success: false,
          error: 'MERGE_VALIDATION_FAILED',
          message: `Merged theme validation failed: ${finalValidation.errors.join(', ')}`,
          mergedTheme: null
        };
      }

      return {
        success: true,
        mergedTheme,
        metadata: {
          sourceThemes: request.themes.length,
          appliedExtensions: request.extensions?.length || 0,
          version: mergedTheme.getTheme().version,
          warnings: finalValidation.warnings
        }
      };

    } catch (error) {
      return {
        success: false,
        error: 'MERGE_FAILED',
        message: `Theme merge failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        mergedTheme: null
      };
    }
  }

  /**
   * Previews what a theme merge would look like without actually creating it
   */
  public async preview(request: MergeThemesRequest): Promise<MergePreviewResponse> {
    try {
      const result = await this.execute(request);

      if (!result.success || !result.mergedTheme) {
        return {
          success: false,
          error: result.error,
          message: result.message,
          preview: null
        };
      }

      // Generate preview data
      const preview = {
        version: result.mergedTheme.getTheme().version,
        colorTokens: this.extractColorPreview(result.mergedTheme.getTheme()),
        spacingTokens: this.extractSpacingPreview(result.mergedTheme.getTheme()),
        typographyTokens: this.extractTypographyPreview(result.mergedTheme.getTheme()),
        conflicts: this.detectConflicts(request.themes),
        recommendations: this.generateRecommendations(request.themes, result.mergedTheme.getTheme())
      };

      return {
        success: true,
        preview
      };

    } catch (error) {
      return {
        success: false,
        error: 'PREVIEW_FAILED',
        message: `Preview generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        preview: null
      };
    }
  }

  private extractColorPreview(theme: Theme): any {
    return {
      palette: theme.color.palette.toObject(),
      text: theme.color.text.toObject(),
      background: theme.color.background.toObject(),
      border: theme.color.border.toObject()
    };
  }

  private extractSpacingPreview(theme: Theme): any {
    return {
      scale: theme.spacing.scale,
      semantic: theme.spacing.semantic
    };
  }

  private extractTypographyPreview(theme: Theme): any {
    return {
      fontSize: theme.typography.fontSize,
      fontWeight: theme.typography.fontWeight,
      lineHeight: theme.typography.lineHeight
    };
  }

  private detectConflicts(themes: Theme[]): Array<{
    type: string;
    property: string;
    conflictingValues: any[];
    resolution: string;
  }> {
    const conflicts: Array<{
      type: string;
      property: string;
      conflictingValues: any[];
      resolution: string;
    }> = [];

    // Check for color conflicts
    const colorConflicts = this.detectColorConflicts(themes);
    conflicts.push(...colorConflicts);

    // Check for spacing conflicts
    const spacingConflicts = this.detectSpacingConflicts(themes);
    conflicts.push(...spacingConflicts);

    return conflicts;
  }

  private detectColorConflicts(themes: Theme[]): Array<{
    type: string;
    property: string;
    conflictingValues: any[];
    resolution: string;
  }> {
    const conflicts: Array<{
      type: string;
      property: string;
      conflictingValues: any[];
      resolution: string;
    }> = [];

    // Check palette conflicts
    const paletteKeys = new Set<string>();
    themes.forEach(theme => {
      Object.keys(theme.color.palette.toObject()).forEach(key => paletteKeys.add(key));
    });

    for (const key of paletteKeys) {
      const values = themes
        .map(theme => theme.color.palette.toObject()[key as keyof ReturnType<typeof theme.color.palette.toObject>])
        .filter(Boolean);

      if (values.length > 1) {
        conflicts.push({
          type: 'color',
          property: `palette.${key}`,
          conflictingValues: values,
          resolution: 'Last theme wins'
        });
      }
    }

    return conflicts;
  }

  private detectSpacingConflicts(themes: Theme[]): Array<{
    type: string;
    property: string;
    conflictingValues: any[];
    resolution: string;
  }> {
    const conflicts: Array<{
      type: string;
      property: string;
      conflictingValues: any[];
      resolution: string;
    }> = [];

    // Check spacing scale conflicts
    const scaleKeys = new Set<string>();
    themes.forEach(theme => {
      Object.keys(theme.spacing.scale).forEach(key => scaleKeys.add(key));
    });

    for (const key of scaleKeys) {
      const values = themes
        .map(theme => theme.spacing.scale[key])
        .filter(Boolean);

      if (values.length > 1) {
        conflicts.push({
          type: 'spacing',
          property: `scale.${key}`,
          conflictingValues: values,
          resolution: 'Last theme wins'
        });
      }
    }

    return conflicts;
  }

  private generateRecommendations(themes: Theme[], mergedTheme: Theme): string[] {
    const recommendations: string[] = [];

    // Check for accessibility concerns
    const accessibilityCheck = this.validator.validateTheme(mergedTheme);
    if (accessibilityCheck.warnings.length > 0) {
      recommendations.push('Review accessibility warnings in merged theme');
    }

    // Check for version compatibility
    const versions = themes.map(t => t.version);
    if (new Set(versions).size > 1) {
      recommendations.push('Consider updating theme versions for consistency');
    }

    // Check for extensive overrides
    if (themes.length > 3) {
      recommendations.push('Consider simplifying theme composition - many themes may impact performance');
    }

    return recommendations;
  }
}

/**
 * Request interface for merging themes
 */
export interface MergeThemesRequest {
  themes: Theme[];
  extensions?: import('../../domain/theme/entities/ThemeComposition').ThemeExtension[];
  forceMerge?: boolean;
  validateResult?: boolean;
}

/**
 * Response interface for theme merge operation
 */
export interface MergeThemesResponse {
  success: boolean;
  mergedTheme: ThemeComposition | null;
  error?: string;
  message?: string;
  metadata?: {
    sourceThemes: number;
    appliedExtensions: number;
    version: string;
    warnings: string[];
  };
}

/**
 * Response interface for merge preview
 */
export interface MergePreviewResponse {
  success: boolean;
  preview: ThemeMergePreview | null;
  error?: string;
  message?: string;
}

/**
 * Preview data for theme merge
 */
export interface ThemeMergePreview {
  version: string;
  colorTokens: any;
  spacingTokens: any;
  typographyTokens: any;
  conflicts: Array<{
    type: string;
    property: string;
    conflictingValues: any[];
    resolution: string;
  }>;
  recommendations: string[];
}