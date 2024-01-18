import React,{useState} from "react";
//import {Table} from '../components/Table/Table'
import NewStudyModal from "../components/modals/NewStudyModal";
import { Header } from "../modules/Header/Header.module";
import { Sidebar } from "../modules/sideBar/SideBar.module";

export const HomePage:React.FC=()=>{
    
  const [showModal, setShowModal] = useState(false);

    const studies = [
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use0","files":["test22"] },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Retouche","Nombre de retouche":5,"catégorie":"classique","Nature":"Normale","Ingénieur":"use1","fileHistory":["one","two"],"files":"test22" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" ,"files":"test22","fileHistory":["one","two"]},
        // More study objects...
      ];

       const addStudy = (newStudyData: any) => {
    // Logic to add a new study (console logging for demonstration)
    console.log('New Study Data:', newStudyData);
    setShowModal(false); // Close the modal after adding the study
  };
  console.log(showModal);
  const handleLogout = () => {
    // Logic for logout
    // ...
  };
    return(
        <div className="flex h-screen overflow-hidden">
     

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        
        {/* Page Content */}
        <div className="container mx-auto mt-8 p-8  rounded-lg flex-1 overflow-y-auto">
         
        </div>
      </div>
    </div>
    )
}