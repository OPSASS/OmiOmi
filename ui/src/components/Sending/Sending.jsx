import { uploadFile } from '@/redux/slice/filesSlice'
import { createMessage } from '@/redux/slice/messageSlice'
import { useSocket } from '@/socket'
import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TextAreaForm from '../TextAreaForm'
import './styles.scss'

export default function Sending({ type, userId, chatId }) {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { message, loadingDetail, successDetail } = useSelector((state) => state.messages)
  const { file, successDetail: success } = useSelector((state) => state.files)
  const socket = useSocket()
  const [types, setTypes] = useState('')

  useEffect(() => {
    if (socket && message && successDetail && type === 'chats') {
      socket.emit('send-message', message)
    }
  }, [message, socket])

  const [fileList, setFileList] = useState([])

  useEffect(() => {
    if (fileList.length > 0 && fileList[0]?.type) {
      dispatch(uploadFile({ type: 'chats', data: fileList }))
    }
  }, [fileList])

  const handleFinish = (value) => {
    if (value.content) {
      const msg = {
        chatId,
        userId,
        text: value.content,
      }

      dispatch(createMessage(msg))
    } else if (file.length > 0) {
      const msg = {
        chatId,
        userId,
        text: value.content ? value.content : types === 'images' ? 'Đã gửi ảnh' : 'Đã gửi 1 tệp đính kèm',
        files: file,
        type: types === 'images' ? 'images' : 'files',
      }

      dispatch(createMessage(msg))
    }
    setTimeout(() => {
      form.resetFields()
    }, 200)
    setFileList([])
  }

  return (
    <Form onFinish={handleFinish} form={form}>
      <TextAreaForm
        name='content'
        typeUpload='chats'
        maxRows={4}
        form={form}
        uploadImg
        uploadFiles
        maxCountImg={12}
        callbackTypes={(e) => setTypes(e)}
      />
    </Form>
  )
}
