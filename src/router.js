import React from 'react';

const router = [
  {
    to: '/',
    redirect: '/home',
    hideInMenu: true,
  },
  {
    to: '/home',
    text: 'Home',
    component: React.lazy(() => import('./pages/Home')),
    exact: true,
  },
  {
    to: '/mcca',
    text: 'MCCA',
    component: React.lazy(() => import('./pages/MCCA/index')),
  },
  {
    to: '/games',
    text: 'Games',
    component: React.lazy(() => import('./pages/Games')),
  },
];

export default router;
