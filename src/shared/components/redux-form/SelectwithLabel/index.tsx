import { SelectOptions } from "core/models/Options"
import { FC } from "react"
import { SelectPicker } from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import FormControlLabel from "rsuite/esm/FormControlLabel"
import FormGroup from "rsuite/esm/FormGroup"
import FormHelpText from "rsuite/esm/FormHelpText"

interface Meta {
  touched?: boolean,
  error?: string
}

interface ComponentProps {
  data: SelectOptions[],
  label?: string,
  size?: "lg" | "md" | "sm" | "xs",
  placeholder?: string,
  disabled?: boolean,
  input?: any,
  helperText?: string,
  className?: string
  meta?: Meta
  formGroupClassName?: string
  formControlLabelClassName?: string
}

const CustomSelect: FC<ComponentProps> = ({ data, size, placeholder, disabled, input, className }) => {
  return (
    <SelectPicker
      block
      data={data}
      style={{ width: "100%", border: "1px solid #e5e5ea", borderRadius: "0.6rem" }}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      preventOverflow={true}
      {...input}
    />
  )
}

const SelectWithlabel: FC<ComponentProps> = ({ formControlLabelClassName
  , data = [],
  label, size = "md",
  placeholder = "",
  input,
  disabled,
  helperText = "",
  className,
  meta,
  formGroupClassName }) => {
  return (
    <FormGroup className={formGroupClassName} style={{overflow:"visible"}}>
      <FormControlLabel className={formControlLabelClassName}>{label}</FormControlLabel>
      <FormControl
        name="select"
        size={size}
        accepter={CustomSelect}
        data={data}
        placeholder={placeholder}
        disabled={disabled}
        input={input}
        className={className}
        errorMessage={meta?.touched && meta?.error}
      />
      {
        helperText && <FormHelpText>{helperText}</FormHelpText>
      }
    </FormGroup>
  )
}


export default SelectWithlabel