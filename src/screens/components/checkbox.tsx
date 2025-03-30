import { h } from "preact";
export default function Checkbox({ checked, setChecked, label }: { checked: boolean; setChecked: (checked: boolean) => void; label: string }): h.JSX.Element {
  return (
    <div style={{ display: "flex", alignItems: "center", width: "fit-content", padding: "10px 10px", whiteSpace: "nowrap" }}>
      <input type="checkbox" checked={checked} onChange={e => setChecked((e.target as HTMLInputElement).checked)} />
      <p style={{ marginLeft: "5px" }}>{label}</p>
    </div>
  );
}
