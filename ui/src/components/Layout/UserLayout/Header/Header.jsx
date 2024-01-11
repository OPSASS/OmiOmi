import { Col, Row } from 'antd'
import Scrollbars from 'react-custom-scrollbars-2'
import RightBar from '../RightBar/RightBar'
import './Header.scss'

export default function Header({ children, locaton }) {
  return (
    <Scrollbars autoHide autoHideTimeout={1000} className='header-main'>
      <Row justify='space-between'>
        <Col className='header-body' span={24} md={locaton.pathname === '/' ? 15 : 24}>
          {children}
        </Col>
        {locaton.pathname === '/' && (
          <Col span={24} md={9}>
            <RightBar />
          </Col>
        )}
      </Row>
    </Scrollbars>
  )
}
