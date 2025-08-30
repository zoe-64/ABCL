import { JSX } from "preact";
import { Dispatch, forwardRef } from "preact/compat";
import { THEME } from "src/constants";
import styled from "styled-components";
import { LockWidget } from "./lockWidget";
const CheckboxComponent = styled.div<JSX.IntrinsicElements["div"] & { locked?: boolean }>`
  display: flex;
  height: fit-content;
  aspect-ratio: 1/1;
  width: 2.1em;
  background-color: var(--abcl-element-indentation);
  user-select: none;
  cursor: ${props => (props.locked ? "not-allowed" : "pointer")};
  img {
    height: 100%;
    width: auto;
    pointer-events: none;
  }
`;

export type CheckboxProps = {
  checked: boolean;
  setChecked: Dispatch<boolean>;
  locked?: boolean;
  opaqueLock?: boolean;
  setLocked?: Dispatch<boolean>;
  showLock?: boolean;
} & JSX.IntrinsicElements["div"];

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(({ checked, setChecked, locked, opaqueLock, setLocked, showLock = true, ...props }, ref) => (
  <>
    <CheckboxComponent {...props} ref={ref} onClick={() => (locked && opaqueLock ? null : setChecked(!checked))} locked={locked && opaqueLock}>
      {checked ? (
        <img src={publicURL + `/icons/checkmark-${THEME}.svg`} alt="checkmark" />
      ) : (
        <img src={publicURL + `/icons/crossmark-${THEME}.svg`} alt="crossmark" />
      )}
    </CheckboxComponent>
    {showLock && <LockWidget locked={locked} opaque={opaqueLock} setLocked={setLocked} />}
  </>
));
