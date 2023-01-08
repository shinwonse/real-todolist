import axios from '../axios';

import { SERVER_BASE_URI } from '@/constants';

export const fetchUser = async () => {
  const { data } = await axios
    .get(`${SERVER_BASE_URI}/users`, {
      withCredentials: true,
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': true,
    })
    .then((res) => res);
  return data;
};

export const postTodo = async (newToDo) => {
  await axios.post(
    `${SERVER_BASE_URI}/api/todos`,
    { text: newToDo },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};

export const deleteTodo = async (id) => {
  await axios.delete(`${SERVER_BASE_URI}/api/todos/${id}`, {
    withCredentials: true,
  });
};

export const putTodo = async ({ id, isCompleted, text }) => {
  await axios.put(
    `${SERVER_BASE_URI}/api/todos/${id}`,
    { isCompleted, text },
    {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }
  );
};
