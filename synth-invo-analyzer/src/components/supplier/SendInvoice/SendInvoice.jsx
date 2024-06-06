import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Button, Upload as AntUpload, notification, Select } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "./SendInvoice.css"; // Import your CSS file for custom styles

const { Dragger } = AntUpload;
const { Option } = Select;

function SendInvoice() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [recipient, setRecipient] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id')
      try {
        const response = await axios.get(`http://127.0.0.1:8000/auth/get-organizations-by-supplier/${userId}`);
        setOrganizations(response.data.organizations);
      } catch (error) {
        console.error("Error fetching organizations:", error);
      }
    };

    fetchData();
  }, []);

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("source_invoice", file);
    });
    formData.append("supplier_id", localStorage.getItem('user_id'));
    formData.append("organization_id", recipient);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post("http://127.0.0.1:8000/invoice/create_invoice/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 201) {
        notification.success({
          message: "Upload Successful",
          duration: 3,
        });
        setSelectedFiles([]);
        setUploadDisabled(true);
      } else {
        notification.error({
          message: "Upload Failed",
          duration: 3,
        });
      }
    } catch (error) {
      notification.error({
        message: "An error occurred. Try Uploading Template.",
        duration: 3,
      });
    }
  };

  const handleAreaClick = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
    setUploadDisabled(false);
  };

  const handleRecipientChange = (value) => {
    setRecipient(value);
  };

  return (
    <div className="send-invoice-container">
      <div className="send-invoice-content">
        <h1 className="send-invoice-title">Send Your Invoices</h1>
        <div className="upload-area" onClick={handleAreaClick} onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }} onDrop={handleFileDrop}>
          <Dragger fileList={selectedFiles} onChange={(info) => { const { status } = info.file; if (status !== "uploading") { setSelectedFiles(info.fileList.map(file => file.originFileObj)); setUploadDisabled(false); } }}>
            <p className="ant-upload-drag-icon larger-icon"><InboxOutlined /></p>
            <p className="ant-upload-text larger-text">Drop files here or click to select</p>
          </Dragger>
          <input type="file" id="fileInput" className="hidden" accept="" onChange={handleFileInputChange} ref={fileInputRef} />
        </div>
        <div className="recipient-select larger-select">
          <Select placeholder="Select Recipient" style={{ width: 300 }} onChange={handleRecipientChange} value={recipient}>
            {organizations.map(org => (
              <Option key={org.organization_id} value={org.organization_id}>{org.username}</Option>
            ))}
          </Select>
        </div>
        <div className="action-buttons">
          <Button type="primary" size="large" onClick={() => fileInputRef.current.click()}>Select Files</Button>
          <Button type="primary" size="large" onClick={handleUpload} disabled={uploadDisabled}>Upload</Button>
        </div>
      </div>
    </div>
  );
}

export default SendInvoice;
