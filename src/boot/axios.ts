import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance } from 'axios';
import { Cookies } from 'quasar';
import { Router } from 'vue-router';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const apiAuth = axios.create({ baseURL: process.env.API_URL });
const api = axios.create({ baseURL: process.env.API_URL });

// Agrega el encabezado "Authorization" a todas las solicitudes
api.interceptors.request.use((config) => {
  const token = Cookies.get('token');

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

// Interceptor de respuesta (el router se pasa desde el boot)
const setupInterceptors = (router: Router) => {
  api.interceptors.response.use(
    (response) => response, // Retorna la respuesta si es exitosa
    (error) => {
      if (error.response) {
        if (error.response.status === 401) {
          Cookies.remove('token');
          Cookies.remove('establishmentId');
          router.push('/auth/login');
        }
        if (error.response.status === 403) {
          router.push('/auth/login');
        }
      }

      return Promise.reject(error); // Propaga el error si es necesario
    }
  );
};

export default boot(({ app, router }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
  setupInterceptors(router);
});

export { api, apiAuth };
