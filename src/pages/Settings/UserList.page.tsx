import React,{useState} from 'react';
import { useParams } from 'react-router-dom';
import {DataTable} from "../../components/Table/DataTable";  
import AddUserModal from '../../components/modals/AddUserModal';
function UserList() {
  const { userType } = useParams();


  // Sample user data, replace with your actual user data
  const userData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Doe', email: 'jane@example.com', phone: '987-654-3210',phone2: '987-654-3210' },
    // Add more users as needed
  ];

  const dataTableConfig = {
    dataTableColumns: [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
        key: 'phone',
      },
    ],
    DATATABLE_TITLE: ` ${userType} Data Table`,
    userData: userData,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const addUser = (newUser:any) => {
    console.log("A new user is being added");
    
  };
  return (
    
    
    <div>
    <button onClick={openModal}>Add User</button>
    <DataTable config={dataTableConfig} />
    {/* Use the AddUserModal component */}
    <AddUserModal isOpen={isModalOpen} onClose={closeModal} onAddUser={addUser} />
  </div> 
    
  );
}

export default UserList;
