import clsx from "clsx"
import { SelectOptions } from "core/models/Options"
import { FC } from "react"
import { FieldRenderProps } from "react-final-form"
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
  options: SelectOptions[],
  label?: string,
  size?: "lg" | "md" | "sm" | "xs",
  placeholder?: string,
  disabled?: boolean,
  input?: any,
  helperText?: string,
  className?: string
  meta?: Meta
  searchable?: boolean
  formGroupClassName?: string
  formControlLabelClassName?: string
}

const CustomSelect: FC<ComponentProps> = ({ options, size, placeholder, disabled, input, className, searchable }) => {

  return (
    <SelectPicker
      block
      data={options}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      preventOverflow={true}
      searchable={searchable}
      {...input}
    />
  )
}

const SelectWithlabel: FC<FieldRenderProps<string> & ComponentProps> = ({
  formControlLabelClassName,
  options = [],
  label = "",
  size = "md",
  placeholder = "",
  input,
  disabled,
  helperText = "",
  className,
  meta,
  searchable = false,
  formGroupClassName }) => {
  return (
    <FormGroup className={formGroupClassName} style={{ overflow: "visible" }}>
      <FormControlLabel className={clsx(formControlLabelClassName, "common-form-label")}>{label}</FormControlLabel>
      <FormControl
        name="select"
        size={size}
        accepter={CustomSelect}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        searchable={searchable}
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