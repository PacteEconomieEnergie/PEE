import React,{useState} from "react";
import { Table } from "../../components/Table/Table";
import NewStudyModal from "../../components/modals/NewStudyModal";
export const Studies:React.FC=()=>{
    const [showModal, setShowModal] = useState(false);
    const studies = [
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use0","files":["test22"] },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Retouche","Nombre de retouche":5,"catégorie":"classique","Nature":"Normale","Ingénieur":"use1","fileHistory":["one","two"],"files":"test22" },
        { id: 1, "Date de Réception": Date(), "Date de Soumission": Date(),"Client":"client 1 ","Nom et prénom de bénificier":"test2","facturé":false,"Type d'étude":"Nouvelle etude","catégorie":"classique","Nature":"Normale","Ingénieur":"use1" ,"files":"test22","fileHistory":["one","two"]},
        // More study objects...
      ]

      const addStudy = (newStudyData: any) => {
        // Logic to add a new study (console logging for demonstration)
        console.log('New Study Data:', newStudyData);
        setShowModal(false); // Close the modal after adding the study
      };
      
return(
    <div className="container mx-auto p-6 bg-gray-100 rounded-lg flex-1 overflow-y-auto">
    <div className="flex justify-between items-center mb-6">
      
      <button
        onClick={() => setShowModal(true)}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Add Study
      </button>
    </div>

    <div className="flex justify-center">
        <div className=" w-full">
          <Table data={studies} />
        </div>
      </div>

    {showModal && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div className="bg-white shadow-2xl p-8 rounded-lg max-w-md">
          <NewStudyModal onClose={() => setShowModal(false)} onSave={addStudy} />
        </div>
      </div>
    )}
  </div>
)
}