import { h } from "preact";

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
    <div style={{ display: "flex", alignItems: "center", width: "fit-content", padding: "5px 0" }}>
      <p style={{ marginRight: "10px" }}>{label}</p>
      {options.map((option, i) => (
        <button
          key={i}
          style={{
            backgroundColor: option === value ? "var(--tmd-accent,rgb(0, 0, 0))" : "var(--tmd-element,rgb(145, 145, 145))",
            color: "var(--tmd-text, #fff)",
            border: "1px solid var(--tmd-element, #262626)",
            padding: "5px",
            cursor: "pointer",
          }}
          onClick={() => setValue(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
