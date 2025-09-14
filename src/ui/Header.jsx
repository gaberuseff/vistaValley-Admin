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

const StyleMessage = styled.div`
  font-size: 1.7rem;
  color: var(--color-grey-100);
  background-color: var(--color-blue-800);
  border-radius: var(--border-radius-md);
  padding: 0.4rem 0.8rem;
`;

function Header() {
  return (
    <StyledHeader>
      <UserAvatar />
      <StyleMessage>
        Modification in this app is disabled for security reasons 🤷‍♂️.
      </StyleMessage>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
