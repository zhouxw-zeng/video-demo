import type { Locale } from 'antd/es/locale';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';

export interface Language {
  key: string;
  label: string;
  locale: Locale;
}

export const languages: Language[] = [
  {
    key: 'zh-CN',
    label: '中文',
    locale: zhCN,
  },
  {
    key: 'en-US',
    label: 'English',
    locale: enUS,
  },
];

// 应用文本的多语言配置
export const appTexts = {
  'zh-CN': {
    home: '首页',
    about: '关于',
    settings: '设置',
    theme: '主题',
    language: '语言',
    lightMode: '日间模式',
    darkMode: '夜间模式',
    userData: "用户资料",
    welcome: '欢迎使用',
    description: '这是一个基于 React + Ant Design 的现代化应用',
    switchTheme: '切换主题',
    switchLanguage: '切换语言',
    userManagement: '用户管理',
    systemSettings: '系统设置',
    logout: '退出登录',
    material: '素材',
    image: '图片',
    imageName: '图片名称',
    placeholderImageName: '请输入图片名称',
    search: '搜索',
    reset: '重置',
    edit: '编辑',
    delete: '删除',
    confirmDelete: '确定要删除吗？',
    add: '新增'
  },
  'en-US': {
    home: 'Home',
    about: 'About',
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    userData: "User Data",
    welcome: 'Welcome',
    description: 'This is a modern application based on React + Ant Design',
    switchTheme: 'Switch Theme',
    switchLanguage: 'Switch Language',
    userManagement: 'User Management',
    systemSettings: 'System Settings',
    logout: 'Logout',
    material: 'Material',
    image: 'Image',
    imageName: 'Picture ame',
    placeholderImageName: 'Please enter the name of the picture',
    search: 'Search',
    reset: 'Reset',
    edit: 'Edit',
    delete: 'Delete',
    confirmDelete: 'Are you sure you want to delete it ?',
    add: 'Add'
  },
};

export type AppTextKey = keyof typeof appTexts['zh-CN'];