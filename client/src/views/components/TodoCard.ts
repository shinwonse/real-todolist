import { putTodo } from '@/api/todoList';
import MoreIcon from '@/assets/icons/icon-more.svg';
import TodoListCardStyle from '@/assets/styles/scss/todolist.module.scss';
import Component from '@/core/Component';
import MoreOptionModal from '@/views/components/MoreOptionModal';

class TodoCard extends Component {
  initState() {
    return {
      toDos: this.props.toDos.data,
    };
  }

  template() {
    return `
      <ul class=${TodoListCardStyle.list}>
        ${this.state.toDos
          .map(
            (todo) => `
              <li class=${TodoListCardStyle.listCard} data-todo-id=${
              todo.todo_id
            }>
                ${
                  todo.is_completed
                    ? `<input type='checkbox' class=${TodoListCardStyle.listCheck} id='todoCheck' checked />`
                    : `<input type='checkbox' class=${TodoListCardStyle.listCheck} id='todoCheck' />`
                }
                <span class=${TodoListCardStyle.listText}>${todo.text}</span>
                <button class=${
                  TodoListCardStyle.listModalButton
                } id='modalBtn'>
                  <img alt='more' src=${MoreIcon} />
                </button>
              </li>
            `
          )
          .join('')}
      </ul>
    `;
  }

  created() {
    console.log(this.state.toDos);
  }

  setEvent() {
    this.addEvent('click', '#todoCheck', async (e) => {
      const is_completed = e.target.checked;
      const text = e.target.nextElementSibling.innerText;
      const id = e.target.closest('[data-todo-id]').dataset.todoId;
      await this.checkTodo(id, is_completed, text);
    });
    this.addEvent('click', '#modalBtn', (e) => {
      this.openMoreOptionModal(
        e.target.closest('[data-todo-id]').dataset.todoId
      );
    });
  }

  async checkTodo(id, is_completed, text) {
    await putTodo(id, is_completed, text);
  }

  openMoreOptionModal(id) {
    const $modalPosition = document.querySelector('#modalPosition');
    return new MoreOptionModal($modalPosition, id);
  }
}

export default TodoCard;
