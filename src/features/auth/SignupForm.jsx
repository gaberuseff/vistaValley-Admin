import {useForm} from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: {errors},
  } = useForm();
  const {signup, isSigningUp} = useSignup();

  function onSubmit({fullName, email, password}) {
    signup(
      {fullName, email, password},
      {
        onSettled: () => {
          reset();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errors={errors?.fullName}>
        <Input
          type="text"
          id="fullName"
          disabled={isSigningUp}
          {...register("fullName", {required: "Full name is required"})}
        />
      </FormRow>

      <FormRow label="Email address" errors={errors?.email}>
        <Input
          type="email"
          id="email"
          disabled={isSigningUp}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errors={errors?.password}>
        <Input
          type="password"
          id="password"
          disabled={isSigningUp}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" errors={errors?.passwordConfirm}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isSigningUp}
          {...register("passwordConfirm", {
            required: "Password confirmation is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
        />
      </FormRow>

      <FormRow>
        <Button variations="secondary" size="medium" type="reset">
          Cancel
        </Button>
        <Button variations="primary" size="medium" disabled={isSigningUp}>
          {isSigningUp ? "Creating user..." : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
