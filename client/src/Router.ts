import { isLogin } from '@/utils';
import Login from '@/views/pages/Login';
import TodoList from '@/views/pages/TodoList';

const routes = [
  {
    path: '/',
    component: TodoList,
    auth: true,
  },
  {
    path: '/login',
    component: Login,
    auth: false,
  },
];

class Router {
  routes: object;
  $app: Element;

  constructor() {
    this.routes = routes;
    this.$app = document.querySelector('#app');
    window.onpopstate = () => {
      this.init();
    };
  }

  async init() {
    const { auth, component } = routes.find(
      (route) => route.path === location.pathname
    );
    if (component === Login) {
      if (isLogin()) return Router.push('/');
    }
    if (auth) {
      const urlParams = new URL(window.location.href).searchParams;
      const token = urlParams.get('token');
      if (!token) {
        if (!isLogin()) return Router.push('/login');
      }
    }
    return new component(this.$app, {});
  }

  static push(destination) {
    const $app = document.querySelector('#app');
    const { path, component } = routes.find(
      (route) => route.path === destination
    );
    history.pushState(null, null, path);
    return new component($app, {});
  }
}

export default Router;
