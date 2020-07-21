import axios from 'axios';

const API_URL = 'http://localhost:3001/api/transaction';

async function getPeriodTransaction(period) {
  const response = await axios.get(`${API_URL}?period=${period}`);
  return response.data;
}

async function create(data) {
  const response = await axios.post(API_URL, data);
  return response.data;
}

async function update(data) {
  const response = await axios.put(`${API_URL}?_id=${data._id}`, data);
  return response.data;
}

async function remove(data) {
  const response = await axios.delete(`${API_URL}?_id=${data._id}`);
  return response.data;
}

export { getPeriodTransaction, create, update, remove };
