/**
 * External dependencies
 */
import clsx from "clsx";

/**
 * WordPress dependencies
 */
import { _x } from "@wordpress/i18n";
import { useMemo } from "@wordpress/element";
import { RichText } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
import { InlineSVG } from "../sdk.js";
import { getSVGStyles } from "../utils.js";

/**
 * Render block content
 *
 * @param {Object}
 * @returns
 */
export const BlockInner = ({ isEdit, onChangeText, ...attributes }) => {
  const {
    content,
    title,
    description,
    linkUrl,
    linkTarget,
    linkRel,
    blockId,
    preserveAspectRatio,
    flip,
    invert,
    useAsButton,
    buttonText,
    iconPosition,
    deprecatedSVGLabelledby,
    linkToPost,
  } = attributes;

  const isLink = !!linkUrl || linkToPost;

  const TagName = !isEdit && isLink ? "a" : "div";
  const innerAttributes = {
    href: isLink ? linkUrl : undefined,
    rel: isLink ? linkRel : undefined,
    target: isLink ? linkTarget : undefined,
  };

  const hasButton = isLink && useAsButton;

  return (
    <TagName
      className={clsx("wp-block-boldblocks-svg-block__inner", {
        "is-invert": invert,
        "is-flip": flip,
        "use-as-button": hasButton,
        "is-edit": isEdit,
        [`icon-${iconPosition}`]: hasButton && iconPosition,
      })}
      {...innerAttributes}
      style={{ ...getSVGStyles({ attributes }) }}
    >
      <InlineSVG
        markup={content}
        title={title}
        description={description}
        instanceId={blockId}
        preserveAspectRatio={preserveAspectRatio}
        deprecatedSVGLabelledby={deprecatedSVGLabelledby}
      />
      {hasButton &&
        (isEdit ? (
          <RichText
            value={buttonText}
            tagName="span"
            onChange={onChangeText}
            placeholder={_x("Button text", "Input button text")}
            className="button-text"
            allowedFormats={[
              "core/bold",
              "core/code",
              "core/italic",
              "core/strikethrough",
              "core/underline",
              "core/text-color",
              "core/subscript",
              "core/superscript",
              "core/keyboard",
            ]}
          />
        ) : (
          buttonText && (
            <RichText.Content
              value={buttonText}
              tagName="span"
              className="button-text"
            />
          )
        ))}
    </TagName>
  );
};

/**
 * Prevent from unnecessary InlineSVG render
 *
 * @param {Object} attributes
 * @param {Boolean} isSelected
 * @param {Function} onChangeText
 * @returns {ReactComponent}
 */
export const useBlockInner = (attributes, isSelected, onChangeText) => {
  const blockInner = useMemo(() => {
    return (
      <BlockInner {...attributes} onChangeText={onChangeText} isEdit={true} />
    );
  }, [attributes, isSelected]);

  return blockInner;
};
