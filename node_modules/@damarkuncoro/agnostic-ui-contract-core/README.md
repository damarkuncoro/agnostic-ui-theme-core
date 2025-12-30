# @damarkuncoro/agnostic-ui-contract-core

Core contracts and types for Agnostic UI components. This package provides TypeScript interfaces and utility functions for building design system components that work across different UI frameworks.

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-contract-core
```

## Usage

Import types and interfaces for your UI components:

```typescript
import {
  UiTheme,
  UiTokenScale,
  UiExtendedTokens,
  resolveTheme
} from '@damarkuncoro/agnostic-ui-contract-core';

// Use in your component definitions
interface MyButtonProps {
  theme: UiTheme;
  tokens: UiExtendedTokens;
}
```

## API

### Types

- `UiTheme`: Complete theme configuration
- `UiTokenScale<T>`: Generic token scale type
- `UiExtendedTokens`: Extended token collection

### Utilities

- `resolveTheme()`: Resolve theme with token references
- `resolveMath()`: Resolve mathematical expressions in tokens
- `resolveRef()`: Resolve token references

## License

MIT