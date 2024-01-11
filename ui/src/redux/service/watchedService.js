import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// create watched
const createWatched = async (targetId, body) => {
  const res = await axios.post(API_URL + `watched/${targetId}`, body)
  return res.data
}

const updateWatched = async (id) => {
  const res = await axios.post(API_URL + `watched/${id}/update`)
  return res.data
}

const getWatched = async (meId) => {
  const res = await axios.get(API_URL + `watched/${meId}`)
  return res.data
}

const watchedService = {
  createWatched,
  updateWatched,
  getWatched,
}

export default watchedService
