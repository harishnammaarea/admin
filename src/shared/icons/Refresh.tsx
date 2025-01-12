import { IconTypes } from "./Icon";

export default function RefreshIcon({ className, color = "#000000", rotate = 0, fontSize = "1.6rem" }: IconTypes) {
  return (
    <svg
      fill={color}
      width="800px"
      height="800px"
      color={color}
      viewBox="0 0 24 24"
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
      id="update">
      <path fill={color} d="M5,12A7,7,0,0,1,16.89,7H14a1,1,0,0,0,0,2h5.08A1,1,0,0,0,20,8V3a1,1,0,0,0-2,0V5.32A9,9,0,0,0,3,12a1,1,0,0,0,2,0Z"></path><path d="M20,11a1,1,0,0,0-1,1A7,7,0,0,1,7.11,17H10a1,1,0,0,0,0-2H4.92A1,1,0,0,0,4,16v5a1,1,0,0,0,2,0V18.68A9,9,0,0,0,21,12,1,1,0,0,0,20,11Z">
      </path>
    </svg>)
}