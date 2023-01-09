import { kakaoLogin } from '@/api/auth';
import KakaoLogin from '@/assets/images/kakao_login_medium_wide.png';
import LoginPageStyle from '@/assets/styles/scss/login.module.scss';
import Component from '@/core/Component';

class LoginPage extends Component {
  template() {
    return `
      <main class=${LoginPageStyle.main}>
        <div class=${LoginPageStyle.contents}>
          <h1 class=${LoginPageStyle.title}>Real TodoList</h1>
          <button class=${LoginPageStyle.button} id='login_btn'>
            <img src=${KakaoLogin} alt='kakao_login'  />
          </button>
        </div>
      </main>
    `;
  }

  setEvent() {
    this.addEvent('click', '#login_btn', kakaoLogin);
  }
}

export default LoginPage;
