import { h } from "preact";
import "./checkbox.css";
export default function Checkbox({ checked, setChecked, label }: { checked: boolean; setChecked: (checked: boolean) => void; label: string }): h.JSX.Element {
  return (
    <div className="ABCL-checkbox">
      <input type="checkbox" checked={checked} onChange={e => setChecked((e.target as HTMLInputElement).checked)} />
      <p style={{ marginLeft: "5px" }}>{label}</p>
    </div>
  );
}
