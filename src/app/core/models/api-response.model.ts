export interface ApiErrorResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: null;
  errors: string[];
}

export interface ApiSuccessResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  errors: string[];
}
