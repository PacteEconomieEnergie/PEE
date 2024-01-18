import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import 'react-datepicker/dist/react-datepicker.css';
import fr from 'date-fns/locale/fr';
import CustomDateInput from '../forms/DateInput';

interface NewStudyModalProps {
  onClose: () => void;
  onSave: (data: any) => void; // Adjust the type of 'data' as per your study data structure
}

const NewStudyModal: React.FC<NewStudyModalProps> = ({ onClose, onSave }) => {
    const [studyData, setStudyData] = useState({
        dateReception: "",
        dateSoumission: "",
        client: '',
        beneficier: '',
        facture: '',
        typeEtude: '',
        nombreRetouche: '',
        typeRetouche: '',
        categorie: '',
        nature: '',
        ingenieur: '',
        file: null as File | null, // Correcting file type
      });

      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStudyData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleDateInputChange = (value: string, name: string) => {
        setStudyData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          setStudyData((prevData) => ({
            ...prevData,
            file,
          }));
        }
      };

  const handleSubmit = () => {
    onSave(studyData);
    onClose();
  };
  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setStudyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const categorieOptions = ['classique', 'précaire', 'grand précaire'];
  const natureOptions = ['normal', 'prioritére'];
  const ingenieurOptions = ['ingenieur1', 'ingenieur2', 'ingenieur3']

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white shadow-2xl p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl mb-4 font-bold">New Study</h2>
            <CustomDateInput label='Date de Réception ' onChange={(value) => handleDateInputChange(value, 'dateReception')}/>
            <CustomDateInput label="Date de Soumission" onChange={(value) => handleDateInputChange(value, 'dateSoumission')} />
          <input
            type="text"
            name="client"
            value={studyData.client}
            onChange={handleChange}
            placeholder="Client"
            className="mb-4 p-2 border rounded"
          />
          <input
            type="text"
            name="beneficier"
            value={studyData.beneficier}
            onChange={handleChange}
            placeholder="Nom et prénom de bénéficiaire"
            className="mb-4 p-2 border rounded"
          />
          <select
            name="facture"
            value={studyData.facture}
            onChange={handleDropdownChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Facturé</option>
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
          {/* Add file input */}
          <select
            name="typeEtude"
            value={studyData.typeEtude}
            onChange={handleDropdownChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Type d'étude</option>
            <option value="nouvelle étude">Nouvelle étude</option>
            <option value="retouche">Retouche</option>
          </select>

          {/* Conditionally render fields based on typeEtude */}
          {studyData.typeEtude === 'retouche' && (
            <>
              <input
                type="text"
                name="nombreRetouche"
                value={studyData.nombreRetouche}
                onChange={handleChange}
                placeholder="Nombre de retouche"
                className="mb-4 p-2 border rounded"
              />
              <select
                name="typeRetouche"
                value={studyData.typeRetouche}
                onChange={handleDropdownChange}
                className="w-full p-2 border rounded"
              >
                <option value="">Type de retouche</option>
                <option value="extérieur">Extérieur</option>
                <option value="intérieur">Intérieur</option>
              </select>
            </>
          )}
          <div className="mb-4">
            <label className="block mb-2">Categorie:</label>
            <select
              name="categorie"
              value={studyData.categorie}
              onChange={handleDropdownChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {categorieOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Nature Dropdown */}
          <div className="mb-4">
            <label className="block mb-2">Nature:</label>
            <select
              name="nature"
              value={studyData.nature}
              onChange={handleDropdownChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {natureOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* Ingenieur Dropdown */}
          <div className="mb-4">
            <label className="block mb-2">Ingenieur:</label>
            <select
              name="ingenieur"
              value={studyData.ingenieur}
              onChange={handleDropdownChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select</option>
              {ingenieurOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <input type="file" onChange={handleFileChange} className="mb-4" />


          {/* Save and Close buttons */}
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-green-500 text-white rounded mr-2 hover:bg-green-600 focus:outline-none"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewStudyModal;
