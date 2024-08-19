"use client";

import { FormikHandlers } from "formik";
import { FC } from "react";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface FormInputProps {
  name: string;
  placeholder: string;
  value: any;
  isError: boolean;
  label: string;
  error: string | undefined;
  onChange: FormikHandlers["handleChange"];
  onBlur: FormikHandlers["handleBlur"];
}

const FormInput: FC<FormInputProps> = ({
  name,
  label,
  error,
  isError,
  onBlur,
  onChange,
  placeholder,
  value,
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        name={name}
        placeholder={placeholder}
        style={{ resize: "none" }}
        rows={4}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {isError ? <p className="text-xs text-red-500">{error}</p> : null}
    </div>
  );
};

export default FormInput;
