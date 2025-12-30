"use strict";
// src/resolver/resolve-theme.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveTheme = resolveTheme;
const resolve_ref_1 = require("./resolve-ref");
const resolve_math_1 = require("./resolve-math");
const resolve_responsive_1 = require("./resolve-responsive");
function resolveTheme(theme, options = {}) {
    const mode = options.mode ?? "static";
    const lookup = (path) => {
        const parts = path.split(".");
        let current = theme.tokens;
        for (const key of parts) {
            if (current == null)
                return undefined;
            current = current[key];
        }
        return current;
    };
    const resolveValue = (value) => {
        if (Array.isArray(value)) {
            return value.map(resolveValue);
        }
        if (typeof value === "object" && value !== null) {
            if ("ref" in value) {
                const resolved = (0, resolve_ref_1.resolveRef)(value, lookup);
                const withMath = (0, resolve_math_1.resolveMath)(value, resolved);
                return (0, resolve_responsive_1.resolveResponsive)(withMath, mode);
            }
            const out = {};
            for (const key in value) {
                out[key] = resolveValue(value[key]);
            }
            return out;
        }
        return value;
    };
    return {
        ...theme,
        tokens: resolveValue(theme.tokens)
    };
}
//# sourceMappingURL=resolve-theme.js.map