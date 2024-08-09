import { IconTypes } from "shared/icons/Icon";

export default function AdminIcon({ className, fontSize = "1.6rem", rotate = 0, color = "#000000" }: IconTypes) {
  return (
    <svg
      fill="#000000"
      height="800px"
      width="800px"
      className={className}
      style={{ width: "1em", height: "1em", fontSize, transform: `rotate(${rotate}deg)` }}
      version="1.1" id="Layer_1"
      viewBox="0 0 512 512" enableBackground="new 0 0 512 512" xmlSpace="preserve">
      <path fill={color} d="M448,362.7l-117.3-21.3C320,320,320,310.7,320,298.7c10.7-10.7,32-21.3,32-32c10.7-32,10.7-53.3,10.7-53.3
   c5.5-8,21.3-21.3,21.3-42.7s-21.3-42.7-21.3-53.3C362.7,32,319.2,0,256,0c-60.5,0-106.7,32-106.7,117.3c0,10.7-21.3,32-21.3,53.3
   s15.2,35.4,21.3,42.7c0,0,0,21.3,10.7,53.3c0,10.7,21.3,21.3,32,32c0,10.7,0,21.3-10.7,42.7L64,362.7C21.3,373.3,0,448,0,512h512
   C512,448,490.7,373.3,448,362.7z"/>
    </svg>
  )
}