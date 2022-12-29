import { putTodo } from '@/api/todoList';
import MoreIcon from '@/assets/icons/icon-more.svg';
import Component from '@/core/Component';
import MoreOptionModal from '@/views/components/MoreOptionModal';

class TodoCard extends Component {
  initState() {
    return {
      toDos: this.props.toDos,
    };
  }

  template() {
    return `
      <ul class='Todo__List'>
        ${this.state.toDos
          .map(
            (todo) => `
              <li class='Todo__List--card' data-todo-id=${todo._id}>
                ${
                  todo.completed
                    ? `<input type='checkbox' class='Todo__List--check' checked />`
                    : `<input type='checkbox' class='Todo__List--check' />`
                }
                <span class='Todo__List--text'>${todo.text}</span>
                <button class='Todo__List--modal-button'>
                  <img alt='more' src=${MoreIcon} />
                </button>
              </li>
            `
          )
          .join('')}
      </ul>
    `;
  }

  setEvent() {
    this.addEvent('click', '.Todo__List--check', async (e) => {
      const isCompleted = e.target.checked;
      console.log(isCompleted);
      const text = e.target.nextElementSibling.innerText;
      const id = e.target.closest('[data-todo-id]').dataset.todoId;
      await this.checkTodo(id, isCompleted, text);
    });
    this.addEvent('click', '.Todo__List--modal-button', (e) => {
      const text = document.querySelector('.Todo__List--text').innerText;
      this.openMoreOptionModal(
        e.target.closest('[data-todo-id]').dataset.todoId,
        text
      );
    });
  }

  async checkTodo(id, isCompleted, text) {
    await putTodo(id, isCompleted, text);
  }

  openMoreOptionModal(id) {
    const $modalPosition = document.querySelector('.Modal__Position');
    return new MoreOptionModal($modalPosition, id);
  }
}

export default TodoCard;
