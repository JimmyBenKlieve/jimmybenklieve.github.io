import React from 'react';

const router = [
  {
    to: './',
    redirect: 'season1',
    hideInMenu: true,
  },
  {
    to: 'season1',
    text: 'Season 1',
    component: React.lazy(() => import('./Season1')),
  },
];

export default router;
