import { userRequest } from '@/redux/slice/adminSlice'
import { updateUser } from '@/redux/slice/userSlice'
import { DeleteOutlined } from '@ant-design/icons'
import { Alert, Button, Card, Col, Form, Input, Modal, Radio, Row, Space, notification } from 'antd'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileEdit from '../ProfileSettings'

function AccountSecurity() {
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { meData } = useSelector((state) => state.users)
  const [openDel, setOpenDel] = useState(false)

  const onFinish = (value) => {
    dispatch(
      updateUser({
        id: meData._id,
        body: {
          ...value,
        },
      }),
    )
    notification.success({ message: 'Thông báo', description: 'Cập nhật thành công!' })
  }
  const del = [
    'Tôi không muốn sử dụng mạng xã hội này nữa!',
    'Tôi không có thời gian sử dụng mạng xã hội!',
    'Tôi muốn tạo tài khoản khác!',
    'Tôi cảm thấy không an toàn!',
    'Lý do khác...',
  ]
  return (
    <ProfileEdit>
      <Space direction='vertical' className='d-flex'>
        <h2>Bảo mật và đăng nhập</h2>
        <Card size='small' title='Đổi mật khẩu'>
          <Form form={form} onFinish={onFinish} layout='vertical' size='large'>
            <Row gutter={12}>
              <Col span={24} md={8}>
                <Form.Item
                  label='Mật khẩu cũ'
                  name='oldPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu cũ!',
                    },
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập mật khẩu mới' />
                </Form.Item>
              </Col>
              <Col span={24} md={8}>
                <Form.Item
                  label='Mật khẩu mới'
                  name='newPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập mật khẩu mới!',
                    },
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập mật khẩu mới' />
                </Form.Item>
              </Col>
              <Col span={24} md={8}>
                <Form.Item
                  label='Nhập lại mật khẩu mới'
                  name='reNewPassword'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập lại mật khẩu mới!',
                    },
                  ]}
                >
                  <Input.Password size='large' placeholder='Nhập lại mật khẩu mới' />
                </Form.Item>
              </Col>
            </Row>
            <Button onClick={() => form.submit()} type='primary'>
              Đổi mật khẩu
            </Button>
          </Form>
        </Card>
        <Card size='small' title='Yêu cầu xóa tài khoản' style={{ marginTop: 30 }}>
          <Space size='large' direction='vertical' className='d-flex'>
            <Alert
              message='CẢNH BÁO: Hành động này sẽ gửi yêu cầu xóa tài khoản của bạn cho quản trị viên và sẽ được sét duyệt trong vòng 7 ngày.'
              type='warning'
              showIcon
            />
            <Button size='large' danger icon={<DeleteOutlined />} type='primary' onClick={() => setOpenDel(true)}>
              Xóa tài khoản
            </Button>
          </Space>
        </Card>
        <Modal title='Gửi yêu cầu xóa tài khoản' open={openDel} onCancel={() => setOpenDel(false)} footer={null}>
          <Form
            onFinish={(value) => {
              const dataSend = {
                userId: meData._id,
                reason: value.reason,
                password: value.password,
              }
              dispatch(userRequest(dataSend))
            }}
            size='large'
            layout='vertical'
          >
            <Form.Item
              name='reason'
              label='Lý do xóa tài khoản'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn 1 nội dung!',
                },
              ]}
            >
              <Radio.Group
                options={del.map((i) => {
                  return { label: i, value: i }
                })}
              ></Radio.Group>
            </Form.Item>
            <Form.Item
              name='password'
              label='Mật khẩu'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu!',
                },
              ]}
            >
              <Input.Password placeholder='Nhập mật khẩu'></Input.Password>
            </Form.Item>
            <Form.Item>
              <Space>
                <Button onClick={() => setOpenDel(false)}>Hủy</Button>
                <Button type='primary' danger onClick={() => setOpenDel(false)} htmlType='submit'>
                  Gửi yêu cầu
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </Modal>
      </Space>
    </ProfileEdit>
  )
}

export default AccountSecurity
