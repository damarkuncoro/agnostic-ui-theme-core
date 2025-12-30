import type { UiTokenScale } from "./types";
export interface UiColorTokens {
    /** Base palette (brand / neutral) */
    palette: {
        neutral: UiTokenScale;
        primary: UiTokenScale;
        secondary?: UiTokenScale;
        success?: UiTokenScale;
        warning?: UiTokenScale;
        danger?: UiTokenScale;
    };
    /** Semantic usage */
    text: {
        primary: string;
        secondary: string;
        muted: string;
        inverse: string;
        disabled: string;
    };
    background: {
        surface: string;
        elevated: string;
        muted: string;
        inverse: string;
    };
    border: {
        default: string;
        subtle: string;
        strong: string;
        focus: string;
    };
}
//# sourceMappingURL=color.d.ts.map