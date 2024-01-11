import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// create commnet
const createComment = async (data) => {
  const res = await axios.post(API_URL + 'comment', data)
  return res.data
}

const findComment = async (filter) => {
  const res = await axios.post(API_URL + `comment/find`, filter)
  return res.data
}

const updateComment = async (data) => {
  const res = await axios.put(API_URL + `comment/${data.id}`, data.body)
  return res.data
}

const deleteComment = async (id) => {
  const res = await axios.delete(API_URL + `comment/${id}`)
  return res.data
}

const commnetService = {
  createComment,
  findComment,
  updateComment,
  deleteComment,
}

export default commnetService
