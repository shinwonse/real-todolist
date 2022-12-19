import axios from 'axios';
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
    const { path, auth, component, redirect } = routes.find(
      (route) => route.path === location.pathname
    );
    if (redirect) {
      return Router.push(redirect);
    }
    if (auth) {
      axios
        .get(`http://localhost:3000/api/users`, { withCredentials: true })
        .catch(() => {
          Router.push('/login');
        });
      return;
    }
    if (path === '/login') {
      return new Login(this.$app);
    }
    if (path === '/todolist') {
      return new TodoList(this.$app);
    }
  }

  static push(destination) {
    const { path, auth, component, redirect } = routes.find(
      (route) => route.path === destination
    );
    if (redirect) {
      Router.push(redirect);
      return;
    }
    history.pushState(null, null, path);
    const $app = document.querySelector('#app');
    return new component($app);
  }
}

export default Router;
