import MoreIcon from '@/assets/icons/icon-more.svg';
import Component from '@/core/Component';
import { bind } from '@/utils';
import MoreOptionModal from '@/views/components/MoreOptionModal';

class TodoCard extends Component {
  initState() {
    return {
      toDos: this.props.toDos,
    };
  }

  render() {
    const template = this.template();
    const boundTemplate = bind.apply(this, [template]);
    this.$target.insertAdjacentHTML('beforeend', boundTemplate);
  }

  template() {
    return `
      <ul class='Todo__List'>
        ${this.state.toDos
          .map(
            (todo) => `
              <li class='Todo__List--card' data-todo-id=${todo._id}>
                <input class='Todo__List--check' type='checkbox'/>
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
    this.addEvent('click', '.Todo__List--modal-button', (e) => {
      const text = document.querySelector('.Todo__List--text').innerText;
      this.openMoreOptionModal(
        e.target.closest('[data-todo-id]').dataset.todoId,
        text
      );
    });
  }

  openMoreOptionModal(id) {
    const $modalPosition = document.querySelector('.Modal__Position');
    return new MoreOptionModal($modalPosition, id);
  }
}

export default TodoCard;
