import { createRouter, createWebHistory } from 'vue-router';
import { Home } from '@/views'

import accountRoutes from './account.routes';

export const router = createRouter({
    history: createWebHistory(),
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Home },
        { ...accountRoutes },
        // catch all redirect to home page
        { path: '/:pathMatch(.*)*', redirect: '/' }
    ]
  })
  