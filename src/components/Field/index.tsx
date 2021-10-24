import React, { useState } from "react";
import { TextField, InputAdornment, FormControl } from "@material-ui/core";
import { PropType } from "./types";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import {formatDate} from "../../routes/util"
import "./style.scss";

const iconComponentProps = (
  icon: any,
  { type, min_date, max_date, displayable }: any,
  showPassword?: boolean,
  onClick?: any
): any => ({
  InputProps: icon
    ? {
      endAdornment: (
        <InputAdornment
          position="end"
          className="visibility-icon"
          onClick={onClick}
        >
          {icon}
        </InputAdornment>
      ),
    }
    : type === "password" && displayable
      ? {
        endAdornment: (
          <InputAdornment position="end" className="visibility-icon">
            {!showPassword ? (
              <Visibility onClick={onClick} />
            ) : (
              <VisibilityOffIcon onClick={onClick} />
            )}
          </InputAdornment>
        ),
      }
      : type === "date"
        ? {
          inputProps: {
            max: max_date ? formatDate(max_date) : null,
            min: min_date ? formatDate(min_date) : null,
          },
        }
        : {},
});

export default ({
  icon,
  form: { touched, errors },
  field,
  ...rest
}: PropType) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (): any => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl id="pill-input" fullWidth>     
      <TextField
        {...field}
        {...rest}
        margin="normal"
        autoComplete="off"
        {...iconComponentProps(icon, rest, showPassword, togglePassword)}
        type={rest.type === "password" && showPassword ? "text" : rest.type}
        fullWidth
      />
      {rest.type === "date" && !field.value && (
        <div className="custom-placeholder">{rest.placeholder}</div>
      )}
      {errors[field.name] && touched[field.name] && (
        <div className="error-text">
          {rest.create_err_msg
            ? rest.create_err_msg(field.value)
            : errors[field.name]}
          {rest.create_err_msg && field.name === "cpassword" &&
            <p>{errors[field.name]}</p>}
        </div>
      )}
    </FormControl>
  );
};
