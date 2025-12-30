export type UiTokenPrimitive = string | number;
export type UiTokenRef = {
    ref: string;
};
export type UiTokenMath = {
    multiply?: number;
    add?: number;
};
export type UiTokenValue = UiTokenPrimitive | UiTokenRef | (UiTokenRef & UiTokenMath);
export type UiTokenScale<T = UiTokenValue> = Record<string, T>;
//# sourceMappingURL=types.d.ts.map