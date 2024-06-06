import React, { useState, useEffect } from 'react';
import { Select, Button, Spin, message, Modal, Table } from 'antd';
import axios from 'axios';
import HeaderInside from '../../common/HeaderInside/HeaderInside';

const { Option } = Select;

const TemplateMapping = () => {
  const [templateKeys, setTemplateKeys] = useState([]);
  const [internalAttributes, setInternalAttributes] = useState([]);
  const [mapping, setMapping] = useState({});
  const [loading, setLoading] = useState(true);
  const [mappingVisible, setMappingVisible] = useState(false);
  const template_id = localStorage.getItem('template_id');
  const user_id = localStorage.getItem('user_id');

  useEffect(() => {
    const fetchKeysAndAttributes = async () => {
      try {
        const [templateKeysRes, internalAttributesRes] = await Promise.all([
          axios.get(`http://localhost:8000/template/get_template_keys/${template_id}/`),
          axios.get('http://localhost:8000/template/get-internal-keys/'),
        ]);

        setTemplateKeys(templateKeysRes.data.keys);
        setInternalAttributes(internalAttributesRes.data.attributes);
      } catch (error) {
        message.error('Error fetching data');
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKeysAndAttributes();
  }, [template_id]);

  const handleMappingChange = (templateKey, internalAttr) => {
    setMapping((prevMapping) => ({
      ...prevMapping,
      [templateKey]: internalAttr,
    }));
  };

  const saveMapping = async () => {
    try {
      // Create a new mapping object formatted correctly
      const organizedMapping = {
        template_id: template_id,
        user_id: user_id,
        mapping: mapping, // Use mapping directly without modifications
      };

      await axios.post('http://localhost:8000/template/save_template_mapping/', organizedMapping);

      message.success('Mapping saved successfully');
      localStorage.removeItem('template_id');
    } catch (error) {
      message.error('Error saving mapping');
      console.error('Error:', error);
    }
  };

  const allMapped = templateKeys.length > 0 && templateKeys.every((key) => mapping[key]);

  const columns = [
    {
      title: 'Template Key',
      dataIndex: 'templateKey',
      key: 'templateKey',
    },
    {
      title: 'Internal Attribute',
      dataIndex: 'internalAttr',
      key: 'internalAttr',
      render: (text) => <div>{text}</div>,
    },
  ];

  const mappingData = Object.keys(mapping).map((key) => ({
    templateKey: key,
    internalAttr: mapping[key],
  }));

  return loading ? (
    <Spin />
  ) : (
    <>
      <HeaderInside />
      <div style={{ padding: '20px' }}>
        <h3 style={{ textAlign: 'center' }}>Let's Map Your Invoice to Our Internal Format</h3>
        <br />
        <div style={{ maxHeight: '400px', overflowY: 'scroll', textAlign: 'center', width: '80%', margin: 'auto' }}>
          <Table
            columns={columns}
            dataSource={templateKeys.map((templateKey) => ({
              key: templateKey,
              templateKey: templateKey,
              internalAttr: (
                <Select
                  showSearch
                  style={{ width: 300, margin: '0 auto', display: 'block' }}
                  placeholder="Select internal attribute"
                  onChange={(value) => handleMappingChange(templateKey, value)}
                >
                  {internalAttributes.map((attr) => (
                    <Option key={attr} value={attr}>
                      {attr}
                    </Option>
                  ))}
                </Select>
              ),
            }))}
            pagination={false}
            bordered
            style={{ margin: '0 auto', width: '80%' }}
          />
        </div>
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={() => setMappingVisible(true)} disabled={!allMapped}>
            Show Mapping
          </Button>
        </div>
        <Modal
          title="Current Mapping"
          visible={mappingVisible}
          onCancel={() => setMappingVisible(false)}
          footer={[
            <Button key="back" onClick={() => setMappingVisible(false)}>
              Close
            </Button>,
            <Button key="submit" type="primary" onClick={saveMapping}>
              Save Mapping
            </Button>,
          ]}
          bodyStyle={{ backgroundColor: '#f0f2f5' }}
          centered
        >
          <Table columns={columns} dataSource={mappingData} pagination={false} bordered />
        </Modal>
      </div>
    </>
  );
};

export default TemplateMapping;
