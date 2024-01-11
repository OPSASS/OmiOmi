import { updateUser } from '@/redux/slice/userSlice'
import { Button, Col, DatePicker, Form, Input, Radio, Row, Space, notification } from 'antd'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProfileEdit from '../ProfileSettings'

function AccountEdit() {
  const [form] = Form.useForm()

  const dispatch = useDispatch()
  const { meData } = useSelector((state) => state.users)

  const [edit, setEdit] = useState(true)

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

  useEffect(() => {
    if (meData._id) {
      form.setFieldsValue({
        firstName: meData.firstName,
        lastName: meData.lastName,
        email: meData.email,
        gender: meData.gender,
        infor: meData.infor,
        birthday: dayjs(meData.birthday),
      })
    }
  }, [meData])

  return (
    <ProfileEdit>
      <Space direction='vertical' className='d-flex'>
        <h2>Cài đặt tài khoản</h2>
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Row gutter={12}>
            <Col span={10}>
              <Form.Item
                label='Họ đệm'
                name='firstName'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập họ đệm!',
                  },
                ]}
              >
                <Input size='large' placeholder='Nhập họ đệm' />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label='Tên'
                name='lastName'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên!',
                  },
                ]}
              >
                <Input size='large' placeholder='Nhập tên' />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label='Giới tính'
                name='gender'
                rules={[
                  {
                    required: true,
                    message: 'Chọn giới tính!',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio value='male'>Nam</Radio>
                  <Radio value='famale'>Nữ</Radio>
                  <Radio value='other'>Khác</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập email!',
                  },
                ]}
              >
                <Input size='large' placeholder='Nhập email' />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label='Ngày sinh'
                name='birthday'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập ngày sinh!',
                  },
                ]}
              >
                <DatePicker placeholder='Chọn ngày sinh' size='large' format={'DD/MM/YYYY'} className='sp100' />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label='Giới thiệu' name='infor'>
                <Input.TextArea
                  placeholder='Nhập giới thiệu của bạn'
                  autoSize={{ minRows: 3, maxRows: 5 }}
                  maxLength={300}
                  showCount
                />
              </Form.Item>
            </Col>
          </Row>
          <Button onClick={() => form.submit()} type='primary'>
            Lưu
          </Button>
        </Form>
      </Space>
    </ProfileEdit>
  )
}

export default AccountEdit
