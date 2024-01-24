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


  const AddStudyPanel:React.FC=()=>{
    const dispatch = useDispatch();
    const isVisible = useSelector((state:any) => state.sidePanel.isVisible);
    const [clientOptions, setClientOptions] = useState({});
    const [factured,setFactured]=useState(false)
    const [typeEtude, setTypeEtude] = useState('');
    const [nature,setNature]=useState('')
    useEffect(() => {
      // Predefined clients data
      const clients = [
        { "IdClient": 1, "ClientName": "Acme Corporation" },
        { "IdClient": 2, "ClientName": "Globex Inc." },
        { "IdClient": 3, "ClientName": "Soylent Corp" }
      ];
      
      // Transforming the clients data into the format suitable for `valueEnum`
      const options = clients.reduce((acc:any, client) => {
        acc[client.IdClient] = client.ClientName;
        return acc;
      }, {});
  
      setClientOptions(options);
    }, []);
  
    const handleClose = () => {
        dispatch(toggleSidePanel());
      };


      const handleFormSubmit = async (values:any) => {
        console.log('Form Submitted:', values); // values will be an object with keys like 'password'
        // values.password will hold the data entered in the "Password" field
      };




    return ( <Drawer
        title="Form Title"
        placement="right"
        closable={true}
        onClose={handleClose}
        open={isVisible}
        width={450}
      >
        <div style={{ padding: 24 }}>
          <ProForm onFinish={handleFormSubmit} >
            {/* Add your form fields here */}
            <ProFormGroup title="Form">
            <ProFormDatePicker
        width="md"
        name="DateDeRéception"
        label="Date De Réception"
        placeholder={"Date De Réception"}
      />
      <ProFormDatePicker
        width="md"
        name="DateDeSubmission"
        label="Date De Submission"
        placeholder={"Date De Submission"}
      />
        </ProFormGroup>
        <ProFormGroup>
        <ProFormSelect
          name="select"
          label="Select"
          valueEnum={clientOptions}
          placeholder="Please select a client"
          rules={[{ required: true, message: "Please select your client!" }]}
        />
        <ProFormText
            width="md"
            name="FullName"
            label="FullName"
            placeholder={"Full Name"}
            rules={[{ required: true, message: "Please entre your full name!" }]}
          />
        </ProFormGroup>
        <Switch
          
          checked={factured}
          checkedChildren="Oui "
          unCheckedChildren="Non"
          onChange={setFactured}
        />
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
          <ProFormUploadDragger name="drag-pic" label="drag-pic" placeholder={"Please Add Your PDF File Here... "} />
          </ProForm>
        </div>
      </Drawer>)
  }

  export default AddStudyPanel 