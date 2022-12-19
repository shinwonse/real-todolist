import HamburgerIcon from 'assets/icons/icon-hamburger.svg';
import PlusIcon from 'assets/icons/icon-plus.svg';
import axios from 'axios';
import HamburgerModal from 'components/HamburgerModal';
import MoreOptionModal from 'components/MoreOptionModal';

import Component from '../../core/Component';

const addTodo = (e) => {
  e.preventDefault();
  const toDoInput = document.querySelector('.Todo__Input input');
  const newToDo = toDoInput.value;
  console.log(newToDo);
};

const openHamburgerModal = () => {
  const target = document.querySelector('.Modal__Position');
  return new HamburgerModal(target);
};

const openMoreOptionModal = () => {
  const target = document.querySelector('.Modal__Position');
  return new MoreOptionModal(target);
};

const checkTodo = () => {};

class TodoListPage extends Component {
  setup() {
    this.$state = {
      user: axios.get(`http://localhost:3000/api/users`, {
        withCredentials: true,
      }),
    };
  }

  template() {
    return `
      <div class='Todo__Wrapper'>
        <header class='Todo__Header'>
          <div class='Todo__Title'>
            <h1>Todo List</h1>
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

  setEvent() {
    this.addEvent('submit', '.Todo__Input', addTodo);
    this.addEvent('click', '.Todo__Title--button', openHamburgerModal);
    this.addEvent('click', '.Todo__List--modal-button', openMoreOptionModal);
    this.addEvent('click', '.Todo__List--check', checkTodo);
  }
}

export default TodoListPage;
