import React, { useState } from 'react';
import { Form, Input, Button, Typography, Upload, Row, Col, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import leadService from '../../Services/Api/leadService';
import { useNavigate } from "react-router-dom";
// import 'antd/dist/antd.css'; 

interface ClientDetails {
  name: string;
  address: string;
  postalCode: string;
  visitDate: string;
}

const clientDetails: ClientDetails = {
  name: 'GUSTIN VIRGINIE',
  address: '10 Quai Etienne Lallia',
  postalCode: '77350 Le Mée-sur-seine',
  visitDate: '29/03/2023 16h00'
};
const { Title } = Typography;
const { TextArea } = Input;
const TechnicalVisit: React.FC = () => {
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();
  const handleChange = ({ fileList }: any) => setFileList(fileList);

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('files[]', file);
    });
    // Assuming 'uploadAction' is the API endpoint
    fetch('uploadAction', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        message.success('upload successfully.');
      })
      .catch(() => {
        message.error('upload failed.');
      });
  };
  const onFinish = async (values: any) => {
    const formData = new FormData();
    fileList.forEach((file: any) => {
        formData.append('pdfFile', file.originFileObj); // appending files to FormData
    });

    // Add non-file form data
    Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
    });

    // Determining the type of the file or upload, you can customize this logic
     // Assume you have a function that sets this
    formData.append('type', "PieceJointe"); // Append the type which is not visible to the user

    try {
        const response = await leadService.createLead(formData);
        console.log(response);
        
        message.success('Lead created successfully!');
        console.log('Server response:', response);
        navigate('/client/PlannedVisits')
    } catch (error) {
        message.error('Failed to create lead.');
        console.error('Error:', error);
    }
  };

  // Form fail handler
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  }
  return (
    <div className="technical-visit-form px-4 py-8 mx-auto max-w-4xl bg-white shadow-lg rounded-lg text-gray-800" >
      <Title level={2} className="text-center text-2xl font-bold text-gray-800 mb-6">FICHE CLIENT</Title>
     
      <Form
        name="technicalAudit"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
        autoComplete="off"
        className="space-y-4"
      >
        <Row gutter={[16, 16]}>
        <Col span={12}>
            <Form.Item label="Nom" name="nom">
              <Input className="input input-bordered w-full" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Prénom" name="prenom">
              <Input  className="input input-bordered w-full"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Adresse" name="adresse">
              <Input className="input input-bordered w-full"/>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Code Postal" name="codePostal">
              <Input className="input input-bordered w-full"/>
            </Form.Item> 
          </Col>
          <Col span={6}>
            <Form.Item label="Ville" name="ville">
              <Input className="input input-bordered w-full"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Téléphone" name="telephone">
              <Input className="input input-bordered"/>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Email" name="mail">
              <Input type="email" className="input input-bordered "/>
            </Form.Item>
          </Col>
          <Col span={24}>
            <Title level={5}>SURFACE 101: </Title>
          </Col>
          <Col span={6}>
            <Form.Item label="Surface Habitable" name="surfaceHabitable">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Type de Chauffage" name="typeDeChauffage">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Type de Maison" name="typeMaison">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Année de Construction" name="anneeDeConstruction">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Numéro Fiscal" name="numeroFiscal">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Réf. Fiscale" name="refFiscale">
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Upload
              fileList={fileList}
              onChange={handleChange}
              beforeUpload={() => false} // Prevent automatic upload
              className="block w-full text-sm text-gray-600"
            >
              <Button icon={<UploadOutlined /> }className="btn btn-primary">Importer des documents</Button>
            </Upload>
          </Col>
<Col span={12}>
            <Button type="default" htmlType="submit" className="btn btn-primary w-full">
              Submit
            </Button>
          </Col>
          {/* Form Buttons */}
          <Col span={12}>
            <Button type="default" onClick={onFinishFailed} className="btn bg-red-500 w-full">
              Annuler
            </Button>
          </Col>
          
        </Row>

        
       
      </Form>
    </div>
  );
};

export default TechnicalVisit;
