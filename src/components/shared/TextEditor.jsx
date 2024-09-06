import "react-quill/dist/quill.snow.css";
import { Box, Typography } from "@mui/material";
import React from "react";
import ReactQuill from "react-quill";
import { settingsStore } from "store/settingsStore";
import { useId } from "react";
import { useRef } from "react";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, true] }],

    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    ["blockquote", "code-block"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};

const TextEditor = ({ value, setValue, title, register, error }) => {
  const mode = settingsStore((state) => state.mode);
  const id = useId();
  const ref = useRef(null);
  return (
    <Box sx={{ mb: "20px" }}>
      <Typography sx={{ color: "text.main", pb: "10px" }} variant="h5">
        {title}
      </Typography>
      <ReactQuill
        id={id}
        name={id}
        ref={ref}
        style={{
          color: mode === "dark" ? "#fff" : "#141414",
          fontSize: "2rem",
          background: mode === "dark" ? "#141414" : "#fff",
          "&::placeholder": {
            color: "textColor.50",
            opacity: "0.4",
          },
        }}
        value={value}
        onChange={setValue}
        modules={modules}
        register={register}
        theme="snow"
      />{" "}
      {error && <Typography sx={{ color: "error.main" }}>{error}</Typography>}
    </Box>
  );
};

export default TextEditor;
