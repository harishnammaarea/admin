import { IconTypes } from "./Icon";

export default function ThreeLinesIcon({ className, color = "#000000", rotate = 0, fontSize = "1.6rem" }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      viewBox="0 0 24 24"
      fill="none">
      <path d="M4 6H20M4 12H20M4 18H20" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>)
}