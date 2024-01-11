import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// upload relationships
const createRelationships = async (data) => {
  const res = await axios.post(API_URL + 'relationships', data)
  return res.data
}

// get a relationships
const getRelationshipsDetail = async (id) => {
  const res = await axios.get(API_URL + `relationships/${id}`)
  return res.data
}

// get all posts
const findRelationships = async (filter) => {
  const res = await axios.post(API_URL + `relationships/find`, filter)
  return res.data
}

// edit Relationships
const updateRelationships = async (data, meId) => {
  const newBody = { ...data.body, meId }
  const res = await axios.put(API_URL + `relationships/${data.id}`, newBody)
  return res.data
}

const deleteRelationships = async (id) => {
  const res = await axios.delete(API_URL + `relationships/${id}`)
  return res.data
}

const postService = {
  createRelationships,
  getRelationshipsDetail,
  findRelationships,
  updateRelationships,
  deleteRelationships,
}

export default postService
