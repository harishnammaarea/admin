import { IconTypes } from "./Icon";

export default function SectionsIcon({ className, fontSize = "1.6rem", color = "#000000", rotate = 0 }: IconTypes) {
  return (
    <svg
      fill="#000000"
      className={className}
      style={{ fontSize, width: "1em", height: "1em", transform: `rotate(${rotate}deg)` }}
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      enableBackground="new 0 0 24 24">
      <path d="M2,3v18c0,0.6,0.4,1,1,1h5V2H3C2.4,2,2,2.4,2,3z M21,2H10v20h11c0.6,0,1-0.4,1-1V3C22,2.4,21.6,2,21,2z" /></svg>)
}