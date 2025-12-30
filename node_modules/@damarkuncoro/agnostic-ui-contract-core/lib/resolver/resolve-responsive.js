"use strict";
// src/resolver/resolve-responsive.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveResponsive = resolveResponsive;
function resolveResponsive(value, mode) {
    if (mode === "static") {
        return value;
    }
    // future extension:
    // if (typeof value === "object" && "$responsive" in value)
    return value;
}
//# sourceMappingURL=resolve-responsive.js.map