import 'assets/styles/base.scss';
import Login from 'pages/Login';
import TodoList from 'pages/TodoList';

class App {
  constructor() {
    const $app = document.querySelector('#app');
    new TodoList($app);
  }
}

new App();
