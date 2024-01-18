import React from 'react';
import { useParams } from 'react-router-dom';
import {DataTable} from "../../components/Table/DataTable";  

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

  return (
    
    
      <DataTable config={dataTableConfig} /> 
    
  );
}

export default UserList;
