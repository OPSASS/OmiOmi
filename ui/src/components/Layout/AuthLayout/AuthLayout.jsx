import Logo from '@/components/Logo/logo'
import { Col, Row, Space } from 'antd'
import { Link } from 'react-router-dom'
import './AuthLayout.scss'

function AuthLayout({ children, imgBg }) {
  return (
    <Row className='layoutAuth'>
      <Col className='leftAuth' span={24} md={15}>
        <div className='d-space-c navAuth'>
          <Logo to='/welcome' />

          <Space size='large'>
            <Link to='/welcome'>Giới thiệu</Link>

            <Link to='/standard'>Tiêu chuẩn cộng đồng</Link>

            <Link to='/support#Policy_Reporting'>Chính sách bảo mật</Link>

            <Link to='/support'>Hỗ trợ</Link>
          </Space>
        </div>
        <div className='auth-img d-col-c'>
          <img src={imgBg} alt='img' />
        </div>
      </Col>

      <Col span={24} md={9} className='headerAuth'>
        {children}
      </Col>
    </Row>
  )
}

export default AuthLayout
