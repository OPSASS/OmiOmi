import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// ===============Noticications===============
// post Noticications
const createNotifications = async (data) => {
  const res = await axios.post(API_URL + 'notifications', data)
  return res.data
}

const putNotifications = async (data) => {
  const res = await axios.put(API_URL + `notifications/${data.id}`, data.body)
  return res.data
}
// get a Noticications
const getNotificationsByUser = async (meId) => {
  const res = await axios.get(API_URL + `notifications/user/${meId}`)
  return res.data
}

const findNotifications = async (filter) => {
  const res = await axios.post(API_URL + 'notifications/find', filter)
  return res.data
}

// delete Notifications
const deleteNotifications = async (id) => {
  const res = await axios.delete(API_URL + `notifications/${id}`)
  return res.data
}

const NoticicationsService = {
  createNotifications,
  putNotifications,
  findNotifications,
  getNotificationsByUser,
  deleteNotifications,
}

export default NoticicationsService
