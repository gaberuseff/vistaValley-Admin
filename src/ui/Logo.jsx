import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLogo = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  font-size: 2.2rem;
  font-weight: 600;
`;

function Logo() {
  return (
    <StyledLogo to="/">
      Vista Valley
    </StyledLogo>
  );
}

export default Logo;
