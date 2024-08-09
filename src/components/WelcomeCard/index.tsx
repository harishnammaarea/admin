import clsx from "clsx";
import Button from "shared/components/Button";
import CommonCard from "shared/components/CommonCard";
import adminLogo from "assets/illus/welcome-admin.png";
import UseIsMobile from "core/hooks/IsMobile";
import { Link } from "react-router-dom";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";

interface WelcomeCardProps {
  className?: string,
  name: string
}

export default function WelcomeCard({ className, name }: WelcomeCardProps) {
  const isMobile = UseIsMobile()

  function handleRightContainerView() {
    return (
      <div className="welcome-card-right-container">
        <img src={adminLogo} alt="" width={150} height={150} />
      </div>)
  }

  return (
    <CommonCard className={clsx("welcome-card-main-container", className)}>
      {isMobile && handleRightContainerView()}
      <div className="welcome-card-left-container">
        <p className="welcome-card-left-container-text-one">
          Hi
          <span>{name},</span>
        </p>
        <p className="welcome-card-left-container-text-two">
          "Welcome aboard! We're thrilled to have you join our team,
          and your presence marks the beginning of an exciting journey together."
        </p>
        <div className="welcome-card-action-btns-container">
          <Link to="/application-hub/add-restaurant-basic-details">
            <Button label="Start a application process"
              icon={<AddIconCircularIcon color="#ffffff" fontSize="2rem" />}
              iconPosition="end"
            />
          </Link>
        </div>
      </div>
      {!isMobile && handleRightContainerView()}
    </CommonCard>)
}