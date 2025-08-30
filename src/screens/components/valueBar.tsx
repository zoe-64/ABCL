import { h } from "preact";

export function ValueBar({
  value,
  label,
  color = "#FFFFFF",
  foreground = "#000000",
  format = value => (value * 100).toFixed(0),
}: {
  value: number;
  label: string;
  color?: string;
  foreground?: string;
  format?: (value: number) => string;
}): h.JSX.Element {
  return (
    <div class="value-bar no-resize">
      <div
        style={{
          background: foreground,
          width: "100%",
          height: "10px",
        }}
      >
        <div
          style={{
            background: color,
            width: `${value * 100}%`,
            height: "100%",
            maxWidth: "100%",
          }}
        />
      </div>
      <p class="value-bar-label">{label}</p>
      <p class="value-bar-value">{format(value)}%</p>
    </div>
  );
}
