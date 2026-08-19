import { JSX } from "preact/compat";
import styled from "styled-components";

export const Group = styled.div<{ gap?: string; wrap?: boolean } & JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: row;
  gap: ${props => props.gap || "0.5em"};
  ${props => (props.wrap !== false ? "flex-wrap: wrap;" : "")}
`;

export const Stack = styled.div<{ gap?: string; wrap?: boolean } & JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: column;
  gap: ${props => props.gap || "0.5em"};
  ${props => (props.wrap !== false ? "flex-wrap: wrap;" : "")}
`;
