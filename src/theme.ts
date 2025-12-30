// packages/agnostic-ui-theme-core/src/theme.ts
import type { 
    UiCoreTokens, 
    UiExtendedTokens } 
    from "@damarkuncoro/agnostic-ui-contract-core"


export interface UiTheme {
  version: "2.1"
  tokens: UiCoreTokens & Partial<UiExtendedTokens>
}