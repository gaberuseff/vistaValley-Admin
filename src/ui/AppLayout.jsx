import {Outlet} from "react-router-dom";
import styled from "styled-components";
import Header from "./Header";
import Sidebar from "./Sidebar";

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 30rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  width: 100%;

  background-color: var(--color-grey-50);
`;

const Main = styled.main`
  overflow: auto;
  padding: 2.4rem;
  background-color: var(--color-grey-50);
`;

export const Container = styled.div`
  max-width: 90%;
  margin: 0 auto;
`;

function AppLayout() {
  return (
    <StyledLayout>
      <Header />

      <Sidebar />

      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledLayout>
  );
}

export default AppLayout;
