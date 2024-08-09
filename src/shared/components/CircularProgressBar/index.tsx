import clsx from "clsx";
import { Progress } from "rsuite";

interface CircularProgressBarProps {
  containerClassName?: string
  className?: string
  percentage?: number
  showInfo?: boolean
  status?: 'success' | 'fail' | 'active'
  strokeColor?: string
  width?:number
}

export default function WritiffyCircularProgressBar({ containerClassName,
  className,
  showInfo = false,
  status = "active",
  width=120,
  strokeColor = "#5449f0",
  percentage = 0 }: CircularProgressBarProps) {
  const style = {
    width: width,
    display: "inline-block",
  };

  return (<div className={clsx("circular-progress-bar-container", containerClassName)}>
    <Progress.Circle
      style={style}
      className={clsx("circular-progress-bar", className)}
      showInfo={showInfo}
      percent={percentage}
      status={status}
      strokeColor={strokeColor}
    />
  </div>)
}