// =================================================================
// Agnostic UI Theme Core - Domain-Driven Design Architecture
//
// This package provides enterprise-grade theme management with comprehensive
// token validation, accessibility compliance, and DDD principles.
// =================================================================

// Initialize bootstrap
import './bootstrap'

// =================================================================
// MODULAR EXPORTS - Clean Architecture Organization
// =================================================================

// Domain Layer - Core business entities and logic
export * from './exports/domain'

// Application Layer - Use cases and application services
export * from './exports/application'

// Infrastructure Layer - External services and utilities
export * from './exports/infrastructure'

// Legacy Compatibility - Backward compatibility layer
export * from './exports/legacy'

// Utility Functions - High-level convenience functions
export * from './exports/utilities'

// Dependency Injection - Service access functions
export {
  getThemeBuilderService,
  getThemeValidatorService,
  getTokenBuilder,
  resetThemeServices
} from './bootstrap'
