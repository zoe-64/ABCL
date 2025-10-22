import styled from "@emotion/styled";
import { h, JSX } from "preact";

const ValueBarContainer = styled.div<JSX.IntrinsicElements["div"]>`
  background-color: rgb(255, 255, 255);
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  gap: 0.25em;
  > p {
    color: #000000;
    font-weight: bold;
    font-size: 1.2em;
  }
  > div {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-direction: row;
    height: 1.3em;
    background-color: rgb(230, 230, 230);
  }
  .bar-section {
    background-color: ${props => props.color};
    height: 100%;
    width: ${props => props.value * 100}%;
    align-content: center;
    padding-left: 0.2em;
    > p {
      color: #fff;
    }
    min-width: 2.5em;
  }
  .striped-bar-section {
    background-color: ${props => props.color};
    height: 100%;
    width: ${props => props.altBar * 100}%;
    opacity: 0.5;
    height: 1.3em;
    z-index: 2;
  }
  .striped-section {
    background-image: repeating-linear-gradient(135deg, rgba(255, 170, 170, 0.5), rgba(255, 170, 170, 0.5) 5px, transparent 5px, transparent 10px);
    height: 100%;
    width: ${props => props.limit * 100}%;
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export function ValueBar({ value, label, color, stripedSection }: { value: number; label: string; color?: string; stripedSection?: number }): h.JSX.Element {
  let alternative = 0;
  let bar = value;
  const max = 1 - (stripedSection ?? 0);
  if (bar > max) {
    alternative = value - max;
    bar = max;
  }
  return (
    <ValueBarContainer color={color} limit={stripedSection} value={bar} altBar={alternative}>
      <p>{label}</p>
      <div>
        <div class="bar-section">
          <p>{Math.round(value * 100)}%</p>
        </div>
        <div class="striped-bar-section"></div>
        <div class="striped-section"></div>
      </div>
    </ValueBarContainer>
  );
}
