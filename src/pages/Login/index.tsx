import history from "App/History";
import { NotifierContext } from "App/Notifier";
import LoginContainer, { FormProps, Role } from "components/LoginContainer";
import { DEFAULT_API_ERROR, TOKEN_NAME, } from "core/constants/Defaults";
import { areaAdminLoginApi } from "core/services/auth";
import { useContext } from "react";

export default function Login() {
  const { showNotification } = useContext(NotifierContext)

  async function handleOnLogin(values: FormProps & Role) {
    const { role, email, password } = values

    if (role === "super-admin") {
      const response = await areaAdminLoginApi({ email, password })
      if (response.data && response.status) {
        showNotification({ type: "success", message: "Successfully logged In", title: "Success" })
        history.replace("/overview")
        localStorage.setItem(TOKEN_NAME, response.data.token)
      } else {
        showNotification({ type: "error", message: response.message || DEFAULT_API_ERROR, title: "Error" })
      }
    }
  }

  return (
    <>
      <div className="login-page-main-container-bg-image"></div>
      <div className="login-page-main-container">
      </div>
    </>
  )
}