import styled from "styled-components";

const Spinner = styled.div`
  width: 50px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 8px solid #0000;
  border-right-color: var(--color-blue-600);
  position: relative;
  animation: l24 1s infinite linear;
  margin-left: auto;
  margin-right: auto;

  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 2s;
  }
  &:after {
    animation-duration: 4s;
  }
  @keyframes l24 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export default Spinner;
