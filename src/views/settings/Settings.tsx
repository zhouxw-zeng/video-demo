import React from 'react';
import { Card, Select, Space, Typography, Divider } from 'antd';
import { useApp } from '../../hooks/useApp';
import { themes } from '../../config/constants';
import { languages, appTexts } from '../../config/locales';

const { Title, Text } = Typography;

const Settings: React.FC = () => {
  const { currentTheme, setCurrentTheme, currentLanguage, setCurrentLanguage, t } = useApp();

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Title level={2}>{t('settings')}</Title>
        
        <Space orientation="vertical" size="large" style={{ width: '100%' }}>
          {/* 主题设置 */}
          <div>
            <Text strong>{t('theme')}</Text>
            <Divider />
            <Select
              value={currentTheme}
              onChange={setCurrentTheme}
              style={{ width: 200 }}
              options={themes.map(theme => ({
                label: t(theme.name as keyof typeof appTexts['zh-CN']),
                value: theme.key,
              }))}
            />
          </div>

          {/* 语言设置 */}
          <div>
            <Text strong>{t('language')}</Text>
            <Divider />
            <Select
              value={currentLanguage}
              onChange={setCurrentLanguage}
              style={{ width: 200 }}
              options={languages.map((lang: { key: string; label: string }) => ({
                label: lang.label,
                value: lang.key,
              }))}
            />
          </div>
        </Space>
      </Card>
    </div>
  );
};

export default Settings;