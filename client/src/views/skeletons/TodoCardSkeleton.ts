import CardSkeletonStyle from '@/assets/styles/scss/cardSkeleton.module.scss';

const mockData = Array.from({ length: 5 }, () => ({}));

const TodoCardSkeleton = `
  <ul class=${CardSkeletonStyle.ul}>
    ${mockData.map(() => `<li class=${CardSkeletonStyle.li}></li>`).join('')}
  </ul>
`;

export default TodoCardSkeleton;
