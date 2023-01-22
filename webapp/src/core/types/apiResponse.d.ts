export interface ApiResponse<T> {
  data?: T;
  error?: { message: string; context?: string; code: string };
}
