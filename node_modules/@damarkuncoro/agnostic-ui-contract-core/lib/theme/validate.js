"use strict";
// src/theme/validate.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTheme = validateTheme;
function validateTheme(theme) {
    if (theme.version !== "2.1") {
        throw new Error(`[agnostic-ui] Unsupported theme version: ${theme.version}`);
    }
    if (!theme.tokens?.color) {
        throw new Error("[agnostic-ui] Theme missing core color tokens");
    }
    if (!theme.tokens?.spacing) {
        throw new Error("[agnostic-ui] Theme missing core spacing tokens");
    }
    // Tambahkan validasi ringan saja
}
//# sourceMappingURL=validate.js.map