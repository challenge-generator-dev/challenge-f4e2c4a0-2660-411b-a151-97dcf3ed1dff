const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number | boolean>;
}

interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  status: number;
}

class ApiClient {
  private baseURL: string;
  private defaultHeaders: Record<string, string>;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    };
  }

  private buildURL(endpoint: string, params?: Record<string, string | number | boolean>): string {
    const url = new URL(`${this.baseURL}${endpoint}`, window.location.origin);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<ApiResponse<T>> {
    const { method = 'GET', headers = {}, body, params } = config;

    const url = this.buildURL(endpoint, params);
    const token = this.getAuthToken();
    const finalHeaders: Record<string, string> = {
      ...this.defaultHeaders,
      ...headers,
    };

    if (token) {
      finalHeaders['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: finalHeaders,
        body: body ? JSON.stringify(body) : undefined,
      });

      const status = response.status;

      if (!response.ok) {
        const errorMessage = await response.text();
        return {
          data: null,
          error: errorMessage || `HTTP error ${status}`,
          status,
        };
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await response.json();
        return { data, error: null, status };
      }

      return { data: null as T, error: null, status };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Network error';
      console.error(`API Error [${method}] ${endpoint}:`, errorMessage);
      return { data: null, error: errorMessage, status: 0 };
    }
  }

  private getAuthToken(): string | null {
    try {
      const token = localStorage.getItem('auth_token');
      return token;
    } catch {
      return null;
    }
  }

  async get<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  async post<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body });
  }

  async put<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async patch<T>(endpoint: string, body: unknown): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PATCH', body });
  }

  setAuthToken(token: string): void {
    try {
      localStorage.setItem('auth_token', token);
    } catch (err) {
      console.error('Failed to save auth token:', err);
    }
  }

  clearAuthToken(): void {
    try {
      localStorage.removeItem('auth_token');
    } catch (err) {
      console.error('Failed to clear auth token:', err);
    }
  }
}

export const apiClient = new ApiClient(API_BASE_URL);
export default apiClient;