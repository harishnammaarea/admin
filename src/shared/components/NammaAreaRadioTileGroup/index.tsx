import clsx from "clsx";
import { ReactNode } from "react";
import { RadioTile } from "rsuite";

interface NammaAreaRadioTileProps {
  className?: string
  groupClassName?: string
  label: string,
  message?: string
  icon?: ReactNode
  disabled?: boolean
  inline?: boolean
  value: string | number
  checked?: boolean
  defaultChecked?: boolean
}

export default function NammaAreaRadioTile({ className,
  icon,
  message,
  value, label,
  disabled = false,
  defaultChecked = false,
  checked = false }: NammaAreaRadioTileProps) {
  return (
    <RadioTile label={label}
      className={clsx(className, "namma-area-radio-title")}
      icon={icon}
      checked={checked}
      disabled={disabled}
      defaultChecked={defaultChecked}
      value={value}>
      {message}
    </RadioTile>
  )
}