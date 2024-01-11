import { Button, Divider, Modal, Space, Tooltip } from 'antd'
import { useState } from 'react'
import { MdOutlineWhatshot, MdWhatshot } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { NavLink, useLocation } from 'react-router-dom'

import Logo from '@/components/Logo/logo'
import Notifications from '@/components/Notifications'
import { BellOutlined, HomeFilled, HomeOutlined, MessageFilled, MessageOutlined, UserOutlined } from '@ant-design/icons'
import ListSetting from '../../UserLayout/ListSetting/listSetting'
import './navPages.scss'

function NavPages() {
  const { user } = useSelector((state) => state.auth)

  const me = user.user

  const [open, setOpen] = useState(false)

  const handlePost = () => {
    setOpen(!open)
  }
  const location = useLocation()

  return (
    <nav className='nav-main d-col-c'>
      <Logo />
      <div>
        <Space direction='vertical' align='center'>
          <Tooltip title='Trang chủ'>
            <NavLink
              className='buttMenu'
              to='/'
              children={({ isActive }) =>
                isActive ? (
                  <Button icon={<HomeFilled className='iconActive' />} type='text' shape='circle' size='large'></Button>
                ) : (
                  <Button icon={<HomeOutlined className='icon' />} type='text' shape='circle' size='large'></Button>
                )
              }
            ></NavLink>
          </Tooltip>
          {location.pathname !== '/' && (
            <Notifications
              buttShow={
                <Tooltip title='Thông báo'>
                  <Button icon={<BellOutlined />} type='text' shape='circle' size='large'></Button>
                </Tooltip>
              }
            />
          )}
          <Tooltip title='Tin nhắn'>
            <NavLink
              className='buttMenu'
              to='/chat'
              children={({ isActive }) =>
                isActive ? (
                  <Button
                    icon={<MessageFilled className='iconActive' />}
                    type='text'
                    shape='circle'
                    size='large'
                  ></Button>
                ) : (
                  <Button icon={<MessageOutlined className='icon' />} type='text' shape='circle' size='large'></Button>
                )
              }
            ></NavLink>
          </Tooltip>

          <Tooltip title='Nguời dùng'>
            <NavLink
              className='buttMenu'
              to={'/profile/' + me?._id}
              children={({ isActive }) =>
                isActive ? (
                  <Button
                    icon={<UserOutlined className='iconActive' />}
                    type='text'
                    shape='circle'
                    size='large'
                  ></Button>
                ) : (
                  <Button icon={<UserOutlined className='icon' />} type='text' shape='circle' size='large'></Button>
                )
              }
            ></NavLink>
          </Tooltip>

          <Tooltip title='Shorts'>
            <NavLink
              className='buttMenu'
              to='/shorts'
              children={({ isActive }) =>
                isActive ? (
                  <Button
                    icon={<MdWhatshot size={24} className='iconActive' />}
                    type='text'
                    shape='circle'
                    size='large'
                  ></Button>
                ) : (
                  <Button
                    icon={<MdOutlineWhatshot size={24} className='icon' />}
                    type='text'
                    shape='circle'
                    size='large'
                  ></Button>
                )
              }
            ></NavLink>
          </Tooltip>
        </Space>
        <Divider style={{ margin: '5px 0' }} />
        <ListSetting />
      </div>
      <Modal open={open} onClose={handlePost}>
        {/* <Upload /> */} new modal
      </Modal>
    </nav>
  )
}

export default NavPages
