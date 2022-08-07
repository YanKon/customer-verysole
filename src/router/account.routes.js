// import Layout from '../views/account/Layout.vue';
// import Login from '../views/account/Login.vue';
// import Register from '../views/account/Register.vue';

import {Layout, Login, Register} from '@/views/account'

export default {
    path: '/account',
    component: Layout,
    children: [
        { path: '', redirect: 'login' },
        { path: 'login', component: Login },
        { path: 'register', component: Register }
    ]
};