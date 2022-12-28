import axios from 'axios';

export const fetchUser = async () => {
  const { data } = await axios.get('http://localhost:3000/api/users', {
    withCredentials: true,
  });
  return data;
};

export const postTodo = async (newToDo) => {
  await axios.post(
    'http://localhost:3000/api/todos',
    { text: newToDo },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const deleteTodo = async (id) => {};

export const putTodo = async (id) => {};
