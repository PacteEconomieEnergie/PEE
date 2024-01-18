import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Form, Input } from 'antd';

interface SidePanelProps<T extends Record<string, string | number>> {
  visible: boolean;
  data: T;
  onClose: () => void;
  onSave: (editedData: T) => void;
  isEditing: boolean; // Add the isEditing prop
}

const SidePanel = <T extends Record<string, string | number>>({
  visible,
  data,
  onClose,
  onSave,
  isEditing, // Receive isEditing as a prop
}: SidePanelProps<T>) => {
  const { id, ...dataWithoutId } = data;
  const [editedData, setEditedData] = useState(dataWithoutId);

  useEffect(() => {
    setEditedData(dataWithoutId);
  }, []);

  const handleEdit = () => {
    setEditedData(dataWithoutId); // Reset editedData when switching to edit mode
  };

  const handleSave = () => {
    onSave(editedData as T);
  };

  return (
    <Drawer
      width={400}
      title={`Details`}
      placement="right"
      closable={true}
      onClose={onClose}
      open={visible}
    >
      {isEditing ? (
        <Form>
          <Descriptions column={1}>
            {Object.keys(dataWithoutId)?.map((key) => (
              <Descriptions.Item label={key} key={key}>
                <Input
                  value={editedData[key] as string}
                  onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
                />
              </Descriptions.Item>
            ))}
          </Descriptions>
          
        </Form>
      ) : (
        <Descriptions column={1}>
          {Object.keys(dataWithoutId).map((key) => (
            <Descriptions.Item label={key} key={key}>
              {dataWithoutId[key]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      )}

{isEditing ? (
        <>
          <Button
            className='bg-gray-200'
            onClick={handleSave}
            style={{ marginTop: '10px', display: 'block' }}
          >
            Save
          </Button>
          <Button
            className='bg-gray-200'
            onClick={onClose}
            style={{ marginLeft: '10px', display: 'block' }}
          >
            Close
          </Button>
        </>
      ) : (
        <Button
          className='bg-gray-200'
          onClick={onClose}
          style={{ marginTop: '10px', marginLeft: '10px', display: 'block' }}
        >
          Close
        </Button>
      )}
    </Drawer>
  );
};

export default SidePanel;
