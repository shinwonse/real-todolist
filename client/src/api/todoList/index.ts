import axios from '@/api/axios';

const headers = {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
};

export const fetchUser = async () => {
  const { data } = await axios
    .get('/users', { withCredentials: true })
    .then((res) => res);
  return data;
};

export const getTodos = async () => {
  const { data } = await axios.get('/todos/all', { headers });
  return data;
};

export const postTodo = async (newToDo) => {
  await axios.post('/todos', { text: newToDo }, { headers });
};

export const deleteTodo = async (id) => {
  await axios.delete(`/todos/${id}`, { headers });
};

export const putTodo = async (id, is_completed, text) => {
  const isCompleted = is_completed ? 'true' : 'false';
  await axios.put(
    `/todos/${id}`,
    { text, is_completed: isCompleted },
    { headers }
  );
};
