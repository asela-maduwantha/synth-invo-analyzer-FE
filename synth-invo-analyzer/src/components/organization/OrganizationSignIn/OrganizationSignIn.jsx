// OrganizationSignIn.js

import React, { useState } from 'react';
import { Form, Input, Button, Alert, Typography, Divider, Row, Col } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import Header from '../../common/Header/Header'
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const OrganizationSignIn = () => {
  const [form] = Form.useForm();
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (_, value) => {
    const isValidEmail = /\S+@\S+\.\S+/.test(value);
    if (isValidEmail) {
      setLoginError('');
      return Promise.resolve();
    } else {
      setLoginError('Please enter a valid email address');
      return Promise.reject(new Error(''));
    }
  };

  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await axios.post("http://127.0.0.1:8000/auth/organization/login/", {
        email,
        password,
      });

      if(response.status === 200){
        const token = response.data.token;
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', response.data.user_id);
        navigate('/organization/dashboard')
      }
      if(response.status === 203){
        localStorage.setItem("email", response.data.email)
        navigate('/verify-email');
      }

    } catch (error) {
      setLoginError('Invalid email or password');
      console.error('Error:', error);
    }
  };

  return (
    <div className="signin-body">
      <div className="signin-header">
        <Header />
      </div>
      <div className="signin-form" style={{ paddingTop: '2%' }}>
        <Row justify="center" align="Top" style={{ minHeight: '100vh' }}>
          <Col xs={24} sm={18} md={12} lg={8} xl={6}>
            <div className="signin-card">
              <Title level={1} className="signin-title" style={{ textAlign: 'center', color: '#6760EF' }}>
                Sign In
              </Title>

              <Form form={form} name="signin" onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: '' },
                    { validator: validateEmail },
                  ]}
                >
                  <Input prefix={<MailOutlined />} placeholder="Email" />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[{ required: true, message: '' }]}
                >
                  <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                </Form.Item>

                {loginError && (
                  <Alert message={loginError} type="error" showIcon style={{ marginBottom: '10px' }} />
                )}

                <Form.Item>
                  <Button type="primary" htmlType="submit" style={{ backgroundColor: '#6760EF' }} block>
                    Sign In
                  </Button>
                </Form.Item>

                <div style={{ textAlign: 'center' }}>
                  <a href="http://example.com/forgot-password" style={{ color: '#6760EF' }}>
                    Forgot password?
                  </a>
                </div>
              </Form>

              <Divider>or connect with</Divider>

              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log('Google Login Successful:', credentialResponse);
                }}
                onError={() => {
                  console.log('Google Login Failed');
                }}
              />

              <Divider />

              <div style={{ textAlign: 'center' }}>
                <Text>
                  Don't have an account?{' '}
                  <a href="/organization/signup" style={{ color: '#6760EF' }}>
                    Sign Up
                  </a>
                </Text>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrganizationSignIn;
