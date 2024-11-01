/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useRef, useEffect, useState } from "@wordpress/element";
import { focus } from "@wordpress/dom";
import {
  ToolbarButton,
  Button,
  ToggleControl,
  TextControl,
  __experimentalVStack as VStack,
} from "@wordpress/components";
import { link as linkIcon, linkOff } from "@wordpress/icons";
import { URLPopover } from "@wordpress/block-editor";

/**
 * Internal dependencies
 */
const NEW_TAB_REL = ["noreferrer", "noopener"];

export const getUpdatedLinkTarget = (linkRel) => (value) => {
  const newLinkTarget = value ? "_blank" : undefined;

  let updatedRel;
  if (newLinkTarget) {
    const rels = (linkRel ?? "").split(" ");
    NEW_TAB_REL.forEach((relVal) => {
      if (!rels.includes(relVal)) {
        rels.push(relVal);
      }
    });
    updatedRel = rels.join(" ");
  } else {
    const rels = (linkRel ?? "")
      .split(" ")
      .filter((relVal) => NEW_TAB_REL.includes(relVal) === false);
    updatedRel = rels.length ? rels.join(" ") : undefined;
  }

  return {
    linkTarget: newLinkTarget,
    linkRel: updatedRel,
  };
};

export const SVGURLInputUI = ({
  onChange,
  value: { linkUrl, linkTarget, linkRel },
}) => {
  const [isOpen, setIsOpen] = useState(false);
  // Use internal state instead of a ref to make sure that the component
  // re-renders when the popover's anchor updates.
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const openLinkUI = () => {
    setIsOpen(true);
  };

  const [isEditingLink, setIsEditingLink] = useState(false);
  const [urlInput, setUrlInput] = useState(null);

  const autocompleteRef = useRef(null);
  const wrapperRef = useRef();

  useEffect(() => {
    if (!wrapperRef.current) {
      return;
    }
    const nextFocusTarget =
      focus.focusable.find(wrapperRef.current)[0] || wrapperRef.current;
    nextFocusTarget.focus();
  }, [isEditingLink, linkUrl]);

  const startEditLink = () => {
    setIsEditingLink(true);
  };

  const stopEditLink = () => {
    setIsEditingLink(false);
  };

  const closeLinkUI = () => {
    setUrlInput(null);
    stopEditLink();
    setIsOpen(false);
  };

  const onFocusOutside = () => {
    return (event) => {
      // The autocomplete suggestions list renders in a separate popover (in a portal),
      // so onFocusOutside fails to detect that a click on a suggestion occurred in the
      // LinkContainer. Detect clicks on autocomplete suggestions using a ref here, and
      // return to avoid the popover being closed.
      const autocompleteElement = autocompleteRef.current;
      if (autocompleteElement && autocompleteElement.contains(event.target)) {
        return;
      }
      setIsOpen(false);
      setUrlInput(null);
      stopEditLink();
    };
  };

  const onSubmitLinkChange = () => {
    return (event) => {
      if (urlInput) {
        onChange({
          linkUrl: urlInput,
        });
      }
      stopEditLink();
      setUrlInput(null);
      event.preventDefault();
    };
  };

  const onLinkRemove = () => {
    onChange({
      linkUrl: "",
    });
  };

  const onSetNewTab = (value) => {
    onChange(getUpdatedLinkTarget(linkRel)(value));
  };

  const onSetLinkRel = (linkRel) => {
    onChange({ linkRel });
  };

  const advancedOptions = (
    <VStack spacing="3">
      <ToggleControl
        __nextHasNoMarginBottom
        label={__("Open in new tab", "svg-block")}
        onChange={onSetNewTab}
        checked={linkTarget === "_blank"}
      />
      <TextControl
        __nextHasNoMarginBottom
        label={__("Link rel", "svg-block")}
        value={linkRel ?? ""}
        onChange={onSetLinkRel}
      />
    </VStack>
  );

  const linkEditorValue = urlInput !== null ? urlInput : linkUrl;

  const PopoverChildren = () => {
    if (!linkUrl || isEditingLink) {
      return (
        <URLPopover.LinkEditor
          className="block-editor-format-toolbar__link-container-content"
          value={linkEditorValue}
          onChangeInputValue={setUrlInput}
          onSubmit={onSubmitLinkChange()}
          autocompleteRef={autocompleteRef}
        />
      );
    } else if (linkUrl && !isEditingLink) {
      return (
        <>
          <URLPopover.LinkViewer
            className="block-editor-format-toolbar__link-container-content"
            url={linkUrl}
            onEditLinkClick={startEditLink}
          />
          <Button
            icon={linkOff}
            label={__("Remove link")}
            onClick={() => {
              onLinkRemove();
            }}
            size="compact"
          />
        </>
      );
    }
  };

  return (
    <>
      <ToolbarButton
        icon={linkIcon}
        className="components-toolbar__control"
        label={__("Link")}
        aria-expanded={isOpen}
        onClick={openLinkUI}
        ref={setPopoverAnchor}
        isActive={!!linkUrl}
      />
      {isOpen && (
        <URLPopover
          ref={wrapperRef}
          anchor={popoverAnchor}
          onFocusOutside={onFocusOutside()}
          onClose={closeLinkUI}
          renderSettings={() => advancedOptions}
          offset={13}
        >
          {PopoverChildren()}
        </URLPopover>
      )}
    </>
  );
};
