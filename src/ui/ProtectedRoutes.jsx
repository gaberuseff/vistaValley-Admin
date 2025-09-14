import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import useUser from "../features/auth/useUser";
import Spinner from "../ui/Spinner";

const FullPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: var(--color-grey-50);
`;

function ProtectedRoutes({children}) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const {isUserLoading, isAuthenticated} = useUser();

  // 2. If there is NO authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isUserLoading) navigate("/login");
  }, [isAuthenticated, isUserLoading, navigate]);

  // 3. If there is loading, show a spinner
  if (isUserLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there IS a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoutes;
