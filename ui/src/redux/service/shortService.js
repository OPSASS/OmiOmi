import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// upload post
const createShorts = async (data) => {
  const res = await axios.post(API_URL + `shorts`, data)
  return res.data
}

// get all posts
const findShorts = async (filter) => {
  const res = await axios.post(API_URL + 'shorts/find', filter)
  return res.data
}

// get a post
const getShortDetail = async (id) => {
  const res = await axios.get(API_URL + `shorts/${id}`)
  return res.data
}

// edit post
const updateShorts = async (data) => {
  const res = await axios.put(API_URL + `shorts/${data.id}`, data.body)
  return res.data
}

// delete post
const deleteShort = async (id) => {
  const res = await axios.delete(API_URL + `shorts/${id}`)
  return res.data
}

const shortsService = {
  createShorts,
  findShorts,
  getShortDetail,
  updateShorts,
  deleteShort,
}

export default shortsService
