import { defineStore } from 'pinia';
import { Cookies } from 'quasar';
import { api, apiAuth } from 'src/boot/axios';
import { User } from 'src/modules/auth/models/user';
import { UserSignIn } from 'src/modules/auth/models/user-signin.model';
import { UserSignUp } from 'src/modules/auth/models/user-signup.model';
import { notifyError, notifySuccess } from 'src/utils/notify';
import { UserUpdate } from '../models/user-update.model';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    token: <string | null>'',
    user: <User | null>{},
  }),

  getters: {},

  actions: {
    async getToken(userSignIn: UserSignIn) {
      try {
        this.loading = true;
        await apiAuth
          .post('/auth/signin', userSignIn)
          .then((response) => {
            this.token = 'Bearer ' + response.data.access_token;
            Cookies.set('token', this.token);
          })
          .finally(() => (this.loading = false));
      } catch (error: any) {
        console.log(error);
        notifyError(
          'Email o contraseña incorrectos. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
        throw new Error(error.response.data.error);
      }
    },
    async getUser() {
      try {
        this.loading = true;
        await api
          .get('/users/me')
          .then((response) => {
            if (response.status === 200) {
              this.user = response.data;
            }
          })
          .finally(() => (this.loading = false));
      } catch (error: any) {
        console.log(error);
        notifyError(
          'Email o contraseña incorrectos. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
        throw new Error(error.response.data.error);
      }
    },
    async updateUser(userUpdate: UserUpdate) {
      try {
        this.loading = true;
        const response = await api.patch('/users', userUpdate);
        if (response.status === 200) {
          notifySuccess('Usuario actualizado con éxito.');
        }
      } catch (error: any) {
        console.log('💥 error update user', error);
        notifyError(
          'Ha ocurrido un error. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
        throw new Error(error.response.data.error);
      } finally {
        this.loading = false;
      }
    },
    async signup(userSignUp: UserSignUp) {
      try {
        this.loading = true;
        await apiAuth
          .post('/auth/signup', userSignUp)
          .then((response) => {
            if (response.status === 201) {
              this.token = 'Bearer ' + response.data.access_token;
              Cookies.set('token', this.token);
            }
          })
          .finally(() => (this.loading = false));
      } catch (error: any) {
        console.log('💥 signup error', error);
        notifyError(
          'Ha ocurrido un error. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
        throw new Error(error.response.data.error);
      }
    },
    async handleSignUp(userSignUp: UserSignUp) {
      try {
        await this.signup(userSignUp);
        await this.getToken(userSignUp);
        await this.getUser();
        this.router.push({ name: '/dashboard' });
      } catch (error) {
        console.log('💥 handleSignUp error:', error);
      }
    },
    async handleSignIn(userSignIn: UserSignIn) {
      try {
        await this.getToken(userSignIn);
        await this.getUser();
        this.router.push({ name: 'admin-properties' });

        // if (this.user?.role.name === ROLE_USER) {
        //   this.router.push('/');
        // } else if (this.user?.role.name === ROLE_ADMIN) {
        //   this.router.push('/dashboard');
        // } else if (this.user?.role.name === ROLE_SUPERADMIN) {
        //   this.router.push('/dashboard');
        // }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        this.loading = true;
        await api.post('/auth/logout');
      } catch (error) {
        console.log(error);
        return error;
      } finally {
        this.loading = false;
      }
    },
    async handleLogout() {
      await this.logout();
      this.token = null;
      this.user = null;
      Cookies.remove('token');
      Cookies.remove('establishmentId');
      this.router.push('/login');
    },
    async changePassword(currentPassword: string, newPassword: string) {
      try {
        this.loading = true;
        const payload = { currentPassword, newPassword };
        const response = await api.patch('/auth/change-password', payload);
        if (response.status === 200) {
          notifySuccess('Contraseña modificada con éxito.');
        }
      } catch (error) {
        console.log(error);
        notifyError(
          'Ha ocurrido un error. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
      } finally {
        this.loading = false;
      }
    },
    async forgotPassword(email: string) {
      try {
        this.loading = true;
        const payload = { email };
        await apiAuth.post('/auth/forgot-password', payload);
      } catch (error) {
        // console.log(error);
      } finally {
        this.loading = false;
      }
    },
    async resetPassword(token: string, newPassword: string) {
      try {
        this.loading = true;
        const payload = { token, newPassword };
        const response = await apiAuth.post('/auth/reset-password', payload);
        if (response.status === 200) {
          notifySuccess('Contraseña modificada con éxito.');
        }
      } catch (error) {
        console.log(error);
        notifyError(
          'Ha ocurrido un error. Por favor, verifica tus datos e inténtalo de nuevo.'
        );
      } finally {
        this.loading = false;
      }
    },
  },
});
