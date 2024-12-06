import clsx from "clsx";
import { FC } from "react";
import { DatePicker as DatePickerInput, InputGroup } from "rsuite";
import FormControl from "rsuite/esm/FormControl";
import FormControlLabel from "rsuite/esm/FormControlLabel";
import FormGroup from "rsuite/esm/FormGroup";
import FormHelpText from "rsuite/esm/FormHelpText";

interface Meta {
  touched?: true;
  error?: string;
}

interface ComponentProps {
  label?: string;
  disabled?: boolean;
  input?: any;
  size?: "lg" | "md" | "sm" | "xs";
  placeholder?: string;
  meta?: Meta;
  helperText?: string;
  dateFormat?: string;
  readOnly?: boolean;
  className: string;
  formControlLabelClassname?: string
}

const CustomDatePicker: FC<ComponentProps> = ({
  input,
  dateFormat,
  placeholder,
  readOnly,
  className,
  disabled,
}) => {
  return (
    <DatePickerInput
      {...input}
      ranges={[]}
      format={dateFormat}
      readOnly={readOnly}
      block
      placeholder={placeholder}
      className={className}
      disabled={disabled}
      preventOverflow={true}
    />
  );
};

const DatePickerWithLable: FC<ComponentProps> = ({
  meta,
  label,
  input,
  disabled,
  size = "md",
  placeholder = "",
  helperText = "",
  dateFormat = "yyyy-MM-dd HH:mm:ss",
  readOnly,
  className,
  formControlLabelClassname
}) => {
  if (!input.value) {
    input.value = null
  }

  return (
    <FormGroup>
      <FormControlLabel className={clsx(formControlLabelClassname,"common-form-label")}>{label}</FormControlLabel>
      <InputGroup inside>
        <FormControl
          name="datePicker"
          disabled={disabled}
          input={input}
          size={size}
          placeholder={placeholder}
          accepter={CustomDatePicker}
          dateFormat={dateFormat}
          readOnly={readOnly}
          errorMessage={meta?.touched && meta.error}
          className={className}
        />
        {helperText && <FormHelpText>{helperText}</FormHelpText>}
      </InputGroup>
    </FormGroup>
  );
};

export default DatePickerWithLable;
