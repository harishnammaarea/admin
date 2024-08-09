import { IconTypes } from "./Icon";

export default function ArrowWithLineIcon({ className, color = "#000000", rotate = 0, fontSize = "1.6rem" }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 32 32"
      className={className}
      style={{ fontSize, transform: `rotate(${rotate}deg)`, width: "1em", height: "1em" }}
      xmlns="http://www.w3.org/2000/svg">
      <path fill={color} d="M26.025 14.496l-14.286-.001 6.366-6.366L15.979 6 5.975 16.003 15.971 26l2.129-2.129-6.367-6.366h14.29z" />
    </svg>)
}