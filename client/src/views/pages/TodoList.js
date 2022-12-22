import HamburgerIcon from 'assets/icons/icon-hamburger.svg';
import MoreIcon from 'assets/icons/icon-more.svg';
import PlusIcon from 'assets/icons/icon-plus.svg';
import axios from 'axios';
import HamburgerModal from 'components/HamburgerModal';
import MoreOptionModal from 'components/MoreOptionModal';
import TodoCard from 'components/TodoCard';

import Component from '../../core/Component';

const openHamburgerModal = () => {
  const target = document.querySelector('.Modal__Position');
  return new HamburgerModal(target);
};

const openMoreOptionModal = () => {
  const target = document.querySelector('.Modal__Position');
  return new MoreOptionModal(target);
};

const addTodoCard = () => {
  const target = document.querySelector('.Todo__List');
  return new TodoCard(target);
};

const checkTodo = () => {};

const fetchUser = async () => {
  const { data } = await axios.get('http://localhost:3000/api/users', {
    withCredentials: true,
  });
  return data;
};

class TodoListPage extends Component {
  async setup() {
    this.$state = {
      user: await fetchUser(),
    };
  }

  template() {
    const { nickname, toDos } = this.$state.user;
    return `
      <div class='Todo__Wrapper'>
        <header class='Todo__Header'>
          <div class='Todo__Title'>
            <h1>${nickname} Todo List</h1>
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
          <ul class='Todo__List'>
            ${toDos
              .map(
                (todo) => `
              <li class='Todo__List--card'>
                <input class='Todo__List--check' type='checkbox'/>
                <span class='Todo__List--text'>${todo}</span>
                <button class='Todo__List--modal-button'>
                  <img alt='more' src=${MoreIcon} />
                </button>
              </li>`
              )
              .join('')}
          </ul>
        </main>
        <div class='Modal__Position'></div>
      </div>
    `;
  }

  addTodo = async (e) => {
    e.preventDefault();
    const toDoInput = document.querySelector('.Todo__Input input');
    const newToDo = toDoInput.value;
    axios.post(
      'http://localhost:3000/api/users/todo',
      { text: newToDo },
      {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      }
    );
    await this.render();
  };

  setEvent() {
    this.addEvent('click', '.Todo__Title--button', openHamburgerModal);
    this.addEvent('click', '.Todo__List--modal-button', openMoreOptionModal);
    this.addEvent('submit', '.Todo__Input', this.addTodo);
    this.addEvent('click', '.Todo__List--check', checkTodo);
  }
}

export default TodoListPage;
