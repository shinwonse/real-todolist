import MoreIcon from 'assets/icons/icon-more.svg';

import Component from '../../core/Component';

class TodoCard extends Component {
  template() {
    return `
      <li class='Todo__List--card'>
        <input class='Todo__List--check' type='checkbox'/>
        <span class='Todo__List--text'>hi</span>
        <button class='Todo__List--modal-button'>
          <img alt='more' src=${MoreIcon} />
        </button>
      </li>
    `;
  }
}

export default TodoCard;
