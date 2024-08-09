import { IconTypes } from "./Icon";

export default function TickIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ fontSize, transform:`rotate(${rotate})deg`,width:"1em",height:"1em" }}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.89163 13.2687L9.16582 17.5427L18.7085 8"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round" />
    </svg>)
}