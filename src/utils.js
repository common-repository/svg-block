/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import {
  getBorderStyle,
  buildBorderStyle,
  buildBorderStyleDeprecatedV1,
  getBorderRadiusStyle,
  getStyleForResponsiveToggleGroupField,
  getStyleForResponsiveToggleGroupFieldDeprecatedV1,
  getWidthStyle,
  getHeightStyle,
  getJustifyAlignmentStyle,
  getPaddingStyle,
  getMarginStyle,
  getColorCSSValue,
  getColorCSSValueDeprecatedV1,
  getBoxShadowStyle,
} from "./sdk";

/**
 * Build styles for the block
 *
 * @param {Object} props
 */
export function getBlockStyles(props) {
  const { attributes } = props;

  let styles = {};

  // Margin
  styles = { ...styles, ...getMarginStyle(attributes) };

  // Justify alignment
  styles = { ...styles, ...getJustifyAlignmentStyle(attributes) };

  // Stack context
  const { zIndex = "" } = attributes;

  if (zIndex || zIndex !== "") {
    styles = {
      ...styles,
      "--bb--zindex": zIndex,
    };
  }

  return styles;
}

/**
 * Build styles for the block inner element
 *
 * @param {Object} props
 */
export function getSVGStyles(props) {
  const {
    attributes,
    attributes: {
      fillColor,
      strokeColor,
      backgroundColor,
      textColor,
      deprecatedCSSColorV1,
      deprecatedIsUnsetValueV1,
      useAsButton,
      boldblocks = {},
    },
  } = props;

  let styles = {};

  const buildStyleForResponsiveToggleGroupField = !deprecatedIsUnsetValueV1
    ? getStyleForResponsiveToggleGroupField
    : getStyleForResponsiveToggleGroupFieldDeprecatedV1;

  // Width
  styles = {
    ...styles,
    ...getWidthStyle(attributes, buildStyleForResponsiveToggleGroupField),
  };

  // Height
  styles = {
    ...styles,
    ...getHeightStyle(attributes, buildStyleForResponsiveToggleGroupField),
  };

  // Padding
  styles = { ...styles, ...getPaddingStyle(attributes) };

  // Determine color format
  const buildColorCSSValue = !deprecatedCSSColorV1
    ? getColorCSSValue
    : getColorCSSValueDeprecatedV1;

  const buildBorderCSSValue = !deprecatedIsUnsetValueV1
    ? buildBorderStyle
    : buildBorderStyleDeprecatedV1;

  // Border
  styles = {
    ...styles,
    ...getBorderStyle(attributes, buildColorCSSValue, buildBorderCSSValue),
  };

  // Border radius
  styles = { ...styles, ...getBorderRadiusStyle(attributes) };

  if (useAsButton) {
    const { svgWidth = {}, gap = {} } = boldblocks;
    // SVG width
    styles = {
      ...styles,
      ...buildStyleForResponsiveToggleGroupField(svgWidth, "svg-width"),
    };

    // Gap
    styles = {
      ...styles,
      ...buildStyleForResponsiveToggleGroupField(gap, "gap"),
    };
  }

  // Box shadow
  styles = {
    ...styles,
    ...getBoxShadowStyle(attributes?.boldblocks?.shadows, buildColorCSSValue),
  };

  const fillColorStyle = buildColorCSSValue(fillColor);
  if (fillColorStyle) {
    styles["--bb--fill--color"] = fillColorStyle;
  }
  const strokeColorStyle = buildColorCSSValue(strokeColor);
  if (strokeColorStyle) {
    styles["--bb--stroke--color"] = strokeColorStyle;
  }
  const backgroundColorStyle = buildColorCSSValue(backgroundColor);
  if (backgroundColorStyle) {
    styles["--bb--background--color"] = backgroundColorStyle;
  }

  if (useAsButton) {
    const textColorStyle = buildColorCSSValue(textColor);
    if (textColorStyle) {
      styles["--bb--text--color"] = textColorStyle;
    }
  }

  return styles;
}

export const keywords = [
  "divider",
  "arrow",
  "up",
  "down",
  "left",
  "right",
  "forward",
  "back",
  "flower",
  "shape",
  "fill",
  "outline",
  "square",
  "circle",
  "text",
  "layout",
  "grid",
  "list",
  "currency",
  "emoji",
  "file",
  "cart",
  "basket",
  "star",
  "logo",
  "brand",
  "social",
  "person",
  "people",
  "number",
  "admin",
  "slide",
  "editor",
  "align",
  "badge",
  "bag",
  "calendar",
  "caret",
  "chevron",
];

export const customPresets = [
  {
    name: "Shadow 1",
    slug: "bb-shadow-1",
    shadow:
      "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px",
  },
  {
    name: "Shadow 2",
    slug: "bb-shadow-2",
    shadow:
      "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
  },
  {
    name: "Shadow 3",
    slug: "bb-shadow-3",
    shadow: "rgba(0, 0, 0, 0.2) 0px 20px 30px",
  },
  {
    name: "Shadow 4",
    slug: "bb-shadow-4",
    shadow:
      "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
  },
  {
    name: "Shadow 5",
    slug: "bb-shadow-5",
    shadow:
      "rgb(85, 91, 255) 0px 0px 0px 3px, rgb(31, 193, 27) 0px 0px 0px 6px, rgb(255, 217, 19) 0px 0px 0px 9px, rgb(255, 156, 85) 0px 0px 0px 12px, rgb(255, 85, 85) 0px 0px 0px 15px",
  },
];
