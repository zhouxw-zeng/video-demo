interface Params {
  [key: string]: any
}

/**
 * 工具类
 */
class Utils {
  /**
   * params转字符串参数
   * @param params get 参数
   * @returns getURL请求参数
   */
  URLSearchParams(params: Params): string {
    if (!params || Reflect.ownKeys(params).length === 0) return ''
    const queryParams = new URLSearchParams();
    Object.entries(params).map(([key, value]) => {
      if (value === undefined || value === null) return
      queryParams.append(key, value.toString());
    })
    return queryParams.toString() ? `?${queryParams.toString()}` : '';
  }
}

export default new Utils()