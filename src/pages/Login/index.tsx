import LoginLeftContainer from "components/LoginLeftContainer";
import LoginRightContainer from "components/LoginRightContainer";
import useIsDesktop from "core/hooks/isDesktop";

export default function Login() {
  const isDesktop = useIsDesktop()

  return (
    <div className="login-page-main-container">
      {isDesktop &&
        <LoginLeftContainer className="login-page-login-left-container" />
      }

      <LoginRightContainer />
    </div>
  )
}