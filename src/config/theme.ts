import type { ThemeConfig } from 'antd';

// 日间模式主题配置
export const lightTheme: ThemeConfig = {
  token: {
    colorPrimary: '#1890ff',
    colorBgBase: '#ffffff',
    colorTextBase: '#262626',
    colorBorder: '#d9d9d9',
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: '#f5f5f5',
      headerBg: '#ffffff',
      siderBg: '#001529',
    },
    Menu: {
      darkItemBg: '#001529',
      darkSubMenuItemBg: '#000c17',
    },
    Card: {
      borderRadiusLG: 8,
    },
  },
};

// 夜间模式主题配置
export const darkTheme: ThemeConfig = {
  token: {
    colorPrimary: '#177ddc',
    colorBgBase: '#141414',
    colorTextBase: '#ffffff',
    colorBorder: '#434343',
    borderRadius: 6,
    wireframe: false,
  },
  components: {
    Layout: {
      bodyBg: '#000000',
      headerBg: '#1f1f1f',
      siderBg: '#141414',
    },
    Menu: {
      darkItemBg: '#141414',
      darkSubMenuItemBg: '#000000',
    },
    Card: {
      borderRadiusLG: 8,
    },
  },
};
