import React, { useEffect } from 'react';
import { Form, Input, Button, Upload, Avatar,message} from 'antd';
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
      console.log(info.file.status,"Uploading...");
      return;
    }
    if (info.file) {
 
  
      try {
        // Directly use info.file as the file to upload.
        const fileToUpload = info.file; // Assuming this is the correct file object.
        
        
         await ApiService.uploadUserProfilePicture(userId, fileToUpload).then((response:any)=>{
          updateAvatar(response.updatedUser.Avatar);
          message.destroy(); // Remove the loading message
          message.success('Profile picture updated successfully.');
        })
       
      } catch (error) {
        message.error('Failed to upload picture. Please try again.');
        console.error('Error uploading file:', error);
      }
    } else {
      message.error('Upload failed. Please check your connection.');
      console.error("Unexpected status or missing file object.");
    }
  }
  

  const handleSubmit = async (values: any) => {
    const { name, phoneNumber, oldPassword, newPassword, confirmPassword } = values;
  const userId=id;
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      message.error('New password and confirm password do not match.');
      return; // Stop the form submission process
    }
  
    try {
      // Prepare the data object for updating user settings
      const settingsData = {
        name,
        phoneNumber,
        oldPassword,
        newPassword,
      };

  
      // Call the updateUserSettings method from ApiService
      await ApiService.updateUserSettings(userId, settingsData);
  
      // Show a success message
      message.success('Your settings have been updated successfully.');
  
      // Optionally, reset the form here using form.resetFields() if needed
    } catch (error:any) {
      if (error.response && error.response.status === 400) {
        message.error('Invalid data. Please review your entries.');
      } else if (error.response && error.response.status === 401) {
        message.error('You are not authorized to perform this action. Please login again.');
      } else {
        message.error('An unexpected error occurred. Please try again later.');
      }
      // console.error('Error updating user settings:', error);
      // // Show an error message
      // message.error('Failed to update settings. Please try again.');
    }
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
        <Form.Item label="Phone Number" name="phoneNumber" rules={[{ required: true, message: 'Please input your Phone Number!' }]}>
          <Input prefix={<FiPhone />} />
        </Form.Item>
        <Form.Item label="Old Password" name="oldPassword" rules={[{ required: true, message: 'Please input your old password!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item label="New Password" name="newPassword" rules={[{ required: true, message: 'Please input your new password!' }]}>
          <Input.Password prefix={<LockOutlined />} />
        </Form.Item>

        <Form.Item
  label="Confirm New Password"
  name="confirmPassword"
  rules={[
    {
      required: true,
      message: 'Please confirm your new password!',
    },
    // Additional validation rules as needed
  ]}
>
  <Input.Password prefix={<LockOutlined />} />
</Form.Item>

        <Form.Item>
          <Button  htmlType="button" className='bg-lime-500'>
            Save Changes
          </Button>
          <Button  htmlType="reset" className='bg-lime-500 m-4'>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Settings;
