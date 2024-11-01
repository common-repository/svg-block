/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { pin } from "@wordpress/icons";
import {
  PanelBody,
  ToggleControl,
  TextControl,
  ToolbarGroup,
  ToolbarButton,
} from "@wordpress/components";
import { useCallback, useEffect } from "@wordpress/element";
import { InspectorControls, BlockControls } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { ToggleGroupCustomControl } from "../sdk";
import { SVGURLInputUI, getUpdatedLinkTarget } from "./svg-url-input-ui";
import VStack from "./vstack";

import {
  isValidSettingObject,
  handleChangeMultipleSettingField,
  buildResponsiveSettingValue,
} from "../sdk";

/**
 * Link settings
 *
 * @param {Object} props
 * @returns
 */
export const LinkSettings = (props) => {
  const {
    setAttributes,
    attributes,
    getResponsiveAttributeValue,
    handleChangeResponsiveAttributeField,
    breakpoint,
    allBreakpoints,
  } = props;
  const {
    linkUrl,
    linkTarget,
    linkRel,
    useAsButton,
    iconPosition = "left",
    linkToPost,
  } = attributes;

  // Toggle link target
  const onToggleOpenInNewTab = useCallback(
    (value) => {
      setAttributes(getUpdatedLinkTarget(linkRel)(value));
    },
    [linkRel, setAttributes],
  );

  // Set link rel
  const onSetLinkRel = useCallback(
    (linkRel) => {
      setAttributes({ linkRel });
    },
    [setAttributes],
  );

  const svgWidth = getResponsiveAttributeValue("svgWidth");
  const gap = getResponsiveAttributeValue("gap");

  // Set default values
  useEffect(() => {
    if (useAsButton) {
      let defaultButtonValue = {};
      if (!isValidSettingObject(svgWidth)) {
        defaultButtonValue = {
          ...defaultButtonValue,
          svgWidth: buildResponsiveSettingValue({
            newValue: { svgWidth: "1em", value: "1em" },
            fieldName: "svgWidth",
            attributes,
            breakpoint,
            allBreakpoints,
          }),
        };
      }
      if (!isValidSettingObject(gap)) {
        defaultButtonValue = {
          ...defaultButtonValue,
          gap: buildResponsiveSettingValue({
            newValue: { gap: ".5rem", value: ".5rem" },
            fieldName: "gap",
            attributes,
            breakpoint,
            allBreakpoints,
          }),
        };
      }

      if (isValidSettingObject(defaultButtonValue)) {
        handleChangeMultipleSettingField({ attributes, setAttributes })(
          defaultButtonValue,
        );
      }
    }
  }, [useAsButton]);

  const isLink = !!linkUrl || linkToPost;

  return (
    <>
      <BlockControls>
        <ToolbarGroup>
          <SVGURLInputUI
            onChange={setAttributes}
            value={{ linkUrl, linkTarget, linkRel }}
          />
          <ToolbarButton
            icon={pin}
            onClick={() => {
              setAttributes({ linkToPost: !linkToPost });
            }}
            isPressed={linkToPost}
            label={__("Link to post?", "svg-block")}
          />
        </ToolbarGroup>
      </BlockControls>
      {isLink && (
        <InspectorControls group="styles">
          <PanelBody title={__("Link settings", "svg-block")}>
            <VStack spacing={3}>
              <ToggleControl
                label={__("Open in new tab", "svg-block")}
                onChange={onToggleOpenInNewTab}
                checked={linkTarget === "_blank"}
              />
              <TextControl
                label={__("Link rel", "svg-block")}
                value={linkRel || ""}
                onChange={onSetLinkRel}
              />
              <ToggleControl
                label={__("Use as a button", "svg-block")}
                onChange={(useAsButton) => {
                  setAttributes({ useAsButton });
                }}
                checked={useAsButton}
              />
              {useAsButton && (
                <>
                  <ToggleGroupCustomControl
                    name="svgWidth"
                    label={__("Icon width", "svg-block")}
                    options={[
                      { value: "1em", label: "1em" },
                      { value: "1.5em", label: "1.5em" },
                      { value: "2em", label: "2em" },
                      { value: "auto", label: __("Auto", "svg-block") },
                      { value: "custom", label: __("Custom", "svg-block") },
                    ]}
                    value={svgWidth}
                    onChange={handleChangeResponsiveAttributeField("svgWidth")}
                    isResponsive={true}
                    toggleOff={false}
                  />
                  <ToggleControl
                    label={__("Icon on the right?", "svg-block")}
                    checked={iconPosition === "right"}
                    onChange={(value) => {
                      if (value) {
                        setAttributes({ iconPosition: "right" });
                      } else {
                        setAttributes({ iconPosition: "left" });
                      }
                    }}
                  />
                  <ToggleGroupCustomControl
                    name="gap"
                    label={__("Gap between icon and text", "svg-block")}
                    options={[
                      { value: ".5rem", label: ".5rem" },
                      { value: "1rem", label: "1rem" },
                      { value: "custom", label: __("Custom", "svg-block") },
                    ]}
                    value={gap}
                    onChange={handleChangeResponsiveAttributeField("gap")}
                    isResponsive={true}
                    toggleOff={false}
                  />
                </>
              )}
            </VStack>
          </PanelBody>
        </InspectorControls>
      )}
    </>
  );
};
