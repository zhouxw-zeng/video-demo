import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Button, Space, Dropdown, Avatar, message } from 'antd';
import type { MenuProps } from 'antd';
import AuthGuard from './components/AuthGuard';
import { storage } from './utils/storage';
import {
  HomeOutlined,
  InfoCircleOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BulbOutlined,
  GlobalOutlined
} from '@ant-design/icons';
import { useApp } from './hooks/useApp';
import './App.css';

const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const { t, currentTheme, setCurrentTheme, currentLanguage, setCurrentLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // 导航菜单项
  const menuItems: MenuProps['items'] = [
    {
      key: '/',
      icon: <HomeOutlined />,
      label: t('home'),
    },
    {
      key: '/about',
      icon: <InfoCircleOutlined />,
      label: t('about'),
    },
    {
      key: '/material',
      icon: <InfoCircleOutlined />,
      label: t('material'),
      children: [
        {
          key: '/material/image',
          icon: <InfoCircleOutlined />,
          label: t('image'),
        }
      ]
    }
  ];

  // 用户下拉菜单
  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('userData'),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('logout'),
      danger: true,
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('settings'),
    },
  ];

  // 处理用户菜单点击
  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'login': {
        storage.clearAuthData();
        message.success('已退出登录');
        window.location.href = '/login';
        break;
      }
      case 'settings': {
        navigate('/settings');
        break;       
      }
      default:
        break;
    }
  };

  // 主题切换
  const toggleTheme = () => {
    const themes = ['light', 'dark'];
    const currentIndex = themes.indexOf(currentTheme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setCurrentTheme(themes[nextIndex]);
  };

  // 语言切换
  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'zh-CN' ? 'en-US' : 'zh-CN');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* 侧边栏 */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme={currentTheme === 'dark' ? 'dark' : 'light'}
      >
        <div style={{
          height: 32,
          margin: 16,
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 6,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 'bold'
        }}>
          {collapsed ? 'A' : 'Ant Design'}
        </div>
        
        <Menu
          theme={currentTheme === 'dark' ? 'dark' : 'light'}
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>

      <Layout>
        {/* 顶部导航栏 */}
        <Header style={{
          padding: '0 16px',
          background: currentTheme === 'dark' ? '#1f1f1f' : '#ffffff',
          borderBottom: `1px solid ${currentTheme === 'dark' ? '#303030' : '#f0f0f0'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Space>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{ fontSize: '16px', width: 64, height: 64 }}
            />
            <span style={{
              fontSize: '18px',
              fontWeight: 'bold',
              color: currentTheme === 'dark' ? '#ffffff' : '#262626'
            }}>
              {t('welcome')}
            </span>
          </Space>

          <Space size="middle">
            {/* 主题切换按钮 */}
            <Button
              type="text"
              icon={<BulbOutlined />}
              onClick={toggleTheme}
              title={t('switchTheme')}
            >
              {!collapsed && (
                currentTheme === 'dark' ? t('darkMode') : t('lightMode')
              )}
            </Button>

            {/* 语言切换按钮 */}
            <Button
              type="text"
              icon={<GlobalOutlined />}
              onClick={toggleLanguage}
              title={t('switchLanguage')}
            >
              {!collapsed && (currentLanguage === 'zh-CN' ? '中文' : 'English')}
            </Button>

            {/* 用户头像下拉菜单 */}
            <Dropdown menu={{ items: userMenuItems, onClick: handleUserMenuClick }} placement="bottomRight">
              <Space style={{ cursor: 'pointer' }}>
                <Avatar icon={<UserOutlined />} />
                {!collapsed && <span>管理员</span>}
              </Space>
            </Dropdown>
          </Space>
        </Header>

        {/* 主要内容区域 */}
        <Content style={{
          margin: '24px 16px',
          padding: 12,
          background: currentTheme === 'dark' ? '#141414' : '#f5f5f5',
          borderRadius: 8,
          minHeight: 280
        }}>
          <AuthGuard>
            <div className='w-full h-full bg-white rounded-xl'>

            <Outlet />
            </div>
          </AuthGuard>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App
