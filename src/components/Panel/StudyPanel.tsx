import React from 'react';
import { Drawer, Descriptions, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import {  useDispatch } from 'react-redux';
import { closeStudySidePanel } from '../../store/sidebar/studySidePanelSlice';

interface StudySidePanelProps {
  visible: boolean;
  studyData: any; // Consider defining a more specific type
  onClose: () => void;
}
const StudySidePanel: React.FC<StudySidePanelProps> = ({ visible, studyData, onClose }) => {
    // const { visible, studyData } = useSelector((state:any) => state.studySidePanel);
    const dispatch = useDispatch();
 
  
    const handleClose = () => {
      dispatch(closeStudySidePanel());
    };
 
    const apiUrl = 'http://localhost:3002'
    const downloadFile = (fileId:any, fileName:any) => {
      // Implement the download logic here
      const downloadUrl = `${apiUrl}/api/download/${fileId}`;
      const anchor = document.createElement('a');
      anchor.href = downloadUrl;
      anchor.download = fileName || 'file';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    };
  
    const renderFileDownload = (file:any) => {
      return (
        <Button
          onClick={() => downloadFile(file.idFiles, file.FileName)}
          icon={<DownloadOutlined />}
          size="small"
        >
          Download 
        </Button>
      );
    };
 
  
    const renderFilesSection = (files:any) => {
      return (
        <Descriptions.Item label="Files">
          {files.map((file:any, index:any) => (
            <div key={index} style={{ paddingBottom: '8px' }}>
              {renderFileDownload(file)}
            </div>
          ))}
        </Descriptions.Item>
      );
    };
  
    if (!studyData) return null;
  
    return (
      <Drawer
        title="Study Details"
        placement="right"
        closable={true}
        onClose={handleClose}
        open={visible}
        width={400}
      >
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Date De Soumission">{studyData?.studyData.studyData.DateDeSoumission.substring(0,10)}</Descriptions.Item>
          <Descriptions.Item label="Name">{studyData.studyData.studyData.FullName}</Descriptions.Item>
          <Descriptions.Item label="Type">{studyData.studyData.studyData.TypeEtude}</Descriptions.Item>
          <Descriptions.Item label="Category">{studyData.studyData.studyData.Category}</Descriptions.Item>
          <Descriptions.Item label="Nature">{studyData.studyData.studyData.Nature}</Descriptions.Item>
          <Descriptions.Item label="Client">{studyData.studyData.studyData.client?.ClientName}</Descriptions.Item>
          {/* Render other study data as needed */}
          {studyData.studyData.studyData.files && studyData.studyData.studyData.files.length > 0 && renderFilesSection(studyData.studyData.studyData.files)}
        </Descriptions>
        <Button onClick={handleClose} style={{ marginTop: 16 }}>
          Close
        </Button>
      </Drawer>
    );
  }

export default StudySidePanel;
