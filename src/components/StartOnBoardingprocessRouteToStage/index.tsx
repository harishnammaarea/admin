import clsx from "clsx"
import { Link } from "react-router-dom"
import Button from "shared/components/Button"
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon"

interface StartOnBoardingProcessRouteToStageProps {
  className?: string,
  previousStage?: Stages,
  nextStage: Stages,
  disablePrevious?: boolean,
}

type Stages = "basic-details"
  | "location-details"
  | "owner-details"
  | "bank-details"
  | "cover-photos"
  | "opening-hours"

export default function StartOnBoardingProcessRouteToStage({ className, previousStage, nextStage, disablePrevious = false }: StartOnBoardingProcessRouteToStageProps) {
  return (
    <div className={clsx("start-on-boarding-process-route-to-stage-main-container")}>
      <Link to={`/onboarding/start-onboarding-process/${previousStage}`}>
        <Button label="Previous"
          disabled={disablePrevious}
          icon={<ArrowWithLineIcon color="#ffffff" />}
          iconPosition="start" />
      </Link>
      <Button label="Next"
        icon={<ArrowWithLineIcon
          color="#ffffff"
          rotate={180} />}
        iconPosition="end"
        type="submit"
      />
    </div>)
}