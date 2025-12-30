import type { UiColorTokens } from "./color";
import type { UiSpacingTokens } from "./spacing";
import type { UiRadiusTokens } from "./radius";
import type { UiTypographyTokens } from "./typography";
import type { UiShadowTokens } from "./shadow";
import type { UiZIndexTokens } from "./z-index";
export * from "./types";
export * from "./color";
export * from "./spacing";
export * from "./radius";
export * from "./typography";
export * from "./shadow";
export * from "./z-index";
export interface UiCoreTokens {
    readonly color: UiColorTokens;
    readonly spacing: UiSpacingTokens;
    readonly radius: UiRadiusTokens;
    readonly typography: UiTypographyTokens;
    readonly shadow: UiShadowTokens;
    readonly zIndex: UiZIndexTokens;
}
export type UiDesignTokens = UiCoreTokens;
//# sourceMappingURL=index.d.ts.map