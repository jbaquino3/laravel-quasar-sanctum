
const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('pages/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('pages/Register.vue')
    },
    {
        path: '/',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            {
                path: '/', component: () => import('pages/IndexPage.vue')
            },
        ]
    },

    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]

export default routes
