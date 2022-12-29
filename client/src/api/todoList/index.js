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

export const deleteTodo = async (id) => {
  await axios.delete(`http://localhost:3000/api/todos/${id}`, {
    withCredentials: true,
  });
};

export const putTodo = async ({ id, isCompleted, text }) => {
  await axios.put(
    `http://localhost:3000/api/todos/${id}`,
    { isCompleted, text },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
