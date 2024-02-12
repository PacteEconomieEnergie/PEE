import React, { useState } from 'react';
import { Input, Button, Select,Modal,message } from 'antd';
import ApiService from '../../Services/Api/ApiService';


const { Option } = Select;

interface AddUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
}

const AddUserModal: React.FC<AddUserModalProps> = ({ isOpen, onClose, onAddUser }) => {
  const [userRole, setUserRole] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFormSubmit = async () => {
    // Validate input fields
    if (!email || !password || !userRole) {
      message.error('Please fill in all fields'); // Display error message for missing fields
      return;
    }
  
  
    // Call the onAddUser function to add the new user
    try {
        const response = await ApiService.addUser(email, password, userRole);
        
        
        if (response) {
            // Display success message
            message.success('User added successfully');
            // Close the modal after adding the user
            onClose();
            // Call the onAddUser function to update the user list in UserList component
            onAddUser(response);
          } else {
            // Display error message if the response indicates an error
            message.error('Failed to add user');
          }
    } catch (error) {
      message.error('Failed to add user'); // Display error message if user addition fails
    }
  };
  

  return (
    <Modal open={isOpen} onCancel={onClose} footer={null}>
      {/* Modal content for adding a new user */}
      <h2>Add New User</h2>
      {/* Input fields for user information */}
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Select
        placeholder="Select User Role"
        onChange={(value) => setUserRole(value)}
        value={userRole}
      >
        <Option value="ASSISTANT">Assistant</Option>
        <Option value="ENGINEER">Engineer</Option>
      </Select>
      <Button type="primary" onClick={handleFormSubmit}>
        Add User
      </Button>
      <Button type="default" onClick={onClose}>
        Close Modal
      </Button>
    </Modal>
  );
};

export default AddUserModal;
