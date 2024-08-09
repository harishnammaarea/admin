import { IconTypes } from "./Icon";

export default function RightArrowIcon({ className, fontSize = "1.6rem", rotate = 0, color = "#000000" }: IconTypes) {
  return (<svg
    width="800px"
    height="800px"
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    style={{ fontSize, transform: `rotate(${rotate}deg)`, width: "1em", height: "1em" }}
    xmlns="http://www.w3.org/2000/svg">
    <path d="M10 7L15 12L10 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round" />
  </svg>)
}