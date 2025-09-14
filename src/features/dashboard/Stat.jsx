import styled from "styled-components";

const StyledStat = styled.div`
  /* Card */
  position: relative;
  background-color: ${(p) =>
    p.$variant === "primary"
      ? "var(--color-brand-600)"
      : "var(--color-grey-0)"};
  border: 1px solid
    ${(p) =>
      p.$variant === "primary" ? "transparent" : "var(--color-grey-100)"};
  border-radius: 3rem;
  padding: 2.2rem;
  box-shadow: 0 6px 14px rgba(16, 24, 40, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const Icon = styled.div`
  width: 5.2rem;
  height: 5.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) =>
    p.$variant === "primary"
      ? "rgba(255,255,255,0.2)"
      : `color-mix(in srgb, var(--color-${p.color}-100) 85%, transparent)`};
  border: 1px solid
    ${(p) =>
      p.$variant === "primary"
        ? "rgba(255,255,255,0.25)"
        : `var(--color-${p.color}-100)`};
  margin-bottom: 0.4rem;

  & svg {
    width: 3rem;
    height: 3rem;
    color: ${(p) =>
      p.$variant === "primary" ? "#fff" : `var(--color-${p.color}-700)`};
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: ${(p) =>
    p.$variant === "primary" ? "#e6eaff" : "var(--color-grey-500)"};
`;

const Value = styled.p`
  font-size: 3.2rem;
  line-height: 1.1;
  font-weight: 700;
  color: ${(p) =>
    p.$variant === "primary" ? "#ffffff" : "var(--color-grey-700)"};
`;

function Stat({icon, title, value, color, variant}) {
  return (
    <StyledStat $variant={variant}>
      <Icon color={color} $variant={variant}>
        {icon}
      </Icon>
      <Title $variant={variant}>{title}</Title>
      <Value $variant={variant}>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
