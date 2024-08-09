import React, { FC } from "react";
import { Input } from "rsuite";
import FormControl from "rsuite/esm/FormControl"
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import FormHelpText from "rsuite/esm/FormHelpText";

interface Meta {
  touched: boolean,
  error: string
}

interface ComponentProps {
  label?: string,
  disabled: boolean,
  rows: number,
  input: any,
  type: string,
  placeholder: string
  meta?: Meta,
  helperText?: string
  formControlLabelClassname?:string
}

const CustomTextArea: FC<ComponentProps> = ({ placeholder = "", input, type, disabled, rows }: ComponentProps) => (
  <Input
    as="textarea"
    {...input}
    type={type}
    disabled={disabled}
    rows={rows}
    placeholder={placeholder}
    style={{width:"100%",outline:"none",resize:"none"}}
  />
);

export const TextArea: FC<ComponentProps> = (props: ComponentProps) => {
  const { formControlLabelClassname,label, disabled, rows = 3, input, type = "text", placeholder = "input", meta, helperText = "", } = props

  return (
    <FormGroup>
      <FormControlLabel className={formControlLabelClassname}>{label}</FormControlLabel>
      <FormControl
        accepter={CustomTextArea}
        rows={rows}
        disabled={disabled}
        type={type}
        errorMessage={meta?.touched && meta?.error}
        placeholder={placeholder}
        input={input}
        name="textarea"
      />
      {helperText &&
        <FormHelpText>{helperText}</FormHelpText>
      }
    </FormGroup>
  )

}