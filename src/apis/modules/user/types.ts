
// 用户相关API接口
export interface LoginParams {
  username: string
  password: string
}

export interface RegisterParams {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  name: string
  avatar?: string
  email?: string
}

export interface LoginResponse {
  message: string
  code: number
  data: {
    token: string
    user: UserInfo
  }
}

export interface RegisterResponse {
  message: string
  userId: number
}