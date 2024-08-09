import { FC, ReactNode } from "react";
import { Input, InputGroup } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import FormHelpText from "rsuite/esm/FormHelpText";

interface Meta {
  touched: boolean;
  error: string;
}

interface ComponentProps {
  label?: string;
  input?: any;
  meta?: Meta;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  icon?: ReactNode;
  helperText?: string;
  formGroupClassName?: string;
  formControlLabelClassName?: string;
  type?: "text" | "time";
  defaultValue?: string;
  onClickIcon?():void
}

const CustomInput: FC<ComponentProps> = ({
  disabled,
  input,
  readOnly,
  placeholder,
  type,
}) => {
  return (
    <Input
      style={{ outline: "none" }}
      placeholder={placeholder}
      disabled={disabled}
      {...input}
      type={type}
      autoComplete="off"
      readOnly={readOnly}
    />
  );
};

const InputWithLabel: FC<ComponentProps> = ({
  formGroupClassName,
  label,
  input,
  meta,
  disabled,
  placeholder = "",
  readOnly = false,
  type = "text",
  icon,
  helperText = "",
  defaultValue = "",
  formControlLabelClassName,
  onClickIcon
  
}) => {
  if (defaultValue) {
    input.value = defaultValue;
  }
  return (
    <FormGroup className={formGroupClassName}>
      <FormControlLabel className={formControlLabelClassName}>
        {label}
      </FormControlLabel>
      <InputGroup inside>
        <FormControl
          name="input"
          accepter={CustomInput}
          input={input}
          disabled={disabled}
          errorMessage={meta?.touched && meta?.error}
          placeholder={placeholder}
          readOnly={readOnly}
          helperText={helperText}
          type={type}
          defaultValue={defaultValue}
        />
        {icon && (
          <InputGroup.Addon
            style={{
              background: "#E3E5EA",
              color: "#5449f0",
              fontWeight: "600",
              cursor:"pointer",
              borderTopRightRadius:"6px",
              borderBottomRightRadius:"6px"
            }}
            onClick={onClickIcon}
          >
            {icon && icon}
          </InputGroup.Addon>
        )}
      </InputGroup>
      {helperText && <FormHelpText>{helperText}</FormHelpText>}
    </FormGroup>
  );
};

export default InputWithLabel;
