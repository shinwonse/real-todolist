import { fetchUser } from '@/api/todoList';
import Login from '@/views/pages/Login.js';
import TodoList from '@/views/pages/TodoList.js';

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
  constructor() {
    this.routes = routes;
    this.$app = document.querySelector('#app');
    window.onpopstate = () => {
      this.init();
    };
  }

  init() {
    const { auth, component } = routes.find(
      (route) => route.path === location.pathname
    );
    if (auth) {
      fetchUser();
      return new component(this.$app);
    }
    return new component(this.$app);
  }

  static push(destination) {
    const $app = document.querySelector('#app');
    const { path, component } = routes.find(
      (route) => route.path === destination
    );
    history.pushState(null, null, path);
    return new component($app);
  }
}

export default Router;
