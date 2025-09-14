import styled from "styled-components";
import LoginForm from "../features/auth/LoginForm";
import Heading from "../ui/Heading";

const LoginLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

function Login() {
  return (
    <LoginLayout>
      <Heading as="h2">Log in to your account</Heading>

      <LoginForm />
    </LoginLayout>
  );
}

export default Login;
