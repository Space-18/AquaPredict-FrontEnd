export interface LoginResponse {
  jwt: string;
  user: {
    id: number;
    username: string;
    email: string;
    role: string;
  };
  expiresIn?: number;
  refreshToken?: string;
}