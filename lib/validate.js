import { uiThemeVersions } from "../../agnostic-ui-contract-core/lib";
export function validateTheme(theme) {
    if (!uiThemeVersions.includes(theme.version)) {
        throw new Error(`[theme-core] Unsupported theme version: ${theme.version}. Supported: ${uiThemeVersions.join(", ")}`);
    }
    if (!theme.tokens.color)
        throw new Error("[theme-core] Missing core color tokens");
    if (!theme.tokens.spacing)
        throw new Error("[theme-core] Missing core spacing tokens");
    // bisa tambah validator lainnya jika perlu
}
//# sourceMappingURL=validate.js.map