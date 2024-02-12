import React from 'react';

// Interface for a single message
interface Message {
  id: string;
  message: string;
}

// Interface for MessagePanel props
interface MessagePanelProps {
  messages: Message[];
}

// Single message item component
const MessageItem: React.FC<{ message: Message }> = ({ message }) => (
  <li className="flex items-center mb-4">
    <p className="text-sm text-blue-900">{message.message}</p>
  </li>
);

// Main message panel component
const MessagePanel: React.FC<MessagePanelProps> = ({ messages }) => {
  return (
    <div className="bg-green-100 border-t-4 border-green-500 rounded-lg px-4 py-3 shadow-md max-h-96 overflow-y-auto">
      <h5 className="font-bold text-green-900 mb-4">Messages</h5>
      <ul>
        {messages.map((message) => (
          <MessageItem key={message.id} message={message} />
        ))}
      </ul>
    </div>
  );
};

export default MessagePanel;
