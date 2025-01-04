import clsx from "clsx"
import logo from "assets/icons/namma-area-logo.png";
import NammaAreaRadioTile from "shared/components/NammaAreaRadioTileGroup";
import AdminIcon from "shared/components/Admin";
import { Form, RadioTileGroup } from "rsuite";
import LocationIcon from "shared/icons/Location";
import InputWithLabel from "shared/components/redux-form/InputWithLabel";
import Button from "shared/components/Button";
import ProfileIcon from "shared/icons/ProfileIcon";
import { useContext, useState } from "react";
import OpenEyeIcon from "shared/icons/OpenEye";
import { PRIMARY_COLOR } from "core/constants/styles";
import ClosedEyeIcon from "shared/icons/ClosedEye"
import { Link } from "react-router-dom";
import { validate } from "./validate";
import bgImage from "assets/background/top-view-meals-tasty-yummy-different-pastries-dishes-brown-surface-min-min.jpg";
import { NotifierContext } from "App/Notifier";
import { Field, Form as FinalForm } from "react-final-form";
import ArrowWithLineIcon from "shared/icons/ArrowWithLineIcon";

interface LoginContainerProps {
  className?: string
  onLogin(values: FormProps & Role): void
}

export interface FormProps {
  email: string
  password: string
}

export type Role = { role: string | number }


export default function LoginContainer({ className, onLogin }: LoginContainerProps) {
  const [passwordShow, setPaswordShow] = useState<boolean>(false)
  const [role, setRole] = useState<string | number>("super-admin")
  const { showNotification } = useContext(NotifierContext)

  function handleFormSubmit(values: FormProps) {
    if (!role) {
      showNotification({ message: "Please select your role", title: "Select Role", type: "error" })
      return
    }

    const credentials = { ...values, role }
    onLogin(credentials)
  }

  return (
    <div className="login-container-image-wrapper-container">
      <img src={bgImage} alt="" className="login-container-bg-image" />
      <div
        className={clsx('login-container-left-wrapper', className)}>
        <img src={logo} alt="" width={170} height={30} />
        <h3>Welcome! please provide the below details.</h3>
        <RadioTileGroup defaultValue="super-admin" inline={true} onChange={value => { setRole(value) }}>
          <NammaAreaRadioTile
            value="super-admin"
            icon={<AdminIcon fontSize="3rem" color="#5449f0" />}
            label="Super admin?"
          />
          <NammaAreaRadioTile
            value="delivery-contractor"
            icon={<LocationIcon fontSize="3rem" color="#5449f0" />}
            label="Delivery Contractor?"
          />
        </RadioTileGroup>
        <div className="login-container-login-form-container">
          <FinalForm
            onSubmit={handleFormSubmit}
            validate={validate}
            render={({ handleSubmit }) => (
              <Form fluid onSubmit={() => { handleSubmit() }}>
                <Field
                  name="email"
                  component={InputWithLabel}
                  label="Email"
                  placeholder="Enter your Email "
                  icon={<ProfileIcon color={PRIMARY_COLOR} />}
                />
                <div className="login-container-form-submit-button-container">
                  <Button
                    icon={<ArrowWithLineIcon color="#ffffff" rotate={180} />}
                    iconPosition="end"
                    label="Log in"
                    type="submit"
                    className="login-container-form-submit-button" />
                </div>
              </Form>
            )}
          />
        </div>
      </div>
    </div>)
}

