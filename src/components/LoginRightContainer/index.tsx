import clsx from "clsx"
import logo from "assets/icons/namma-area-logo.png";
import NammaAreaRadioTile from "shared/components/NammaAreaRadioTileGroup";
import AdminIcon from "shared/components/Admin";
import { RadioTileGroup } from "rsuite";

interface LoginRightContainerProps {
  className?: string
}

export default function LoginRightContainer({ className }: LoginRightContainerProps) {
  return (
    <div className={clsx('login-right-container-main-wrapper', className)}>
      <img src={logo} alt="" width={170} height={30} />
      <h3>Welcome! please provide the below details.</h3>
      <RadioTileGroup inline={true}>
        <NammaAreaRadioTile
          value="Super Admin"
          icon={<AdminIcon fontSize="3rem" />}
          label="Super admin?"
          onSelect={(value) => { console.log(value) }} />
        <NammaAreaRadioTile
          value="Super Admin"
          icon={<AdminIcon fontSize="3rem" />}
          label="Area Admin?"
          onSelect={(value) => { console.log(value) }} />
      </RadioTileGroup>
    </div>)
}