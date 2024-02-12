// Components/UploadSyntheseModal.tsx
import React, { useState } from 'react';
import { Modal, Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import studyService from '../../Services/Api/Studies/StudiesService';
import { RcFile } from 'antd/lib/upload';

interface UploadSyntheseModalProps {
  visible: boolean;
  studyId: number;
  onClose: () => void;
}

const UploadSyntheseModal: React.FC<UploadSyntheseModalProps> = ({ visible, studyId, onClose }) => {
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.error("Please select a file before uploading.");
      return;
    }
    
    try {
      const response = await studyService.uploadSyntheseFile(studyId, fileList[0]);
      message.success("File uploaded successfully");
      onClose(); // Close the modal and possibly refresh the list of studies or the status
    } catch (error) {
        console.log(error);
        
      message.error("Failed to upload file.");
    }
  };

  const beforeUpload = (file: RcFile) => {
    setFileList([file]); // Replace any existing files
    return false; // Prevent automatic upload
  };

  return (
    <Modal
      title="Upload Synthèse File"
      visible={visible}
      onCancel={onClose}
      footer={[
        <Button key="back" onClick={onClose}>Cancel</Button>,
        <Button key="submit" type="primary" onClick={handleUpload} disabled={fileList.length === 0}>
          Upload
        </Button>,
      ]}
    >
      <Upload beforeUpload={beforeUpload} onRemove={() => setFileList([])} fileList={fileList}>
        <Button icon={<UploadOutlined />}>Select File</Button>
      </Upload>
    </Modal>
  );
};

export default UploadSyntheseModal;
