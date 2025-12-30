import type { UiInteractionState } from "./interaction";
import type { UiDisabledState } from "./disabled";
import type { UiValidationState } from "./validation";
import type { UiSelectionState } from "./selection";
import type { UiLoadingState } from "./loading";
import type { UiVisibilityState } from "./visibility";
export * from "./interaction";
export * from "./disabled";
export * from "./validation";
export * from "./selection";
export * from "./loading";
export * from "./visibility";
export type UiState = UiInteractionState & UiDisabledState & UiValidationState & UiSelectionState & UiLoadingState & UiVisibilityState;
//# sourceMappingURL=index.d.ts.map