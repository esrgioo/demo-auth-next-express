"use client";

import { Label } from "@radix-ui/react-label";
import { FC } from "react";
import QuilEditor from "react-quill";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value: string;
  label: string;
  isError: boolean;
  onChange: (value: string) => void;
}

const RichTextEditor: FC<RichTextEditorProps> = ({
  label,
  value,
  isError,
  onChange,
}) => {
  const quilModules = {
    toolbar: [[{ header: [1, 2, 3, false] }], ["bold", "italic"]],
  };
  return (
    <div className="flex flex-col space-y-1.5">
      <Label>{label}</Label>
      <QuilEditor
        className="h-[250px] pb-10"
        modules={quilModules}
        value={value}
        onChange={onChange}
      />

      {isError ? (
        <p className="text-xs text-red-500">{label} is Required</p>
      ) : null}
    </div>
  );
};

export default RichTextEditor;
