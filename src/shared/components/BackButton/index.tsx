import history from "App/History";
import UseIsMobile from "core/hooks/IsMobile";
import { IconButton } from "rsuite";
import BackIcon from "shared/icons/BackIcon";

export default function BackButton() {
  const isMobile = UseIsMobile();

  function routeBack() {
    history.goBack()
  }

  return (
    <div className="desktop-back-button-wrapper">
      <IconButton
        onClick={routeBack}
        className="desktop-back-icon-btn"
        icon={<BackIcon color="#5449f0" fontSize={isMobile ? "2.2rem" : "3.2rem"} />}
      />
    </div>
  );
}
