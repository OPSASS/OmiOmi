import Logo from '@/components/Logo/logo'
import { Button, Row, Space } from 'antd'
import Scrollbars from 'react-custom-scrollbars-2'
import { Link } from 'react-router-dom'
import Bottom from '../Bottom/bottom'
import './LayoutPublic.scss'

function LayoutPublic({ children, onScroll }) {
  return (
    <Scrollbars autoHide autoHideTimeout={1000} style={{ height: '100vh' }} onScroll={onScroll}>
      <div className='pl-layout'>
        <div className='pl-nav '>
          <div className='container'>
            <Row justify='space-between'>
              <Logo type='hover' to='/welcome' />
              <div className='d-space-c'>
                <Space size='large'>
                  <Link to='/welcome'>Giới thiệu</Link>

                  <Link to='/standard'>Tiêu chuẩn cộng đồng</Link>

                  <Link to='/support#Policy_Reporting'>Chính sách bảo mật</Link>

                  <Link to='/support'>Hỗ trợ</Link>
                  <Link to='/login'>
                    <Button size='large'>Đăng nhập</Button>
                  </Link>
                </Space>
              </div>
            </Row>
          </div>
        </div>

        <div className='pl-header'>{children}</div>

        <Bottom />
      </div>
    </Scrollbars>
  )
}

export default LayoutPublic
