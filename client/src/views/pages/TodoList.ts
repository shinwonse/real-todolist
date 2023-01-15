import { getUser } from '@/api/auth';
import { postTodo, getTodos } from '@/api/todoList';
import HamburgerIcon from '@/assets/icons/icon-hamburger.svg';
import PlusIcon from '@/assets/icons/icon-plus.svg';
import TodoListPageStyle from '@/assets/styles/scss/todolist.module.scss';
import Component from '@/core/Component';
import { saveToken } from '@/utils';
import HamburgerModal from '@/views/components/HamburgerModal';
import TodoCard from '@/views/components/TodoCard';
import TodoCardSkeleton from '@/views/skeletons/TodoCardSkeleton';
import UsernameSkeleton from '@/views/skeletons/UsernameSkeleton';

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
            <div id='title'>${UsernameSkeleton}</div>
            <button class=${TodoListPageStyle.titleButton} id='titleBtn'>
              <img alt='hamburger' src=${HamburgerIcon} />
            </button>
          </div>
          <form class=${TodoListPageStyle.input} id='todoForm'>
            <input class=${TodoListPageStyle.inputElement} type='text' placeholder='할 일을 입력하세요'/>
            <button class=${TodoListPageStyle.inputButton}>
              <img alt='add' src=${PlusIcon} />
            </button>
          </form>
        </header>
        <main class=${TodoListPageStyle.main} id='todoMain'>
          ${TodoCardSkeleton}
        </main>
        <div class='Modal__Position' id='modalPosition'></div>
      </div>
    `;
  }

  async created() {
    const urlParams = new URL(window.location.href).searchParams;
    history.pushState({}, '', '/');
    if (localStorage.getItem('token')) {
      const { user } = await getUser(localStorage.getItem('token'));
      return this.setState({ user, isLoading: false });
    }
    const token = urlParams.get('token');
    saveToken(token);
    const { user } = await getUser(localStorage.getItem('token'));
    return this.setState({ user, isLoading: false });
  }

  async mounted() {
    const $main = document.querySelector('#todoMain');
    const $title = document.querySelector('#title');
    const toDos = await getTodos();
    setTimeout(() => {
      $title.innerHTML = `${this.state?.user?.nickname}님의 Todo List`;
      new TodoCard($main, {
        toDos,
      });
    }, 500);
  }

  setEvent() {
    this.addEvent('click', '#titleBtn', this.openHamburgerModal);
    this.addEvent('submit', '#todoForm', this.submitTodo.bind(this));
  }

  async submitTodo(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    const toDoInput = document.querySelector(
      '#todoForm input'
    ) as HTMLInputElement;
    const newToDo = toDoInput.value;
    await postTodo(newToDo);
    toDoInput.value = '';
    const toDos = await getTodos();
    const $main = document.querySelector('#todoMain');
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
