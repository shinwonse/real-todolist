import { postTodo, fetchUser } from '@/api/todoList';
import HamburgerIcon from '@/assets/icons/icon-hamburger.svg';
import PlusIcon from '@/assets/icons/icon-plus.svg';
import Component from '@/core/Component';
import HamburgerModal from '@/views/components/HamburgerModal';
import MoreOptionModal from '@/views/components/MoreOptionModal';
import TodoCard from '@/views/components/TodoCard';

class TodoListPage extends Component {
  async setup() {
    this.$state = {
      user: await fetchUser(),
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
        <main class='Todo__Main'>
          <ul class='Todo__List'></ul>
        </main>
        <div class='Modal__Position'></div>
      </div>
    `;
  }

  async mounted() {
    const result = await fetchUser();
    this.setState({ user: result, isLoading: false });
    const $todoList = document.querySelector('.Todo__List');
    const { toDos } = this.state.user;
    toDos.map((todo) => {
      new TodoCard($todoList, {
        todo,
        openMoreOptionModal: this.openMoreOptionModal,
      });
    });
  }

  setEvent() {
    this.addEvent('click', '.Todo__Title--button', this.openHamburgerModal);
    this.addEvent('submit', '.Todo__Input', this.submitTodo);
    this.addEvent('click', '.Todo__List--check', this.checkTodo);
  }

  async submitTodo(e) {
    e.preventDefault();
    const toDoInput = document.querySelector('.Todo__Input input');
    const newToDo = toDoInput.value;
    await postTodo(newToDo);
    await this.render();
  }

  checkTodo() {}

  openHamburgerModal() {
    const $modalPosition = document.querySelector('.Modal__Position');
    return new HamburgerModal($modalPosition, {});
  }

  openMoreOptionModal(todo) {
    const $modalPosition = document.querySelector('.Modal__Position');
    return new MoreOptionModal($modalPosition, todo);
  }
}

export default TodoListPage;
