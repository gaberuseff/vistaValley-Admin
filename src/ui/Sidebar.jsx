import styled from "styled-components";

import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  grid-row: 1 / -1;
  gap: 3.2rem;
  background-color: var(--color-grey-0);

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  padding: 4rem 2rem;
  margin: 1em 2rem;
  border-radius: var(--border-radius-xl);
  box-shadow: var(--shadow-sm);
`;

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />

      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
