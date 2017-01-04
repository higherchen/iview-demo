const routers = {
    '/home': {
        name: 'home',
        component: require('./views/index.vue')
    },
    '/users': {
        name: 'users',
        component: require('./views/user/index.vue'),
        subRoutes: {
            '/': {
                component: require('./views/user/list.vue')
            },
            '/:id': {
              component: require('./views/user/detail.vue')
            }
        }
    }
};
export default routers;