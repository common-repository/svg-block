/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */

/**
 * Internal dependencies
 */
import { GroupControl } from "../../group-control";

export const BorderRadiusControlStyled = styled(GroupControl)`
  .group-control__body {
    > *:nth-of-type(3) {
      order: 2;
    }

    .components-input-control__input {
      height: 40px;
    }
  }
`;
