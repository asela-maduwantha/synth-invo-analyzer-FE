import React from "react";
import Upload from "../common/Upload/Upload";

function InvoiceUpload() {
  return (
    <Upload
      uploadUrl="http://127.0.0.1:8000/invoice/upload/"
      title="Upload Your Invoices Here..."
      successMessage="Invoice Uploaded Successfully"
      errorMessage="Error uploading invoices. Try Uploading Template."
      selectButtonLabel="Select Invoices"
      uploadButtonLabel="Upload Invoices"
    />
  );
}

export default InvoiceUpload;
