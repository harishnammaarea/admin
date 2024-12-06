import { IconTypes } from "./Icon";

export default function RemoveWithBorderIcon({ className, rotate = 0, fontSize = "1.6rem", color = "#000000" }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      className={className}
      style={{ width: "1em", height: "1em", transform: `rotate(${rotate}deg)`, fontSize }}
      fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z" fill={color} />
      <path d="M16 11C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H16Z" fill={color} />
    </svg>)
}