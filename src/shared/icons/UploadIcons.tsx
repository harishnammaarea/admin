import { IconTypes } from "./Icon";

export default function UploadIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{fontSize,transform:`rotate(${rotate}deg)`,width:"1em",height:"1em"}}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M18.5 20L18.5 14M18.5 14L21 16.5M18.5 14L16 16.5" stroke={color} strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
      <path d="M12 19H5C3.89543 19 3 18.1046 3 17V7C3 5.89543 3.89543 5 5 5H9.58579C9.851 5 10.1054 5.10536 10.2929 5.29289L12 7H19C20.1046 7 21 7.89543 21 9V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>)
}