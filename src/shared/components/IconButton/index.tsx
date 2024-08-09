import clsx from "clsx"
import React, { ReactElement } from "react"
import { IconButton } from "rsuite"

interface IconButtonProps {
  icon: ReactElement
  size?: "sm" | "md" | "lg" | "xs"
  classname?: string
  appearnace?: "default" | "primary" | "link" | "subtle" | "ghost"
  onClick?(): void
  disbaled?: boolean
}


export default React.forwardRef<HTMLElement, IconButtonProps>(function WritiffyIconButton({ disbaled, appearnace = "primary", icon, size = "md", classname, onClick }: IconButtonProps, ref) {
  return (
    <IconButton
      style={{ backgroundColor: "#ffffff" }}
      icon={icon}
      className={clsx("icon-button-wrapper", classname)}
      appearance={appearnace}
      size={size}
      onClick={onClick}
      disabled={disbaled}
      ref={ref}
    />
  )
})