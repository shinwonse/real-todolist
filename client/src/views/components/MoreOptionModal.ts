import { deleteTodo, getTodos, putTodo } from '@/api/todoList';
import DeleteIcon from '@/assets/icons/icon-delete.svg';
import EditIcon from '@/assets/icons/icon-edit.svg';
import SubmitIcon from '@/assets/icons/icon-submit.svg';
import ModalStyle from '@/assets/styles/scss/modal.module.scss';
import Component from '@/core/Component';
import TodoCard from '@/views/components/TodoCard';

function test(id) {
  console.log(id);
  return id;
}

class MoreOptionModal extends Component {
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
    console.log(this.state.id);
  }

  startEdit(id) {
    const contentDiv = document.querySelector('#modalContent');
    contentDiv.innerHTML = `
      <form class=${ModalStyle.form} id='modalForm'>
        <input class=${ModalStyle.input} id='modalInput' type='text' placeholder='수정할 할 일을 입력하세요.'/>
        <button class=${ModalStyle.button} type='submit'>
          <img class=${ModalStyle.editIcon} alt='submit' src=${SubmitIcon} />
        </button>
      </form>
    `;
    this.addEvent('submit', '#modalForm', async (e) => {
      e.preventDefault();
      const input = document.querySelector('#modalInput') as HTMLInputElement;
      const newContent = input.value;
      await putTodo(id, false, newContent);
      this.closeModal();
      const $main = document.querySelector('#todoMain');
      const { data: toDos } = await getTodos();
      new TodoCard($main, { toDos });
    });
  }

  closeModal() {
    const modal = document.querySelector('#modalWrapper');
    if (modal) {
      modal.remove();
    }
  }

  async clickDeleteButton(e) {
    e.stopImmediatePropagation();
    console.log(this.props);
    // const { data: toDos } = await getTodos();
    // const $main = document.querySelector('#todoMain');
    // new TodoCard($main, { toDos });
  }

  setEvent() {
    const id = this.state.id;
    const $deleteBtn = document.querySelector('#deleteBtn');
    this.addEvent('click', '#modalOverlay', this.closeModal.bind(this));
    this.addEvent('click', '#edit', () => this.startEdit(this.state.id));
    this.addEvent('click', '#deleteBtn', () => test(id));
    $deleteBtn.removeEventListener('click', () => test(id));
  }
}

export default MoreOptionModal;
