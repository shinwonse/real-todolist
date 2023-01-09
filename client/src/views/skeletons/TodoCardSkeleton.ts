import CardSkeletonStyle from '@/assets/styles/scss/cardSkeleton.module.scss';
import Component from '@/core/Component';

class TodoCardSkeleton extends Component {
  initState() {
    return {
      toDos: Array.from({ length: 5 }, () => ({})),
    };
  }

  template() {
    return `
      <ul class=${CardSkeletonStyle.ul}>
        ${this.state.toDos
          .map(() => `<li class=${CardSkeletonStyle.li}></li>`)
          .join('')}
      </ul>
    `;
  }
}

export default TodoCardSkeleton;
