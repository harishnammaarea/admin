import { IconTypes } from "./Icon";

export default function CheckRadioIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 19.5C16.1421 19.5 19.5 16.1421 19.5 12C19.5 7.85786 16.1421 4.5 12 4.5C7.85786 4.5 4.5 7.85786 4.5 12C4.5 16.1421 7.85786 19.5 12 19.5ZM12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" fill={color} />
      <circle cx="12" cy="12" r="5.25" fill={color} />
    </svg>)
}