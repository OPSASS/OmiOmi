import axios from 'axios'

const API_URL = 'http://localhost:3001/auth/'

// register
const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData)
  return res.data
}

// login
const login = async (userData) => {
  const res = await axios.post(API_URL + 'login', userData)
  if (res.data) {
    localStorage.setItem('profile', JSON.stringify(res.data))
  }
  return res.data
}

// logout
const logout = () => {
  localStorage.removeItem('profile')
  window.location.reload()
}

const searchAcc = async (data) => {
  const res = await axios.post(API_URL + 'reset/search', data)
  return res.data
}

const resetPassword = async (data) => {
  const res = await axios.post(API_URL + 'reset', data)
  return res.data
}

const changePassword = async (id, data) => {
  const res = await axios.post(API_URL + `user/${id}/reset`, data)
  return res.data
}

const authService = {
  register,
  login,
  logout,
  searchAcc,
  resetPassword,
  changePassword,
}

export default authService
