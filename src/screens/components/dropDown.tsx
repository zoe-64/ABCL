import { useEffect, useRef, useState } from "preact/hooks";
import { JSX } from "preact/jsx-runtime";
import { forwardRef } from "preact/compat";
import styled from "styled-components";
import { LockWidget } from "./lockWidget";

const DropDownComponent = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: fit-content;
  > button {
    background: var(--abcl-element);
    border: var(--abcl-border);
    padding: 0;
  }
  > div:first-child {
    border-top: var(--abcl-border);
  }
`;

export const BaseOptionComponent = styled.div<JSX.IntrinsicElements["div"] & { locked?: boolean }>`
  height: 2.5em;
  display: flex;
  justify-content: center;
  line-height: 2.5em;
  width: 11em;
  background: var(--abcl-element);
  border: 0.1em solid var(--abcl-border-color);
  border-top: 0;
  position: relative;
  cursor: ${props => (props.locked ? "not-allowed" : "pointer")};
  user-select: none;
`;
const OptionList = styled.div<JSX.IntrinsicElements["div"]>`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 100%;
  z-index: 11;
`;

export type DropDownOption = {
  children: JSX.Element;
  value: string;
};

export type DropDownProps = {
  options: DropDownOption[];
  value: string;
  setValue: (value: string) => void;
  OptionComponent?: typeof BaseOptionComponent;
  locked?: boolean;
  opaqueLock?: boolean;
  setLocked?: (locked: boolean) => void;
};

export const DropDown = forwardRef<HTMLDivElement, DropDownProps>(
  ({ options, value, setValue, OptionComponent = BaseOptionComponent, locked, opaqueLock, setLocked, ...props }, ref) => {
    const [open, setOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (listRef.current && !listRef.current.contains(event.target as Node)) {
          setOpen(false);
        }
      };

      if (open) {
        document.addEventListener("mousedown", handleClickOutside);
      }

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [open]);

    return (
      <>
        <DropDownComponent {...props} ref={ref}>
          <OptionComponent locked={locked && opaqueLock} onClick={() => (locked && opaqueLock ? null : setOpen(!open))}>
            {options.find(option => option.value === value)?.children}
          </OptionComponent>
          {open && (
            <OptionList ref={listRef}>
              {options
                .filter(option => option.value !== value)
                .map((option, i) => (
                  <OptionComponent
                    key={i}
                    data-selected={option.value === value}
                    onClick={() => {
                      setValue(option.value);
                      setOpen(!open);
                    }}
                  >
                    {option.children}
                  </OptionComponent>
                ))}
            </OptionList>
          )}
        </DropDownComponent>
        <LockWidget locked={locked} opaque={opaqueLock} setLocked={setLocked} size={2.3} noBorderLeft />
      </>
    );
  },
);
