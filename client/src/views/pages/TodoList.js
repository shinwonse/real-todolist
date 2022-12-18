import PlusIcon from 'assets/icons/icon-plus.svg';
import axios from 'axios';

import Component from '../../core/Component';

class TodoListPage extends Component {
  setup() {
    this.$state = {
      todoList: axios.get('http://localhost:3000/api/users/신원세/todos'),
    };
  }

  template() {
    return `
      <div class='Todo__Wrapper'>
        <header class='Todo__Header'>
          <h1 class='Todo__Title'>Todo List</h1>
          <div class='Todo__Input'>
            <input class='Todo__Input--element' type='text' placeholder='할 일을 입력하세요'/>
            <button class='Todo__Input--button'>
              <img alt='add' src=${PlusIcon} />
            </button>
          </div>
        </header>
        <main class='Todo__Main'>
          <ul class='Todo__List'>
            
          </ul>
        </main>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.Todo__Input--button', () => {
      console.log('click');
    });
  }
}

export default TodoListPage;
