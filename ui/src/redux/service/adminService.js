import axios from 'axios'

const API_URL = 'http://localhost:3001/admin/'

// ===============Chat===============
// get new user
const getDashboardData = async () => {
  const res = await axios.get(API_URL + 'dashboard')
  return res.data
}

const resetPass = async (id, data) => {
  const res = await axios.put(API_URL + `user/${id}/resetpass`, data)
  return res.data
}

const getFeedback = async (filter) => {
  const res = await axios.post(API_URL + 'feedback/find', filter)
  return res.data
}

const deleteFeedback = async (id) => {
  const res = await axios.delete(API_URL + `feedback/${id}/delete`, id)
  return res.data
}

const userRepost = async (data) => {
  const res = await axios.post(API_URL + 'user/repost', data)
  return res.data
}

const userFeedback = async (data) => {
  const res = await axios.post(API_URL + 'user/feedback', data)
  return res.data
}

const getRequest = async (filter) => {
  const res = await axios.post(API_URL + 'request/find', filter)
  return res.data
}

const userRequest = async (data) => {
  const res = await axios.post(API_URL + 'user/request', data)
  return res.data
}

const deleteRequest = async (id) => {
  const res = await axios.delete(API_URL + `request/${id}/delete`, id)
  return res.data
}

const postRepost = async (data) => {
  const res = await axios.post(API_URL + 'post/repost', data)
  return res.data
}

const getRepost = async (filter) => {
  const res = await axios.post(API_URL + 'repost/find', filter)
  return res.data
}

const deleteRepost = async (id) => {
  const res = await axios.delete(API_URL + `repost/${id}/delete`, id)
  return res.data
}

const deleteUser = async (id) => {
  const res = await axios.delete(API_URL + `user/${id}/delete`, id)
  return res.data
}

const system = async (filter) => {
  const res = await axios.post(API_URL + 'system/find', filter)
  return res.data
}

const systemOn = async () => {
  const res = await axios.post(API_URL + 'system/on')
  return res.data
}

const systemOff = async () => {
  const res = await axios.post(API_URL + 'system/off')
  return res.data
}

const addAdmin = async (id) => {
  const res = await axios.put(API_URL + `add/${id}`)
  return res.data
}

const deleAdmin = async (id) => {
  const res = await axios.put(API_URL + `dele/${id}`)
  return res.data
}

const getVisit = async (filter) => {
  const res = await axios.post(API_URL + 'visit/find', filter)
  return res.data
}
const sendVisit = async (data) => {
  const res = await axios.post(API_URL + 'visit', data)
  return res.data
}

const adminService = {
  getDashboardData,
  resetPass,
  deleteFeedback,
  userRepost,
  userFeedback,
  userRequest,
  deleteRequest,
  postRepost,
  getFeedback,
  getRepost,
  deleteRepost,
  getRequest,
  deleteUser,
  system,
  systemOn,
  systemOff,
  addAdmin,
  deleAdmin,
  getVisit,
  sendVisit,
}

export default adminService
