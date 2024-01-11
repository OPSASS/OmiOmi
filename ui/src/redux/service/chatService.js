import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// ===============Chat===============
// create chat
const createChat = async (data) => {
  const res = await axios.post(API_URL + 'chat', data)
  return res.data
}

const findChat = async (filter) => {
  const res = await axios.post(API_URL + 'chat/find', filter)
  return res.data
}

const updateChat = async (data) => {
  const res = await axios.put(API_URL + 'chat/' + data.id, data)
  return res.data
}

const removeChat = async (id) => {
  const res = await axios.delete(API_URL + 'chat/' + id)
  return res.data
}

// get chat member
const getChatDetail = async (chatId) => {
  const res = await axios.get(API_URL + `chat/${chatId}`)
  return res.data
}

const readAll = async (id, usId) => {
  const res = await axios.put(API_URL + `chat/readall/${id}`, usId)
  return res.data
}

const chatService = {
  createChat,
  findChat,
  updateChat,
  removeChat,
  getChatDetail,
  readAll,
}

export default chatService
