import { logout } from '@/api/auth';
import GitHubIcon from '@/assets/icons/icon-github.svg';
import LogoutIcon from '@/assets/icons/icon-logout.svg';
import { GH_REDIRECT_URL } from '@/constants';
import Component from '@/core/Component';

class HamburgerModal extends Component {
  template() {
    return `
      <div class='Modal'>
        <div class='Modal__Overlay'></div>
        <div class='Modal__Content'>
          <button class='Modal__Button' id='logout'>
            <img class='Modal__Icon' alt='logout' src=${LogoutIcon} />
            <h2>Logout</h2>
          </button>
          <button class='Modal__Button' id='github'>
            <img class='Modal__Icon' alt='github' src=${GitHubIcon} />
            <h2>GitHub</h2>
          </button>
        </div>
      </div>
    `;
  }

  setEvent() {
    this.addEvent('click', '.Modal__Overlay', this.closeModal);
    this.addEvent('click', '#logout', logout);
    this.addEvent('click', '#github', this.openGitHub);
  }

  openGitHub() {
    window.open(GH_REDIRECT_URL, 'real-todolist-github');
  }

  closeModal() {
    const modal = document.querySelector('.Modal');
    if (modal) {
      return modal.remove();
    }
  }
}

export default HamburgerModal;
