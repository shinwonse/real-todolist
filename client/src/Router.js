import Login from 'pages/Login';
import TodoList from 'pages/TodoList';

const routes = [
  {
    path: '/',
    component: Login,
  },
  {
    path: '/todolist',
    component: TodoList,
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
    const { path } = routes.find((route) => route.path === location.pathname);
    if (path === '/') {
      return new Login(this.$app);
    }
    if (path === '/todolist') {
      return new TodoList(this.$app);
    }
  }

  static push(PageComponent) {
    const path = routes.find((route) => route.component === PageComponent).path;
    history.pushState(null, null, path);
    const $app = document.querySelector('#app');
    return new PageComponent($app);
  }
}

export default Router;
