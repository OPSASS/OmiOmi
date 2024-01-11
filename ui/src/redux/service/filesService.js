import axios from 'axios'

const API_URL = 'http://localhost:3001/'

const uploadFile = async (data, userId) => {
  const formData = new FormData()
  formData.append('type', data.type)
  formData.append('userId', userId)
  if (data.targetId) formData.append('targetId', data.targetId)
  if (data.desc) formData.append('desc', data.desc)
  if (data.data.length > 0) {
    data.data.forEach((item) => {
      formData.append('files', item)
    })
  } else formData.append('files', data.data)

  const res = await axios.post(API_URL + 'upload/' + data.type, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data
}

const getFile = async (id) => {
  const res = await axios.get(API_URL + 'upload/' + id)
  return res.data
}

const getFileByUs = async (id) => {
  const res = await axios.get(API_URL + 'upload/user/' + id)
  return res.data
}

const deleteFile = async (id) => {
  const res = await axios.delete(API_URL + 'upload/delete/' + id)
  return res.data
}
const filesService = {
  uploadFile,
  getFile,
  getFileByUs,
  deleteFile,
}

export default filesService
