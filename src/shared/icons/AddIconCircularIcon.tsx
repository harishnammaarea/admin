import { IconTypes } from "./Icon";

export default function AddIconCircularIcon({ className, fontSize = "1.6rem", rotate = 90, color = "#000000" }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ fontSize, transform: `rotate(${rotate}deg)`, width: "1em", height: "1em" }}
      xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round" />
    </svg>)
}