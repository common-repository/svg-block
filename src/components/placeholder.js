/**
 * External dependencies
 */

/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { Button, __experimentalHStack as HStack } from "@wordpress/components";

/**
 * Internal dependencies
 */
import { SVGUploadControl } from "../sdk";
import { ReactComponent as BlockIcon } from "../assets/block-icon.svg";

const Placeholder = ({ setRawContent, setIsOpenBrowseIconsModal }) => {
  // We need some inline style here to make the placeholder looks good when installing block from the inserter for the first time
  const style = {
    width: "100%",
    padding: "0.5rem",
    lineHeight: "28px",
    border: "1px solid #1e1e1e",
    borderRadius: "2px",
  };

  return (
    <div className="svg-placeholder" style={style}>
      <HStack
        spacing={2}
        wrap
        justify="flex-start"
        className="svg-placeholder__inner"
        expanded={false}
        style={{ width: "fit-content" }}
      >
        <div className="block-icon" style={{ display: "flex" }}>
          <BlockIcon width={36} height={36} />
        </div>
        <SVGUploadControl onChange={setRawContent} />
        <Button
          variant="primary"
          onClick={() => {
            setIsOpenBrowseIconsModal(true);
          }}
        >
          {__("Browse library", "svg-block")}
        </Button>
      </HStack>
    </div>
  );
};

export default Placeholder;
