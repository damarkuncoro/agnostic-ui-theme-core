// packages/agnostic-ui-theme-core/src/defaults.ts
import type { UiTheme } from "./theme"
import { defaultTheme as contractDefaultTheme } from "@damarkuncoro/agnostic-ui-contract-core"

export const themeCore: UiTheme = contractDefaultTheme as UiTheme
