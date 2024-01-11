import axios from 'axios';

const API_URL = 'http://localhost:3001/';

// ===============Message==============
// get chat user
const findMessage = async (filter) => {
  const res = await axios.post(API_URL + `message/find`, filter);
  return res.data;
};

// post chat user
const createMessage = async (data) => {
  const res = await axios.post(API_URL + 'message', data);
  return res.data;
};

const updateMessage = async (data) => {
  const res = await axios.put(API_URL + `message/${data.id}`, data.body);
  return res.data;
};

const getDetail = async (id) => {
  const res = await axios.get(API_URL + `message/${id}`);
  return res.data;
};

const messageService = {
  findMessage,
  createMessage,
  updateMessage,
  getDetail,
};

export default messageService;
