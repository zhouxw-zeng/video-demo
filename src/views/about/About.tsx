import React from 'react';
import { Card, Typography, Space, Tag, Divider, Row, Col } from 'antd';
import {
  CodeOutlined,
  TeamOutlined,
  RocketOutlined,
  SafetyCertificateOutlined
} from '@ant-design/icons';
// import { useApp } from '../../hooks/useApp';

const { Title, Paragraph, Text } = Typography;

const About: React.FC = () => {
  // const { t } = useApp();

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>关于项目</Title>
        <Paragraph>
          这是一个现代化的 React 应用程序，集成了 Ant Design 组件库、主题切换、多语言支持等特性。
          项目采用最新的前端技术栈，提供了良好的开发体验和用户体验。
        </Paragraph>

        <Divider />

        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space orientation="vertical" align="center">
                <CodeOutlined style={{ fontSize: 32, color: '#1890ff' }} />
                <Text strong>现代化技术栈</Text>
                <Text type="secondary">React + TypeScript + Vite</Text>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space orientation="vertical" align="center">
                <TeamOutlined style={{ fontSize: 32, color: '#52c41a' }} />
                <Text strong>团队协作</Text>
                <Text type="secondary">支持多人协作开发</Text>
              </Space>
            </Card>
          </Col>
          
          <Col xs={24} sm={12} md={8}>
            <Card size="small">
              <Space orientation="vertical" align="center">
                <RocketOutlined style={{ fontSize: 32, color: '#faad14' }} />
                <Text strong>高性能</Text>
                <Text type="secondary">优化的构建和运行性能</Text>
              </Space>
            </Card>
          </Col>
        </Row>

        <Divider />

        <Title level={3}>核心特性</Title>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Text strong>🎨 主题系统</Text>
            <br />
            <Text type="secondary">支持日间模式、夜间模式和科技蓝主题，可根据喜好自由切换</Text>
          </div>
          
          <div>
            <Text strong>🌐 多语言支持</Text>
            <br />
            <Text type="secondary">内置中英文切换，轻松实现国际化需求</Text>
          </div>
          
          <div>
            <Text strong>📱 响应式设计</Text>
            <br />
            <Text type="secondary">完美适配各种屏幕尺寸，提供一致的用户体验</Text>
          </div>
          
          <div>
            <Text strong>⚡ 快速开发</Text>
            <br />
            <Text type="secondary">基于 Ant Design 丰富的组件库，提升开发效率</Text>
          </div>
        </Space>

        <Divider />

        <Title level={3}>技术标签</Title>
        <Space size={[0, 8]} wrap>
          <Tag color="blue" icon={<SafetyCertificateOutlined />}>React 19</Tag>
          <Tag color="green" icon={<SafetyCertificateOutlined />}>TypeScript</Tag>
          <Tag color="orange" icon={<SafetyCertificateOutlined />}>Ant Design 6</Tag>
          <Tag color="purple" icon={<SafetyCertificateOutlined />}>Vite</Tag>
          <Tag color="red" icon={<SafetyCertificateOutlined />}>Tailwind CSS</Tag>
          <Tag color="cyan" icon={<SafetyCertificateOutlined />}>React Router</Tag>
          <Tag color="geekblue" icon={<SafetyCertificateOutlined />}>Day.js</Tag>
        </Space>
      </Card>
    </div>
  );
};

export default About;