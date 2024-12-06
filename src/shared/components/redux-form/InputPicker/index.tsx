import { SelectOptions } from "core/models/Options"
import { InputPicker } from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import FormControlLabel from "rsuite/esm/FormControlLabel"
import FormGroup from "rsuite/esm/FormGroup"
import FormHelpText from "rsuite/esm/FormHelpText"

interface ComponentProps {
  input?: any
  label?: string
  data: SelectOptions[]
  placeholder?: string
  meta?: Meta
  disabled?: boolean
  size?: "lg" | "md" | "sm" | "xs",
  helperText?: string
  className?: string
  formControlLabelClassName?: string
  readOnly?: boolean
  constantValue?: string
}

interface Meta {
  error: string
  touched: boolean
}

const CustomInputPicker = ({ data, input, disabled, size, placeholder, readOnly }: ComponentProps) => {
  return (
    <InputPicker
      data={data}
      {...input}
      preventOverflow={true}
      size={size}
      disabled={disabled}
      placeholder={placeholder}
      block
      readOnly={readOnly}
    />)
}

const InputPickerWithLable: React.FC<ComponentProps> = ({
  input,
  label,
  data,
  placeholder = "",
  meta,
  disabled = false,
  size = "md",
  helperText = "",
  className,
  formControlLabelClassName,
  readOnly = false,
  constantValue = ""
}: ComponentProps) => {
  if (constantValue) {
    input.value = constantValue
  }

  return (
    <FormGroup className={className}>
      <FormControlLabel className={formControlLabelClassName}>{label}</FormControlLabel>
      <FormControl
        name="inputPicker"
        accepter={CustomInputPicker}
        data={data}
        input={input}
        errorMessage={meta?.touched && meta?.error}
        placeholder={placeholder}
        disabled={disabled}
        size={size}
        readOnly={readOnly}
      />
      {helperText &&
        <FormHelpText>{helperText}</FormHelpText>
      }
    </FormGroup>
  )
}

export default InputPickerWithLable