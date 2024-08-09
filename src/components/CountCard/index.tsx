import clsx from "clsx";
import CommonCard from "shared/components/CommonCard";

interface CountCardProps {
  className?: string
  title: string
}

export default function CountCard({ className, title }: CountCardProps) {
  return (
    <CommonCard className={clsx("count-card", className)}>
      <h1>{title}</h1>
    </CommonCard>
  )
}  