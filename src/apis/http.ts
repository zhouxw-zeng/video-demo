import { storage } from '../utils/storage';

interface RequestOptions extends RequestInit {
  timeout?: number;
  skipAuth?: boolean;
}

class HttpError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    public response?: any
  ) {
    super(`${status} ${statusText}`);
    this.name = 'HttpError';
  }
}

class ApiClient {
  private baseURL: string;
  constructor(baseURL: string = '') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    url: string,
    options: RequestOptions = {}
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = options.timeout || 10000;

    const timeoutId = setTimeout(() => {
      controller.abort();
    }, timeout);

    try {
      // 添加认证头
      const headers: Record<string, any> = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      // 如果不是跳过认证的请求，添加token
      if (!options.skipAuth) {
        const token = storage.getToken();
        if (token) {
          headers['Authorization'] = `Bearer ${token}`;
        }
      }
      const response = await fetch(`${this.baseURL}${url}`, {
        ...options,
        signal: controller.signal,
        headers,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        
        // 处理常见状态码
        switch (response.status) {
          case 401:
            // 未授权，清除本地认证数据并跳转到登录页
            storage.clearAuthData();
            window.location.href = '/login';
            throw new HttpError(response.status, '登录已过期，请重新登录', errorData);
          case 403:
            throw new HttpError(response.status, '权限不足', errorData);
          case 404:
            throw new HttpError(response.status, '资源不存在', errorData);
          case 500:
            throw new HttpError(response.status, '服务器内部错误', errorData);
          case 502:
            throw new HttpError(response.status, '网关错误', errorData);
          case 503:
            throw new HttpError(response.status, '服务不可用', errorData);
          default:
            throw new HttpError(response.status, response.statusText, errorData);
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('请求超时');
      }
      throw error;
    }
  }

  async get<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'GET' });
  }

  async post<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, { ...options, method: 'DELETE' });
  }

  async patch<T>(url: string, data?: any, options?: RequestOptions): Promise<T> {
    return this.request<T>(url, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// 创建默认实例
export const apiClient = new ApiClient('http://localhost:3031/api');

// 导出类以便自定义实例
export { ApiClient, HttpError };