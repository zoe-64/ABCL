import { h, JSX } from "preact";
import styled from "styled-components";
const CheckboxComponent = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 0.7%;
  white-space: nowrap;

  input {
    height: 100%;
    aspect-ratio: 1/1;
    width: auto;
  }

  p {
    margin: 0.35%;
  }
`;
export default function Checkbox({ checked, setChecked, label }: { checked: boolean; setChecked: (checked: boolean) => void; label: string }): h.JSX.Element {
  return (
    <CheckboxComponent>
      <input type="checkbox" checked={checked} onChange={e => setChecked((e.target as HTMLInputElement).checked)} />
      <p style={{ marginLeft: "5px" }}>{label}</p>
    </CheckboxComponent>
  );
}
