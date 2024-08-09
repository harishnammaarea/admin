import { SelectOptions } from "core/models/Options";
import { FC } from "react";
import { CheckPicker, InputGroup } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import FormHelpText from "rsuite/esm/FormHelpText";

interface ComponentProps {
  className?: string
  formControlLabelClassName?: string
  label?: string
  disabled?: boolean
  input?: any
  size?: "lg" | "md" | "sm" | "xs";
  placeholder?: string
  helperText?: string
  readOnly?: boolean
  meta?: Meta
  cleanable?: boolean
  searchable?: boolean
  data: SelectOptions[] | []
}

interface Meta {
  touched?: boolean
  error?: string
}


const CustomCheckerPicker: FC<ComponentProps> = ({ input, data, disabled, readOnly, size, placeholder, cleanable, searchable }) => {
  return (
    <CheckPicker
      {...input}
      data={data}
      placeholder={placeholder}
      readOnly={readOnly}
      disabled={disabled}
      size={size}
      block
      cleanable={cleanable}
      countable={false}
      searchable={searchable}
      preventOverflow={true}
    />)
}

const CheckerSelectWithLabel: FC<ComponentProps> = ({ className,
  formControlLabelClassName,
  label,
  disabled = false,
  input,
  placeholder = "",
  helperText = "",
  size = "md",
  readOnly = false,
  meta,
  cleanable = true,
  searchable = false,
  data = []
}) => {

  if (!input.value) {
    input.value = []
  }

  return (
    <FormGroup>
      <FormControlLabel className={formControlLabelClassName}>{label}</FormControlLabel>
      <InputGroup inside>
        <FormControl
          style={{ width: "100%" }}
          name="CheckerPicker"
          disabled={disabled}
          input={input}
          size={size}
          placeholder={placeholder}
          accepter={CustomCheckerPicker}
          readOnly={readOnly}
          errorMessage={meta?.touched && meta.error}
          className={className}
          cleanable={cleanable}
          searchable={searchable}
          data={data}
        />
        {helperText && <FormHelpText>{helperText}</FormHelpText>}
      </InputGroup>
    </FormGroup>
  )
};

export default CheckerSelectWithLabel;
