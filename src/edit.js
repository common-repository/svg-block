/**
 * External dependencies
 */
import { isUndefined } from "lodash";

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { flipHorizontal, flipVertical } from "@wordpress/icons";
import {
  PanelBody,
  ToggleControl,
  TextControl,
  ExternalLink,
  ToolbarGroup,
  ToolbarButton,
  Dropdown,
  __experimentalBorderControl as BorderControl,
  __experimentalToolsPanel as ToolsPanel,
  __experimentalToolsPanelItem as ToolsPanelItem,
} from "@wordpress/components";
import { useCallback, useEffect, useState, useMemo } from "@wordpress/element";
import {
  useBlockProps,
  InspectorControls,
  BlockControls,
  JustifyToolbar,
  __experimentalSpacingSizesControl as SpacingSizesControl,
  __experimentalPanelColorGradientSettings as PanelColorGradientSettings,
  useBlockEditingMode,
} from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import {
  PreviewToolbar,
  LabelControl,
  BorderRadiusControl,
  ToggleGroupCustomControl,
  BoxShadowGroupControl,
  BrowseIconsModal,
  useShadow,
} from "./sdk";

import {
  useMultipleOriginColors,
  useColor,
  getAllBreakpoints,
  getBreakpointType,
  getResponsiveSettingFieldValue,
  handleChangeResponsiveSettingField,
  getResponsiveSettingGroupFieldValue,
  handleChangeResponsiveSettingGroupField,
  handleChangeSettingGroupField,
  isValidSettingObject,
  getSVGNode,
  useInlineSVG,
  buildIconLibraryStore,
  useIconLibraryData,
  handleChangeMultipleSettingField,
  toType,
  getColorObject,
} from "./sdk";
import { useBlockInner } from "./components/block-inner";
import { SVGDataControls } from "./components/svg-data-controls";
import { LinkSettings } from "./components/link-settings";
import VStack from "./components/vstack";
import Placeholder from "./components/placeholder";
import { getBlockStyles, keywords, customPresets } from "./utils";

// Editor style
import "./editor.scss";

const STORE_NAME = "boldblocks/svg-block";
buildIconLibraryStore(STORE_NAME);

/**
 * Migrate to new color
 *
 * @param {Boolean} toDefaultControl
 * @param {Array} allColors
 *
 * @returns {Object}
 */
const migrateBorder =
  (toDefaultControl = true, allColors) =>
  (border) => {
    let formatedBorder = border;
    if (border && "object" === toType(border)) {
      if (border?.color) {
        let color = border.color;
        const colorDataType = toType(color);
        if (toDefaultControl) {
          if (colorDataType === "object") {
            color = color?.value;
          }
        } else {
          if (colorDataType === "string") {
            color = getColorObject(color, allColors);
          }
        }

        formatedBorder = { ...border, color };
      }
    }

    return formatedBorder;
  };

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit(props) {
  const { attributes, setAttributes, isSelected, clientId } = props;
  const {
    content,
    title,
    description,
    preserveAspectRatio,
    flip,
    invert,
    useAsButton,
    zIndex,
    boldblocks = {},
  } = attributes;

  const { shadows = [], shadowSlug = "" } = boldblocks;

  const blockEditingMode = useBlockEditingMode
    ? useBlockEditingMode()
    : "default";

  const [createOnChange, createOnChangeSlug] = useShadow(
    { shadowSlug, shadows },
    handleChangeMultipleSettingField({
      setAttributes,
      attributes,
    }),
  );

  const svgNode = useMemo(
    () => (!!content ? getSVGNode(content) : false),
    [content],
  );

  const disabledPreserveAspectRatio =
    svgNode && svgNode.getAttribute("preserveAspectRatio") === "none";

  // Get all breakpoints
  const allBreakpoints = getAllBreakpoints();

  // Get current breakpoint
  const breakpoint = getBreakpointType();

  const getResponsiveAttributeValue = useCallback(
    (fieldName, defaultValue = undefined) =>
      getResponsiveSettingFieldValue({
        fieldName,
        attributes,
        breakpoint,
        defaultValue,
      }),
    [setAttributes, attributes, breakpoint],
  );

  const handleChangeResponsiveAttributeField = useCallback(
    (fieldName) => (value) =>
      handleChangeResponsiveSettingField({
        fieldName,
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      })(value),
    [setAttributes, attributes, breakpoint],
  );

  const getSpacingValue = useCallback(
    (fieldName) =>
      getResponsiveSettingGroupFieldValue({
        fieldName,
        groupName: "spacing",
        attributes,
        breakpoint,
      }),
    [attributes, setAttributes],
  );

  const handleChangeSpacingField = useCallback(
    (fieldName) => (value) =>
      handleChangeResponsiveSettingGroupField({
        fieldName,
        groupName: "spacing",
        setAttributes,
        attributes,
        breakpoint,
        allBreakpoints,
      })(value),
    [setAttributes, attributes, breakpoint],
  );

  // Reset spacing attributes
  const onResetFeature = useCallback(
    (fieldName) =>
      handleChangeSettingGroupField({
        fieldName,
        groupName: "spacing",
        setAttributes,
        attributes,
      })({}),
    [setAttributes, attributes],
  );

  const width = getResponsiveAttributeValue("width");
  const height = getResponsiveAttributeValue("height");

  // Set default values
  useEffect(() => {
    if (!isValidSettingObject(width)) {
      handleChangeResponsiveAttributeField("width")({
        width: "100%",
        value: "100%",
      });
    }
  }, []);

  // Color attributes
  const { colors, allColors } = useMultipleOriginColors();
  const [fillColor, setFillColor] = useColor("fillColor", allColors);
  const [strokeColor, setStrokeColor] = useColor("strokeColor", allColors);
  const [backgroundColor, setBackgroundColor, setBackgroundGradient] = useColor(
    "backgroundColor",
    allColors,
    true, // has gradient
  );
  const [textColor, setTextColor] = useColor("textColor", allColors);

  const colorSettings = [
    {
      colorValue: fillColor?.value,
      onColorChange: setFillColor,
      label: __("Fill color", "svg-block"),
      clearable: true,
    },
    {
      colorValue: strokeColor?.value,
      onColorChange: setStrokeColor,
      label: __("Stroke color", "svg-block"),
      clearable: true,
    },
    {
      colorValue: backgroundColor?.value,
      onColorChange: setBackgroundColor,
      gradientValue: backgroundColor?.gradientValue,
      onGradientChange: setBackgroundGradient,
      label: __("Background color", "svg-block"),
      clearable: true,
    },
  ];

  if (useAsButton) {
    colorSettings.push({
      colorValue: textColor?.value,
      onColorChange: setTextColor,
      label: __("Text color", "svg-block"),
      clearable: true,
    });
  }

  // State for open/close browse icons modal
  const [isOpenBrowseIconsModal, setIsOpenBrowseIconsModal] = useState(false);

  const updateContent = (content) => setAttributes({ content });
  const [rawContent, setRawContent] = useInlineSVG(content, updateContent);
  if (content && isUndefined(rawContent)) {
    // Get icon from variations
    setRawContent(content);
  }

  const icons = useIconLibraryData({
    isloadData: isOpenBrowseIconsModal,
    storeName: STORE_NAME,
    apiPath: "svgblock/v1/getIconLibrary",
  });

  const border = migrateBorder(
    true,
    allColors,
  )(getResponsiveAttributeValue("border"));

  // Build blockInner
  const blockInner = useBlockInner(attributes, isSelected, (buttonText) =>
    setAttributes({ buttonText }),
  );

  const blockStyle = useMemo(() => getBlockStyles(props), [attributes]);

  const blockProps = useBlockProps({
    style: blockStyle,
  });

  const paddingLabel = __("Padding", "svg-block");
  const marginLabel = __("Margin", "svg-block");

  const borderLabel = __("Border", "svg-block");
  const radiusLabel = __("Radius", "svg-block");
  const shadowLabel = __("Shadow", "svg-block");

  return (
    <>
      {isOpenBrowseIconsModal && (
        <BrowseIconsModal
          title={__("Icon library", "svg-block")}
          isModalOpen={isOpenBrowseIconsModal}
          setIsModalOpen={setIsOpenBrowseIconsModal}
          icons={icons}
          onSubmit={setRawContent}
          value={rawContent}
          keywords={keywords}
        />
      )}
      <div {...blockProps}>
        {!!content ? (
          blockInner
        ) : (
          <Placeholder
            setRawContent={setRawContent}
            setIsOpenBrowseIconsModal={setIsOpenBrowseIconsModal}
          />
        )}
      </div>
      {isSelected && (
        <>
          <InspectorControls group="settings">
            <PanelBody title={__("SVG data", "svg-block")} initialOpen={true}>
              <SVGDataControls
                rawContent={rawContent}
                setRawContent={setRawContent}
                setIsOpenBrowseIconsModal={setIsOpenBrowseIconsModal}
                setAttributes={setAttributes}
                title={title}
                description={description}
              />
            </PanelBody>
          </InspectorControls>
          <InspectorControls group="styles">
            <PanelColorGradientSettings
              title={__("Color", "svg-block")}
              initialOpen={false}
              settings={colorSettings}
              enableAlpha={true}
              __experimentalIsRenderedInSidebar={true}
            />
            <ToolsPanel
              label={__("Dimensions", "svg-block")}
              resetAll={() => {
                setAttributes({
                  boldblocks: {
                    ...boldblocks,
                    width: {},
                    height: {},
                    preserveAspectRatio: "",
                    spacing: {},
                  },
                });
              }}
            >
              <ToolsPanelItem
                label={__("Width & Height", "svg-block")}
                hasValue={() =>
                  isValidSettingObject(boldblocks?.width) ||
                  isValidSettingObject(boldblocks?.height)
                }
                onDeselect={() =>
                  setAttributes({
                    boldblocks: {
                      ...boldblocks,
                      width: {},
                      height: {},
                      preserveAspectRatio: "",
                    },
                  })
                }
                isShownByDefault={true}
              >
                <VStack spacing={3}>
                  <ToggleGroupCustomControl
                    name="width"
                    label={__("Width", "svg-block")}
                    options={[
                      { value: "100%", label: "100%" },
                      { value: "50%", label: "50%" },
                      { value: "33.33333%", label: "1/3" },
                      { value: "auto", label: __("Auto", "svg-block") },
                      { value: "custom", label: __("Custom", "svg-block") },
                    ]}
                    value={width}
                    onChange={handleChangeResponsiveAttributeField("width")}
                    isResponsive={true}
                    toggleOff={false}
                  />
                  <ToggleGroupCustomControl
                    name="height"
                    label={__("Height", "svg-block")}
                    options={[
                      { value: "50vh", label: "50vh" },
                      { value: "10vh", label: "10vh" },
                      { value: "100px", label: "100px" },
                      { value: "auto", label: __("Auto", "svg-block") },
                      { value: "custom", label: __("Custom", "svg-block") },
                    ]}
                    value={height}
                    onChange={handleChangeResponsiveAttributeField("height")}
                    isResponsive={true}
                  />
                  {!disabledPreserveAspectRatio && (
                    <ToggleControl
                      label={__(
                        "Stretch to fit width and height?",
                        "svg-block",
                      )}
                      checked={preserveAspectRatio === "none"}
                      onChange={(newValue) => {
                        setAttributes({
                          preserveAspectRatio: newValue ? "none" : "",
                        });
                      }}
                      help={
                        <>
                          {__("This setting will overide the ", "svg-block")}
                          <ExternalLink href="https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/preserveAspectRatio">
                            preserveAspectRatio
                          </ExternalLink>
                          {__(
                            " attribute. Helpful for use cases such as non-rectangular dividers",
                            "svg-block",
                          )}
                        </>
                      }
                    />
                  )}
                </VStack>
              </ToolsPanelItem>
              <ToolsPanelItem
                label={paddingLabel}
                hasValue={() =>
                  isValidSettingObject(boldblocks?.spacing?.padding)
                }
                onDeselect={() => onResetFeature("padding")}
                className="padding-panel-item"
                isShownByDefault={true}
              >
                <LabelControl
                  label={__("Spacing", "svg-block")}
                  isResponsive={true}
                  className="spacing-label"
                />
                <SpacingSizesControl
                  label={paddingLabel}
                  values={getSpacingValue("padding")}
                  onChange={handleChangeSpacingField("padding")}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                label={marginLabel}
                hasValue={() =>
                  isValidSettingObject(boldblocks?.spacing?.margin)
                }
                onDeselect={() => onResetFeature("margin")}
                className="margin-panel-item"
                isShownByDefault={true}
              >
                <SpacingSizesControl
                  label={marginLabel}
                  values={getSpacingValue("margin")}
                  onChange={handleChangeSpacingField("margin")}
                />
              </ToolsPanelItem>
            </ToolsPanel>
            <ToolsPanel
              label={__("Border & Shadow", "svg-block")}
              resetAll={() => {
                setAttributes({
                  boldblocks: {
                    ...boldblocks,
                    border: {},
                    borderRadius: {},
                    shadows: [],
                    shadowSlug: "",
                  },
                });
              }}
            >
              <ToolsPanelItem
                label={borderLabel}
                hasValue={() => isValidSettingObject(boldblocks?.border)}
                onDeselect={() =>
                  setAttributes({ boldblocks: { ...boldblocks, border: {} } })
                }
              >
                <LabelControl label={borderLabel} isResponsive={true} />
                <BorderControl
                  colors={colors}
                  onChange={(value) => {
                    if (isUndefined(border) && value?.width && !value?.style) {
                      // Set solid style as default value on first set.
                      value = { ...value, style: "solid" };
                    }
                    handleChangeResponsiveAttributeField("border")(
                      migrateBorder(false, allColors)(value),
                    );
                  }}
                  value={border}
                  enableAlpha={true}
                  enableStyle={true}
                  __unstablePopoverProps={{
                    placement: "left-start",
                    offset: 40,
                    shift: true,
                  }}
                  __experimentalIsRenderedInSidebar={true}
                  size={"__unstable-large"}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                label={radiusLabel}
                hasValue={() => isValidSettingObject(boldblocks?.borderRadius)}
                onDeselect={() =>
                  setAttributes({
                    boldblocks: { ...boldblocks, borderRadius: {} },
                  })
                }
              >
                <BorderRadiusControl
                  label={radiusLabel}
                  values={getResponsiveAttributeValue("borderRadius")}
                  onChange={handleChangeResponsiveAttributeField(
                    "borderRadius",
                  )}
                  isResponsive={true}
                />
              </ToolsPanelItem>
              <ToolsPanelItem
                label={shadowLabel}
                hasValue={() => !!shadows?.length}
                onDeselect={() =>
                  setAttributes({
                    boldblocks: { ...boldblocks, shadows: [], shadowSlug: "" },
                  })
                }
              >
                <BoxShadowGroupControl
                  label={shadowLabel}
                  values={shadows}
                  onChange={createOnChange("shadows")}
                  hasPresets={true}
                  customShadowPresets={customPresets}
                  slug={shadowSlug}
                  onChangeSlug={createOnChangeSlug("shadowSlug")}
                />
              </ToolsPanelItem>
            </ToolsPanel>
            <ToolsPanel
              label={__("Z Index", "svg-block")}
              resetAll={() => {
                setAttributes({
                  zIndex: "",
                });
              }}
            >
              <ToolsPanelItem
                label={__("Z Index", "svg-block")}
                hasValue={() => !!zIndex}
                onDeselect={() =>
                  setAttributes({
                    zIndex: "",
                  })
                }
              >
                <TextControl
                  value={zIndex}
                  onChange={(zIndex) => setAttributes({ zIndex })}
                  type="number"
                  label={__("Z Index", "svg-block")}
                  help={__(
                    "When you want this block to overlap other content, like an SVG divider, use this setting.",
                    "svg-block",
                  )}
                  autoComplete="off"
                />
              </ToolsPanelItem>
            </ToolsPanel>
          </InspectorControls>
          <LinkSettings
            attributes={attributes}
            setAttributes={setAttributes}
            breakpoint={breakpoint}
            allBreakpoints={allBreakpoints}
            getResponsiveAttributeValue={getResponsiveAttributeValue}
            handleChangeResponsiveAttributeField={
              handleChangeResponsiveAttributeField
            }
          />
          {blockEditingMode === "contentOnly" && (
            <BlockControls group="other">
              <Dropdown
                popoverProps={{
                  position: "bottom right",
                }}
                contentClassName="svg-block-replace-dropdown"
                renderToggle={({ isOpen, onToggle }) => (
                  <ToolbarButton
                    onClick={onToggle}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                  >
                    {__("Replace SVG", "svg-block")}
                  </ToolbarButton>
                )}
                renderContent={() => (
                  <SVGDataControls
                    rawContent={rawContent}
                    setRawContent={setRawContent}
                    setIsOpenBrowseIconsModal={setIsOpenBrowseIconsModal}
                    setAttributes={setAttributes}
                    title={title}
                    description={description}
                  />
                )}
              />
            </BlockControls>
          )}
          {blockEditingMode === "default" && (
            <BlockControls>
              <JustifyToolbar
                allowedControls={["left", "center", "right"]}
                value={getResponsiveAttributeValue("justifyAlignment")}
                onChange={handleChangeResponsiveAttributeField(
                  "justifyAlignment",
                )}
              />
              <ToolbarGroup>
                <ToolbarButton
                  icon={flipHorizontal}
                  onClick={() => {
                    setAttributes({ flip: !flip });
                  }}
                  isPressed={flip}
                  label={__("Flip the image horizonally", "svg-block")}
                />
                <ToolbarButton
                  icon={flipVertical}
                  onClick={() => {
                    setAttributes({ invert: !invert });
                  }}
                  isPressed={invert}
                  label={__("Flip the image vertically", "svg-block")}
                />
              </ToolbarGroup>
              <PreviewToolbar />
            </BlockControls>
          )}
        </>
      )}
    </>
  );
}
