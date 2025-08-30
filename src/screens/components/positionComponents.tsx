import { JSX } from "preact/compat";
import styled from "@emotion/styled";

export const Group = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.gap || "0.5em"};
  ${props => props.wrap === false || "flex-wrap: wrap;"}
`;

export const Stack = styled.div<JSX.IntrinsicElements["div"]>`
  ${props => props.wrap === false || "flex-wrap: wrap;"}
  gap: ${props => props.gap || "0.5em"};
  display: flex;
  flex-direction: column;
`;
