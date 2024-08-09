import { IconTypes } from "./Icon";

export default function RemoveOutlinedIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      className={className}
      style={{ fontSize, transform: `rotate(${rotate}deg)`, width: "1em", height: "1em" }}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Edit / Remove_Minus_Circle">
        <path id="Vector" d="M8 12H16M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>)
}