import { postTodo, fetchUser } from '@/api/todoList';
import HamburgerIcon from '@/assets/icons/icon-hamburger.svg';
import PlusIcon from '@/assets/icons/icon-plus.svg';
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
      <div class='Todo__Wrapper'>
        <header class='Todo__Header'>
          <div class='Todo__Title'>
            <h1>{{ this.state.user?.nickname }}의 Todo List</h1>
            <button class='Todo__Title--button'>
              <img alt='hamburger' src=${HamburgerIcon} />
            </button>
          </div>
          <form class='Todo__Input'>
            <input class='Todo__Input--element' type='text' placeholder='할 일을 입력하세요'/>
            <button class='Todo__Input--button'>
              <img alt='add' src=${PlusIcon} />
            </button>
          </form>
        </header>
        <main class='Todo__Main'></main>
        <div class='Modal__Position'></div>
      </div>
    `;
  }

  async mounted() {
    const result = await fetchUser();
    this.setState({ user: result, isLoading: false });
    const { toDos } = this.state.user;
    const $main = document.querySelector('.Todo__Main');
    new TodoCard($main, {
      toDos,
    });
  }

  setEvent() {
    this.addEvent('click', '.Todo__Title--button', this.openHamburgerModal);
    this.addEvent('submit', '.Todo__Input', this.submitTodo.bind(this));
  }

  async submitTodo(e) {
    e.preventDefault();
    const toDoInput = document.querySelector('.Todo__Input input');
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
