"use strict";
// src/resolver/resolve-math.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolveMath = resolveMath;
function resolveMath(value, resolved) {
    if (typeof value === "object" &&
        value !== null &&
        "ref" in value) {
        let result = resolved;
        if ("multiply" in value && typeof value.multiply === "number") {
            result *= value.multiply;
        }
        if ("add" in value && typeof value.add === "number") {
            result += value.add;
        }
        return result;
    }
    return resolved;
}
//# sourceMappingURL=resolve-math.js.map