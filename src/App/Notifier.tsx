import { Notification } from "core/models/Notfication";
import { FC, createContext } from "react";
import { Notification as Notifier, useToaster } from "rsuite";

interface NotifierProps {
  children?: React.ReactNode;
}

export const NotifierContext = createContext({
  showNotification: ({ message, title, type }: Notification) => {
    console.log(`Dummy Notification ${message} ${type} ${title}`)
  },
})

export const NotifierProvider: FC<NotifierProps> = ({ children }) => {
  const toaster = useToaster()
  const showNotification = ({ message, title, type }: Notification) => {
    toaster.push
      (<Notifier type={type} header={title}>
        <p>{message}</p>
      </Notifier>, { duration: 4000, placement: "topEnd" })
  }

  return (
    <NotifierContext.Provider value={{ showNotification }}>
      {children}
    </NotifierContext.Provider>
  )
}