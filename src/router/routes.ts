import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () =>
      import('src/modules/dashboard/layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/modules/dashboard/pages/IndexPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'dashboard',
        },
      },
      {
        path: 'giftcards',
        redirect: { name: 'received-giftcards' },
        name: 'giftcards',
        component: () =>
          import('src/modules/giftcards/pages/GiftCardsPage.vue'),
        meta: {
          requiresAuth: true,
          title: 'giftcards',
        },
        children: [
          {
            path: '',
            name: 'received-giftcards',
            component: () =>
              import('src/modules/giftcards/pages/ReceivedGiftcardsPage.vue'),
            meta: {
              requiresAuth: true,
              title: 'receivedGiftcards',
            },
          },
          {
            path: 'sent-giftcards',
            name: 'sent-giftcards',
            component: () =>
              import('src/modules/giftcards/pages/SentGiftcardsPage.vue'),
            meta: {
              requiresAuth: true,
              title: 'sentGiftcards',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/auth',
    redirect: { name: 'login' },
    component: () => import('src/modules/auth/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('src/modules/auth/pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('src/modules/auth/pages/RegisterPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () =>
          import('src/modules/auth/pages/ForgotPasswordPage.vue'),
      },
      {
        path: 'reset-password/:token',
        name: 'reset-password',
        component: () => import('src/modules/auth/pages/ResetPasswordPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
