import axios from 'axios';

const url = axios.create({
  baseURL: '/api/transaction',
});

async function getPeriodTransaction(period) {
  const response = await url.get(`?period=${period}`);
  return response.data;
}

async function create(data) {
  const response = await url.post('', data);
  return response.data;
}

async function update(data) {
  const response = await url.put(`?_id=${data._id}`, data);
  return response.data;
}

async function remove(data) {
  const response = await url.delete(`?_id=${data._id}`);
  return response.data;
}

export { getPeriodTransaction, create, update, remove };
