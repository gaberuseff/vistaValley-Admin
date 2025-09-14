import styled from "styled-components";

const SpinnerMini = styled.div`
  width: 20px;
  aspect-ratio: 1;
  border-radius: 50%;
  border: 3px solid #0000;
  border-right-color: var(--color-gray-50);
  position: relative;
  animation: l6 1s infinite linear;
  margin-left: auto;
  margin-right: auto;

  &:before,
  &:after {
    content: "";
    position: absolute;
    inset: -4px;
    border-radius: 50%;
    border: inherit;
    animation: inherit;
    animation-duration: 1s;
  }
  &:after {
    animation-duration: 2s;
  }
  @keyframes l6 {
    100% {
      transform: rotate(1turn);
    }
  }
`;

export default SpinnerMini;
