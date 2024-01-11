import axios from 'axios';

const API_URL = 'http://localhost:3001/';

// upload interaction
const createInteraction = async (data) => {
  const res = await axios.post(API_URL + 'interaction', data);
  return res.data;
};

// get a interaction
const getInteractionDetail = async (id) => {
  const res = await axios.get(API_URL + `interaction/${id}`);
  return res.data;
};

// get all posts
const findInteraction = async (filter) => {
  const res = await axios.post(API_URL + `interaction/find`, filter);
  return res.data;
};

// edit Interaction
const updateInteraction = async (data) => {
  const res = await axios.put(API_URL + `interaction/${data.id}`, data.body);
  return res.data;
};

const deleteInteraction = async (id) => {
  const res = await axios.delete(API_URL + `interaction/${id}`);
  return res.data;
};

const postService = {
  createInteraction,
  getInteractionDetail,
  findInteraction,
  updateInteraction,
  deleteInteraction,
};

export default postService;
