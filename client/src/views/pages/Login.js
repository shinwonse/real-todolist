import KakaoLogin from 'assets/images/kakao_login_medium_wide.png';
import TodoList from 'pages/TodoList';

import Component from '../../core/Component';
import router from '../../Router';

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
      router.push(TodoList);
      // location.href =
      //   'https://kauth.kakao.com/oauth/authorize?client_id=b7b1a22f9072cb8cf1479960e9e10414&redirect_uri=http://localhost:3000/users&response_type=code';
    });
  }
}

export default LoginPage;
