import clsx from "clsx";
import Button from "shared/components/Button";
import CommonCard from "shared/components/CommonCard";
import adminLogo from "assets/illus/welcome-admin.png";
import UseIsMobile from "core/hooks/IsMobile";
import { Link } from "react-router-dom";
import AddIconCircularIcon from "shared/icons/AddIconCircularIcon";
import LocationIcon from "shared/icons/Location";
import { Roles } from "core/models/Token";

interface WelcomeCardProps {
  className?: string,
  name: string
  role: Roles
}

export default function WelcomeCard({ className, name, role }: WelcomeCardProps) {
  const isMobile = UseIsMobile()

  function handleRightContainerView() {
    return (
      <div className="welcome-card-right-container">
        <img src={adminLogo} alt="" width={150} height={150} />
      </div>)
  }

  return (
    <>
      <CommonCard innerContainerClassName="welocome-card-inner-container"
        className={clsx("welcome-card-main-container", className)}>
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
            <Link to="/restaurants/create-restaurant">
              <Button label="Create a restaurant"
                icon={<AddIconCircularIcon color="#ffffff" fontSize="2rem" />}
              />
            </Link>
            {role === "super_admin" &&
              <Link to="/area-admin/add-area-admin">
                <Button label="Add a area admin"
                  icon={<LocationIcon color="#ffffff" fontSize="2rem" />}
                />
              </Link>
            }
          </div>
        </div>
        {!isMobile && handleRightContainerView()}
      </CommonCard>
    </>
  )
}