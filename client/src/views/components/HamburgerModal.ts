import { logout } from '@/api/auth';
import GitHubIcon from '@/assets/icons/icon-github.svg';
import LogoutIcon from '@/assets/icons/icon-logout.svg';
import ModalStyle from '@/assets/styles/scss/modal.module.scss';
import { GH_REDIRECT_URL } from '@/constants';
import Component from '@/core/Component';

class HamburgerModal extends Component {
  template() {
    return `
      <div class=${ModalStyle.wrapper} id='modal_wrapper'>
        <div class=${ModalStyle.overlay} id='modal_overlay'></div>
        <div class=${ModalStyle.content}>
          <button class=${ModalStyle.button} id='logout'>
            <img class=${ModalStyle.icon} alt='logout' src=${LogoutIcon} />
            <h2>Logout</h2>
          </button>
          <button class=${ModalStyle.button} id='github'>
            <img class=${ModalStyle.icon} alt='github' src=${GitHubIcon} />
            <h2>GitHub</h2>
          </button>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '#modal_overlay', this.closeModal);
    this.addEvent('click', '#logout', logout);
    this.addEvent('click', '#github', this.openGitHub);
  }

  openGitHub() {
    window.open(GH_REDIRECT_URL, 'real-todolist-github');
  }

  closeModal() {
    const modal = document.querySelector('#modal_wrapper');
    if (modal) {
      return modal.remove();
    }
  }
}

export default HamburgerModal;
