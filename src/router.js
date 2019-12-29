import React from 'react';

const router = [
  {
    to: '/',
    text: 'Home',
    component: React.lazy(() => import('./pages/Home')),
    exact: true,
  },
  {
    to: '/mcca',
    text: 'MCCA',
    component: React.lazy(() => import('./pages/MCCA')),
  },
  {
    to: '/games',
    text: 'Games',
    component: React.lazy(() => import('./pages/Games')),
  },
];

export default router;
