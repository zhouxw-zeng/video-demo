import React, { useState } from 'react';
import { Card, Form, Input, Button, Switch, message } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons';
import userApi from '../../apis/modules/user';
import { storage } from '../../utils/storage';
import type { LoginParams, RegisterParams, LoginResponse } from '../../apis/modules/user/types';
import './Login.css';

type LoginForm = LoginParams;

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const handleSubmit = async (values: LoginForm) => {
    setLoading(true);
    try {
      if (isLogin) {
        // 调用登录接口
        const response: LoginResponse = await userApi.login(values);
        console.log(response, "response");
        if (response.code === 200) {
          const { token, user } = response.data;
          // 存储认证数据
          storage.setToken(token);
          storage.setUserInfo(user);
          
          message.success('登录成功！');
          // 跳转到首页
          window.location.href = '/';
          return;
        }
      } else {
        // 调用注册接口
        await userApi.register(values as RegisterParams);
        message.success('注册成功！请登录');
        
        // 切换到登录模式
        setIsLogin(true);
        form.resetFields();
      }
    } catch (error: any) {
      const errorMessage = error?.response?.message || error?.message || (isLogin ? '登录失败' : '注册失败');
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    form.resetFields();
  };

  return (
    <div className="login-container">
      {/* 流光背景 */}
      <div className="gradient-background">
        <div className="gradient-layer-1"></div>
        <div className="gradient-layer-2"></div>
        <div className="gradient-layer-3"></div>
      </div>
      
      {/* 登录/注册卡片 */}
      <div className="login-card-wrapper">
        <Card 
          className="login-card"
          title={
            <div className="card-title">
              {isLogin ? (
                <><LoginOutlined /> 用户登录</>
              ) : (
                <><UserAddOutlined /> 用户注册</>
              )}
            </div>
          }
        >
          <Form
            form={form}
            name="login-form"
            onFinish={handleSubmit}
            autoComplete="off"
            size="large"
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: '请输入用户名!' },
                { min: 3, message: '用户名至少3个字符!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="用户名" 
              />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: '请输入密码!' },
                { min: 6, message: '密码至少6个字符!' }
              ]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="密码" 
              />
            </Form.Item>

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                loading={loading}
                block
                icon={isLogin ? <LoginOutlined /> : <UserAddOutlined />}
              >
                {isLogin ? '登录' : '注册'}
              </Button>
            </Form.Item>

            <div className="switch-mode">
              <Switch 
                checked={!isLogin}
                onChange={switchMode}
                checkedChildren="注册"
                unCheckedChildren="登录"
              />
              <span style={{ marginLeft: 8 }}>
                {isLogin ? '没有账号？立即注册' : '已有账号？立即登录'}
              </span>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;