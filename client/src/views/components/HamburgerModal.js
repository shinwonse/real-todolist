import GitHubIcon from 'assets/icons/icon-github.svg';
import LogoutIcon from 'assets/icons/icon-logout.svg';

import Component from '../../core/Component';

const closeModal = () => {
  const modal = document.querySelector('.Modal');
  if (modal) {
    return modal.remove();
  }
};

const logout = () => {
  console.log('logout');
};

const openGitHub = () => {
  window.open(
    'https://github.com/shinwonse/real-todolist',
    'real-todolist-github'
  );
};

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
    this.addEvent('click', '.Modal__Overlay', closeModal);
    this.addEvent('click', '#logout', logout);
    this.addEvent('click', '#github', openGitHub);
  }
}

export default HamburgerModal;
