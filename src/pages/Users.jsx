import Row from "../ui/Row";
import Heading from "../ui/Heading";
import SignupForm from "../features/auth/SignupForm";

function Users() {
  return (
    <Row type="vertical">
      <Heading as="h1">Users</Heading>

      <SignupForm />
    </Row>
  );
}

export default Users;
