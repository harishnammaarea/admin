import { IconTypes } from "./Icon";

export default function FilterIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 16 16"
      fill="none"
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M0 3H16V1H0V3Z" fill={color} />
      <path d="M2 7H14V5H2V7Z" fill={color} />
      <path d="M4 11H12V9H4V11Z" fill={color} />
      <path d="M10 15H6V13H10V15Z" fill={color} />
    </svg>)
}