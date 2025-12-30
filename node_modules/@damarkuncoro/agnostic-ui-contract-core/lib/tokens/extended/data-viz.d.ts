import type { UiExtendedScale, UiExtendedTokenGroup } from "./types";
export interface UiDataVizTokens extends UiExtendedTokenGroup {
    scale: UiExtendedScale<number>;
    categorical: UiExtendedScale<string>;
    sequential: UiExtendedScale<string>;
    diverging: UiExtendedScale<string>;
}
//# sourceMappingURL=data-viz.d.ts.map