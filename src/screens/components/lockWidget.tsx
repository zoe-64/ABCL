import { JSX } from "preact/jsx-runtime";
import { forwardRef } from "preact/compat";
import styled from "@emotion/styled";
import { THEME } from "src/constants";

const LockWidgetComponent = styled.div<JSX.IntrinsicElements["div"] & { noBorderLeft?: boolean; size: number }>`
  display: flex;
  width: fit-content;
  aspect-ratio: 1/1;
  background: var(--abcl-element);
  border: var(--abcl-border);
  border-left: ${props => (props.noBorderLeft ? "none" : "var(--abcl-border)")};
  user-select: none;
  img {
    height: ${props => props.size ?? 1.9}em;
    width: auto;
    pointer-events: none;
  }
`;

export type LockWidgetProps = {
  locked: boolean | undefined;
  setLocked?: (locked: boolean) => void;
  opaque?: boolean;
  noBorderLeft?: boolean;
  size?: number;
} & JSX.IntrinsicElements["div"];

export const LockWidget = forwardRef<HTMLDivElement, LockWidgetProps>(({ locked, opaque = false, setLocked, noBorderLeft, size, ...props }, ref) => (
  <LockWidgetComponent
    {...props}
    ref={ref}
    data-locked={locked}
    style={{ opacity: opaque ? 1 : 0.5 }}
    onClick={() => {
      setLocked?.(!locked);
    }}
    noBorderLeft={noBorderLeft}
    size={size}
  >
    {locked ? (
      <img src={`${publicURL}/icons/locked${opaque ? "-opaque" : ""}-${THEME}.svg`} alt="locked" />
    ) : (
      <img src={`${publicURL}/icons/unlocked${opaque ? "-opaque" : ""}-${THEME}.svg`} alt="unlocked" />
    )}
  </LockWidgetComponent>
));
