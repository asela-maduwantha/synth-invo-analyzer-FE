import React from "react";
import Upload from "../Upload/Upload";

function TemplateUpload() {
  return (
    <Upload
      uploadUrl="http://127.0.0.1:8000/uploadTemplate/match/"
      title="Add Your Supplier Templates Here..."
      successMessage="Your template is acceptable."
      errorMessage="Mismatches Found. Admin Will Update Soon."
      selectButtonLabel="Select Template"
      uploadButtonLabel="Upload Template"
    />
  );
}

export default TemplateUpload;
