// 本地缓存管理工具
const STORAGE_KEYS = {
  TOKEN: 'auth_token',
  USER_INFO: 'user_info',
} as const;

export interface AuthData {
  token: string;
  userInfo: any;
}

class StorageManager {
  // 设置token
  setToken(token: string): void {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  }

  // 获取token
  getToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  }

  // 设置用户信息
  setUserInfo(userInfo: any): void {
    localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(userInfo));
  }

  // 获取用户信息
  getUserInfo(): any | null {
    const userInfoStr = localStorage.getItem(STORAGE_KEYS.USER_INFO);
    if (userInfoStr) {
      try {
        return JSON.parse(userInfoStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  // 获取完整的认证数据
  getAuthData(): AuthData | null {
    const token = this.getToken();
    const userInfo = this.getUserInfo();
    
    if (token && userInfo) {
      return { token, userInfo };
    }
    return null;
  }

  // 清除所有认证数据
  clearAuthData(): void {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
    localStorage.removeItem(STORAGE_KEYS.USER_INFO);
  }

  // 检查是否已登录
  isLoggedIn(): boolean {
    return !!this.getToken() && !!this.getUserInfo();
  }
}

export const storage = new StorageManager();
export default storage;