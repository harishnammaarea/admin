import { IconTypes } from "./Icon";

export default function BusinessIcon({ className, fontSize = "1.6rem", color = "#000000", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 1024 1024"
      fill={color}
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      version="1.1" >
      <path fill={color} d="M48.91 526.083h-39.047v458.365h1001.585v-458.365h-39.047zM691.728 206.87c-7.731-93.19-85.909-166.721-181.074-166.721s-173.344 73.53-181.074 166.721h-319.721v277.138h1001.585v-277.138h-319.721zM368.69 206.87c7.575-71.657 68.337-127.674 141.966-127.674s134.389 56.016 141.966 127.674h-283.929z" />
    </svg>)
}