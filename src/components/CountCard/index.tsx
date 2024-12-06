import clsx from "clsx";
import { ReactNode } from "react";
import CommonCard from "shared/components/CommonCard";

interface CountCardProps {
  className?: string
  children: ReactNode
}

export default function CountCard({ className, children }: CountCardProps) {
  return (
    <CommonCard className={clsx("count-card-container", className)}>
      {children}
    </CommonCard>
  )
}  