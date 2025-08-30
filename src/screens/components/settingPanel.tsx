import { forwardRef, JSX, PropsWithChildren } from "preact/compat";
import styled from "styled-components";
import { Group } from "./positionComponents";

const SettingPanelComponent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5em;
  background: var(--abcl-element);
  gap: 0.25em;
  width: fit-content;
  flex: 1 0 9em;
  max-width: 100%;
  h2 {
    margin: 0;
    font-size: 3.5vmin;
    text-wrap: nowrap;
    color: var(--abcl-text);
  }
`;

export type SettingPanelProps = {
  title: string;
} & JSX.IntrinsicElements["div"] &
  PropsWithChildren;

export const SettingPanel = forwardRef<HTMLDivElement, SettingPanelProps>(({ title, children, ...props }, ref) => (
  <SettingPanelComponent {...props} ref={ref}>
    <h2>{title}</h2>
    <Group gap="0" wrap={false}>
      {children}
    </Group>
  </SettingPanelComponent>
));
