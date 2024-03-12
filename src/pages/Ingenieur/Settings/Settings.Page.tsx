import React, { useEffect } from 'react';
import { Form, Input, Button, Upload, Avatar} from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { FiPhone } from "react-icons/fi";
import { useSelector } from 'react-redux';
import ApiService from '../../../Services/Api/ApiService';
import { useAvatar } from '../../../Contexts/AvatarProvider';

// Additional imports if you're handling state with Redux

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  // const dispatch = useDispatch(); // if you're using Redux
  const {id}=useSelector((state:any)=>state.auth)
  const { avatar, updateAvatar } = useAvatar();

  useEffect(() => {
    
  }, [avatar]);
  const handleAvatarChange =async (info: any) => {

    const userId = id;
    if (info.file.status === 'uploading') {
      console.log("Uploading...");
      return;
    }
    if (info.file) {
 
  
      try {
        // Directly use info.file as the file to upload.
        const fileToUpload = info.file; // Assuming this is the correct file object.
        
        
         await ApiService.uploadUserProfilePicture(userId, fileToUpload).then((response:any)=>updateAvatar(response.updatedUser.Avatar));
       
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    } else {
      console.error("Unexpected status or missing file object.");
    }
  }
  

  const handleSubmit = (values: any) => {
    // Dispatch an action or call a function to save the updated  settings
    console.log(values);
  };

  return (
    <div className="container mx-auto p-4">
      <Form
        form={form}
        onFinish={handleSubmit}
        layout="vertical"
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <Form.Item label="Avatar">
          <div className="flex items-center space-x-4">
            <Avatar key={avatar} size={64} src={avatar} icon={!avatar && <UserOutlined />} />
            <Upload
              name="avatar"
              listType="picture"
              showUploadList={false}
               beforeUpload={() => false} // Prevent automatic upload since you'll handle it manually
              onChange={handleAvatarChange}
            >
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </div>
        </Form.Item>
        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input your name!' }]}>
          <Input prefix={<UserOutlined />} />
        </Form.Item>
        <Form.Item label="Phone Number" name="Phone Number" rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
          <Input prefix={<FiPhone />} />
        </Form.Item>
        <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true, message: 'Please input your old password!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
