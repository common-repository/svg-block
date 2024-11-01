/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { TextControl, TextareaControl } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { SVGInputControl } from "../sdk";
import VStack from "./vstack";

/**
 * Input controls for SVG
 */
export const SVGDataControls = ({
  rawContent,
  setRawContent,
  setIsOpenBrowseIconsModal,
  title,
  description,
  setAttributes,
}) => {
  return (
    <VStack spacing={3}>
      <SVGInputControl
        value={rawContent}
        label=""
        browseLibraryLabel={__("Get SVG from the library", "svg-block")}
        onChange={setRawContent}
        toggleLibraryModal={setIsOpenBrowseIconsModal}
        rows={6}
        placeholder={__("Input SVG markup…", "svg-block")}
      />
      <TextControl
        label={__("SVG title", "svg-block")}
        value={title}
        onChange={(title) => setAttributes({ title })}
        help={__(
          "Input a short-text description of the SVG image. This text is not rendered as part of the graphic, but browsers will display it as tooltip. It is for screen readers.",
          "svg-block",
        )}
        autoComplete="off"
      />
      <TextareaControl
        label={__("SVG description", "svg-block")}
        value={description}
        onChange={(description) => setAttributes({ description })}
        rows={2}
        help={__(
          "Input a long-text description of the SVG image. This text is not rendered as part of the graphic. It is for screen readers.",
          "svg-block",
        )}
      />
    </VStack>
  );
};
