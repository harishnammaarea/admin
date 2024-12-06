import { ReactNode, useContext, useEffect, useState } from "react"
import { Container } from "rsuite"
import SideBar from "./Sidebar"
import CommonHeader from "./Header"
import { getDecodedToken } from "core/helpers/storage"
import history from "App/History"
import { NotifierContext } from "App/Notifier"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<string>("");
  const { showNotification } = useContext(NotifierContext)
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    const userDetails = getDecodedToken()
    if (!userDetails) {
      history.replace("/login")
      showNotification({ message: "", title: "Login to continue", type: "info" })
    }
    else {
      const { name } = userDetails;
      setUser(name)
      setIsLoggedIn(true)
    }
  }, [user, showNotification])

  return (
    <Container className="app-main-container">
      {isLoggedIn &&
        <>
            <SideBar />
          <div className="app-component-container">
            <CommonHeader user={user} />
            {children}
          </div>
        </>
      }
    </Container>
  )
}