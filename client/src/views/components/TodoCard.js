import MoreIcon from '@/assets/icons/icon-more.svg';
import Component from '@/core/Component';
import { bind } from '@/utils';

class TodoCard extends Component {
  initState() {
    return {
      todo: null,
      isCompleted: false,
    };
  }

  render() {
    const template = this.template();
    const boundTemplate = bind.apply(this, [template]);
    this.$target.insertAdjacentHTML('beforeend', boundTemplate);
  }

  template() {
    return `
      <li class='Todo__List--card'>
        <input class='Todo__List--check' type='checkbox'/>
        <span class='Todo__List--text'>{{ this.props?.todo.text }}</span>
        <button class='Todo__List--modal-button'>
          <img alt='more' src=${MoreIcon} />
        </button>
      </li>
    `;
  }

  setEvent() {
    const { openMoreOptionModal } = this.props;

    this.addEvent('click', '.Todo__List--modal-button', () => {
      openMoreOptionModal(this.props.todo);
    });
  }
}

export default TodoCard;
