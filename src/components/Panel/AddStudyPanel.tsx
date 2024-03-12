import {
    ProForm,
    ProFormDigit,
    ProFormGroup,
    ProFormRadio,
    ProFormSelect,
    ProFormCheckbox,
    ProFormText,
    ProFormUploadDragger,
    ProFormDatePicker,
  } from "@ant-design/pro-components";
import React,{useState,useEffect} from "react";
import { Drawer,Switch } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidePanel } from "../../store/sidebar/sidePanelSlice";
import { fetchClients } from '../../store/Clients/clientSlice'; // Import fetchClients action
import { fetchEngineers } from '../../store/Engineers/engineersSlice'; // Import fetchEngineers action
import { ConfigProvider } from 'antd';
import { AppDispatch } from "../../store";
// import studyService from "../../Services/Api/Studies/StudiesService";
import fr_FR from 'antd/lib/locale/fr_FR';

  const AddStudyPanel:React.FC=()=>{
    const dispatch = useDispatch<AppDispatch>();
    const isVisible = useSelector((state:any) => state.sidePanel.isVisible);
    const clients = useSelector((state:any) => state.client.clients);
    const engineers = useSelector((state:any) => state.engineer.engineers);
    // const createdById=useSelector((state:any)=>state.auth.id)
    const [factured,setFactured]=useState(false)
    const [typeEtude, setTypeEtude] = useState('');
    
    
    useEffect(() => {
      // Predefined clients data
      dispatch(fetchClients()); // Fetch clients on component mount
    dispatch(fetchEngineers());
    }, []);
  
    const handleClose = () => {
        dispatch(toggleSidePanel());
      };


      const handleFormSubmit = async (values: any) => {
      
      
        const formData = new FormData(); // Prepare a FormData object to hold form data
      
        // Append all form values to formData, except the file
        Object.keys(values).forEach(key => {
          let value = values[key];
          if (key === 'Factured') {
        
    
            // Assuming value could be "true"/"false" string or ["true", "0"]/["false", "0"] array
            if (typeof value === 'string') {
                value = value === "true" ? 1 : 0;
            } else if (Array.isArray(value)) {
                // If the value is an array, determine the conversion based on the first element
                value = value[0] === "true" || value[1] === "1" ? 1 : 0;
            } else {
                // Fallback for boolean handling, just in case
                value = value ? 1 : 0;
            }
    
           
            formData.append('Factured', value);
            return; // Skip further processing for this key
        }
          // Exclude clientId and engineerId from being appended to formData
          if (key !== 'clientId' && key !== 'engineerId' && key !== 'drag-pic') {
              if (key === 'DateDeReception' || key === 'DateDeSoumission') {
                  // Ensure dates are in ISO-8601 format
                  value = (value instanceof Date) ? value.toISOString() : new Date(value).toISOString();
              }
              
              
              if (Array.isArray(value)) {
                  // For array fields, append each item individually
                  value.forEach(item => formData.append(key, item));
              } else {
                  // Append other fields directly
                  formData.append(key, value);
              }
          }
      });
      
        // Handle the 'factured' boolean by converting to '1' or '0'
        // formData.append('Factured', values.factured ? '1' : '0');
      
      
        // Append the file to formData if present
        if (values['drag-pic'] && values['drag-pic'].length) {
          // Assuming the first object in the array holds the file information
          const fileObject = values['drag-pic'][0]; // Accessing the first item directly
          if (fileObject.originFileObj) {
              formData.append('pdfFile', fileObject.originFileObj); // Append the actual file to formData
          }
      }
      
        // Retrieve clientId and userId from form values or state/context if not part of the form
        // const clientId = values.clientId;
        // const userId = values.engineerId; // Assuming you're using engineerId as userId
      
        try {

          
          // Call the studyService to submit the form data, including the file
          // const response = await studyService.addStudy(formData, clientId, userId,createdById);
         
      
          // Handle success - e.g., showing a success message, closing the form
          handleClose(); // Assuming handleClose() closes the form/modal
        } catch (error) {
          console.error('Error adding study:', error);
          // Handle error - e.g., showing an error message
        }
      };


      const clientOptions = clients?.map((client:any) => ({ label: client?.ClientName, value: client?.IdClient }));
      const engineerOptions = engineers?.map((engineer:any) => ({ label: engineer.Email, value: engineer.UserID }));
    
     
    return ( 
      <ConfigProvider locale={fr_FR}>
    <Drawer
        title="Form Title"
        placement="right"
        closable={true}
        onClose={handleClose}
        open={isVisible}
        width={450}
      >
        <div style={{ padding: 24 }}>
          <ProForm onFinish={handleFormSubmit} submitter={{
            // Customize submit button text here
            searchConfig: {
              submitText: 'Submit Label',
              resetText: 'Reset Label',
            },
          }} >
            {/* Add your form fields here */}
            <ProFormGroup title="Form">
            <ProFormDatePicker
        width="md"
        name="DateDeReception"
        label="DateDeReceptionn"
        placeholder={"Date De Réception"}
        rules={[{ required: true, message: "Please select your Date!" }]}
      />
      <ProFormDatePicker
        width="md"
        name="DateDeSoumission"
        label="DateDeSoumission"
        placeholder={"Date De Submission"}
        rules={[{ required: true, message: "Please select your Date!" }]}
      />
        </ProFormGroup>
        <ProFormGroup>
        <ProFormSelect
          name="clientId" label="Client"
          options={clientOptions}
          placeholder="Please select a client"
          rules={[{ required: true, message: "Please select your client!" }]}
        />
        <ProFormSelect
          name="engineerId" label="Engineer"
          options={engineerOptions}
          placeholder="Please select an engenieer"
          rules={[{ required: true, message: "Please select your engenieer!" }]}
        />
        <ProFormText
            width="md"
            name="FullName"
            label="FullName"
            placeholder={"Full Name"}
            rules={[{ required: true, message: "Please entre your full name!" }]}
          />
        </ProFormGroup>
        <ProForm.Item
    name="Factured"
    valuePropName="checked" // Use "checked" to control Switch component
    initialValue={factured} // Set initial value
  >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <label>Facturé</label>
            <Switch
              checked={factured}
              checkedChildren="Oui"
              unCheckedChildren="Non"
              onChange={(checked)=>setFactured(checked)}
              style={{ marginRight: 8 }}
            />
            
          </div>
          </ProForm.Item>
         <ProFormRadio.Group
        name="TypeEtude"
        label="Type Etude"
        radioType="button"
        options={[
          { label: "NouvelleEtude", value: "NouvelleEtude" },
          { label: "Retouche", value: "Retouche" },
        ]}
        fieldProps={{
          onChange: (e) => setTypeEtude(e.target.value)
        }}
      />
      {typeEtude === 'Retouche' && (
        // Render additional fields for Retouche
        <ProFormGroup>
          <ProFormSelect
  name="typeDeRetouche"
  label="Type de Retouche"
  valueEnum={{
    Exterieur: 'Exterieur',
    Interieur: 'Interieur'
  }}
  placeholder="Please select a type"
  rules={[{ required: true, message: "Please select your type de retouche!" }]}
/>
          <ProFormDigit
            label="InputNumber"
            name="input-number"
            width="sm"
            min={1}
            max={10}
          />
          {/* Add more fields as necessary */}
        </ProFormGroup>
      )}
      <ProFormRadio.Group
          name="Category"
          label="Category"
          radioType="button"
          options={[
            {
              label: "Classique",
              value: "Classique",
            },
            {
              label: "Precaire",
              value: "Precaire",
            },
            {
              label: "Grand Precaire",
              value: "GrandPrecaire",
            },
          ]}
        />
        <ProFormCheckbox.Group
            name="Nature"
            label="Nature"
            options={['Normale', 'Prioritere']}
          />
          <ProFormUploadDragger name="drag-pic" label="drag-pic" title="Drag files here to upload"
            description="or click to browse files" />
          </ProForm>
        </div>
      </Drawer>
      </ConfigProvider>)
  }

  export default AddStudyPanel 