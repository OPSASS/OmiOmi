import svg from '@/assets'

import { Button, Card, Col, Row } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useParams } from 'react-router-dom'

import { MdOutlineGppMaybe, MdOutlineManageAccounts } from 'react-icons/md'
import './styles.scss'
const ProfileEdit = ({ children }) => {
  const dispatch = useDispatch()

  const { userId } = useParams()

  const { meData, error, message } = useSelector((state) => state.users)

  return (
    <div style={{ margin: 24 }}>
      {userId === meData?._id ? (
        <Row className='edit-profile' gutter={24}>
          <Col span={6} className='sidebar-edit'>
            <Card>
              <NavLink
                to={`/profile/${meData?._id}/settings`}
                className={({ isActive }) =>
                  isActive ? 'active d-space-cl content-edit bo' : 'd-space-cl content-edit bo'
                }
                end
              >
                <MdOutlineManageAccounts />
                <h4 className='ml5'>Cài đặt thông tin tài khoản</h4>
              </NavLink>
              <NavLink
                to={`/profile/${meData?._id}/security`}
                className={({ isActive }) =>
                  isActive ? 'active d-space-cl content-edit bo' : 'd-space-cl content-edit bo'
                }
                end
              >
                <MdOutlineGppMaybe />
                <h4 className='ml5'>Bảo mật và đăng nhập</h4>
              </NavLink>
              {/* <NavLink
                to={`/profile/${meData?._id}/public`}
                className={({ isActive }) =>
                  isActive ? 'active d-space-cl content-edit bo' : 'd-space-cl content-edit bo'
                }
                end
              >
                <MdOutlinePublic />
                <h4 className='ml5'>Quyền riêng tư</h4>
              </NavLink>
              <NavLink
                to={`/profile/${meData?._id}/suppotsent`}
                className={({ isActive }) =>
                  isActive ? 'active d-space-cl content-edit bo' : 'd-space-cl content-edit bo'
                }
                end
              >
                <MdOutlineContactSupport />
                <h4 className='ml5'>Thông tin hỗ trợ</h4>
              </NavLink> */}
            </Card>
          </Col>
          <Col span={18} className='main-edit'>
            <Card> {children}</Card>
          </Col>
        </Row>
      ) : (
        <div className='d-col-c'>
          <img src={svg.stop} style={{ width: 450, marginTop: 75 }} alt='stop' />
          <h2 className='m15'>Bạn không có quyền truy cập vào trang này!</h2>
          <Link to='/'>
            <Button type='primary' size='large'>
              Trở về trang chủ
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default ProfileEdit
