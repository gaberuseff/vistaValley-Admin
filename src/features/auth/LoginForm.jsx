import {useState} from "react";
import Button from "../../ui/Button";
import Error from "../../ui/Error";
import Form from "../../ui/Form";
import FormRowVertical from "../../ui/FormRowVertical";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import useLogin from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("dev.gaber@gmail.com");
  const [password, setPassword] = useState("22222222");
  const [error, setError] = useState(null);

  const {login, isLoggingIn} = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return setError("Please fill in all fields");

    login({email, password});
  }

  return (
    <Form onSubmit={handleSubmit} type="regular">
      <FormRowVertical label="Email address">
        <Input
          type="email"
          id="email"
          autoComplete="username"
          value={email}
          disabled={isLoggingIn}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRowVertical>
      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isLoggingIn}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRowVertical>

      {error && (
        <FormRowVertical>
          <Error message={error} />
        </FormRowVertical>
      )}

      <FormRowVertical>
        <Button size="large" variations="primary" disabled={isLoggingIn}>
          {!isLoggingIn ? "Login" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
