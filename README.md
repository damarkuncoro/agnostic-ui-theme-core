# @damarkuncoro/agnostic-ui-theme-core

Theme core for Agnostic UI - provides type definitions, default themes, and validation for UI theme objects.

## Installation

```bash
npm install @damarkuncoro/agnostic-ui-theme-core
```

## Usage

```typescript
import { themeCore, validateTheme, UiTheme } from '@damarkuncoro/agnostic-ui-theme-core';

// Use the default theme
const theme = themeCore;

// Validate a custom theme
validateTheme(customTheme);
```

## API

- `themeCore`: Default theme implementation
- `validateTheme(theme: UiTheme)`: Validates theme structure and version
- `UiTheme`: TypeScript interface for theme objects

## License

MIT