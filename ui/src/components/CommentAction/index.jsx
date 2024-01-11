import TextAreaForm from '@/components/TextAreaForm'
import { createComment, updateComment } from '@/redux/slice/commentSlice'
import { createNotifications } from '@/redux/slice/notificationsSlice'
import { Form, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const CommentAction = ({ type, data, userId, targetId, parentId, setOpenAction, reply }) => {
  const [form] = Form.useForm()
  const { meData } = useSelector((state) => state.users)
  const { loadingDetail, successDetail, errorDetail, messageDetail } = useSelector((state) => state.comments)
  const dispatch = useDispatch()
  const [filePreview, setFilePreview] = useState([])
  console.log(filePreview)
  const onFinish = (value) => {
    const newComment = {
      text: value.text,
      userId: meData._id,
      targetId,
      parentId,
      images: filePreview.length > 0 ? (filePreview ? filePreview.map((i) => i.url) : data?.images) : undefined,
    }
    dispatch(type === 'update' ? updateComment({ id: data._id, body: newComment }) : createComment(newComment))

    notification.success({
      message: 'Thông báo',
      description: `${type === 'update' ? 'Cập nhật bình luận' : 'Đăng  bình luận'} thành công!`,
    })

    const sendComment = {
      sendId: meData._id,
      userId: data?.userId ? data?.userId : userId,
      targetId: targetId,
      type: 'COMMENT',
      text: `Đã ${reply ? 'trả lời bình luận của bạn' : 'gửi bình luận tới bài viết'}!`,
    }
    dispatch(createNotifications(sendComment))

    setOpenAction && setOpenAction(false)
  }

  useEffect(() => {
    if (data?.text) form.setFieldsValue(data)
  }, [data])
  const handleCancel = () => {
    form.resetFields()
    setFilePreview([])
  }

  useEffect(() => {
    if (successDetail && type) {
      handleCancel()
    }

    if (errorDetail && type) {
      notification.error({ message: 'Thông báo', description: messageDetail })
    }
  }, [successDetail, errorDetail])

  return (
    <Form form={form} onFinish={onFinish}>
      <TextAreaForm
        form={form}
        name='text'
        typeUpload='comments'
        placeholder='Gửi bình luận của bạn...'
        sendText={type === 'update' ? 'Cập nhật' : 'Gửi'}
        sendButtonIcon={null}
        maxRows={5}
        uploadImg
        previews={filePreview}
        callbackPreviews={(e) => setFilePreview(e)}
      />
    </Form>
  )
}

export default CommentAction
