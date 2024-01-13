import React, { useState, useEffect } from "react";
import { Card } from "../../components/Cards/Card";
import ChartBar from "../../components/Charts/ChartBar";
import { EyeOutlined, EditOutlined, DeleteOutlined, CaretDownOutlined } from '@ant-design/icons'; // Import necessary icons
export const Engineer:React.FC = () => {
    const [dropdownItem, setDropdownItem] = useState<any>(null);
  // Sample data for demonstration (replace this with your actual data or fetch it)
  const [engineers, setEngineers] = useState([
    { id: 1, name: "Engineer A", studiesDone: 20 },
    { id: 2, name: "Engineer B", studiesDone: 15 },
    { id: 3, name: "Engineer C", studiesDone: 25 },
    { id: 4, name: "Engineer D", studiesDone: 50 },
    // Add more engineers...
  ]);

  // Sort engineers by studies done to identify top performers
  const sortedEngineers = engineers.sort((a, b) => b.studiesDone - a.studiesDone);
  const topThreeEngineers = sortedEngineers.slice(0, 3);

  // Functions to handle CRUD operations
//   const addEngineer = (engineer) => {
//     // Logic to add an engineer to the list
//   };

//   const deleteEngineer = (engineerId) => {
//     // Logic to delete an engineer from the list
//   };

//   const updateEngineer = (engineerId, newData) => {
//     // Logic to update engineer's information
//   };

  // useEffect to fetch data or perform other actions on component mount
  useEffect(() => {
    // Fetch data or any other initialization
  }, []);
  const handleDropdown = (item: any) => {
    setDropdownItem(dropdownItem === item ? null : item);
  };
  return (
   
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
  {/* First Card - Engineer Performance */}
  <Card className="bg-gray-100">
    <div className="card-body m-6">
      <h1 className="text-2xl font-bold mb-4">Engineer Performance</h1>
      {/* Display top three engineers */}
      <ul>
        {topThreeEngineers.map((engineer, index) => (
          <li
            key={engineer.id}
            className={`py-2 mt-2 ${
              index === 0
                ? 'bg-teal-400' // First engineer - Blue background
                : index === 1
                ? 'bg-orange-400' // Second engineer - Green background
                : 'bg-yellow-300' // Third engineer - Yellow background
            }`}
          >
            {engineer.name} - {engineer.studiesDone} studies done
          </li>
        ))}
      </ul>
    </div>
  </Card>

  {/* Second Card - ChartBar */}
  <Card className="bg-gray-100">
    {/* ... Content for the ChartBar card */}
    <div className="card-body m-4 ">
      <ChartBar />
    </div>
  </Card>
  {/* Third Card -Engineer List  */}
  <Card className="bg-gray-100 md:col-span-2">
    <div className="card-body m-6">
      <h1 className="text-2xl font-bold mb-4">Engineer List</h1>
      {/* Engineer List with Action Dropdown */}
      <div className="flex flex-col">
      {engineers.map((engineer) => (
          <div key={engineer.id} className="flex justify-between py-2 border-b">
            <div>
              <p>{engineer.name}</p>
              
            </div>
            <div className="relative">
              <button onClick={() => handleDropdown(engineer)} className="text-blue-500 hover:underline">
                <CaretDownOutlined />
              </button>
              {dropdownItem === engineer && (
                <div className="absolute bg-white shadow-md rounded-md py-2 top-10 right-0 z-10">
                  <button  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <EyeOutlined /> Read
                  </button>
                  <button  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <EditOutlined /> Update
                  </button>
                  <button  className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <DeleteOutlined /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  </Card>

  
  
</div>
  );
};


