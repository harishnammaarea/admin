import { IconTypes } from "./Icon";

export default function BookIcon({ color = "#000000", rotate = 0, fontSize = "1.6rem", className }: IconTypes) {

    return (
        <svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            style={{ fontSize, width: "1em", height: "1em", transform: `rotate(${rotate}deg)` }}
        >
            <path className={className} fillRule="evenodd" clipRule="evenodd" d="M5 4C5 3.44772 5.44772 3 6 3V21C5.44772 21 5 20.5523 5 20V4ZM8 21V3H19V21H8ZM7 23H6C4.34315 23 3 21.6569 3 20V4C3 2.34315 4.34315 1 6 1H7H19C20.1046 1 21 1.89543 21 3V21C21 22.1046 20.1046 23 19 23H7Z" fill={color} />
        </svg>
    )

}