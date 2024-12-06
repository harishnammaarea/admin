import { IconTypes } from "./Icon";

export default function EditIcon({ className, color = "#000000", fontSize = "1.6rem", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      className={className}
      style={{ fontSize, width: "1em", height: "1em", transform: `rotate(${rotate}deg)` }}
      viewBox="0 -0.5 21 21" >
      <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -400.000000)" fill={color}>
          <g id="icons" transform="translate(56.000000, 160.000000)">
            <path d="M61.9,258.010643 L45.1,258.010643 L45.1,242.095788 L53.5,242.095788 L53.5,240.106431 L43,240.106431 L43,260 L64,260 L64,250.053215 L61.9,250.053215 L61.9,258.010643 Z M49.3,249.949769 L59.63095,240 L64,244.114985 L53.3341,254.031929 L49.3,254.031929 L49.3,249.949769 Z" id="edit-[#1479]">
            </path>
          </g>
        </g>
      </g>
    </svg>)
}