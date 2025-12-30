"use strict";
// src/utils/invariant.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.invariant = invariant;
function invariant(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
//# sourceMappingURL=invariant.js.map