import Vue from 'vue';
import VueResource from 'vue-resource';
import VueValidator from 'vue-validator';
import VueRouter from 'vue-router';
import App from 'components/app.vue';
import Routers from './router';
import Env from './config/env';
import iView from 'iview';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(VueValidator);
Vue.use(iView);

Vue.use(VueResource);
Vue.http.options.emulateJSON = true;
Vue.http.options.timeout = 2000; // 2s

// 开启debug模式
Vue.config.debug = true;

// 路由配置
let router = new VueRouter({
    // 是否开启History模式的路由,默认开发环境开启,生产环境不开启。如果生产环境的服务端没有进行相关配置,请慎用
    history: Env != 'production'
});

router.map(Routers);

router.beforeEach(() => {
    window.scrollTo(0, 0);
});

router.afterEach(() => {

});

router.redirect({
    '*': "/home"
});
router.start(App, '#app');