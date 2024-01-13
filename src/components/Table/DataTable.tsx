import React from 'react';
import { Table, Button, Dropdown,Menu } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined, EllipsisOutlined } from '@ant-design/icons';
import { PageHeader } from '@ant-design/pro-layout';
import { ColumnProps } from 'antd/es/table';
import { ColumnType, ColumnGroupType } from 'antd/lib/table';
import SidePanel from '../Panel/SidePanel';
interface DataTableConfig {
    dataTableColumns: ColumnProps<any>[];
    DATATABLE_TITLE: string;
    userData: any[];  // Replace 'any' with the actual type of your user data
  }
  export const DataTable: React.FC<{ config: DataTableConfig }> = ({ config }) => {
  const { dataTableColumns, DATATABLE_TITLE, userData } = config;
  const [sidePanelVisible, setSidePanelVisible] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState<any | null>(null);
  const items = [
    {
      label: 'Show',
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: 'Edit',
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      type: 'divider',
    },  
    {
      label: 'Delete',
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];

  const handleAction = (key: any, record: any) => {
    switch (key) {
      case 'read':
        setSelectedUser(record);
        setSidePanelVisible(true);
        break;
  
      case 'edit':
        setSelectedUser(record);
        setSidePanelVisible(true);
        break;
  
      default:
        break;
    }
  };
  
  const handleRead = (record: any) => {
    setSelectedUser(record);
    setSidePanelVisible(true);
  };

  const dataTableColumnsWithAction: (ColumnType<any> | ColumnGroupType<any>)[] = [
    ...dataTableColumns,
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (text: any, record: any) => (
        <Dropdown
          overlay={
            <Menu>
              {items.map((item) => (
                <Menu.Item key={item.key??""} onClick={() => handleAction(item.key, record)}>
                  {item.icon} {item.label}
                </Menu.Item>
              ))}
            </Menu>
          }
          trigger={['click']}
        >
          <EllipsisOutlined style={{ cursor: 'pointer', fontSize: '24px' }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={false}
        extra={[
          
          // <AddNewItem key="addNewItem" config={config} />, // AddNewItem component not defined
        ]}
        style={{ padding: '20px 0px' }}
      />
      <Table
        columns={dataTableColumnsWithAction}
        rowKey={(item) => item.id}
        dataSource={userData}
        pagination={false}
        // loading={/* Add loading state based on Redux store or other state management */}
        scroll={{ x: true }}
      />
      <SidePanel
        visible={sidePanelVisible}
        user={selectedUser}
        onClose={() => setSidePanelVisible(false)}
        onSave={(editedUser) => {
            // Implement your update logic here
            console.log('Saving user:', editedUser);
            // Call any necessary function to update the user data in your state or backend
          }}
      />
    </>
  );
};


