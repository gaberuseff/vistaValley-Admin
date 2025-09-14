import styled, {css} from "styled-components";

const Heading = styled.h1`
  ${(props) =>
    props.as === "h1" &&
    css`
      font-size: 3.4rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h2" &&
    css`
      font-size: 2.8rem;
      font-weight: 500;
    `}
  ${(props) =>
    props.as === "h3" &&
    css`
      font-size: 2.4rem;
      font-weight: 500;
    `}

  line-height: 1.2;
  color: var(--color-grey-700);
  margin-bottom: 3rem;
`;

export default Heading;
