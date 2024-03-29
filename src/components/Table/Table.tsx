import React from 'react';
import { Table, Button, Dropdown, Menu } from 'antd';
import { DownloadOutlined, EditOutlined, DeleteOutlined, FileOutlined ,FileAddOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showSidePanel, closeSidePanel, startEditing,toggleSidePanel } from '../../store/sidebar/sidePanelSlice'; // Import the necessary Redux actions and selectors
import SidePanel from '../Panel/SidePanel';
import AddStudyPanel from '../Panel/AddStudyPanel';
import { ConfigProvider } from 'antd';
import fr_FR from 'antd/lib/locale/fr_FR';
const { Column } = Table;
const apiUrl = window.REACT_APP_SERVER_URL;
interface StudiesTableProps {
  studies?: any[]; // Adjust the type according to your data structure
  onActionClick?: (action: string, record: any) => void;
  onFileDownload?: (file: string) => void;
}

const StudiesTable: React.FC<StudiesTableProps> = ({ studies, onActionClick, onFileDownload }) => {
  const dispatch = useDispatch();
  const sidePanelVisible = useSelector((state:any) => state.sidePanel.visible);
  const selectedUser = useSelector((state:any) => state.sidePanel.data);
  const isEditing = useSelector((state:any) => state.sidePanel.isEditing);
  const userRole=useSelector((state:any)=>state.auth.role)


  
  const downloadFile = (fileId: any) => {
    // Logic to download the selected file (replace with your actual download logic)
    const downloadUrl = `${apiUrl}/api/download/${fileId}`;

    // Create a new anchor element
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.target = '_blank'; // Optional, if you want to open in a new tab
    anchor.download = ''; // Optional, if you want to set a default download name

    // Append to the body and trigger a click
    document.body.appendChild(anchor);
    anchor.click();

    // Remove the anchor from the body
    document.body.removeChild(anchor);
  };
  
  
  const canEdit = userRole !== 'ENGINEER';
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
  const readMenu = (record: any) => (
    <Menu>
      <Menu.Item key="read" icon={<FileOutlined />} onClick={() => handleActionClick('Read', record)}>
        Read
      </Menu.Item>
    </Menu>
  )
   // Define the dispatch function

  const handleActionClick = (action: string, record: any) => {
    switch (action) {
      case 'Read':
        dispatch(closeSidePanel());
        dispatch(startEditing(false));
        dispatch(showSidePanel({ data: record, isEditing: false }));
        console.log(record);
        
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
      {fileHistory?.map((file) => (
        <Menu.Item key={file} onClick={() => downloadFile(file)}>
          <DownloadOutlined /> {file}
        </Menu.Item>
      ))}
    </Menu>
  );
  const fileDownloadButton = (files: any) => {
 
    const hasSynthese = files.some((file: any) => {
   
      
     return file.isSynthese});
    if (files.length === 1) {
      // If there's only one file, provide a direct download link
      return <Button onClick={() => downloadFile(files[0].idFiles)}><DownloadOutlined /> Download</Button>;
    }
     else {
     
      
      // If there are multiple files, show a dropdown
      return (
        <Dropdown overlay={fileHistoryMenu(files)} trigger={['click']}>
          <Button  onClick={() => downloadFile(files[1].idFiles)}><DownloadOutlined /> Files</Button>
        </Dropdown>
      );
    }
  }

  const renderClientName = (text:any, record:any) => {
    
    
    return record.client.ClientName; // Accessing nested client name
};

const renderEngineerEmail = (text:any, record:any) => {
    // Assuming the first user in the users_has_studies array is the engineer
    return record.users_has_studies[0]?.users.Email;
};
const renderSyntheseDownloadButton = (files: any[]) => {
  // Find the first file marked as isSynthese
  const syntheseFile = files.find(file => file.isSynthese);

  if (syntheseFile) {
    return (
      <Button onClick={() => downloadFile(syntheseFile.idFiles)}>
        <DownloadOutlined /> Synthèse
      </Button>
    );
  }

  // Return null or an empty fragment if there's no Synthèse file
  return null;
};
const clientNameFilterOptions = studies ? Array.from(new Set(studies.map(study => study.client.ClientName))).map(clientName => ({
  text: clientName,
  value: clientName,
})) : [];
const statusFilterOptions = studies ? Array.from(new Set(studies.map(study => study.Status))).map(status => ({
  text: status,
  value: status,
})) : [];

// Generate filter options for TypeEtude
const typeEtudeFilterOptions = studies ? Array.from(new Set(studies.map(study => study.TypeEtude))).map(typeEtude => ({
  text: typeEtude,
  value: typeEtude,
})) : [];

// Generate filter options for Nature
const natureFilterOptions = studies ? Array.from(new Set(studies.map(study => study.Nature))).map(nature => ({
  text: nature,
  value: nature,
})) : [];
const engineerFilterOptions = studies ? Array.from(new Set(studies.flatMap(study => 
  study.users_has_studies.map((user_has_study:any) => user_has_study.users.Email)
))).filter(email => email) // Remove undefined or null values
.map(email => ({
  text: email,
  value: email,
})) : [];
console.log(studies);

  return (
    <ConfigProvider locale={fr_FR}>
    <div className="container mx-auto p-6  flex-1 overflow-y-auto">
    {canEdit && ( // Conditional rendering based on the user's role
          <div className='flex justify-end '>
            <Button className='flex m-4' onClick={() => dispatch(toggleSidePanel())}>
              <FileAddOutlined /> Add New Study
            </Button>
          </div>
        )}      <AddStudyPanel/>    




    <div className="flex justify-center">
      <div className="w-full ">
        <Table dataSource={studies} rowKey="Studies_IdStudies" rowClassName={(record) => record.Nature === "Prioritere" ? "bg-red-400" : ""}>
        <Column title="Date de Réception" dataIndex="DateDeReception" key="DateDeReception" render={text => new Date(text).toLocaleDateString()} />
                            <Column title="Date de Soumission" dataIndex="DateDeSoumission" key="DateDeSoumission" render={text => new Date(text).toLocaleDateString()} />
                            <Column title="Client" render={renderClientName} key="Client" filters={clientNameFilterOptions} onFilter={(value, record) => record.client.ClientName === value} />
                            <Column title="Nom et prénom de bénificier" dataIndex="FullName" key="FullName" />
                            <Column title="Facturé" dataIndex="Factured" key="Factured" render={text => text ? "Yes" : "No"} />
                            <Column title="Type d'étude" dataIndex="TypeEtude" key="TypeEtude" filters={typeEtudeFilterOptions}
    onFilter={(value, record:any) => record.TypeEtude === value} />
                            <Column title="Catégorie" dataIndex="Category" key="Category" />
                            <Column title="Nature" dataIndex="Nature" key="Nature" filters={natureFilterOptions}
    onFilter={(value, record:any) => record.Nature === value} />
                            <Column title="Status" dataIndex="Status" key="Status" filters={statusFilterOptions} onFilter={(value, record:any) => record.Status === value} />
                            <Column
  title="Engineer"
  key="engineer"
  filters={engineerFilterOptions}
  onFilter={(value, record: any) => record.users_has_studies.some((user_has_study:any) => user_has_study.users.Email === value)}
  render={(text, record: any) => renderEngineerEmail(text, record)}
/>
                            <Column
    title="Synthèse"
    key="synthese"
    render={(text, record: any) => renderSyntheseDownloadButton(record.files)}
  />
          <Column
            title="Action"
            key="action"
            render={(text, record) => (
              <Dropdown overlay={canEdit ? actionMenu(record) : readMenu(record)} trigger={['click']}>
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
            
            // Call any necessary function to update the user data in your state or backend

            // Close the side panel after saving
            dispatch(closeSidePanel());
          }}
          isEditing={isEditing}
        />
      )}
  </div>
  </ConfigProvider>
  );
};
export default StudiesTable;
