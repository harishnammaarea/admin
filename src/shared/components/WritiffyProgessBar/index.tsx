import clsx from "clsx"
import { Progress } from "rsuite"

interface WritiffyProgressBarProps {
  className?: string
  percentage: number
  status?: "success" | "fail" | "active"
  strokeColor?: string
  vertical?: boolean
  showInfo?: boolean
}

export default function WritiffyProgressBar({ className,
  vertical = false,
  percentage, status = "active",
  strokeColor = "#5449f0",
  showInfo = false
}: WritiffyProgressBarProps) {
  return (<Progress.Line
    className={clsx("progress-bar", className)}
    vertical={vertical}
    percent={percentage}
    status={status}
    showInfo={showInfo}
    strokeColor={strokeColor}
  />)
}