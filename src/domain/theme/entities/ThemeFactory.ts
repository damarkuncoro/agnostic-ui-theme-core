// src/domain/theme/entities/ThemeFactory.ts
import { Theme } from "./Theme";
import type { ThemeTokenStructure } from "./ThemeTypes";
import { ColorPalette } from "../../tokens/color/ColorPalette";
import { TextColor } from "../../tokens/color/TextColor";
import { BackgroundColor } from "../../tokens/color/BackgroundColor";
import { BorderColor } from "../../tokens/color/BorderColor";
import { SpacingScale } from "../../tokens/spacing/SpacingScale";
import { TypographyScale } from "../../tokens/typography/TypographyScale";

/**
 * ThemeFactory
 * Factory class for creating Theme instances
 * Handles the creation of themes with proper validation and defaults
 */
export class ThemeFactory {
  /**
   * Creates a Theme from token structure
   */
  public static create(props: ThemeTokenStructure): Theme {
    return new Theme(props);
  }

  /**
   * Creates the default theme
   */
  public static createDefault(): Theme {
    return ThemeFactory.create({
      version: "2.1",
      color: {
        palette: ColorPalette.createDefault(),
        text: TextColor.createDefault(),
        background: BackgroundColor.createDefault(),
        border: BorderColor.createDefault()
      },
      spacing: SpacingScale.createDefault(),
      typography: TypographyScale.createDefault()
    });
  }
}