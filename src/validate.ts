// packages/agnostic-ui-theme-core/src/validate.ts
import type { UiTheme } from "./theme"
import { uiThemeVersions } from "../../agnostic-ui-contract-core/lib"

export function validateTheme(theme: UiTheme): void {
  if (!uiThemeVersions.includes(theme.version)) {
    throw new Error(`[theme-core] Unsupported theme version: ${theme.version}. Supported: ${uiThemeVersions.join(", ")}`)
  }
  if (!theme.tokens.color) throw new Error("[theme-core] Missing core color tokens")
  if (!theme.tokens.spacing) throw new Error("[theme-core] Missing core spacing tokens")
  // bisa tambah validator lainnya jika perlu
}
