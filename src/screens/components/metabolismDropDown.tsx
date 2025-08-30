import { JSX } from "preact/jsx-runtime";
import { forwardRef } from "preact/compat";
import { DropDown, BaseOptionComponent } from "./dropDown";
import { THEME } from "src/constants";
import { Group } from "./positionComponents";
import styled from "styled-components";

const MetabolismOptionComponent = styled(BaseOptionComponent)<{ locked?: boolean }>`
  justify-content: space-between;
  > div > img {
    height: 100%;
  }
  > div > span {
    font-size: 1.5em;
  }
  > span {
    font-size: 0.7em;
    color: var(--abcl-metabolism-multiplier-text);
    bottom: 0.5em;
    position: absolute;
    right: 0.5em;
    line-height: 0.7em;
  }
`;
export type MetabolismBarProps = {
  value: MetabolismSetting;
  setValue: (value: MetabolismSetting) => void;
  locked?: boolean;
  setLocked?: (locked: boolean) => void;
  opaqueLock?: boolean;
} & JSX.IntrinsicElements["div"];

export const MetabolismBar = forwardRef<HTMLDivElement, MetabolismBarProps>(({ value, setValue, locked, setLocked, opaqueLock, ...props }, ref) => (
  <DropDown
    OptionComponent={MetabolismOptionComponent}
    locked={locked}
    options={[
      { value: "Disabled", children: <MetabolismOption value="0.0" label="Disabled" icon="disabled" /> },
      { value: "Slow", children: <MetabolismOption value="0.5" label="Slow" icon="slow" /> },
      { value: "Normal", children: <MetabolismOption value="1.0" label="Normal" icon="normal" /> },
      { value: "Fast", children: <MetabolismOption value="1.5" label="Fast" icon="fast" /> },
      { value: "Faster", children: <MetabolismOption value="2.0" label="Faster" icon="faster" /> },
      { value: "Fastest", children: <MetabolismOption value="3.0" label="Fastest" icon="fastest" /> },
    ]}
    value={value}
    setValue={setValue as (value: string) => void}
    {...props}
    ref={ref}
    opaqueLock={opaqueLock}
    setLocked={setLocked}
  />
));

export type MetabolismOption = {
  value: string;
  label: string;
  icon: string;
};

export function MetabolismOption({ value, label, icon }: MetabolismOption): JSX.Element {
  return (
    <>
      <Group $wrap={false} $gap="0">
        <img src={publicURL + `/icons/${icon}-metabolism-${THEME}.svg`} alt={label} />
        <span>{label}</span>
      </Group>
      <span>🞫{value}</span>
    </>
  );
}
