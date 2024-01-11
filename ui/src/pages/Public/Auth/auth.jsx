import svg from '@/assets'
import { useDispatch, useSelector } from 'react-redux'
import './auth.scss'

import { Button, Checkbox, Col, DatePicker, Form, Input, Radio, Row, Space, notification } from 'antd'
import { useEffect, useState } from 'react'

import AuthLayout from '@/components/Layout/AuthLayout/AuthLayout'
import { login, register, resetAuth, resetPassword } from '@/redux/slice/authSlice'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'

function Auth() {
  const location = useLocation()

  const dispatch = useDispatch()
  const { loading, success, error, message } = useSelector((state) => state.auth)
  const [form] = Form.useForm()
  const [action, setAction] = useState(false)
  const loginPath = location.pathname === '/login'
  const regitPath = location.pathname === '/register'
  const forgotPath = location.pathname === '/forgot-password'
  window.document.title = `${(loginPath && 'Đăng nhập') || (regitPath && 'Đăng ký') || (forgotPath && 'Quên mật khẩu')}
   - OmiOmi`

  useEffect(() => {
    if (error && !loading && !success && action) {
      notification.error({ message: 'Thông báo', description: message || 'Tên đăng nhập đã được sử dụng' })
      setAction(false)
    }

    if (success && !loading && action) {
      if (regitPath) {
        notification.success({ message: 'Thông báo', description: 'Đăng ký thành công' })
        form.resetFields()
      }
      if (forgotPath) {
        notification.success({ message: 'Thông báo', description: 'Đổi mật khẩu thành công!' })
        form.resetFields()
      }
      dispatch(resetAuth())
      setAction(false)
    }
  }, [success, error, message, loading, location, action])

  const [code, setCode] = useState('')

  useEffect(() => {
    setCode(Math.floor(100000 + Math.random() * 900000))
  }, [])

  const onFinish = (value) => {
    setAction(true)
    if (loginPath) {
      dispatch(login(value))
    }
    if (regitPath) {
      if (value.password !== value.passwordConfirm) {
        notification.error({ message: 'Thông báo', description: 'Mật khẩu không hợp lệ!' })
      }

      const payload = {
        ...value,
        fullname: `${value?.firstName} ${value?.lastName}`,
      }
      dispatch(register(payload))

      return
    } else if (forgotPath) {
      if (value.acceptCode !== `${code}`) {
        notification.error({ message: 'Thông báo', description: 'Mã xác thực không hợp lệ!' })
      } else {
        const data = {
          email: value.email,
          password: value.password,
        }
        dispatch(resetPassword(data))
        dispatch(register(data))
      }
      return
    }
    dispatch(resetAuth())
  }
  console.log(code)
  return (
    <AuthLayout imgBg={(loginPath && svg.login) || (regitPath && svg.register) || svg.resresetpass}>
      <div className='authMain'>
        <div className='authTitle'>
          <h1>{(loginPath && 'WELCOME') || (regitPath && 'Đăng ký') || 'Cấp lại mật khẩu'}</h1>
          {(loginPath && <p>Vui lòng đăng nhập</p>) ||
            (regitPath && <p>Vui lòng nhập đầy đủ thông tin để đăng ký</p>) || (
              <p>Vui lòng nhập email và mã xác thực để đổi mật khẩu</p>
            )}
        </div>

        <div className='formRegis'>
          <Form
            form={form}
            name='basic'
            initialValues={{
              remember: true,
              gender: 'men',
            }}
            onFinish={onFinish}
            autoComplete='off'
            layout='vertical'
          >
            {(regitPath && (
              <>
                <Row gutter={12}>
                  <Col span={16}>
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
                </Row>
                <Row gutter={12}>
                  <Col span={11}>
                    <Form.Item
                      label='Tên đăng nhập'
                      name='username'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập tên đăng nhập!',
                        },
                      ]}
                    >
                      <Input size='large' placeholder='Nhập tên đăng nhập' />
                    </Form.Item>
                  </Col>
                  <Col span={13}>
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
                </Row>
                <Row gutter={12}>
                  <Col span={12}>
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
                  <Col span={12}>
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
                </Row>
                <Row gutter={12}>
                  <Col span={12}>
                    <Form.Item
                      label='Mật khẩu'
                      name='password'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu!',
                        },
                      ]}
                    >
                      <Input.Password placeholder='Nhập mật khẩu' size='large' />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label='Xác nhận mật khẩu'
                      name='passwordConfirm'
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập mật khẩu xác nhận!',
                        },
                      ]}
                    >
                      <Input.Password placeholder='Nhập lại mật khẩu' size='large' />
                    </Form.Item>
                  </Col>
                </Row>

                <Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>Tôi đồng ý với điều khoản dịch vụ và bảo mật</Checkbox>
                </Form.Item>
              </>
            )) ||
              (location.pathname === '/login' && (
                <div style={{ marginTop: 80 }}>
                  <Form.Item
                    name='username'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập tên đăng nhập!',
                      },
                    ]}
                  >
                    <Input prefix={<UserOutlined />} size='large' placeholder='Nhập tên đăng nhập' />
                  </Form.Item>
                  <Form.Item
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu!',
                      },
                    ]}
                  >
                    <Input.Password prefix={<LockOutlined />} size='large' placeholder='Nhập mật khẩu' />
                  </Form.Item>
                  <div className='d-space-c'>
                    <Form.Item name='remember' noStyle>
                      <Checkbox>Ghi nhớ mật khẩu</Checkbox>
                    </Form.Item>

                    <Link to='/forgot-password'>Quên mật khẩu</Link>
                  </div>
                </div>
              )) || (
                <>
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
                  <Form.Item label='Mã xác thực' extra='Mã xác thực được gửi tới email của bạn'>
                    <Space.Compact className='sp100'>
                      <Form.Item
                        name='acceptCode'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập mã xác thực!',
                          },
                        ]}
                      >
                        <Input placeholder='xxxxxx' size='large' className='sp100' />
                      </Form.Item>

                      <Button size='large'>Nhận mã</Button>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item
                    label='Mật khẩu mới'
                    name='password'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập mật khẩu mới!',
                      },
                    ]}
                  >
                    <Input.Password size='large' placeholder='Nhập mật khẩu mới' />
                  </Form.Item>
                </>
              )}
            <Form.Item className='d-col-c'>
              <Button type='primary' htmlType='submit' size='large' style={{ marginTop: 30 }}>
                {(location.pathname === '/login' && 'Đăng nhập') || (regitPath && 'Đăng ký') || 'Đổi mật khẩu'}
              </Button>
            </Form.Item>
          </Form>
          <Space className='d-col-c' size='large'>
            <p>Bạn {regitPath ? 'đã' : 'chưa'} có tài khoản?</p>
            <Link to={(location.pathname === '/login' && '/register') || (regitPath && '/login') || '/register'}>
              <Button size='large'>{(regitPath && 'Đăng nhập ngay') || 'Đăng ký'}</Button>
            </Link>
          </Space>
        </div>
      </div>
    </AuthLayout>
  )
}

export default Auth
