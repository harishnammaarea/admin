import clsx from "clsx";
import { Divider } from "rsuite";

interface WritiffyDividerProps {
  className?: string
  vertical?: boolean
}

export default function NammaAreaDivider({ className, vertical = false }: WritiffyDividerProps) {
  return (<Divider vertical={vertical} className={clsx("writiffy-divider", className)} />)
}