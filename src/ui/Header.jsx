import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/auth/UserAvatar";

const StyledHeader = styled.header`
  padding: 1.4rem 2rem;
  background-color: var(--color-grey-50);

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
