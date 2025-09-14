import styled from "styled-components";

const ErrorWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 1.2rem 0;
  color: var(--color-red-700);
  background-color: var(--color-red-100);
  border-radius: var(--border-radius-md);
  width: 100%;
`;

function Error({message = "Something went wrong."}) {
  return <ErrorWrapper>{message}!</ErrorWrapper>;
}

export default Error;
