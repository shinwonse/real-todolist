import PlusIcon from 'assets/icons/icon-plus.svg';

const TodoList = `
  <div class='Todo__Wrapper'>
    <header class='Todo__Header'>
      <h1 class='Todo__Title'>Todo List</h1>
      <div class='Todo__Input'>
        <input class='Todo__Input--element' type='text' placeholder='할 일을 입력하세요'/>
        <button class='Todo__Input--button'>
          <img alt='add' src=${PlusIcon} />
        </button>
      </div>
    </header>
    <main class='Todo__Main'>
      <ul class='Todo__List'>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
        <li class='Todo__List--card'>hi</li>
      </ul>
    </main>
  </div>
`;

export default TodoList;
