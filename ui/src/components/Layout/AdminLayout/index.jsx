import BreadCrumbsDynamic from '@/components/BreadCrumbsDynamic'
import Logo from '@/components/Logo/logo'
import { getFeedback, system, systemOff, systemOn } from '@/redux/slice/adminSlice'
import { findPost } from '@/redux/slice/postSlice'
import { findUser } from '@/redux/slice/userSlice'
import { BellOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Divider, Flex, FloatButton, Layout, Modal, Space, Switch, notification } from 'antd'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { CgDanger } from 'react-icons/cg'
import { GrVmMaintenance } from 'react-icons/gr'
import { LiaUsersCogSolid } from 'react-icons/lia'
import { LuLayoutDashboard, LuShieldQuestion } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import './styles.scss'

const { Header, Content, Footer, Sider } = Layout

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  const { maintenance } = useSelector((state) => state.admin)
  const { meData } = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(system({ options: { limit: 1, sort: { createdAt: -1 } } }))
    dispatch(findUser())
    dispatch(findPost())
    dispatch(getFeedback({ options: { sort: { createdAt: -1 } } }))
  }, [])

  const [onOff, setOnOff] = useState(false)
  const [openSystem, setOpenSystem] = useState(false)
  useEffect(() => {
    if (maintenance && maintenance.length > 0) {
      setOnOff(Boolean(maintenance[0].maintenance === 'true'))
    }
  }, [maintenance])

  const handleOnOff = () => {
    if (onOff) {
      dispatch(systemOn())
      notification.success({ message: 'Thông báo', description: 'Đã BẬT chế độ bảo trì' })
    } else {
      dispatch(systemOff())
      notification.success({ message: 'Thông báo', description: 'Đã TẮT chế độ bảo trì' })
    }
    setOpenSystem(false)
    dispatch(system({ options: { limit: 1, sort: { createdAt: -1 } } }))
  }
  return (
    <Layout className='admin-layout'>
      <Sider theme='light' className='admin-nav' width={250}>
        <div className='logo-ad'>
          <Logo to='/admin' />
          <b>Admin</b>
        </div>
        <Divider style={{ margin: 0 }} />

        <NavLink to='/admin' className={({ isActive }) => (isActive ? 'active tabAd' : 'tabAd')} end>
          <LuLayoutDashboard />
          <p>Dashboard</p>
        </NavLink>
        <NavLink to='/admin/users' className={({ isActive }) => (isActive ? 'active tabAd' : 'tabAd')} end>
          <UserOutlined />
          <p>Người dùng</p>
        </NavLink>
        <NavLink to='/admin/reposts' className={({ isActive }) => (isActive ? 'active tabAd' : 'tabAd')} end>
          <CgDanger />
          <p>Báo cáo</p>
        </NavLink>
        <NavLink to='/admin/requests' className={({ isActive }) => (isActive ? 'active tabAd' : 'tabAd')} end>
          <LuShieldQuestion />
          <p>Yêu cầu</p>
        </NavLink>
        <NavLink to='/admin/admin-users' className={({ isActive }) => (isActive ? 'active tabAd' : 'tabAd')} end>
          <LiaUsersCogSolid />
          <p>Đội ngũ</p>
        </NavLink>
      </Sider>
      <Layout>
        <Header
          style={{
            backgroundColor: 'var(--bgColor)',
            padding: '0 24px',
          }}
        >
          <Flex justify='flex-end'>
            <Space size='large'>
              <Button shape='circle' icon={<BellOutlined />} />
              <Space>
                <Avatar src={meData.avtPicture ? AVT + meData.avtPicture : noAvt} size={45} />
                <h4>{meData.fullname}</h4>
              </Space>
            </Space>
          </Flex>
        </Header>
        <Content>
          <Scrollbars autoHide autoHideTimeout={1000} style={{ height: 'calc(100vh - 64px)' }}>
            <div style={{ margin: '12px 0' }}>
              <FloatButton.Group style={{ bottom: 24 }}>
                <FloatButton icon={<HomeOutlined />} href='/' tooltip='Về trang chủ' />

                <FloatButton icon={<GrVmMaintenance />} tooltip='Chế độ bảo trì' onClick={() => setOpenSystem(true)} />
              </FloatButton.Group>
              <div style={{ margin: '0 24px' }}>
                <BreadCrumbsDynamic homeUrl='/admin' homeTitle='Trang quản trị' />
              </div>
              <div style={{ marginTop: 12 }}>{children}</div>
              <Modal
                title='Chế độ bảo trì'
                open={openSystem}
                onCancel={() => setOpenSystem(!openSystem)}
                onOk={handleOnOff}
              >
                <Space className='d-space-cl'>
                  <p>Chế độ hiện tại:</p> <h3 className='ml5'>{onOff ? 'Bật' : 'Tắt'}</h3>
                  <Switch checked={onOff} onChange={(e) => setOnOff(e)} />
                </Space>
              </Modal>
            </div>
            <Footer
              style={{
                textAlign: 'center',
              }}
            >
              Ant Design ©2023 Created by Ant UED
            </Footer>
          </Scrollbars>
        </Content>
      </Layout>
    </Layout>
  )
}

export default AdminLayout
