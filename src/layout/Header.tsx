import history from "App/History";
import clsx from "clsx";
import { Header } from "rsuite";
import CommonPopover from "shared/components/CommonPopover";
import IconButton from "shared/components/IconButton";
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon";
import ProfileIcon from "shared/icons/ProfileIcon";
interface CommonHeaderProps {
  user: string,
  className?: string
}

export default function CommonHeader({ user, className }: CommonHeaderProps) {
  function handleLogout() {
    localStorage.removeItem("user_token")
    history.replace("/login")
  }

  return (
    <Header className={clsx("common-header-wrapper", className)}>
      <div className="common-header-left-container">
        <IconButton
          onClick={() => { history.goBack() }}
          icon={<ArrowWithLineIcon fontSize="2rem" />}
          classname="common-header-left-container-back-icon" />
      </div>
      <div className="common-header-profile-container">
        <CommonPopover popOverContent={<p onClick={handleLogout}>Logout</p>}>
          <p className="common-header-profile-icon" onClick={handleLogout}>
            <ProfileIcon />
          </p>
        </CommonPopover>
      </div>
    </Header>
  )
}