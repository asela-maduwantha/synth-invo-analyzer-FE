import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const AddSupplierForm = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const organizationId = localStorage.getItem('user_id'); // Assuming user_id is the organization_id
      const config = {
        headers: {
          'Authorization': `${token}` 
        }
      };
      const data = {
        ...values,
        organization_id: organizationId,
      };
      const response = await axios.post('http://127.0.0.1:8000/auth/add-supplier/', data, config);
      message.success(response.data.message);
    } catch (error) {
      message.error('Failed to send email. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ width: '300px' }}>
        <Form
          name="add_supplier_form"
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="supplier_email"
            label="Supplier Email"
            rules={[
              { required: true, message: 'Please enter the supplier email!' },
              { type: 'email', message: 'Please enter a valid email address!' },
            ]}
          >
            <Input />
          </Form.Item>

          {/* Hidden field for organization_id */}
          <Form.Item name="organization_id" style={{ display: 'none' }}>
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} style={{ width: '100%' }}>
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddSupplierForm;
