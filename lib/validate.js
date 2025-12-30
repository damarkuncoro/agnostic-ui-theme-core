"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTheme = validateTheme;
function validateTheme(theme) {
    if (theme.version !== "2.1") {
        throw new Error(`[theme-core] Unsupported theme version: ${theme.version}`);
    }
    if (!theme.tokens.color)
        throw new Error("[theme-core] Missing core color tokens");
    if (!theme.tokens.spacing)
        throw new Error("[theme-core] Missing core spacing tokens");
    // bisa tambah validator lainnya jika perlu
}
//# sourceMappingURL=validate.js.map