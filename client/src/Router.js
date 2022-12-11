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
  }

  init() {
    const $app = document.querySelector('#app');
    const { path } = routes.find((route) => route.path === location.pathname);

    if (path === '/') {
      return new Login($app);
    }

    if (path === '/todolist') {
      return new TodoList($app);
    }
  }
}

export default Router;
