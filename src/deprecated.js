/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { attributes } from "./block.json";
import save from "./save";

/**
 * Deprecated
 */
export default [
  {
    attributes: {
      ...attributes,
      deprecatedCSSColorV1: {
        type: "boolean",
        default: true,
      },
    },
    save,
  },
  {
    attributes: {
      ...attributes,
      deprecatedIsUnsetValueV1: {
        type: "boolean",
        default: true,
      },
    },
    save,
  },
  {
    attributes: {
      ...attributes,
      deprecatedSVGLabelledby: {
        type: "boolean",
        default: true,
      },
    },
    save,
  },
  {
    attributes: {
      ...attributes,
      deprecatedIsUnsetValueV1: {
        type: "boolean",
        default: true,
      },
      deprecatedSVGLabelledby: {
        type: "boolean",
        default: true,
      },
    },
    save,
  },
];
