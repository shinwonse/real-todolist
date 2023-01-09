import axios from 'axios';

import { postTodo, fetchUser } from '@/api/todoList';
import HamburgerIcon from '@/assets/icons/icon-hamburger.svg';
import PlusIcon from '@/assets/icons/icon-plus.svg';
import TodoListPageStyle from '@/assets/styles/scss/todolist.module.scss';
import Component from '@/core/Component';
import HamburgerModal from '@/views/components/HamburgerModal';
import TodoCard from '@/views/components/TodoCard';

class TodoListPage extends Component {
  initState() {
    return {
      user: null,
      isLoading: true,
    };
  }

  template() {
    return `
      <div class=${TodoListPageStyle.wrapper}>
        <header class=${TodoListPageStyle.header}>
          <div class=${TodoListPageStyle.title}>
            <h1>title</h1>
<!--            <h1>{{ this.state.user?.nickname }}의 Todo List</h1>-->
            <button class=${TodoListPageStyle.titleButton} id='title_btn'>
              <img alt='hamburger' src=${HamburgerIcon} />
            </button>
          </div>
          <form class=${TodoListPageStyle.input}>
            <input class=${TodoListPageStyle.inputElement} type='text' placeholder='할 일을 입력하세요'/>
            <button class=${TodoListPageStyle.inputButton}>
              <img alt='add' src=${PlusIcon} />
            </button>
          </form>
        </header>
        <main class=${TodoListPageStyle.main}></main>
        <div class='Modal__Position'></div>
      </div>
    `;
  }

  async created() {
    // const data = await getTodos();
    // console.log(data);
    // const user = await fetchUser();
    // this.setState({ user, isLoading: false });
  }

  // async mounted() {
  //   const { toDos } = this.state.user;
  //   const $main = document.querySelector('.Todo__Main');
  //   new TodoCard($main, {
  //     toDos,
  //   });
  // }

  setEvent() {
    this.addEvent('click', '#title_btn', this.openHamburgerModal);
    this.addEvent('submit', '.Todo__Input', this.submitTodo.bind(this));
  }

  async submitTodo(e) {
    e.preventDefault();
    const toDoInput = document.querySelector(
      '.Todo__Input input'
    ) as HTMLInputElement;
    const newToDo = toDoInput.value;
    toDoInput.value = '';
    await postTodo(newToDo);
    const data = await fetchUser();
    this.setState({ user: data, isLoading: false });
    const { toDos } = this.state.user;
    const $main = document.querySelector('.Todo__Main');
    new TodoCard($main, {
      toDos,
    });
  }

  openHamburgerModal() {
    const $modalPosition = document.querySelector('.Modal__Position');
    return new HamburgerModal($modalPosition, {});
  }
}

export default TodoListPage;
