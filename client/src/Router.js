import Login from 'pages/Login';
import TodoList from 'pages/TodoList';

const routes = [
  {
    path: '/',
    redirect: '/todolist',
  },
  {
    path: '/login',
    component: Login,
    auth: false,
  },
  {
    path: '/todolist',
    component: TodoList,
    auth: true,
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
    console.log('init');
    const { path, auth, component, redirect } = routes.find(
      (route) => route.path === location.pathname
    );
    if (redirect) {
      Router.push(redirect);
      return;
    }
    if (path === '/') {
      return new Login(this.$app);
    }
    if (path === '/todolist') {
      return new TodoList(this.$app);
    }
  }

  static push(destination) {
    const { path, auth, component } = routes.find(
      (route) => route.path === destination
    );
    if (auth) {
      console.log('인증이 필요함');
    }
    history.pushState(null, null, path);
    const $app = document.querySelector('#app');
    return new component($app);
  }
}

export default Router;
