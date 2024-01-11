import axios from 'axios'

const API_URL = 'http://localhost:3001/'

// upload post
const createPost = async (data) => {
  const res = await axios.post(API_URL + 'post', data)
  return res.data
}

// get a posts
const getPostDetail = async (id) => {
  const res = await axios.get(API_URL + `post/${id}`)
  return res.data
}

// get all posts
const findPost = async (filter) => {
  const res = await axios.post(API_URL + `post/find`, filter)
  return res.data
}

// edit post
const updatePost = async (data) => {
  const res = await axios.put(API_URL + `post/${data.id}`, data.body)
  return res.data
}

// delete post
const deletePost = async (id) => {
  const res = await axios.delete(API_URL + `post/${id}`)
  return res.data
}

const postService = {
  createPost,
  getPostDetail,
  findPost,
  updatePost,
  deletePost,
}

export default postService
