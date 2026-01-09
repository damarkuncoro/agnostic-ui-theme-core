// src/infrastructure/services/ThemePerformanceService.ts

import { Theme } from '../../domain/theme/entities/Theme';

/**
 * Theme Performance Metrics
 */
export interface ThemePerformanceMetrics {
  themeId: string;
  loadTime: number;
  renderTime: number;
  cacheHits: number;
  cacheMisses: number;
  memoryUsage: number;
  tokenCount: number;
  lastAccessed: Date;
  accessCount: number;
}

/**
 * Theme Performance Service
 * Monitors and optimizes theme performance with caching and analytics
 */
export class ThemePerformanceService {
  private static instance: ThemePerformanceService;
  private metrics = new Map<string, ThemePerformanceMetrics>();
  private themeCache = new Map<string, { theme: Theme; timestamp: number; accessCount: number }>();
  private readonly maxCacheSize = 50;
  private readonly cacheTTL = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  /**
   * Gets singleton instance
   */
  public static getInstance(): ThemePerformanceService {
    if (!ThemePerformanceService.instance) {
      ThemePerformanceService.instance = new ThemePerformanceService();
    }
    return ThemePerformanceService.instance;
  }

  /**
   * Registers a theme for performance monitoring
   */
  public registerTheme(theme: Theme, themeId?: string): string {
    const id = themeId || this.generateThemeId(theme);
    const startTime = performance.now();

    // Calculate token count
    const tokenCount = this.calculateTokenCount(theme);

    // Estimate memory usage
    const memoryUsage = this.estimateMemoryUsage(theme);

    const metrics: ThemePerformanceMetrics = {
      themeId: id,
      loadTime: performance.now() - startTime,
      renderTime: 0,
      cacheHits: 0,
      cacheMisses: 0,
      memoryUsage,
      tokenCount,
      lastAccessed: new Date(),
      accessCount: 0
    };

    this.metrics.set(id, metrics);

    // Cache the theme
    this.cacheTheme(id, theme);

    return id;
  }

  /**
   * Records theme render performance
   */
  public recordRender(themeId: string, renderTime: number): void {
    const metrics = this.metrics.get(themeId);
    if (metrics) {
      metrics.renderTime = renderTime;
      metrics.lastAccessed = new Date();
      metrics.accessCount++;
    }
  }

  /**
   * Gets a cached theme with performance tracking
   */
  public getCachedTheme(themeId: string): Theme | null {
    const cached = this.themeCache.get(themeId);
    const metrics = this.metrics.get(themeId);

    if (!cached) {
      if (metrics) metrics.cacheMisses++;
      return null;
    }

    // Check if cache is expired
    if (Date.now() - cached.timestamp > this.cacheTTL) {
      this.themeCache.delete(themeId);
      if (metrics) metrics.cacheMisses++;
      return null;
    }

    // Update cache access
    cached.accessCount++;
    cached.timestamp = Date.now();

    if (metrics) {
      metrics.cacheHits++;
      metrics.lastAccessed = new Date();
      metrics.accessCount++;
    }

    return cached.theme;
  }

  /**
   * Gets performance metrics for a theme
   */
  public getPerformanceMetrics(themeId: string): ThemePerformanceMetrics | null {
    return this.metrics.get(themeId) || null;
  }

  /**
   * Gets performance summary for all themes
   */
  public getPerformanceSummary(): {
    totalThemes: number;
    averageLoadTime: number;
    averageRenderTime: number;
    totalCacheHits: number;
    totalCacheMisses: number;
    cacheHitRate: number;
    totalMemoryUsage: number;
    topPerformingThemes: Array<{ id: string; metrics: ThemePerformanceMetrics }>;
    slowThemes: Array<{ id: string; metrics: ThemePerformanceMetrics }>;
  } {
    const allMetrics = Array.from(this.metrics.values());

    if (allMetrics.length === 0) {
      return {
        totalThemes: 0,
        averageLoadTime: 0,
        averageRenderTime: 0,
        totalCacheHits: 0,
        totalCacheMisses: 0,
        cacheHitRate: 0,
        totalMemoryUsage: 0,
        topPerformingThemes: [],
        slowThemes: []
      };
    }

    const totalLoadTime = allMetrics.reduce((sum, m) => sum + m.loadTime, 0);
    const totalRenderTime = allMetrics.reduce((sum, m) => sum + m.renderTime, 0);
    const totalCacheHits = allMetrics.reduce((sum, m) => sum + m.cacheHits, 0);
    const totalCacheMisses = allMetrics.reduce((sum, m) => sum + m.cacheMisses, 0);
    const totalMemory = allMetrics.reduce((sum, m) => sum + m.memoryUsage, 0);

    const totalCacheRequests = totalCacheHits + totalCacheMisses;
    const cacheHitRate = totalCacheRequests > 0 ? totalCacheHits / totalCacheRequests : 0;

    // Sort themes by performance
    const sortedByLoadTime = [...allMetrics].sort((a, b) => a.loadTime - b.loadTime);
    const sortedByRenderTime = [...allMetrics].sort((a, b) => a.renderTime - b.renderTime);

    return {
      totalThemes: allMetrics.length,
      averageLoadTime: totalLoadTime / allMetrics.length,
      averageRenderTime: totalRenderTime / allMetrics.length,
      totalCacheHits,
      totalCacheMisses,
      cacheHitRate,
      totalMemoryUsage: totalMemory,
      topPerformingThemes: sortedByLoadTime.slice(0, 5).map(m => ({ id: m.themeId, metrics: m })),
      slowThemes: sortedByRenderTime.slice(-5).map(m => ({ id: m.themeId, metrics: m }))
    };
  }

  /**
   * Optimizes theme performance by analyzing usage patterns
   */
  public optimizePerformance(): {
    recommendations: string[];
    cacheOptimizations: string[];
    memoryOptimizations: string[];
  } {
    const summary = this.getPerformanceSummary();
    const recommendations: string[] = [];
    const cacheOptimizations: string[] = [];
    const memoryOptimizations: string[] = [];

    // Cache optimizations
    if (summary.cacheHitRate < 0.8) {
      cacheOptimizations.push('Increase cache TTL or implement predictive caching');
    }

    if (summary.totalCacheMisses > summary.totalCacheHits * 2) {
      cacheOptimizations.push('Review cache invalidation strategy');
    }

    // Memory optimizations
    if (summary.totalMemoryUsage > 50 * 1024 * 1024) { // 50MB
      memoryOptimizations.push('Consider lazy loading theme tokens');
    }

    // Performance recommendations
    if (summary.averageLoadTime > 50) {
      recommendations.push('Optimize theme loading - consider code splitting');
    }

    if (summary.averageRenderTime > 16) {
      recommendations.push('Theme rendering is slow - review token complexity');
    }

    // Theme-specific optimizations
    summary.slowThemes.forEach(({ id, metrics }) => {
      if (metrics.loadTime > 100) {
        recommendations.push(`Theme ${id} has slow load time - consider optimization`);
      }
      if (metrics.renderTime > 32) {
        recommendations.push(`Theme ${id} has slow render time - review token usage`);
      }
    });

    return {
      recommendations,
      cacheOptimizations,
      memoryOptimizations
    };
  }

  /**
   * Clears performance data and cache
   */
  public clearPerformanceData(): void {
    this.metrics.clear();
    this.themeCache.clear();
  }

  /**
   * Exports performance data for analysis
   */
  public exportPerformanceData(): {
    metrics: ThemePerformanceMetrics[];
    summary: ReturnType<ThemePerformanceService['getPerformanceSummary']>;
    optimizations: ReturnType<ThemePerformanceService['optimizePerformance']>;
  } {
    return {
      metrics: Array.from(this.metrics.values()),
      summary: this.getPerformanceSummary(),
      optimizations: this.optimizePerformance()
    };
  }

  private generateThemeId(theme: Theme): string {
    // Create a hash-like identifier based on theme properties
    const themeString = JSON.stringify({
      version: theme.version,
      colorPalette: Object.keys(theme.color.palette.toObject()),
      spacingScale: Object.keys(theme.spacing.scale),
      typography: Object.keys(theme.typography.fontSize)
    });

    let hash = 0;
    for (let i = 0; i < themeString.length; i++) {
      const char = themeString.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }

    return `theme_${Math.abs(hash).toString(36)}`;
  }

  private calculateTokenCount(theme: Theme): number {
    let count = 0;

    // Count color tokens
    count += Object.keys(theme.color.palette.toObject()).length * 5; // Assume 5 shades per color
    count += Object.keys(theme.color.text.toObject()).length;
    count += Object.keys(theme.color.background.toObject()).length;
    count += Object.keys(theme.color.border.toObject()).length;

    // Count spacing tokens
    count += Object.keys(theme.spacing.scale).length;
    count += Object.keys(theme.spacing.semantic).length;

    // Count typography tokens
    count += Object.keys(theme.typography.fontSize).length;
    count += Object.keys(theme.typography.fontWeight).length;
    count += Object.keys(theme.typography.lineHeight).length;

    return count;
  }

  private estimateMemoryUsage(theme: Theme): number {
    // Rough estimation: each token ~100 bytes, plus object overhead
    const tokenCount = this.calculateTokenCount(theme);
    return tokenCount * 100 + 1000; // Add 1KB for object structure
  }

  private cacheTheme(themeId: string, theme: Theme): void {
    // Implement LRU-style cache eviction
    if (this.themeCache.size >= this.maxCacheSize) {
      // Remove least recently used
      let oldestKey: string | null = null;
      let oldestTime = Date.now();

      for (const [key, value] of this.themeCache) {
        if (value.timestamp < oldestTime) {
          oldestTime = value.timestamp;
          oldestKey = key;
        }
      }

      if (oldestKey) {
        this.themeCache.delete(oldestKey);
      }
    }

    this.themeCache.set(themeId, {
      theme,
      timestamp: Date.now(),
      accessCount: 0
    });
  }
}