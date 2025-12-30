import type { UiAnimationTokens } from "./animation";
import type { UiTimingTokens } from "./timing";
import type { UiInteractionTokens } from "./interaction";
import type { UiFormTokens } from "./form";
import type { UiValidationTokens } from "./validation";
import type { UiDataVizTokens } from "./data-viz";
import type { UiLoadingTokens } from "./loading";
import type { UiPrintTokens } from "./print";
export * from "./types";
export * from "./animation";
export * from "./timing";
export * from "./interaction";
export * from "./form";
export * from "./validation";
export * from "./data-viz";
export * from "./loading";
export * from "./print";
export interface UiExtendedTokens {
    animation?: UiAnimationTokens;
    timing?: UiTimingTokens;
    interaction?: UiInteractionTokens;
    form?: UiFormTokens;
    validation?: UiValidationTokens;
    dataViz?: UiDataVizTokens;
    loading?: UiLoadingTokens;
    print?: UiPrintTokens;
}
//# sourceMappingURL=index.d.ts.map