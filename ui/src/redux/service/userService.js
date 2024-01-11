import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// edit user
const editUser = async (id, data) => {
  const res = await axios.put(API_URL + `user/${id}`, data)
  return res.data
}

// get user
const getUserByNickName = async (id) => {
  const res = await axios.get(API_URL + `user/${id}/nickname`)
  return res.data
}

// get a user
const getUserDetail = async (id) => {
  const res = await axios.get(API_URL + `user/${id}`)
  return res.data
}

const updateUser = async (data) => {
  const res = await axios.put(API_URL + `user/${data.id}`, data.body)
  return res.data
}

// get all users
const findUser = async (filter) => {
  const res = await axios.post(API_URL + `user/find`, filter)
  return res.data
}

const getMeData = async (meId) => {
  const res = await axios.get(API_URL + 'user/' + meId)
  return res.data
}

const userService = {
  editUser,
  updateUser,
  getUserByNickName,
  getUserDetail,
  findUser,
  getMeData,
}

export default userService
