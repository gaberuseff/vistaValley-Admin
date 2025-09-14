import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/auth/UpdateUserDataForm";
import UpdatePasswordForm from "../features/auth/UpdatePasswordForm";

function Account() {
  return (
    <>
      <Heading>Account</Heading>

      <Row type="vertical">
        <Heading as="h3">Update account</Heading>
        <UpdateUserDataForm />
      </Row>

      <Row type="vertical">
        <Heading as="h3">Update Password</Heading>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
