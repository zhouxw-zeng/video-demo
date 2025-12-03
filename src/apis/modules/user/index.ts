import { apiClient } from '../../http';
import type { LoginParams, RegisterParams, UserInfo, LoginResponse, RegisterResponse } from './types';
const api = apiClient;

/**
 * 登录接口
 * @param data LoginParams
 * @returns 
 */
const login = (data: LoginParams): Promise<LoginResponse> => {
  return api.post<LoginResponse>('/user/login', data);
}

/**
 * 注册接口
 * @param data RegisterParams
 * @returns 
 */
const register = (data: RegisterParams): Promise<RegisterResponse> => {
  return api.post<RegisterResponse>('/user/register', data);
}

const getUserInfo = () => {
  return api.get<UserInfo>('/user/info')
}

// 退出登录
const logout = () => {
  return api.post('/auth/logout')
}

// 更新用户信息
const putUserInfo = (data: Partial<UserInfo>) => {
  return api.put('/user/info', data)
}
export default{
  login,
  register,
  getUserInfo,
  logout,
  putUserInfo
}