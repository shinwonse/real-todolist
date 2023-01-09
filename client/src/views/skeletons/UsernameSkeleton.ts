import UsernameSkeletonStyle from '@/assets/styles/scss/userNameSkeleton.module.scss';
import Component from '@/core/Component';

class UsernameSkeleton extends Component {
  template() {
    return `
      <div class=${UsernameSkeletonStyle.wrapper}>
        <h1>skeleton title</h1>
      </div>
    `;
  }
}

export default UsernameSkeleton;
