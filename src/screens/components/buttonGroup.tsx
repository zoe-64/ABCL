import { JSX } from "preact";
import { forwardRef } from "preact/compat";
import styled from "styled-components";
import { LockWidget } from "./lockWidget";
const ButtonGroupComponent = styled.div<JSX.IntrinsicElements["div"] & { locked?: boolean }>`
  display: flex;
  align-items: center;
  width: fit-content;
  button {
    background-color: var(--abcl-element);
    color: var(--abcl-text);
    border: None;
    border-top: var(--abcl-border);
    border-bottom: var(--abcl-border);
    height: 100%;
    padding: 0 0.5em;
    cursor: ${props => (props.locked ? "not-allowed" : "pointer")};
  }
  button:first-child {
    border-left: var(--abcl-border);
  }
  button:last-child {
    border-right: var(--abcl-border);
  }
  button[data-selected="true"] {
    background-color: var(--abcl-selected-background);
    color: var(--abcl-selected-text);
    cursor: ${props => (props.locked ? "not-allowed" : "default")};
  }
`;
export type ButtonGroupProps = {
  options: string[];
  value: string;
  setValue: (value: string) => void;
  locked?: boolean;
  opaqueLock?: boolean;
  setLocked?: (locked: boolean) => void;
} & JSX.IntrinsicElements["div"];

export const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>(({ options, value, setValue, locked, opaqueLock, setLocked, ...props }, ref) => (
  <>
    <ButtonGroupComponent {...props} ref={ref} locked={locked && opaqueLock}>
      {options.map((option, i) => (
        <button key={i} data-selected={option === value} onClick={() => (locked && opaqueLock ? null : setValue(option))} disabled={locked}>
          {option}
        </button>
      ))}
    </ButtonGroupComponent>
    <LockWidget locked={locked} opaque={opaqueLock} setLocked={setLocked} size={2} noBorderLeft />
  </>
));
