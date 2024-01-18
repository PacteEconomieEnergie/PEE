import React from 'react';
import StudiesTable from '../../components/Table/Table';

const Studies: React.FC = () => {
  const studies = [
    {
      id: 1,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": "false",
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use0",
      "files": ["test22"],
      "fileHistory": ["file1.pdf", "file2.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": "false",
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": "false",
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": "false",
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test25"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": "false",
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": true,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    {
      id: 2,
      "Date de Réception": Date().substring(0,21),
      "Date de Soumission": Date().substring(0,21),
      "Client": "client 1 ",
      "Nom et prénom de bénificier": "test2",
      "facturé": false,
      "Type d'étude": "Nouvelle etude",
      "catégorie": "classique",
      "Nature": "Normale",
      "Ingénieur": "use1",
      "files": ["test23"],
      "fileHistory": ["file3.pdf", "file4.pdf"],
    },
    // ... add more studies
  ];

  
  const downloadFile = (file: string) => {
    // Logic to download the selected file (replace with your actual download logic)
    console.log('Downloading file:', file);
  };
  
  const handleActionClick = (action: string, record: any) => {
    console.log(`${action} action on record:`, record);
    // Add logic for each action here
  };
  return ( <div className=" overflow-y-auto">
  <StudiesTable
    studies={studies}
    onActionClick={handleActionClick}
    onFileDownload={downloadFile}
  />
</div>
   
  );
};

 export default Studies;
