// src/SearchInvoices.js

import React, { useState } from 'react';
import { Input, Button, Table, message } from 'antd';
import axios from 'axios';

const { Search } = Input;

const SearchInvoices = () => {
  const [issuer, setIssuer] = useState('');
  const [recipient, setRecipient] = useState('');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: '_id',
      key: '_id',
    },
    {
      title: 'Issuer',
      dataIndex: '_source',
      key: 'issuer',
      render: (text) => text.issuer,
    },
    {
      title: 'Recipient',
      dataIndex: '_source',
      key: 'recipient',
      render: (text) => text.recipient,
    },
    {
      title: 'Internal Format',
      dataIndex: '_source',
      key: 'internal_format',
      render: (text) => text.internal_format,
    },
    {
      title: 'Created At',
      dataIndex: '_source',
      key: 'created_at',
      render: (text) => new Date(text.created_at).toLocaleString(),
    },
  ];

  const fetchData = async () => {
    if (!issuer && !recipient) {
      message.error('Please provide either an issuer or a recipient');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/search/', {
        params: { issuer, recipient },
      });
      setData(response.data);
    } catch (error) {
      message.error('Failed to fetch data');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Search Invoices</h1>
      <Input
        placeholder="Issuer"
        value={issuer}
        onChange={(e) => setIssuer(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Input
        placeholder="Recipient"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        style={{ marginBottom: 8 }}
      />
      <Button type="primary" onClick={fetchData} loading={loading}>
        Search
      </Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record._id}
        loading={loading}
        style={{ marginTop: 24 }}
      />
    </div>
  );
};

export default SearchInvoices;
