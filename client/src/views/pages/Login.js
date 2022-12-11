import KakaoLogin from 'assets/images/kakao_login_medium_wide.png';

import Component from '../../core/Component';

class LoginPage extends Component {
  template() {
    return `
      <main class='Login__Main'>
        <div class='Login__Contents'>
          <h1 class='Login__Title'>Real TodoList</h1>
          <button class='Login__Button'>
            <img src=${KakaoLogin} alt='kakao_login'  />
          </button>
        </div>
      </main>
    `;
  }

  setEvent() {
    this.addEvent('click', '.Login__Button', () => {
      history.pushState(null, null, '/todolist');
    });
  }
}

export default LoginPage;
