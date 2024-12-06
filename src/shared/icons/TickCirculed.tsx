import { IconTypes } from "./Icon";

export default function TickCircledIcon({ className, color = "#000000", rotate = 0, fontSize = "1.6rem" }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 20 20"
      className={className}
      style={{ fontSize, transform: `rotate(${rotate}deg)`, width: "1em", height: "1em" }}
      xmlns="http://www.w3.org/2000/svg">
      <rect x="0" fill="none" width="20" height="20" />
      <g>
        <path fill={color} d="M10 2c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm-.615 12.66h-1.34l-3.24-4.54 1.34-1.25 2.57 2.4 5.14-5.93 1.34.94-5.81 8.38z" />
      </g>
    </svg>)
}