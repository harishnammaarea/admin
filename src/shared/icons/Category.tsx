import { IconTypes } from "./Icon";

export default function CategoryIcon({ className, fontSize = "1.6rem", color = "#000000", rotate = 0 }: IconTypes) {
  return (
    <svg
      width="800px"
      height="800px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={{ fontSize, width: "1em", height: "1em", transform: `rotate(${rotate}deg)` }}
      xmlns="http://www.w3.org/2000/svg">
      <path d="M9.04082 2.50506C8.22449 2.30304 7.20408 2.10102 6.38776 2.10102C5.57143 2.10102 4.55102 2.30304 3.73469 2.50506C3.02041 2.60607 2.5102 3.21213 2.40816 3.9192C2.30612 4.72728 2 6.34344 2 7.45455C2 8.56566 2.20408 9.97981 2.30612 10.9899C2.40816 11.697 2.91837 12.303 3.63265 12.404C4.34694 12.6061 5.46939 12.7071 6.28571 12.7071C7.10204 12.7071 8.12245 12.5051 8.93878 12.404C9.65306 12.303 10.1633 11.697 10.2653 10.9899C10.4694 9.97981 10.5714 8.56566 10.5714 7.45455C10.5714 6.34344 10.3673 4.72728 10.2653 3.9192C10.2653 3.21213 9.7551 2.60607 9.04082 2.50506Z" fill={color} />
      <path d="M20.2653 11.5958C19.551 11.3938 18.4286 11.2928 17.6123 11.2928C16.7959 11.2928 15.7755 11.4948 14.9592 11.5958C14.2449 11.6968 13.7347 12.3029 13.6327 13.01C13.4286 14.0201 13.3265 15.4342 13.3265 16.5453C13.3265 17.6564 13.5306 19.0706 13.6327 20.0807C13.7347 20.7877 14.2449 21.3938 14.9592 21.4948C15.6735 21.6968 16.7959 21.7978 17.6123 21.7978C18.4286 21.7978 19.449 21.5958 20.2653 21.4948C20.9796 21.3938 21.4898 20.7877 21.5918 20.0807C21.7959 19.0706 21.898 17.6564 21.898 16.5453C21.898 15.4342 21.7959 14.0201 21.5918 13.01C21.4898 12.3029 20.9796 11.6968 20.2653 11.5958Z" fill={color} />
      <path d="M9.14286 15.6362C8.32653 15.4342 7.30612 15.3332 6.38776 15.3332C5.46939 15.3332 4.44898 15.5352 3.63265 15.6362C3.02041 15.7372 2.5102 16.2423 2.30612 16.8483C2.10204 17.5554 2 18.1615 2 18.6665C2 19.1716 2.10204 19.6766 2.30612 20.4847C2.5102 21.0908 3.02041 21.4948 3.63265 21.6968C4.44898 21.8989 5.46939 21.9999 6.38776 21.9999C7.30612 21.9999 8.32653 21.7978 9.14286 21.6968C9.7551 21.5958 10.2653 21.0908 10.4694 20.4847C10.6735 19.7776 10.7755 19.1716 10.7755 18.6665C10.7755 18.1615 10.6735 17.6564 10.4694 16.8483C10.2653 16.1413 9.7551 15.7372 9.14286 15.6362Z" fill={color} />
      <path d="M14.8571 8.36354C15.6735 8.56557 16.6939 8.66658 17.6122 8.66658C18.5306 8.66658 19.551 8.46456 20.3673 8.36354C20.9796 8.26253 21.4898 7.75748 21.6939 7.15142C21.898 6.44435 22 5.83829 22 5.33324C22 4.82819 21.898 4.32314 21.6939 3.51506C21.4898 2.909 20.9796 2.50496 20.3673 2.30294C19.551 2.10092 18.5306 1.99991 17.6122 1.99991C16.6939 1.99991 15.6735 2.20193 14.8571 2.30294C14.2449 2.40395 13.7347 2.909 13.5306 3.51506C13.3265 4.22213 13.2245 4.82819 13.2245 5.33324C13.2245 5.83829 13.3265 6.34334 13.5306 7.15142C13.7347 7.85849 14.2449 8.26253 14.8571 8.36354Z" fill={color} />
    </svg>)
}