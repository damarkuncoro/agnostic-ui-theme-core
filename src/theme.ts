// packages/agnostic-ui-theme-core/src/theme.ts
import type { UiCoreTokens } from "@damarkuncoro/agnostic-ui-contract-core/tokens/core"
import type { UiExtendedTokens } from "@damarkuncoro/agnostic-ui-contract-core/tokens/extended"

export interface UiTheme {
  version: "2.1"
  tokens: UiCoreTokens & Partial<UiExtendedTokens>
}
