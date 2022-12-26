import DeleteIcon from 'assets/icons/icon-delete.svg';
import EditIcon from 'assets/icons/icon-edit.svg';
import SubmitIcon from 'assets/icons/icon-submit.svg';
import axios from 'axios';

import Component from '../../core/Component';

const closeModal = () => {
  const modal = document.querySelector('.Modal');
  if (modal) {
    modal.remove();
  }
};

const startEdit = () => {
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

const deleteTodo = async (id) => {
  await axios.delete(
    `http://localhost:3000/api/todos/63a838365e25479c2ef410b5`,
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

class MoreOptionModal extends Component {
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

  setEvent() {
    this.addEvent('click', '.Modal__Overlay', closeModal);
    this.addEvent('click', '#edit', startEdit);
    this.addEvent('click', '#delete', deleteTodo);
  }
}

export default MoreOptionModal;
