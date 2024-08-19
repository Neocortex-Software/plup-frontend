import axios, { AxiosError } from 'axios';
import { defineStore } from 'pinia';
import { api } from 'src/boot/axios';
import { User } from 'src/models/user';
import { UserSignIn } from 'src/models/user-signin.model';
import { UserSignUp } from 'src/models/user-signup.model';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    token: null as string | null,
    loading: false as boolean,
  }),

  getters: {},

  actions: {
    async signIn(userSignIn: UserSignIn) {
      this.loading = true;
      try {
        const response = await api.post('/auth/signin', userSignIn);
        this.token = response.data.access_token;
        if (this.token) {
          await this.getUser(this.token);
        } else {
          throw new Error('Token is null');
        }
      } catch (e) {
        const error = e as AxiosError<Error>;
        let errorMessage =
          'An unexpected error occurred. Please try again later.';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data.message || errorMessage;
        }
        return Promise.reject(new Error(errorMessage));
      } finally {
        this.loading = false;
      }
    },
    async getUser(token: string) {
      this.loading = true;
      try {
        const response = await api.get('/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.user = response.data;
        console.log('this.user', this.user);
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },
    async signUp(userSignUp: UserSignUp) {
      this.loading = true;
      try {
        const response = await api.post('/auth/signup', userSignUp);
        this.token = response.data.access_token;
        if (this.token) {
          await this.getUser(this.token);
        } else {
          throw new Error('Token is null');
        }
      } catch (e) {
        const error = e as AxiosError<Error>;
        let errorMessage =
          'An unexpected error occurred. Please try again later.';
        if (axios.isAxiosError(error)) {
          errorMessage = error.response?.data.message || errorMessage;
        }
        return Promise.reject(new Error(errorMessage));
      } finally {
        this.loading = false;
      }
    },
  },
});
