import clsx from "clsx";
import { ChangeEvent } from "react";
import { Radio } from "rsuite";
import { ValueType } from "rsuite/esm/Radio";

interface NammaAreaRadioTileProps {
  className?: string
  checked: boolean
  value: ValueType
  color?: 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'violet';
  disabaled?: boolean
  inline?: boolean
  onChange?(value: string, checked: boolean, event: ChangeEvent): void
}

export default function NammaAreaRadio({
  inline = true,
  className,
  checked,
  value,
  color = "blue",
  disabaled = false }: NammaAreaRadioTileProps) {
  return (
    <Radio
      checked={checked}
      value={value}
      disabled={disabaled}
      color={color}
      inline={inline}
      className={clsx(className, "namma-area-radio-title")}
    />
  )
}