import clsx from "clsx";
import { ReactNode } from "react";
import { RadioTile } from "rsuite";

interface NammaAreaRadioTileProps {
  className?: string
  groupClassName?: string
  label: string,
  message?: string
  icon?: ReactNode
  inline?: boolean
  value: string | number
  onSelect(value: string | number): void
}

export default function NammaAreaRadioTile({ className, icon, message, value, label, }: NammaAreaRadioTileProps) {
  return (
    <RadioTile label={label}
      className={clsx(className, "namma-area-radio-title")}
      icon={icon}
      value={value}>
      {message}
    </RadioTile>
  )
}