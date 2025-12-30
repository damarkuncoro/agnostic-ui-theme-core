"use strict";
// src/utils/deep-merge.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.deepMerge = deepMerge;
const is_object_1 = require("./is-object");
function deepMerge(target, source) {
    const result = { ...target };
    for (const key in source) {
        const srcValue = source[key];
        const tgtValue = target[key];
        if ((0, is_object_1.isObject)(srcValue) && (0, is_object_1.isObject)(tgtValue)) {
            result[key] = deepMerge(tgtValue, srcValue);
        }
        else if (srcValue !== undefined) {
            result[key] = srcValue;
        }
    }
    return result;
}
//# sourceMappingURL=deep-merge.js.map