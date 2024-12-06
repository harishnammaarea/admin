import history from "App/History"
import { getDecodedToken } from "core/helpers/storage"
import { useEffect } from "react"


export default function LandingPage() {

  useEffect(() => {
    checkUserIsLoggedIn()
  }, [])

  function checkUserIsLoggedIn() {
    const token = getDecodedToken()
    if (token) {
      history.replace("/overview")
    }
    else {
      history.push("/login")
    }
  }

  return (
    <div className="landing-page-main-container">
      Landing page
      <button onClick={() => { history.push("/login") }}>redirect</button>
    </div>)
}