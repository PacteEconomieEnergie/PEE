import React, { useState, useEffect } from 'react';
import { Drawer, Descriptions, Button, Form, Input } from 'antd';

// Assuming your data type could be more complex than just string or number
interface SidePanelProps {
  visible: boolean;
  data: any; // Using any to accommodate complex nested structures
  onClose?: () => void;
  onSave?: (editedData: any) => void; // Accept any type for editedData
  isEditing?: boolean;
}

const SidePanel: React.FC<SidePanelProps> = ({
  visible,
  data,
  onClose,
  onSave,
  isEditing,
}) => {
  const [editedData, setEditedData] = useState(data);
console.log(data,'the sidepanel data');

  useEffect(() => {
    setEditedData(data);
  }, [data]);

  const renderDescriptionItem = (key: string, value: any) => {
    
    
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Descriptions.Item label={`${key} ${index + 1}`} key={`${key}-${index}`}>
          {typeof item === 'object' ? JSON.stringify(item, null, 2) : item.toString()}
        </Descriptions.Item>
      ));
    } else if (typeof value === 'object') {
      return <Descriptions.Item label={key}>{JSON.stringify(value, null, 2)}</Descriptions.Item>;
    } else {
      return <Descriptions.Item label={key}>{value}</Descriptions.Item>;
    }
  };

  const handleSave = () => {
    if (onSave) {
      onSave(editedData);
    }
  };

  return (
    <Drawer
      width={400}
      title="Details"
      placement="right"
      closable={true}
      onClose={onClose}
      open={visible}
    >
      {isEditing ? (
        // For simplicity, not handling editing of complex structures in this example
        <Form layout="vertical">
          {Object.entries(editedData).map(([key, value]) => (
            <Form.Item label={key} key={key}>
              <Input
                value={value as string}
                onChange={(e) => setEditedData({ ...editedData, [key]: e.target.value })}
              />
            </Form.Item>
          ))}
          <Button onClick={handleSave} type="primary">
            Save
          </Button>
        </Form>
      ) : (
        <Descriptions column={1}>
          {Object.entries(data).map(([key, value]) => renderDescriptionItem(key, value))}
        </Descriptions>
      )}
      <Button onClick={onClose} style={{ marginTop: 16 }}>
        Close
      </Button>
    </Drawer>
  );
};

export default SidePanel;
