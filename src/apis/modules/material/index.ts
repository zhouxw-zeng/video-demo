import { apiClient } from '../../http';
const api = apiClient;
import type { ImageListRequest, ImageListResponse } from './types';
import Utils from '../../../utils/utils';

/**
 * 获取图片列表
 * @param data 
 * @returns 
 */
export const materialImageList = (data?: ImageListRequest): Promise<ImageListResponse> => {
  return api.get<ImageListResponse>(`/material/images/list${Utils.URLSearchParams(data)}`);
}