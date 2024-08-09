import clsx from "clsx";
import { ReactNode, forwardRef } from "react";
import { Button } from "rsuite";
interface WritiffyButtonProps {
  disabled?: boolean,
  autoFocus?: boolean,
  label: ReactNode,
  type?: "button" | "reset" | "submit",
  onClick?(): void,
  className?: string
  appearance?: "default" | "primary" | "link" | "subtle" | "ghost"
  icon?: ReactNode
  iconPosition?: "start" | "end"
}

export default forwardRef<HTMLButtonElement,WritiffyButtonProps>(function WritiffyButton({ icon, iconPosition = "start", className, disabled = false, autoFocus = false, label, type = "button", onClick, appearance = "primary" }: WritiffyButtonProps,ref) {

  const renderButton = () => (
    <Button
      className={clsx("writiffy-button-wrapper", className)}
      disabled={disabled}
      autoFocus={autoFocus}
      onClick={onClick}
      appearance={appearance}
      type={type}
      ref={ref}
    >
      {label}
    </Button>
  )

  const renderButtonWithIcon = () => {
    if (iconPosition === "start") {
      return (<Button
        className={clsx("writiffy-button-wrapper", className)}
        disabled={disabled}
        autoFocus={autoFocus}
        onClick={onClick}
        appearance={appearance}
        type={type}
        startIcon={icon}
        ref={ref}
      >
        {label}
      </Button>)
    }

    else {
      return (
        <Button
          className={clsx("writiffy-button-wrapper", className)}
          disabled={disabled}
          autoFocus={autoFocus}
          onClick={onClick}
          appearance={appearance}
          type={type}
          ref={ref}
          endIcon={icon}
        >
          {label}
        </Button>)
    }
  }
  return (
    <>
      {icon ? renderButtonWithIcon() : renderButton()}
    </>
  )
})