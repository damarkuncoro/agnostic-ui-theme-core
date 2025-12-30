import type { UiExtendedScale, UiExtendedTokenGroup } from "./types";
export interface UiAnimationTokens extends UiExtendedTokenGroup {
    duration: UiExtendedScale<number>;
    easing: UiExtendedScale<string>;
    semantic: {
        enter: string;
        exit: string;
        emphasize: string;
        subtle: string;
    };
}
//# sourceMappingURL=animation.d.ts.map