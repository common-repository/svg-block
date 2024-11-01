/**
 * External dependencies
 */
import styled from "@emotion/styled";

/**
 * WordPress dependencies
 */
import { __experimentalVStack as VStack } from "@wordpress/components";

const VStackStyled = styled(VStack)`
  > * {
    margin-bottom: 0 !important;
  }

  // Trim the margin of the last paragrap
  .components-base-control {
    p:last-of-type {
      margin-bottom: 0;
    }
  }
`;
export default VStackStyled;
