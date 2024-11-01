/**
 * WordPress dependencies
 */
import { registerBlockType, registerBlockVariation } from "@wordpress/blocks";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./style.scss";

/**
 * Internal dependencies
 */
import edit from "./edit";
import save from "./save";
import { ReactComponent as BlockIcon } from "./assets/block-icon.svg";
import { variations } from "./variations";
import metadata, { name as blockName } from "./block.json";
import deprecated from "./deprecated";

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType(metadata, {
  icon: BlockIcon,
  example: {
    attributes: {
      content:
        '<svg viewBox="0 0 135.467 135.467"><rect width="135.467" height="135.467" ry="28.004" fill="#d20962"/><path d="M19.16 67.43a17.574 15.443 0 0 1-5.17-10.956c0-8.56 7.901-15.498 17.637-15.498 9.74 0 17.64 6.938 17.64 15.498h-10.33c0-3.545-3.275-6.418-7.31-6.418a7.303 6.417 0 0 0-5.169 10.951h.005c1.323 1.167 2.424 1.504 5.164 1.886 4.873.445 9.28 1.736 12.472 4.54a17.58 15.448 0 0 1 5.169 10.958c0 8.559-7.9 15.501-17.641 15.501-9.736 0-17.636-6.942-17.636-15.501h10.332c0 3.545 3.27 6.422 7.304 6.422a7.312 6.425 0 0 0 7.31-6.422 7.286 6.402 0 0 0-2.137-4.534h-.005c-1.322-1.162-3.22-1.563-5.168-1.881v-.005c-4.723-.636-9.276-1.736-12.468-4.541Zm65.382-26.454L72.065 93.892h-10.33L49.267 40.976h10.33l7.312 30.991 7.3-30.99zm17.641 21.917h17.637v15.498h.004c0 8.56-7.9 15.502-17.64 15.502-9.742 0-17.637-6.942-17.637-15.502V56.475h-.004c0-8.56 7.899-15.498 17.64-15.498 9.736 0 17.637 6.938 17.637 15.498h-10.333a7.31 6.423 0 0 0-7.304-6.42 7.307 6.42 0 0 0-7.304 6.42V78.39a7.304 6.419 0 0 0 14.608.004v-6.419h-7.304z" fill="#fff" stroke-width=".155"/></svg>',
    },
  },
  deprecated,
  edit,
  save,
});

// Register variations.
variations.forEach(({ name, title, description, attributes, icon }) => {
  registerBlockVariation(blockName, {
    name,
    title,
    description,
    attributes,
    icon,
  });
});
