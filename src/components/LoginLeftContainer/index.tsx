import clsx from "clsx"

interface LoginLeftContainerProps {
  className?: string
}

export default function LoginLeftContainer({ className }: LoginLeftContainerProps) {
  return (
    <div className={clsx("login-left-container-main-wrapper", className)}>
      left
    </div>)
}