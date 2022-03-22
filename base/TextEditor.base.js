import dynamic from "next/dynamic";
import React from "react";

const RichTextEditor =
  typeof window === "object" ? require("react-quill") : () => null;

export default function TextEditor({ onChange, value }) {
  return (
    <RichTextEditor
      style={{ width: "100%", height: 200, marginBottom: 40 }}
      theme="snow"
      value={value || " "}
      name="editor"
      onChange={(v) => onChange(v)}
    />
  );
}
