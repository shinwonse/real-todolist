import axios from 'axios';
import Login from 'pages/Login';
import TodoList from 'pages/TodoList';

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
    const { path, auth, component } = routes.find(
      (route) => route.path === location.pathname
    );
    // if (auth) {
    //   axios
    //     .get(`http://localhost:3000/api/users`, { withCredentials: true })
    //     .catch(() => {
    //       Router.push('/login');
    //     });
    // }
    if (path === '/login') {
      return new component(this.$app);
    }
    if (path === '/') {
      return new component(this.$app);
    }
  }

  static push(destination) {
    const $app = document.querySelector('#app');
    const { path, auth, component } = routes.find(
      (route) => route.path === destination
    );
    if (auth) {
      // axios
      //   .get(`http://localhost:3000/api/users`, { withCredentials: true })
      //   .catch(() => {
      //     Router.push('/login');
      //   });
      // return new component($app);
    }
    history.pushState(null, null, path);
    return new component($app);
  }
}

export default Router;
