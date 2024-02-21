import React from 'react';
import { Table, Button, Dropdown, Menu, Tooltip  } from 'antd';
import { FileOutlined, DownloadOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showSidePanel, closeSidePanel } from '../../store/sidebar/sidePanelSlice';
import { ConfigProvider } from 'antd';
import fr_FR from 'antd/lib/locale/fr_FR';
import StudySidePanel from '../Panel/StudyPanel';
import { closeStudySidePanel,showStudySidePanel } from '../../store/sidebar/studySidePanelSlice';
const { Column } = Table;
interface StudiesTableProps {
    studies?: any[]; // Adjust the type according to your data structure
    onActionClick?: (action: string, record: any) => void;
    onFileDownload?: (file: string) => void;
  }
const EngineerStudiesTable: React.FC<StudiesTableProps> = ({ studies }) => {
  const dispatch = useDispatch();
  const apiUrl =  "http://localhost:3002";
  // const apiUrl =  window.REACT_APP_SERVER_URL;
  const { visible, studyData } = useSelector((state:any) => state.studySidePanel);
console.log("===> Studies",studies);


  const downloadFile = (fileId: any) => {
    const downloadUrl = `${apiUrl}/api/download/${fileId}`;
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.target = '_blank';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };


  const handleActionClick = (record: any) => {
    dispatch(showStudySidePanel({ visible: true, studyData: record }));
  };
  const handleClose = () => {
    dispatch(closeStudySidePanel());
  };
  const readMenu = (record: any) => (
    <Menu>
      <Menu.Item key="read" icon={<FileOutlined />} onClick={() => handleActionClick(record)}>
        Read
      </Menu.Item>
    </Menu>
  );

  // const renderClientName = (text: any, record: any) => {
  //   return record.studies.client.ClientName;
  // };

  // const renderEngineerEmail = (text: any, record: any) => {
  //   return record.studies.users_has_studies[0]?.users.Email;
  // };

  // const renderSyntheseDownloadButton = (record: any) => {
  //   console.log("Record : ", record);
    
  //   const syntheseFile =record.studies.files.find((file:any) => file.isSynthese);
  //   return syntheseFile ? (
  //     <Button onClick={() => downloadFile(syntheseFile.idFiles)}>
  //       <DownloadOutlined /> Synthèse
  //     </Button>
  //   ) : null;
  // };
  const renderFiles = (files:any) => {
    return files?.map((file:any, index:any) => {
      if (file.isSynthese) {
        return (
          <Tooltip title="Download Synthèse" key={file.idFiles}>
            <Button onClick={() => downloadFile(file.idFiles)} icon={<DownloadOutlined />} size="small">Synthèse</Button>
          </Tooltip>
        );
      } else {
        return (
          <Tooltip title="Download Fiche d'Navette" key={file.idFiles}>
            <Button onClick={() => downloadFile(file.idFiles)} icon={<DownloadOutlined />} size="small">Fiche d'Navette</Button>
          </Tooltip>
        );
      }
    });
  };
  return (
    <ConfigProvider locale={fr_FR}>
      <div className="container mx-auto p-6 flex-1 overflow-y-auto">
        <div className="flex justify-center">
          <div className="w-full">
          <Table dataSource={studies} rowKey="Studies_IdStudies">
          <Column title="Created At" dataIndex={[ "createdAt"]} key="createdAt" render={(text) => new Date(text).toLocaleDateString()} />
          <Column title="Created By" dataIndex={[ "createdByUser","Email"]}  key="CreatedBy" render={text => text ? text : "N/A"} />
          <Column title="Type d'Étude" dataIndex={[ "TypeEtude"]}  key="TypeEtude" />
          <Column title="Nature" dataIndex={[ "Nature"]}  key="Nature" />
          <Column title="Client" dataIndex={[ "client", "ClientName"]}  key="client.ClientName" />
          <Column title="Status" dataIndex={[ "Status"]}  key="Status" />
          <Column
            title="Files"
            key="files"
            render={(text, record:any) => renderFiles(record?.files)}
          />
          <Column
            title="Type de Retouche"
            dataIndex="studies.TypeDeRetouche"
            key="TypeDeRetouche"
            render={(text, record:any) => record?.TypeEtude === "Retouche" ? text : "cette étude ne conteint pas de retouche"}
          />
          <Column
            title="Nombre de Retouche"
            dataIndex={[ "NomberDeRetouche"]}
            key="NomberDeRetouche"
            render={(text, record:any) => {
              console.log(record, "record");
              
                // Check if the TypeEtude is "Retouche"
                const isRetouche = record?.TypeEtude === "Retouche";
                // Display the number of retouches if TypeEtude is "Retouche", otherwise display "Non"
                return isRetouche ? record?.NomberDeRetouche : "Non";
              }}
          />
              {/* <Column
                title="Action"
                key="action"
                render={(text, record) => (
                  <Dropdown overlay={readMenu(record)} trigger={['click']}>
                    <Button>Read</Button>
                  </Dropdown>
                )}
              /> */}
            </Table>
          </div>
        </div>
        <StudySidePanel
        visible={visible}
        studyData={studyData}
        onClose={handleClose}
      />
      </div>
    </ConfigProvider>
  );
};

export default EngineerStudiesTable;
