const routers = {
    '/home': {
        name: 'home',
        menu: { opened : [], actived: '' },
        component: require('./views/index.vue')
    },
    '/users': {
        name: 'users',
        menu: { opened : ['1'], actived: 'users' },
        component: require('./views/user/index.vue'),
        subRoutes: {
            '/': {
                component: require('./views/user/list.vue')
            },
            '/:id': {
                component: require('./views/user/detail.vue')
            }
        }
    },
    '/authority': {
        name: 'authority',
        menu: { opened : ['1'], actived: 'authority' },
        component: require('./views/authority/index.vue')
    },
    '/apps': {
        name: 'apps',
        menu: { opened : ['2'], actived: 'apps' },
        component: require('./views/app/index.vue'),
        subRoutes: {
            '/': {
                component: require('./views/app/list.vue')
            },
            '/:id': {
                component: require('./views/app/detail.vue')
            }
        }
    },
    '/groups': {
        name: 'groups',
        menu: { opened : ['2'], actived: 'groups' },
        component: require('./views/group/index.vue')
    }
};
export default routers;