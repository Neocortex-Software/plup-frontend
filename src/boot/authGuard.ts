import { Cookies } from 'quasar';
import { boot } from 'quasar/wrappers';

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const isAuthenticated = Cookies.get('token');

    // Si el usuario ya está autenticado y está intentando acceder a login o register, redirige a la página principal
    if (
      isAuthenticated &&
      (to.path === '/auth/login' || to.path === '/auth/register')
    ) {
      next('/'); // Redirige al home o dashboard, dependiendo de tu aplicación
      return;
    }

    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // Esta ruta requiere autenticación
      if (!isAuthenticated) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        next('/auth/login');
      } else {
        next();
      }
    } else {
      // Esta ruta no requiere autenticación, permite el acceso
      next();
    }
  });
});
