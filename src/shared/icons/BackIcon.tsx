import { IconTypes } from "./Icon";

export default function BackIcon({ color = "#000000", fontSize = "1.6rem", rotate = 0, className = '' }: IconTypes) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            style={{ fontSize, transform: `rotate(${rotate}deg)`, width: '1em', height: '1em' }}
            className={className}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 9L8 12M8 12L11 15M8 12L16 12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}