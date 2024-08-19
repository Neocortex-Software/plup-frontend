export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: { name: string };
  accessToken: string;
  refreshToken: string;
  createdAt: string;
}
