import React,{useEffect,useState} from 'react';
import { Table,Drawer, Button,Descriptions } from 'antd';
import { ColumnsType } from 'antd/es/table';
import leadService from '../../Services/Api/leadService';
import { Navigate } from 'react-router-dom';
import { DownloadOutlined } from '@ant-design/icons';
interface Visit {
  key: string;
  name: string;
  address: string;
  phone: string;
  visitDate: string;
  accompanier: string;
}
interface Lead {
  id: number;
  nom: string;
  prenom: string;
  adresse: string;
  codePostal: string;
  ville: string;
  telephone: string;
  mail: string;
  surfaceHabitable: string;
  typeDeChauffage: string;
  typeMaison: string;
  anneeDeConstruction: string;
  numeroFiscal: string;
  refFiscale: string;
  pieceJointe: PieceJointe[];
}

interface PieceJointe {
  idFiles: number;
  Type: string;
}
// const visitsData: Visit[] = [
//   {
//     key: '1',
//     name: 'Éric Dupont',
//     address: '18 rue du gén dufieux, 68650, Lapoutroie',
//     phone: '0612345678',
//     visitDate: '01/03/2024 16h00',
//     accompanier: 'Michel Chaussé',
//   },
//   {
//     key: '2',
//     name: 'Cédric Verdou',
//     address: '75 rue du gén dufieux, 68650, Lapoutroie',
//     phone: '0612345678',
//     visitDate: '29/03/2024 16h00',
//     accompanier: 'Michel Chaussé',
//   },
//   {
//     key: '3',
//     name: 'Sacha Erdane',
//     address: '10 rue du gén dufieux, 68650, Lapoutroie',
//     phone: '0612345678',
//     visitDate: '29/03/2024 16h00',
//     accompanier: 'Michel Chaussé',
//   },
//   {
//     key: '4',
//     name: 'GUSTIN VIRGINIE',
//     address: '10 QUAI ETIENNE LALLIA, 77350 LE MEESUR-SEIN',
//     phone: '0612345678',
//     visitDate: '29/03/2023 16h00',
//     accompanier: 'Michel Chaussé',
//   },
// ];

const columns = [
  {
    title: 'Nom',
    dataIndex: 'nom',
    key: 'Nom',
  },
  {
    title: 'Prénom',
    dataIndex: 'prenom',
    key: 'Prénom',
  },
  {
    title: 'Address',
    dataIndex: 'adresse',
    key: 'adresse',
  },
  {
    title: 'Telephone',
    dataIndex: 'telephone',
    key: 'telephone',
  },
  {
    title: 'Email',
    dataIndex: 'mail',
    key: 'mail',
  },
  {
    title: 'Ville',
    dataIndex: 'ville',
    key: 'ville',
  },
  
];

const PlannedVisits: React.FC = () => {
  const navigate=Navigate
  const [leadsData, setLeadsData] = useState<Lead[]>([]);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [visitsData, setVisitsData] = useState([]);
  useEffect(() => {
    leadService.getAllLeads().then((res: any) => {
      setLeadsData(res);
    });
  }, []);
console.log(leadsData,'the data');

  const showDrawer = (lead: Lead) => {
    setSelectedLead(lead);
    setDrawerVisible(true);
  };

  const onClose = () => {
    setDrawerVisible(false);
  };
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  console.log(apiUrl);
  
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
  const FileDownloadButton = ({ fileId, fileName }: { fileId: number; fileName: string }) => {
    return (
      <Button
        onClick={() => downloadFile(fileId, fileName)}
        icon={<DownloadOutlined />}
        size="small"
      >
        Download
      </Button>
    );
  };
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <Table 
        dataSource={leadsData} 
        columns={columns} 
        pagination={false} 
        onRow={(record) => ({
          onClick: () => showDrawer(record),
        })}
      />
       {selectedLead && (
        <Drawer
        title="Lead Details"
        placement="right"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
        width={400}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Nom">{selectedLead.nom}</Descriptions.Item>
            <Descriptions.Item label="Prénom">{selectedLead.prenom}</Descriptions.Item>
            <Descriptions.Item label="Adresse">{selectedLead.adresse}</Descriptions.Item>
            <Descriptions.Item label="Ville">{selectedLead.ville}</Descriptions.Item>
            <Descriptions.Item label="Code Postal">{selectedLead.codePostal}</Descriptions.Item>
            <Descriptions.Item label="Surface Habitable">{selectedLead.surfaceHabitable}</Descriptions.Item>
            <Descriptions.Item label="Année De Construction">{selectedLead.anneeDeConstruction}</Descriptions.Item>
            <Descriptions.Item label="Type Maison">{selectedLead.typeMaison}</Descriptions.Item>
            <Descriptions.Item label="Type De Chauffage">{selectedLead.typeDeChauffage}</Descriptions.Item>
            <Descriptions.Item label="Numéro Fiscal">{selectedLead.numeroFiscal}</Descriptions.Item>
            <Descriptions.Item label="Référence Fiscale">{selectedLead.refFiscale}</Descriptions.Item>
            <Descriptions.Item label="Documents">
              {selectedLead.pieceJointe[0].idFiles &&selectedLead.pieceJointe.map((file) => (
                <FileDownloadButton key={file.idFiles} fileId={file.idFiles} fileName={file.Type || 'Document'} />
              ))}
            </Descriptions.Item>
          </Descriptions>
          <Button onClick={onClose} style={{ marginTop: 16 }}>
            Close
          </Button>
        </Drawer>
      )}
    </div>
  );
};

export default PlannedVisits;
