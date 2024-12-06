import clsx from "clsx";
import { SelectOptions } from "core/models/Options";
import { FC } from "react";
import { FieldRenderProps } from "react-final-form";
import {  InputGroup, MultiCascader } from "rsuite";
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
  options: SelectOptions[]
}

interface Meta {
  touched?: boolean
  error?: string
}


const CustomMultiCascadePicker: FC<ComponentProps> = ({ input, options, disabled, readOnly, size, placeholder, cleanable, searchable }) => {
  return (
    <MultiCascader
      {...input}
      data={options}
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

const MultiCasadePickerWithLabel: FC<FieldRenderProps<[]> & ComponentProps> = ({
  className,
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
  options = []
}) => {
  return (
    <FormGroup>
      <FormControlLabel className={clsx(formControlLabelClassName, "common-form-label")}>
        {label}
      </FormControlLabel>
      <InputGroup inside>
        <FormControl
          style={{ width: "100%" }}
          name="CheckerPicker"
          disabled={disabled}
          input={input}
          size={size}
          placeholder={placeholder}
          accepter={CustomMultiCascadePicker}
          readOnly={readOnly}
          errorMessage={meta?.touched && meta.error}
          className={className}
          cleanable={cleanable}
          searchable={searchable}
          options={options}
        />
        {helperText && <FormHelpText>{helperText}</FormHelpText>}
      </InputGroup>
    </FormGroup>
  )
};

export default MultiCasadePickerWithLabel;
