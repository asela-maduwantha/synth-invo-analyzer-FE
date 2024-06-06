import React from 'react';
import { Menu } from 'antd';
import { DashboardOutlined, EditOutlined, ToolOutlined } from '@ant-design/icons'; // Importing Ant Design icons
import { Link } from 'react-router-dom';
import './AdminMenuList.css';

const AdminMenuList = () => {
  return (
    <div>
      <Menu theme='light' mode='inline' className='menu-bar'>
        <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
          <Link to="dashboard" style={{textDecoration:"none"}}>Dashboard</Link>
        </Menu.Item>
        
        <Menu.SubMenu key="subscription" title="Subscription" icon={<ToolOutlined />}>
          <Menu.Item key="Add-Model" >
            <Link to="createmodel" style={{textDecoration:"none"}}>Create Model</Link>
          </Menu.Item>
          <Menu.Item key="Update-Model">
            <Link to="updatemodel" style={{textDecoration:"none"}}>Update Model</Link>
          </Menu.Item>
          <Menu.Item key="archive-model">
            <Link to="archivemodel" style={{textDecoration:"none"}}>Delete Model</Link>
          </Menu.Item>
          <Menu.Item key="add-feature" >
          <Link to="add-feature" style={{textDecoration:"none"}}>Add Feature</Link>
        </Menu.Item>
        <Menu.Item key="modify-feature" >
          <Link to="modify-feature" style={{textDecoration:"none"}}>Modify Feature</Link>
        </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};

export default AdminMenuList;
