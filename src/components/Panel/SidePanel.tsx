import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Form, Input } from 'antd';

interface SidePanelProps {
  visible: boolean;
  user: any; // Replace 'any' with the actual type of your user data
  onClose: () => void;
  onSave: (editedUser: any) => void;
}

const SidePanel: React.FC<SidePanelProps> = ({ visible, user, onClose, onSave }) => {
  const [isEditing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Implement your update logic here
    onSave(editedUser);
    setEditing(false);
  };

  return (
    <Drawer
      width={400}
      title={`Details for ${user?.name}`}
      placement="right"
      closable={true}
      onClose={onClose}
      visible={visible}
    >
      {isEditing ? (
        <Form>
          <Descriptions column={1}>
            <Descriptions.Item label="Name">
              <Input
                value={editedUser?.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            </Descriptions.Item>
            <Descriptions.Item label="email">
              <Input
                value={editedUser?.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              />
            </Descriptions.Item>
            <Descriptions.Item label="phone">
              <Input
                value={editedUser?.phone}
                onChange={(e) => setEditedUser({ ...editedUser, phone: e.target.value })}
              />
            </Descriptions.Item>
          </Descriptions>
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
        </Form>
      ) : (
        <Descriptions column={1}>
          <Descriptions.Item label="Name">{user?.name}</Descriptions.Item>
          <Descriptions.Item label="email">{user?.email}</Descriptions.Item>
          <Descriptions.Item label="phone">{user?.phone}</Descriptions.Item>
        </Descriptions>
      )}

      <Button
        type="primary"
        onClick={() => (isEditing ? handleSave() : handleEdit())}
        style={{ marginTop: '10px' }}
      >
        {isEditing ? 'Save' : 'Edit'}
      </Button>
      <Button className='bg-gray-200' type="primary" onClick={onClose} style={{ marginLeft: '10px' }}>
        Close
      </Button>
    </Drawer>
  );
};

export default SidePanel;
