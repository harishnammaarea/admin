import clsx from "clsx"
import { SelectOptions } from "core/models/Options"
import { FC } from "react"
import { FieldRenderProps } from "react-final-form"
import { TagPicker } from "rsuite"
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
  formGroupClassName?: string
  formControlLabelClassName?: string
  placement?:
  | "bottomStart"
  | "bottomEnd"
  | "topStart"
  | "topEnd"
  | "leftStart"
  | "leftEnd"
  | "rightStart"
  | "rightEnd"
  | "auto"
  | "autoVerticalStart"
  | "autoVerticalEnd"
  | "autoHorizontalStart"
  | 'autoHorizontalEnd';
}

const CustomTagPicker: FC<ComponentProps> = ({ options, placement, size, placeholder, disabled, input, className }) => {

  return (
    <TagPicker
      {...input}
      block
      data={options}
      style={{ width: "100%", border: "1px solid #e5e5ea", borderRadius: "0.6rem" }}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      preventOverflow={true}
      placement={placement}
    />
  )
}

const TagPickerWithlabel: FC<FieldRenderProps<string | number[]> & ComponentProps> = ({
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
  placement = "autoVerticalStart",
  formGroupClassName }) => {

  return (
    <FormGroup className={formGroupClassName}>
      <FormControlLabel className={clsx(formControlLabelClassName, "common-form-label")}>{label}</FormControlLabel>
      <FormControl
        name="select"
        size={size}
        accepter={CustomTagPicker}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        input={input}
        placement={placement}
        className={className}
        errorMessage={meta?.touched && meta?.error}
      />
      {
        helperText && <FormHelpText>{helperText}</FormHelpText>
      }
    </FormGroup>
  )
}


export default TagPickerWithlabel