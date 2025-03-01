export function drawCheckbox(
  left: number,
  top: number,
  width: number,
  height: number,
  text: string,
  isChecked: boolean,
  isDisabled: boolean = false,
  textColor = "Black",
  textLeft: number = 10,
  textTop: number = 45
): void {
  DrawText(text, left + textLeft, top + textTop, textColor, "Gray");
  DrawButton(left, top, width, height, "", isDisabled ? "#ebebe4" : "White", isChecked ? "Icons/Checked.png" : "", undefined, isDisabled);
}
