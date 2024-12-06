import { IconTypes } from "./Icon";

export default function SearchIcon({ className, fontSize = "1.6rem", color = "#000000", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ fontSize, width: "1em", height: "1em", transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M11 6C13.7614 6 16 8.23858 16 11M16.6588 16.6549L21 21M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
