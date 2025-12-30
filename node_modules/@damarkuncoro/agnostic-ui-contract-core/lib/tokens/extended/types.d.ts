import type { UiTokenScale } from "../core";
export interface UiExtendedTokenGroup {
    /** optional semantic layer */
    semantic?: Record<string, string>;
}
export type UiExtendedScale<T = string | number> = UiTokenScale<T>;
//# sourceMappingURL=types.d.ts.map