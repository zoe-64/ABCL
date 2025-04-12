import { h } from "preact";
import "./buttonGroup.css";

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
    <div className="ABCL-group">
      <p>{label}</p>
      {options.map((option, i) => (
        <button key={i} className={`ABCL-group-button ${value === option && "ABCL-group-button-selected"}`} onClick={() => setValue(option)}>
          {option}
        </button>
      ))}
    </div>
  );
}
