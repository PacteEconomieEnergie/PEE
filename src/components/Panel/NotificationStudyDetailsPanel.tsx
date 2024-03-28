import React from 'react';
import { Drawer, Descriptions, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { closeNotificationStudyDetails } from '../../store/sidebar/notificationStudyDetailsSlice';

interface NotificationStudyDetailsProps {
  visible: boolean;
  studyDetails: any; // Consider defining a more specific type based on the notification's study object structure
}

const NotificationStudyDetailsPanel: React.FC<NotificationStudyDetailsProps> = ({ visible, studyDetails }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeNotificationStudyDetails());
  };


  const apiUrl ='http://localhost:3002'
  
  const downloadFile = (fileId: any, fileName: any) => {
    const downloadUrl = `${apiUrl}/api/download/${fileId}`;
    const anchor = document.createElement('a');
    anchor.href = downloadUrl;
    anchor.download = fileName || 'file';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const renderFileDownload = (file: any) => (
    <Button onClick={() => downloadFile(file.idFiles, file.FileName)} icon={<DownloadOutlined />} size="small">
      Download
    </Button>
  );

  if (!studyDetails) return null;

  return (
    <Drawer title="Study Details" placement="right" closable={true} onClose={handleClose} open={visible} width={400}>
      <Descriptions column={1} bordered>
        <Descriptions.Item label="Date De Soumission">{studyDetails.DateDeSoumission?.substring(0, 10)}</Descriptions.Item>
        <Descriptions.Item label="Name">{studyDetails.FullName}</Descriptions.Item>
        <Descriptions.Item label="Type">{studyDetails.TypeEtude}</Descriptions.Item>
        <Descriptions.Item label="Category">{studyDetails.Category}</Descriptions.Item>
        <Descriptions.Item label="Nature">{studyDetails.Nature}</Descriptions.Item>
        <Descriptions.Item label="Client">{studyDetails.client?.ClientName}</Descriptions.Item>
        {/* Assuming files are directly under studyDetails */}
        {studyDetails.files && studyDetails.files.length > 0 && (
          <Descriptions.Item label="Files">
            {studyDetails.files.map((file: any, index: number) => (
              <div key={index} style={{ paddingBottom: '8px' }}>
                {renderFileDownload(file)}
              </div>
            ))}
          </Descriptions.Item>
        )}
      </Descriptions>
      <Button onClick={handleClose} style={{ marginTop: 16 }}>
        Close
      </Button>
    </Drawer>
  );
};

export default NotificationStudyDetailsPanel;
