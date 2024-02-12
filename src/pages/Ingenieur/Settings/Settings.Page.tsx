import React, { useState,useEffect } from 'react';
import { Form, Input, Button, Upload, Avatar} from 'antd';
import { UserOutlined, LockOutlined, UploadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
// Additional imports if you're handling state with Redux

const Settings: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch(); // if you're using Redux

  const [avatar, setAvatar] = useState<string>(); // State to hold the avatar URL


  useEffect(() => {
    // Clean up the object URL
    return () => {
      if (avatar) {
        URL.revokeObjectURL(avatar);
      }
    };
  }, [avatar]);
  const handleAvatarChange = (info: any) => {
    console.log(info.file.originFileObj);
    
    // Since there's no backend upload, we're assuming the 'done' status is immediately available
    // For real applications, you'd handle the server response here
    if ( info.file && info.file.type.startsWith('image/')) {
      // Create a URL for the uploaded file
      console.log("loged");
      
      const imageUrl = URL.createObjectURL(info.file);
      console.log('Image URL:', imageUrl);
      setAvatar(imageUrl);
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
