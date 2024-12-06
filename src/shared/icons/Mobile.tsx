import { IconTypes } from "./Icon";

export default function MobileIcon({ className, fontSize = "1.6rem", color = "#000000", rotate = 0 }: IconTypes) {
  return (
    <svg
      fill={color}
      className={className}
      style={{ width: "1em", height: "1em", transform: `rotate(${rotate}deg)`, fontSize }}
      height="800px"
      width="800px" version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32" xmlSpace="preserve">
      <path fill={color} d="M26.5,3.1c-0.8-0.8-1.9-1.2-2.9-1c-0.9,0.1-1.8,0.7-2.6,1.5c-1.8,1.8-2,4-0.5,5.6c0.1,0.1,0.1,0.1,0.2,0.2
      c-0.4,0.5-0.9,0.9-1.4,1.4c-0.1-0.1-0.1-0.1-0.2-0.2c0,0,0,0,0,0C17.6,9,15.4,9.2,13.6,11c-1.8,1.8-2,4-0.5,5.6
      c0.9,0.9,2.2,1.4,3.6,1.4c1,0,2-0.3,2.8-0.8c2.9-1.9,5.7-4.8,7.7-7.7C28.4,7.6,28.1,4.7,26.5,3.1z"/>
      <path d="M21,19c-0.6,0-1,0.4-1,1v2H8V5c0-0.6,0.4-1,1-1h9c0.6,0,1-0.4,1-1s-0.4-1-1-1H9C7.3,2,6,3.3,6,5v22c0,1.7,1.3,3,3,3h10
      c1.7,0,3-1.3,3-3v-7C22,19.4,21.6,19,21,19z M15,27h-2c-0.6,0-1-0.4-1-1s0.4-1,1-1h2c0.6,0,1,0.4,1,1S15.6,27,15,27z"/>
    </svg>)
}