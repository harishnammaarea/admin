import clsx from "clsx";
import { ReactNode } from "react";
import { Panel } from "rsuite";

interface CommonCardProps {
  className?: string
  children: ReactNode
  bodyFill?: boolean
  borderd?: boolean
  shaded?: boolean
  collapsible?: boolean
  header?: string
  onClick?():void
}

export default function CommonCard({ className, header = "", children, bodyFill = false, borderd = false, shaded = true, collapsible = false,onClick }: CommonCardProps) {
  return (
    <Panel className={clsx("common-card-main-container", className)}
      bodyFill={bodyFill}
      bordered={borderd}
      shaded={shaded}
      collapsible={collapsible}
      header={header}
      onClick={onClick}
    >
      {children}
    </Panel>
  )
}