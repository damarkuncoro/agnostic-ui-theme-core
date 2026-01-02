// packages/agnostic-ui-theme-core/src/theme.ts
import type {
    UiCoreTokens,
    UiExtendedTokens,
    UiThemeVersion
} from "../../agnostic-ui-contract-core/lib"


export interface UiTheme {
  version: UiThemeVersion
  tokens: UiCoreTokens & Partial<UiExtendedTokens>
}