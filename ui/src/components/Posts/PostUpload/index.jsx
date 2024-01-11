import TextAreaForm from '@/components/TextAreaForm'
import { createPost, resetPostAction, updatePost } from '@/redux/slice/postSlice'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Col, Form, Image, Modal, Row, Space, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'

export const PostUpload = ({ data, isOpen, type, setOpen }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { loadingDetail, successDetail, errorDetail, messageDetail } = useSelector((state) => state.posts)
  const { meData } = useSelector((state) => state.users)

  const POST = import.meta.env.VITE_IMAGES_FOLDER

  const [filePreview, setFilePreview] = useState([])

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data)
      const prvArr = data.images.map((i) => {
        return { uid: i, url: i }
      })
      setFilePreview(prvArr)
    }
  }, [data])

  const handleCancel = () => {
    form.resetFields()
    setFilePreview([])
    setOpen(false)
    dispatch(resetPostAction())
  }

  useEffect(() => {
    if (successDetail && type) {
      handleCancel()
    }

    if (errorDetail && type) {
      notification.error({ message: 'Thông báo', description: messageDetail })
    }
  }, [successDetail, errorDetail])

  const handleSubmit = (value) => {
    if (filePreview.length > 0) {
      const newPost = {
        desc: value.desc,
        userId: meData._id,
        images: filePreview ? filePreview.map((i) => i.url) : data?.images,
      }

      dispatch(type === 'update' ? updatePost({ id: data._id, body: newPost }) : createPost(newPost))
    } else {
      const newPost = {
        desc: value.desc,
        userId: meData._id,
      }
      dispatch(type === 'update' ? updatePost({ id: data._id, body: newPost }) : createPost(newPost))
    }
    notification.success({
      message: 'Thông báo',
      description: `${type === 'update' ? 'Cập nhật' : 'Đăng tin'} thành công!`,
    })
  }

  return (
    <Modal
      open={isOpen}
      title={`${data ? 'Cập nhật' : 'Thêm mới'} bài viết`}
      onCancel={handleCancel}
      footer={
        <Space>
          <Button onClick={handleCancel} loading={loadingDetail}>
            Hủy
          </Button>
          <Button type='primary' onClick={() => form.submit()} loading={loadingDetail}>
            {data ? 'Cập nhật' : 'Thêm mới'}
          </Button>
        </Space>
      }
    >
      <Form form={form} onFinish={handleSubmit}>
        <TextAreaForm
          form={form}
          name='desc'
          typeUpload='posts'
          placeholder='Hôm nay có gì mới...'
          minRows={5}
          maxRows={8}
          uploadImg
          showButtonSend={false}
          showPreview={false}
          previews={filePreview}
          callbackPreviews={(e) => setFilePreview(e)}
        />

        <Row gutter={[5, 5]} justify='space-between' className='uploadPreview'>
          {filePreview.slice(0, 5).map((item) => (
            <Col
              span={
                24 / filePreview.length >= 8
                  ? filePreview.length === 1
                    ? 12
                    : (24 / filePreview.length).toFixed(0)
                  : 8
              }
              key={item.uid}
              className='imgPreview'
            >
              <Button
                icon={<DeleteOutlined />}
                type='primary'
                danger
                shape='circle'
                size='small'
                onClick={() => setFilePreview((prev) => prev.filter((file) => item.uid !== file.uid))}
                className='imgButtRm'
              />
              <Image.PreviewGroup
                key={item.img}
                items={filePreview.map((image) => {
                  return POST + image.url
                })}
              >
                <Image src={POST + item.url} style={{ maxHeight: 250, objectFit: 'cover' }} width={'100%'} />
              </Image.PreviewGroup>
            </Col>
          ))}
          {filePreview.length > 5 && (
            <Col span={8}>
              <Image.PreviewGroup
                items={filePreview.map((image) => {
                  return POST + image.url
                })}
              >
                <div className='uploadImgPrev'>
                  <Image
                    src={POST + filePreview[5].url}
                    style={{ maxHeight: 250, objectFit: 'cover' }}
                    width={'100%'}
                  />
                  {filePreview.length > 6 && (
                    <div className='showImg'>
                      <h3>+ {filePreview.length - 6}</h3>
                      <div className='bgImg' />
                    </div>
                  )}
                </div>
              </Image.PreviewGroup>
            </Col>
          )}
        </Row>
      </Form>
    </Modal>
  )
}
