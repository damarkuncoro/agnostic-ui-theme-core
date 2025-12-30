"use strict";
// src/theme/defaults.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTheme = void 0;
exports.defaultTheme = {
    version: "2.1",
    tokens: {
        color: {
            palette: {
                neutral: {
                    0: "#ffffff",
                    900: "#0f172a"
                },
                primary: {
                    500: "#2563eb"
                }
            },
            text: {
                primary: "#0f172a",
                secondary: "#334155",
                muted: "#64748b",
                inverse: "#ffffff",
                disabled: "#94a3b8"
            },
            background: {
                surface: "#ffffff",
                elevated: "#f8fafc",
                muted: "#f1f5f9",
                inverse: "#020617"
            },
            border: {
                default: "#e2e8f0",
                subtle: "#f1f5f9",
                strong: "#cbd5f5",
                focus: "#2563eb"
            }
        },
        spacing: {
            scale: {
                0: 0,
                1: 4,
                2: 8,
                3: 12,
                4: 16,
                5: 24
            },
            semantic: {
                xs: "1",
                sm: "2",
                md: "3",
                lg: "4",
                xl: "5"
            }
        },
        radius: {
            scale: {
                0: 0,
                1: 4,
                2: 8,
                3: 9999
            },
            semantic: {
                none: "0",
                sm: "1",
                md: "2",
                lg: "2",
                full: "3"
            }
        },
        typography: {
            fontFamily: {
                base: "system-ui, sans-serif",
                heading: "system-ui, sans-serif",
                mono: "monospace"
            },
            fontSize: {
                xs: 12,
                sm: 14,
                md: 16,
                lg: 18,
                xl: 20
            },
            fontWeight: {
                regular: 400,
                medium: 500,
                bold: 700
            },
            lineHeight: {
                tight: 1.2,
                normal: 1.5,
                relaxed: 1.7
            },
            letterSpacing: {
                normal: 0,
                wide: 0.02
            },
            semantic: {
                body: {
                    size: "md",
                    weight: "regular",
                    lineHeight: "normal"
                },
                heading: {
                    size: "lg",
                    weight: "bold",
                    lineHeight: "tight"
                },
                caption: {
                    size: "sm",
                    weight: "regular",
                    lineHeight: "normal"
                }
            }
        },
        shadow: {
            scale: {
                0: "none",
                1: "0 1px 2px rgba(0,0,0,0.05)",
                2: "0 4px 6px rgba(0,0,0,0.1)"
            },
            semantic: {
                sm: "1",
                md: "2",
                lg: "2",
                focus: "2"
            }
        },
        zIndex: {
            scale: {
                base: 0,
                dropdown: 1000,
                modal: 1300,
                tooltip: 1500
            },
            semantic: {
                dropdown: "dropdown",
                sticky: "dropdown",
                modal: "modal",
                popover: "modal",
                tooltip: "tooltip"
            }
        }
    }
};
//# sourceMappingURL=defaults.js.map