import { deleteTodo, fetchUser, putTodo } from '@/api/todoList';
import DeleteIcon from '@/assets/icons/icon-delete.svg';
import EditIcon from '@/assets/icons/icon-edit.svg';
import SubmitIcon from '@/assets/icons/icon-submit.svg';
import ModalStyle from '@/assets/styles/scss/modal.module.scss';
import Component from '@/core/Component';
import TodoCard from '@/views/components/TodoCard';

class MoreOptionModal extends Component {
  initState() {
    return {
      id: this.props,
    };
  }

  template() {
    return `
      <div class=${ModalStyle.wrapper}>
        <div class=${ModalStyle.overlay}></div>
        <div class=${ModalStyle.content}>
          <button class=${ModalStyle.button} id='edit'>
            <img class=${ModalStyle.icon} alt='edit' src=${EditIcon} />
            <h2>Edit</h2>
          </button>
          <button class=${ModalStyle.button} id='delete'>
            <img class=${ModalStyle.icon} alt='delete' src=${DeleteIcon} />
            <h2>Delete</h2>
          </button>
        </div>
      </div>
    `;
  }

  startEdit(id) {
    const contentDiv = document.querySelector('.Modal__Content');
    contentDiv.innerHTML = `
      <form class=${ModalStyle.form}>
        <input class=${ModalStyle.input} type='text' placeholder='수정할 할 일을 입력하세요.'/>
        <button class=${ModalStyle.button} type='submit' class='Modal__Submit'>
          <img class=${ModalStyle.editIcon} alt='submit' src=${SubmitIcon} />
        </button>
      </form>
    `;
    this.addEvent('submit', '.Modal__Form', async (e) => {
      e.preventDefault();
      const input = document.querySelector('.Modal__Input') as HTMLInputElement;
      const newContent = input.value;
      await putTodo(id, false, newContent);
      const data = await fetchUser();
      this.setState({ user: data, isLoading: false });
      this.closeModal();
      const { toDos } = this.state.user;
      const $main = document.querySelector('.Todo__Main');
      new TodoCard($main, { toDos });
    });
  }

  closeModal() {
    const modal = document.querySelector('.Modal');
    if (modal) {
      modal.remove();
    }
  }

  async clickDeleteButton(id) {
    await deleteTodo(id);
    const data = await fetchUser();
    this.setState({ user: data, isLoading: false });
    this.closeModal();
    const { toDos } = this.state.user;
    const $main = document.querySelector('.Todo__Main');
    new TodoCard($main, { toDos });
  }

  setEvent() {
    this.addEvent('click', '.Modal__Overlay', this.closeModal);
    this.addEvent('click', '#edit', () => this.startEdit(this.state.id));
    this.addEvent('click', '#delete', () =>
      this.clickDeleteButton(this.state.id)
    );
  }
}

export default MoreOptionModal;
