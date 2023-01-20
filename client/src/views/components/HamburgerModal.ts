import { logout } from '@/api/auth';
import GitHubIcon from '@/assets/icons/icon-github.svg';
import LogoutIcon from '@/assets/icons/icon-logout.svg';
import ModalStyle from '@/assets/styles/scss/modal.module.scss';
import { GH_REDIRECT_URL } from '@/constants';
import Component from '@/core/Component';

class HamburgerModal extends Component {
  private onClickModalOverlay;
  private onClickGitHubButton;

  template() {
    return `
      <div class=${ModalStyle.wrapper} id='modalWrapper'>
        <div class=${ModalStyle.overlay} id='modalOverlay'></div>
        <div class=${ModalStyle.content}>
          <button class=${ModalStyle.button} id='logoutBtn'>
            <img class=${ModalStyle.icon} alt='logout' src=${LogoutIcon} />
            <h2>Logout</h2>
          </button>
          <button class=${ModalStyle.button} id='githubBtn'>
            <img class=${ModalStyle.icon} alt='github' src=${GitHubIcon} />
            <h2>GitHub</h2>
          </button>
        </div>
      </div>
    `;
  }

  mounted() {
    this.onClickModalOverlay = this.closeModal.bind(this);
    this.onClickGitHubButton = this.openGitHub.bind(this);
  }

  closeModal() {
    const modal = document.querySelector('#modalWrapper');
    this.removeEvent();
    return modal?.remove();
  }

  openGitHub() {
    window.open(GH_REDIRECT_URL, 'real-todolist-github');
  }

  setEvent() {
    const $modalOverlay = document.querySelector('#modalOverlay');
    const $logout = document.querySelector('#logoutBtn');
    const $github = document.querySelector('#githubBtn');
    $modalOverlay?.addEventListener('click', this.onClickModalOverlay);
    $logout?.addEventListener('click', logout);
    $github?.addEventListener('click', this.onClickGitHubButton);
  }

  removeEvent() {
    const $modalOverlay = document.querySelector('#modalOverlay');
    const $logout = document.querySelector('#logoutBtn');
    const $github = document.querySelector('#githubBtn');
    $modalOverlay?.removeEventListener('click', this.onClickModalOverlay);
    $logout?.removeEventListener('click', logout);
    $github?.removeEventListener('click', this.onClickGitHubButton);
  }
}

export default HamburgerModal;
