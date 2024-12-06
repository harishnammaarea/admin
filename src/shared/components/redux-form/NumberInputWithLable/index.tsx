import clsx from "clsx";
import { FC, ReactNode } from "react";
import { FieldRenderProps } from "react-final-form";
import { InputGroup, InputNumber } from "rsuite";
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
  min: number;
  max: number;
  disabled?: boolean;
  placeholder?: string;
  readOnly?: boolean;
  icon?: ReactNode;
  helperText?: string;
  formGroupClassName?: string;
  formControlLabelClassName?: string;
  type?: "text" | "time";
  defaultValue?: string;
  onClickIcon?(): void
}

const CustomInput: FC<ComponentProps> = ({
  disabled,
  input,
  readOnly,
  placeholder,
  type,
  min,
  max,
}) => {
  return (
    <InputNumber
      style={{ width: "100%" }}
      placeholder={placeholder}
      disabled={disabled}
      {...input}
      type={type}
      autoComplete="off"
      readOnly={readOnly}
      min={min}
      max={max}
    />
  );
};


const NumberInputWithLabel: FC<FieldRenderProps<string> & ComponentProps> = ({
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
  min = 0,
  max = 10,
  formControlLabelClassName,
  onClickIcon,
}) => {
  if (defaultValue) {
    input.value = defaultValue;
  }
  return (
    <FormGroup className={formGroupClassName}>
      <FormControlLabel className={clsx(formControlLabelClassName, "common-form-label")}>
        {label}
      </FormControlLabel>
      <InputGroup inside>
        {icon && (
          <InputGroup.Addon
            style={{
              backgroundColor: "#ffffff",
              color: "#5449f0",
              fontWeight: "600",
              cursor: "pointer",
              borderTopRightRadius: "6px",
              borderBottomRightRadius: "6px"
            }}
            onClick={onClickIcon}
          >
            {icon && icon}
          </InputGroup.Addon>
        )}
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
          min={min}
          max={max}
          defaultValue={defaultValue}
        />
      </InputGroup>
      {helperText && <FormHelpText>{helperText}</FormHelpText>}
    </FormGroup>
  );
};

export default NumberInputWithLabel;
