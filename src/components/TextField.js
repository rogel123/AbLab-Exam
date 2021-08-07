import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

const TextFields = ({
  value,
  label,
  inputType,
  options,
  onChangeFunc,
  errorVal,
}) => {
  const [defaultData, setData] = React.useState(value);
  const [errors, setError] = React.useState("");

  const handleChange = (event) => {
    if (inputType === "email") {
      if (
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          event.target.value
        )
      ) {
        setError(null);
        errorVal(null);
      } else {
        setError("Invalid");
        errorVal("Invalid");
      }
    }

    if (event.target.value === "") {
      setError("Invalid");
    } else {
      if (inputType !== "email") setError(null);
    }

    setData(event.target.value);
    onChangeFunc(event.target.value);
  };

  const displayLabel = () => {
    return label === "firstName"
      ? "First Name"
      : label === "lastName"
      ? "Last Name"
      : label === "emailAddress"
      ? "Email Address"
      : label;
  };
  return (
    <TextField
      id={`input-${label}`}
      size="small"
      value={defaultData}
      label={displayLabel()}
      variant="outlined"
      multiline={inputType === "multiline" ? true : false}
      rows={6}
      fullWidth
      select={inputType === "select" ? true : false}
      onChange={handleChange}
      error={errors ? true : false}
      helperText={
        errors ? `${displayLabel()} is required or Invalid Format` : ""
      }
    >
      {options &&
        options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </TextField>
  );
};

export default TextFields;
