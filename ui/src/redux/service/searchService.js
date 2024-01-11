import axios from 'axios'

const API_URL = 'http://localhost:3001/'
const searchKey = async (key) => {
  const res = await axios.get(API_URL + `search/${key}`)
  return res.data
}
const searchOptions = async (data) => {
  const res = await axios.post(API_URL + `search/${data.key}`, data.body)
  return res.data
}

const searchService = {
  searchKey,
  searchOptions,
}

export default searchService
