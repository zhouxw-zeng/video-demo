


/**
 * Image list request parameters
 */
export interface ImageListRequest {
  size?: number;
  page?: number;
  imageName?: string;
}

/**
 * Image list response
 */
export interface ImageListResponse {
  message: string
  code: number
  data: {
    total: number;
    size?: number | null;
    page?: number | null;
    dataList: any[]
  };
}