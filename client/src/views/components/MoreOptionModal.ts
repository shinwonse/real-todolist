import { deleteTodo, getTodo, putTodo } from '@/api/todoList';
import DeleteIcon from '@/assets/icons/icon-delete.svg';
import EditIcon from '@/assets/icons/icon-edit.svg';
import SubmitIcon from '@/assets/icons/icon-submit.svg';
import ModalStyle from '@/assets/styles/scss/modal.module.scss';
import Component from '@/core/Component';
import TodoCard from '@/views/components/TodoCard';

class MoreOptionModal extends Component {
  private onClickDeleteButton;
  private onClickEditButton;
  private onClickModalOverlay;

  initState() {
    return {
      id: null,
    };
  }

  template() {
    return `
      <div class=${ModalStyle.wrapper} id='modalWrapper'>
        <div class=${ModalStyle.overlay} id='modalOverlay'></div>
        <div class=${ModalStyle.content} id='modalContent'>
          <button class=${ModalStyle.button} id='edit'>
            <img class=${ModalStyle.icon} alt='edit' src=${EditIcon} />
            <h2>Edit</h2>
          </button>
          <button class=${ModalStyle.button} id='deleteBtn'>
            <img class=${ModalStyle.icon} alt='delete' src=${DeleteIcon} />
            <h2>Delete</h2>
          </button>
        </div>
      </div>
    `;
  }

  created() {
    this.setState({ id: this.props });
  }

  startEdit() {
    const contentDiv = document.querySelector('#modalContent');
    contentDiv.innerHTML = `
      <form class=${ModalStyle.form} id='modalForm'>
        <input class=${ModalStyle.input} id='modalInput' type='text' placeholder='수정할 할 일을 입력하세요.'/>
        <button class=${ModalStyle.button} type='submit'>
          <img class=${ModalStyle.editIcon} alt='submit' src=${SubmitIcon} />
        </button>
      </form>
    `;
    const $form = document.querySelector('#modalForm');
    $form.addEventListener('submit', this.editTodo.bind(this));
  }

  closeModal() {
    const modal = document.querySelector('#modalWrapper');
    this.removeEvent();
    return modal?.remove();
  }

  async editTodo(e) {
    e.preventDefault();
    const input = document.querySelector('#modalInput') as HTMLInputElement;
    const newContent = input.value;
    await putTodo(this.state.id, false, newContent);
    this.closeModal();
    const $main = document.querySelector('#todoMain');
    const { data: toDos } = await getTodo();
    new TodoCard($main, { toDos });
  }

  async deleteTodo(e) {
    e.stopImmediatePropagation();
    await deleteTodo(this.state.id);
    this.closeModal();
    const $main = document.querySelector('#todoMain');
    const { data: toDos } = await getTodo();
    new TodoCard($main, { toDos });
  }

  mounted() {
    this.onClickEditButton = this.startEdit.bind(this);
    this.onClickDeleteButton = this.deleteTodo.bind(this);
    this.onClickModalOverlay = this.closeModal.bind(this);
  }

  setEvent() {
    const $deleteBtn = document.querySelector('#deleteBtn');
    const $editBtn = document.querySelector('#edit');
    const $modalOverlay = document.querySelector('#modalOverlay');
    $editBtn?.addEventListener('click', this.onClickEditButton);
    $deleteBtn?.addEventListener('click', this.onClickDeleteButton);
    $modalOverlay?.addEventListener('click', this.closeModal.bind(this));
  }

  removeEvent() {
    const $editBtn = document.querySelector('#edit');
    const $deleteBtn = document.querySelector('#deleteBtn');
    const $modalOverlay = document.querySelector('#modalOverlay');
    $editBtn?.removeEventListener('click', this.onClickEditButton);
    $deleteBtn?.removeEventListener('click', this.onClickDeleteButton);
    $modalOverlay?.removeEventListener('click', this.onClickModalOverlay);
  }
}

export default MoreOptionModal;
