# @damarkuncoro/agnostic-ui-theme-core

Theme core for Agnostic UI. This package provides **design token definitions and aggregation** - pure data structures that define visual design values. It contains **no UI logic, rendering, or framework-specific code**.

## Features

- ✅ **Design Token Aggregation**: Pure data structures defining visual design values
- ✅ **Contract-Driven**: Strictly implements contract-core theme interfaces
- ✅ **Default Theme**: Production-ready default theme with comprehensive token values
- ✅ **Type Safety**: Full TypeScript coverage with semantic validation
- ✅ **Version Validation**: Ensures theme compatibility using contract-core version arrays
- ✅ **Token Resolution Ready**: Themes ready for use with resolver utilities

## What This Package Is NOT

- ❌ **Not a UI library**: Contains no rendering, components, or DOM manipulation
- ❌ **Not CSS/Tailwind aware**: No styling frameworks or CSS generation
- ❌ **Not framework-specific**: No React, Vue, or other framework code
- ❌ **Not component logic**: No state management or interaction handling

This package defines **design data only** - the "what" of visual design, not the "how" of implementation.

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-theme-core
```

## Usage

Import theme types, default theme, and validation utilities:

```typescript
import {
  themeCore,
  validateTheme,
  UiTheme
} from '@damarkuncoro/agnostic-ui-theme-core';

// Use the default theme
const theme = themeCore;

// Validate a custom theme
validateTheme(customTheme);

// Type-safe theme creation
const customTheme: UiTheme = {
  version: "2.1",
  tokens: {
    // ... token definitions
  }
};
```

## Architecture

```
contract-core (semantic contracts)
   ↓ implements
theme-core (concrete theme values)
   ↓ consumed by
resolvers, skins, providers
```

## API

### Themes

- `themeCore`: Default theme implementation with comprehensive token values
- `UiTheme`: TypeScript interface extending contract-core theme definitions

### Validation

- `validateTheme(theme: UiTheme)`: Validates theme structure, version compatibility, and required tokens

### Token Structure

The default theme provides concrete values for all contract-core token categories:

- **Color**: Palette, text, background, and border color tokens
- **Spacing**: Scale and semantic spacing values
- **Typography**: Font sizes, weights, and line heights
- **Radius**: Border radius scales and semantic values
- **Shadow**: Elevation and depth styling
- **Z-Index**: Layering and stacking contexts

## Dependencies

- `@damarkuncoro/agnostic-ui-contract-core`: Theme contracts and semantic arrays

## Design Principles

- ✅ **Contract First**: All themes must conform to contract-core interfaces
- ✅ **Version Aware**: Uses contract-core version arrays for compatibility checking
- ✅ **Token Complete**: Provides values for all required contract tokens
- ✅ **Framework Agnostic**: Theme data works with any rendering framework
- ✅ **Validation Built-in**: Automatic structure and compatibility validation

## Who Should Use This Package

- Theme authors and designers
- Design system maintainers
- Application developers creating custom themes
- Framework adapter maintainers

## License

MIT