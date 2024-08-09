import { FC } from "react"
import { Form, Radio } from "rsuite"
import FormControl from "rsuite/esm/FormControl"
import FormControlLabel from "rsuite/esm/FormControlLabel"

interface Meta {
  touched?: boolean,
  error?: string
}

interface ComponentProps {
  label?: string,
  disabled?: boolean,
  input?: any,
  helperText?: string,
  className?: string
  meta?: Meta
  formGroupClassName?: string
  formControlLabelClassName?: string
  value?: string | number
}

const CustomRadioButton = ({ input, value }: ComponentProps) => {
  return (
    <Radio {...input} value={value}>{value}</Radio>
  )
}

const RadioWithLabel: FC<ComponentProps> = ({
  formControlLabelClassName,
  formGroupClassName,
  label,
  input,
  value,
  meta
}) => {
  return (
    <Form.Group controlId="radio" className={formGroupClassName}>
      <FormControlLabel className={formControlLabelClassName}>{label}</FormControlLabel>
      <FormControl
        name="radio"
        accepter={CustomRadioButton}
        input={input}
        value={value}
        errorMessage={meta?.touched && meta?.error}
      />
    </Form.Group>
  )
}

export default RadioWithLabel

