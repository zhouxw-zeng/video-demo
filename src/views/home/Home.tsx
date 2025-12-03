import React, { useState } from 'react';
import {
  Card,
  Button,
  Space,
  Typography,
  Avatar,
  List,
  Switch,
  Progress,
  Modal,
  Tabs,
  Collapse,
  Tag,
  Row,
  Col,
  Statistic
} from 'antd';
import {
  UserOutlined,
  // SettingOutlined,
  InfoCircleOutlined,
  BulbOutlined,
  GlobalOutlined,
  TeamOutlined,
  RocketOutlined
} from '@ant-design/icons';
import { useApp } from '../../hooks/useApp';
// import { apiClient } from '../../apis/http';

const { Title, Text } = Typography;
const { Panel } = Collapse;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const Home: React.FC = () => {
  const { t, currentTheme } = useApp();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      setTimeout(() => {
        const mockUsers: User[] = [
          { id: 1, name: '张三', email: 'zhangsan@example.com', role: '管理员' },
          { id: 2, name: '李四', email: 'lisi@example.com', role: '用户' },
          { id: 3, name: '王五', email: 'wangwu@example.com', role: '用户' },
        ];
        setUsers(mockUsers);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('获取用户数据失败:', error);
      setLoading(false);
    }
  };

  const startProgress = () => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      setProgressPercent(percent);
      if (percent >= 100) {
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <div style={{ padding: '24px' }}>
      {/* 欢迎区域 */}
      <Card>
        <Row gutter={16} align="middle">
          <Col>
            <Avatar size={64} icon={<UserOutlined />} />
          </Col>
          <Col flex={1}>
            <Title level={2}>{t('welcome')}</Title>
            <Text type="secondary">{t('description')}</Text>
          </Col>
          <Col>
            <Statistic
              title="当前主题"
              value={currentTheme === 'dark' ? '夜间模式' :  '日间模式'}
              prefix={<BulbOutlined />}
            />
          </Col>
        </Row>
      </Card>

      {/* 功能区域 */}
      <Tabs
        defaultActiveKey="1"
        style={{ marginTop: 24 }}
        items={[
          {
            key: '1',
            label: (
              <span>
                <TeamOutlined />
                {t('userManagement')}
              </span>
            ),
            children: (
              <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                <Button
                  type="primary"
                  icon={<TeamOutlined />}
                  onClick={fetchUsers}
                  loading={loading}
                >
                  {loading ? '加载中...' : '获取用户列表'}
                </Button>
                
                {users.length > 0 && (
                  <List
                    dataSource={users}
                    renderItem={user => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar icon={<UserOutlined />} />}
                          title={user.name}
                          description={`${user.email} - ${user.role}`}
                        />
                      </List.Item>
                    )}
                  />
                )}
              </Space>
            )
          },
          {
            key: '2',
            label: (
              <span>
                <RocketOutlined />
                组件演示
              </span>
            ),
            children: (
              <Space orientation="vertical" size="large" style={{ width: '100%' }}>
                <Card title="交互组件">
                  <Space size="middle">
                    <Switch
                      checked={switchChecked}
                      onChange={setSwitchChecked}
                      checkedChildren="开"
                      unCheckedChildren="关"
                    />
                    <Text>开关状态: {switchChecked ? '开启' : '关闭'}</Text>
                  </Space>
                  
                  <div style={{ marginTop: 16 }}>
                    <Button onClick={startProgress}>开始进度</Button>
                    <Progress
                      percent={progressPercent}
                      style={{ marginTop: 8 }}
                      status={progressPercent >= 100 ? 'success' : 'active'}
                    />
                  </div>
                </Card>

                <Card title="模态框">
                  <Button
                    type="dashed"
                    onClick={() => setModalVisible(true)}
                    icon={<InfoCircleOutlined />}
                  >
                    打开模态框
                  </Button>
                  
                  <Modal
                    title="信息提示"
                    open={modalVisible}
                    onOk={() => setModalVisible(false)}
                    onCancel={() => setModalVisible(false)}
                  >
                    <p>这是一个使用 Ant Design 模态框的示例。</p>
                    <p>当前主题: {currentTheme}</p>
                    <p>当前语言: {t('language')}</p>
                  </Modal>
                </Card>
              </Space>
            )
          },
          {
            key: '3',
            label: (
              <span>
                <GlobalOutlined />
                折叠面板
              </span>
            ),
            children: (
              <Collapse>
                <Panel header="功能特性" key="1">
                  <ul>
                    <li>✅ 响应式设计</li>
                    <li>✅ 主题切换（日间/夜间/科技蓝）</li>
                    <li>✅ 多语言支持</li>
                    <li>✅ Ant Design 组件库</li>
                    <li>✅ TypeScript 支持</li>
                  </ul>
                </Panel>
                <Panel header="技术栈" key="2">
                  <Space size={[0, 8]} wrap>
                    <Tag color="blue">React</Tag>
                    <Tag color="green">TypeScript</Tag>
                    <Tag color="orange">Ant Design</Tag>
                    <Tag color="purple">Vite</Tag>
                    <Tag color="red">Tailwind CSS</Tag>
                  </Space>
                </Panel>
              </Collapse>
            )
          }
        ]}
      />
    </div>
  );
};

export default Home;