import React, { useState, useRef } from "react";
import axios from "axios";
import { Button, Upload as AntUpload, notification, Alert } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import HeaderInside from "../../common/HeaderInside/HeaderInside";
import { useNavigate } from "react-router-dom";


const { Dragger } = AntUpload;

function UploadTemplate() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const fileInputRef = useRef(null);
  const navigate = useNavigate()

  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files);
    
  };


  const handleUpload = async () => {
    const formData = new FormData();
    selectedFiles.forEach((file) => {
      formData.append("invoice_template", file);
    });
    const uploaded_user = localStorage.getItem("user_id");
    formData.append("uploaded_user", uploaded_user);

    try {
      const response = await axios.post(`http://127.0.0.1:8000/template/upload_invoice_template/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        
      });
      
      if (response.status === 201) {
        notification.success({
          message: "Template Uploaded Successfully",
          duration: 3,
        });
        localStorage.setItem('template_id', response.data.template_id)
        setSelectedFiles([]);
        setUploadDisabled(true);
        navigate('/supplier/templatemapping')

      } else {
        notification.error({
          message: "Error Uploading Template",
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
    setUploadDisabled(files.length === 0); 
  };

  return (
    <div>
        <HeaderInside/>
      <div className="container">
        <div className="upload-text">
          <h1>Uplaod Your Template</h1>
        </div>
        <div
          className="drop-area"
          onClick={handleAreaClick}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          onDrop={handleFileDrop}
        >
          <Dragger
            fileList={selectedFiles}
            onChange={(info) => {
              const { status } = info.file;
              if (status !== "uploading") {
                setSelectedFiles(info.fileList.map(file => file.originFileObj));
                setUploadDisabled(false);
              }
            }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Drop files here or click to select</p>
          </Dragger>

          <input
            type="file"
            id="fileInput"
            className="d-none"
            accept=""
            onChange={handleFileInputChange}
            ref={fileInputRef}
          />
        </div>


        <div className="upload-btns">
          <Button type="primary" onClick={() => fileInputRef.current.click()}>
            Select Template
          </Button>
          <Button type="primary" onClick={handleUpload} disabled={uploadDisabled}>
            Upload Template
          </Button>
        </div>
      </div>
    </div>
  );
}

export default UploadTemplate;
