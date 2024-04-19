import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

interface Visit {
  key: string;
  name: string;
  address: string;
  phone: string;
  visitDate: string;
  accompanier: string;
}

const visitsData: Visit[] = [
  {
    key: '1',
    name: 'Éric Dupont',
    address: '18 rue du gén dufieux, 68650, Lapoutroie',
    phone: '0612345678',
    visitDate: '01/03/2024 16h00',
    accompanier: 'Michel Chaussé',
  },
  {
    key: '2',
    name: 'Cédric Verdou',
    address: '75 rue du gén dufieux, 68650, Lapoutroie',
    phone: '0612345678',
    visitDate: '29/03/2024 16h00',
    accompanier: 'Michel Chaussé',
  },
  {
    key: '3',
    name: 'Sacha Erdane',
    address: '10 rue du gén dufieux, 68650, Lapoutroie',
    phone: '0612345678',
    visitDate: '29/03/2024 16h00',
    accompanier: 'Michel Chaussé',
  },
  {
    key: '4',
    name: 'GUSTIN VIRGINIE',
    address: '10 QUAI ETIENNE LALLIA, 77350 LE MEESUR-SEIN',
    phone: '0612345678',
    visitDate: '29/03/2023 16h00',
    accompanier: 'Michel Chaussé',
  },
];

const columns: ColumnsType<Visit> = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Visit Date',
    dataIndex: 'visitDate',
    key: 'visitDate',
  },
  {
    title: 'Accompanier',
    dataIndex: 'accompanier',
    key: 'accompanier',
  },
];

const PlannedVisits: React.FC = () => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <Table dataSource={visitsData} columns={columns} pagination={false} />
    </div>
  );
};

export default PlannedVisits;
