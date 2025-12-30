"use strict";
// src/resolver/resolve-ref.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveRef = resolveRef;
function resolveRef(value, lookup) {
    if (typeof value === "object" &&
        value !== null &&
        "ref" in value) {
        return lookup(value.ref);
    }
    return value;
}
//# sourceMappingURL=resolve-ref.js.map