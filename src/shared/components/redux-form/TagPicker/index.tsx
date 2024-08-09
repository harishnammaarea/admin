import { SelectOptions } from "core/models/Options"
import { FC, useState } from "react"
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

const CustomTagPicker: FC<ComponentProps> = ({ data, size, placeholder, disabled, input, className }) => {
  const [selectedValues, setSelectedValues] = useState([])
  input.value = [...selectedValues]
  return (
    <TagPicker
      {...input}
      block
      data={data}
      style={{ width: "100%", border: "1px solid #e5e5ea", borderRadius: "0.6rem" }}
      size={size}
      placeholder={placeholder}
      disabled={disabled}
      className={className}
      preventOverflow={true}
      onChange={(value) => { setSelectedValues(value) }}
    />
  )
}

const TagPickerWithlabel: FC<ComponentProps> = ({
  formControlLabelClassName,
  data = [],
  label, size = "md",
  placeholder = "",
  input,
  disabled,
  helperText = "",
  className,
  meta,
  formGroupClassName }) => {

  return (
    <FormGroup className={formGroupClassName}>
      <FormControlLabel className={formControlLabelClassName}>{label}</FormControlLabel>
      <FormControl
        name="select"
        size={size}
        accepter={CustomTagPicker}
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


export default TagPickerWithlabel