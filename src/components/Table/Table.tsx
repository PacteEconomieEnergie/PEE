import React, { useState, useEffect, useRef } from 'react';
import FileDownloader from '../forms/FileDownloader'; // Update with correct path
import { EyeOutlined, EditOutlined, DeleteOutlined, CaretDownOutlined } from '@ant-design/icons'; // Import necessary icons

interface TableProps {
  data: {
    [key: string]: any;
  }[];
}

export const Table: React.FC<TableProps> = ({ data }) => {
  const allKeys = data.reduce<Set<string>>((keys, currentItem) => {
    Object.keys(currentItem).forEach((key) => keys.add(key));
    return keys;
  }, new Set<string>());

  const keys = Array.from(allKeys);

  const [dropdownItem, setDropdownItem] = useState<any>(null);
  const dropdownRef = useRef<HTMLTableDataCellElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownItem(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleRead = (record: any) => {
    // Handle read action
  };

  const handleUpdate = (record: any) => {
    // Handle update action
  };

  const handleDelete = (record: any) => {
    // Handle delete action
  };

  const handleDropdown = (item: any) => {
    setDropdownItem(dropdownItem === item ? null : item);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            {keys.map((key) => (
              <th key={key} className="py-3 px-6 text-left">
                {key.toUpperCase()}
              </th>
            ))}
            <th className="py-3 px-6 text-left">Actions</th> {/* Actions Header */}
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              {keys.map((key) => (
                <td key={key} className="py-3 px-6 text-left">
                  {key === 'files' && item[key] ? (
                    <a href={item[key]} download className="text-blue-500 hover:underline">
                      Download File
                    </a>
                  ) : key === 'fileHistory' ? (
                    <FileDownloader fileHistory={item[key]} />
                  ) : item[key] === undefined ? (
                    <span className="italic">No File existed</span>
                  ) : (
                    item[key]
                  )}
                </td>
              ))}
              <td className="py-3 px-6 text-left space-x-2 relative" ref={dropdownRef}>
                <button onClick={() => handleDropdown(item)} className="text-blue-500 hover:underline">
                  <CaretDownOutlined />
                </button>
                {dropdownItem === item && (
                  <div className="absolute bg-white shadow-md rounded-md py-2 top-10 right-0 z-10">
                    <button onClick={() => handleRead(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <EyeOutlined /> Read
                    </button>
                    <button onClick={() => handleUpdate(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <EditOutlined /> Update
                    </button>
                    <button onClick={() => handleDelete(item)} className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                      <DeleteOutlined /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
