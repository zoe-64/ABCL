import { h, JSX } from "preact";
import styled from "styled-components";
const ButtonGroupComponent = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 5px 0;
  button {
    background-color: var(--tmd-element, rgb(145, 145, 145));
    color: var(--tmd-text, #fff);
    border: 1px solid var(--tmd-element, #262626);
    padding: 5px;
    cursor: pointer;
  }

  button[data-selected="true"] {
    background-color: var(--tmd-accent, rgb(0, 0, 0));
  }

  p {
    margin-right: 10px;
  }
`;
export default function ButtonGroup({
  options,
  value,
  setValue,
  label,
}: {
  options: string[];
  value: string;
  setValue: (value: string) => void;
  label: string;
}): h.JSX.Element {
  return (
    <ButtonGroupComponent>
      <p>{label}</p>
      {options.map((option, i) => (
        <button key={i} data-selected={option === value} onClick={() => setValue(option)}>
          {option}
        </button>
      ))}
    </ButtonGroupComponent>
  );
}
