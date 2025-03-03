export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: { name: string };
  accessToken: string;
  refreshToken: string;
  createdAt: string;
}
