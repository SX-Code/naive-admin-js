import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
import { setupNaive, setupNaiveDiscreteApi } from './plugins'
import router, { setupRouter } from './router';

async function bootstrap() {
  const app = createApp(App);

  // 挂载状态管理
  setupStore(app);

  // 注册全局常用的 naive-ui 组件
  setupNaive(app);

  // 挂载 naive-ui 脱离上下文的 Api
  setupNaiveDiscreteApi();

  // 挂载路由
  setupRouter(app);

  // 路由准备就绪后挂载 APP 实例
  // https://router.vuejs.org/api/interfaces/router.html#isready
  await router.isReady();

  app.mount('#app', true);
}

bootstrap();