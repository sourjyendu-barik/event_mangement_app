import React from "react";

const InputComponent = ({
  label,
  type = "text",
  value,
  name,
  placeholder,
  onChange,
  required = true,
  autocomplete,
  ...rest
}) => {
  return (
    <div className="row mb-3 align-items-center">
      {/* Label */}
      <label
        htmlFor={name}
        className="col-12 col-md-4 col-form-label text-start text-start fw-semibold"
      >
        {label}
      </label>

      {/* Input */}
      <div className="col-12 col-md-8">
        <input
          type={type}
          value={value}
          name={name}
          id={name}
          placeholder={placeholder}
          onChange={onChange}
          className="form-control rounded-3 shadow-sm"
          required={required}
          autoComplete={autocomplete}
          {...rest}
        />
      </div>
    </div>
  );
};

export default InputComponent;
