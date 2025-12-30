"use strict";
// src/utils/get-by-path.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPath = getByPath;
function getByPath(obj, path) {
    if (!path)
        return undefined;
    return path.split(".").reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}
//# sourceMappingURL=get-by-path.js.map