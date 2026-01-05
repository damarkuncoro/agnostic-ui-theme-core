import type { UiCoreTokens, UiExtendedTokens, UiThemeVersion } from "../../../packages/agnostic-ui-contract-core/lib";
export interface UiTheme {
    version: UiThemeVersion;
    tokens: UiCoreTokens & Partial<UiExtendedTokens>;
}
//# sourceMappingURL=theme.d.ts.map