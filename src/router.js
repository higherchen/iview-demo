const routers = {
    '/home': {
        name: 'home',
        component: require('./views/index.vue')
    },
    '/users': {
        name: 'users',
        component: require('./views/users.vue')
    }
};
export default routers;