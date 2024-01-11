import { uploadFile } from '@/redux/slice/filesSlice'

import { createShorts, resetShortAction, updateShorts } from '@/redux/slice/shortSlice'
import { DeleteOutlined } from '@ant-design/icons'
import { Button, Form, Input, Modal, Space, Upload, notification } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './style.scss'

export const ShortUpload = ({ data, isOpen, type, setOpen }) => {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { loadingDetail, successDetail, errorDetail, messageDetail } = useSelector((state) => state.shorts)
  const { file, successDetail: success } = useSelector((state) => state.files)
  const { meData } = useSelector((state) => state.users)

  const SHORT = import.meta.env.VITE_BASE_URL

  const [fileList, setFileList] = useState([])
  const [filePreview, setFilePreview] = useState([])

  const handleCancel = () => {
    form.resetFields()
    setFileList([])
    setFilePreview([])
    setOpen(false)
    dispatch(resetShortAction())
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
      const newShort = {
        desc: value.desc,
        userId: meData._id,
        files: filePreview ? [filePreview?.[0]?.url] : data?.files,
      }

      dispatch(type === 'update' ? updateShorts({ id: data._id, body: newShort }) : createShorts(newShort))
    }

    notification.success({
      message: 'Thông báo',
      description: `${type === 'update' ? 'Cập nhật' : 'Đăng khoảnh khắc'} thành công!`,
    })
  }

  const beforeUpload = (_, files) => {
    if (files) {
      setFileList(files)
    }
  }

  useEffect(() => {
    if (fileList.length > 0 && fileList[0]?.type) {
      dispatch(uploadFile({ type: 'shorts', data: fileList }))
    }
  }, [fileList])

  useEffect(() => {
    if (file && success) {
      const prvArr = file.map((i) => {
        return { uid: i, url: i }
      })
      setFilePreview(prvArr)
    }
  }, [file, success])

  useEffect(() => {
    if (data) {
      form.setFieldsValue({ desc: data.desc })
      const fileData = data?.files?.map((item) => {
        return { uid: item, url: item }
      })
      setFilePreview(fileData)
    }
  }, [data])

  return (
    <Modal
      open={isOpen}
      title={`${data ? 'Cập nhật' : 'Thêm mới'} khoảnh khắc`}
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
        <Space direction='vertical' className='d-flex'>
          <Upload showUploadList={false} accept='video/*' beforeUpload={beforeUpload} maxCount={1}>
            <Button>Thêm video</Button>
          </Upload>
          <div className='uploadPreview'>
            {filePreview.length > 0 && (
              <div className='imgPreview'>
                <Button
                  icon={<DeleteOutlined />}
                  type='primary'
                  danger
                  shape='circle'
                  size='small'
                  onClick={() => setFilePreview((prev) => prev.filter((file) => filePreview[0].uid !== file.uid))}
                  className='imgButtRm'
                />

                <video className='bo' controls src={SHORT + filePreview[0].url} width={'100%'} />
              </div>
            )}
          </div>
          <Form.Item name='desc'>
            <Input.TextArea autoSize={{ minRows: 5 }} placeholder='Hôm nay bạn có khoảnh khắc gì...' />
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  )
}
