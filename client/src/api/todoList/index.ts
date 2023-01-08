// import axios from '@/api/axios';
import axios from 'axios';

export const fetchUser = async () => {
  const { data } = await axios
    .get('/users', { withCredentials: true })
    .then((res) => res);
  return data;
};

export const getTodos = async () => {
  const { data } = await axios
    .get('https://real-todolist.herokuapp.com/todos', { withCredentials: true })
    .then((res) => res);
  return data;
};

export const postTodo = async (newToDo) => {
  await axios.post('/api/todos', { text: newToDo });
};

export const deleteTodo = async (id) => {
  await axios.delete('/api/todos/${id}');
};

export const putTodo = async (id, isCompleted, text) => {
  await axios.put('/api/todos/${id}', { isCompleted, text });
};
