import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { DownloadOutlined, EditOutlined, DeleteOutlined, FileOutlined ,FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showSidePanel, closeSidePanel, startEditing,toggleSidePanel } from '../../store/sidebar/sidePanelSlice'; // Import the necessary Redux actions and selectors
import SidePanel from '../Panel/SidePanel';
import AddStudyPanel from '../Panel/AddStudyPanel';
const { Column } = Table;

interface StudiesTableProps {
  studies: any[]; // Adjust the type according to your data structure
  onActionClick: (action: string, record: any) => void;
  onFileDownload: (file: string) => void;
}

const StudiesTable: React.FC<StudiesTableProps> = ({ studies, onActionClick, onFileDownload }) => {
  const dispatch = useDispatch();
  const sidePanelVisible = useSelector((state:any) => state.sidePanel.visible);
  const selectedUser = useSelector((state:any) => state.sidePanel.data);
  const isEditing = useSelector((state:any) => state.sidePanel.isEditing);
  const downloadFile = (file: string) => {
    // Logic to download the selected file (replace with your actual download logic)
    console.log('Downloading file:', file);
  };
  
  const actionMenu = (record: any) => (
    <Menu>
      <Menu.Item key="read" icon={<FileOutlined />} onClick={() => handleActionClick('Read', record)}>
        Read
      </Menu.Item>
      <Menu.Item key="update" icon={<EditOutlined />} onClick={() => handleActionClick('Update', record)}>
        Update
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={() => handleActionClick('Delete', record)}>
        Delete
      </Menu.Item>
    </Menu>
  );
   // Define the dispatch function

  const handleActionClick = (action: string, record: any) => {
    switch (action) {
      case 'Read':
        dispatch(closeSidePanel());
        dispatch(startEditing(false));
        dispatch(showSidePanel({ data: record, isEditing: false }));
        break;

      case 'Update':
        dispatch(closeSidePanel());
        dispatch(startEditing(true));
        dispatch(showSidePanel({ data: record, isEditing: true }));
        break;

      default:
        break;
    }
  };

 
 
  const fileHistoryMenu = (fileHistory: string[]) => (
    <Menu>
      {fileHistory.map((file) => (
        <Menu.Item key={file} onClick={() => downloadFile(file)}>
          <DownloadOutlined /> {file}
        </Menu.Item>
      ))}
    </Menu>
  );
  const fileDownloadButton = (files: string[]) => {
    if (files.length === 1) {
      // If there's only one file, provide a direct download link
      return <Button onClick={() => downloadFile(files[0])}><DownloadOutlined /> Download</Button>;
    } else {
      // If there are multiple files, show a dropdown
      return (
        <Dropdown overlay={fileHistoryMenu(files)} trigger={['click']}>
          <Button><DownloadOutlined /> Files</Button>
        </Dropdown>
      );
    }
  }
  return (
    <div className="container mx-auto p-6  flex-1 overflow-y-auto">
      <div className=' flex justify-end'><Button className=' flex  m-4' onClick={()=>dispatch(toggleSidePanel())}><FileAddOutlined /> Add New Study</Button></div>
      <AddStudyPanel/>    
    <div className="flex justify-center">
      <div className="w-full">
        <Table dataSource={studies}>
          <Column title="Date de Réception" dataIndex="Date de Réception" key="Date de Réception" />
          <Column title="Date de Soumission" dataIndex="Date de Soumission" key="Date de Soumission" />
          <Column title="Client" dataIndex="Client" key="Client" />
          <Column title="Nom et prénom de bénificier" dataIndex="Nom et prénom de bénificier" key="Nom et prénom de bénificier" />
          <Column title="Facturé" dataIndex="facturé" key="facturé" />
          <Column title="Type d'étude" dataIndex="Type d'étude" key="Type d'étude" />
          <Column title="catégorie" dataIndex="catégorie" key="catégorie" />
          <Column title="Nature" dataIndex="Nature" key="Nature" />
          <Column title="Ingénieur" dataIndex="Ingénieur" key="Ingénieur" />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Dropdown overlay={actionMenu(record)} trigger={['click']}>
                <Button>Actions</Button>
              </Dropdown>
            )}
          />
           <Column
            title="File History"
            key="fileHistory"
            render={(text, record:any) => (
              <Dropdown overlay={fileHistoryMenu(record.fileHistory)} trigger={['click']}>
                <Button><DownloadOutlined /> File History</Button>
              </Dropdown>
            )}
          />
          <Column
            title="Files"
            key="files"
            render={(text, record:any) => fileDownloadButton(record.files)}
          />
        </Table>
      </div>
    </div>
    {sidePanelVisible && (
        <SidePanel
          visible={sidePanelVisible}
          data={selectedUser}
          onClose={() => dispatch(closeSidePanel())}
          onSave={(editedData) => {
            // Implement your update logic here
            console.log('Saving user:', editedData);
            // Call any necessary function to update the user data in your state or backend

            // Close the side panel after saving
            dispatch(closeSidePanel());
          }}
          isEditing={isEditing}
        />
      )}
  </div>
  );
};
export default StudiesTable;