import type { UiCoreTokens, UiExtendedTokens, UiThemeVersion } from "../../agnostic-ui-contract-core/lib";
export interface UiTheme {
    version: UiThemeVersion;
    tokens: UiCoreTokens & Partial<UiExtendedTokens>;
}
//# sourceMappingURL=theme.d.ts.map