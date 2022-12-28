import { deleteTodo } from '@/api/todoList';
import DeleteIcon from '@/assets/icons/icon-delete.svg';
import EditIcon from '@/assets/icons/icon-edit.svg';
import SubmitIcon from '@/assets/icons/icon-submit.svg';
import Component from '@/core/Component';

class MoreOptionModal extends Component {
  initState() {
    return {
      id: this.props,
    };
  }

  template() {
    return `
      <div class='Modal'>
        <div class='Modal__Overlay'></div>
        <div class='Modal__Content'>
          <button class='Modal__Button' id='edit'>
            <img class='Modal__Icon' alt='edit' src=${EditIcon} />
            <h2>Edit</h2>
          </button>
          <button class='Modal__Button' id='delete'>
            <img class='Modal__Icon' alt='delete' src=${DeleteIcon} />
            <h2>Delete</h2>
          </button>
        </div>
      </div>
    `;
  }

  startEdit = () => {
    const contentDiv = document.querySelector('.Modal__Content');
    contentDiv.innerHTML = `
    <form class='Modal__Form'>
      <input type='text' class='Modal__Input' placeholder='수정할 할 일을 입력하세요.'/>
      <button class='Modal__Button' type='submit' class='Modal__Submit'>
        <img class='Modal__Icon--edit' alt='submit' src=${SubmitIcon} />
      </button>
    </form>
  `;
  };

  closeModal = () => {
    const modal = document.querySelector('.Modal');
    if (modal) {
      modal.remove();
    }
  };

  setEvent() {
    this.addEvent('click', '.Modal__Overlay', this.closeModal);
    this.addEvent('click', '#edit', this.startEdit);
    this.addEvent('click', '#delete', () => deleteTodo(this.state.id));
  }
}

export default MoreOptionModal;
