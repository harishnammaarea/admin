import clsx from "clsx"
import React from "react"
import { Divider } from "rsuite"
import CommonCard from "shared/components/CommonCard"

interface StepProgressBarProps {
  className?: string
  active: number
  totalSteps: Data[]
}

type Data = {
  title: string
}

export default function StepProgressBar({ className, totalSteps, active }: StepProgressBarProps) {
  return (
    <CommonCard className={clsx("step-progress-bar-wrapper", className)}>
      {totalSteps.map((step, index) => (
        <React.Fragment key={index}>
          <div className="step-progress-bar-step-container">
            <h3 className={clsx("step-progress-bar-count-container", active === index + 1 && "step-progress-bar-count-active")}>{index + 1}</h3>
            <p className={clsx("step-progress-bar-title", active === index + 1 && "step-progress-bar-title-active")}>{step.title}</p>
            {index < (totalSteps.length - 1) &&
              <Divider className="step-progress-bar-divider" color="red" />
            }
          </div>
        </React.Fragment>
      ))}
    </CommonCard>)
}