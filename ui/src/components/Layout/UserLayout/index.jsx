import { PostUpload } from '@/components/Posts/PostUpload'
import { DashboardOutlined, PlusOutlined } from '@ant-design/icons'
import { FloatButton } from 'antd'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import NavPages from '../Nav/NavPages/navPages'
import Header from './Header/Header'
const Layout = ({ children, title }) => {
  document.title = title + ' - OmiOmi'
  const { meData } = useSelector((state) => state.users)
  const locaton = useLocation()
  const [createOpen, setCreateOpen] = useState(false)
  return (
    <div className='layout'>
      <FloatButton.Group style={{ bottom: 24 }}>
        {meData?.isAdmin ? <FloatButton icon={<DashboardOutlined />} href='/admin' tooltip='Trang quản trị' /> : null}
        {locaton.pathname !== '/' && (
          <FloatButton
            icon={<PlusOutlined />}
            style={{ height: 50, width: 50 }}
            type='primary'
            tooltip='Thêm bài viết mới'
            onClick={() => setCreateOpen(true)}
          />
        )}
      </FloatButton.Group>
      <div className='d-flex'>
        <NavPages />
        <Header locaton={locaton}>{children}</Header>
      </div>
      <PostUpload isOpen={createOpen} setOpen={setCreateOpen} type='create' />
    </div>
  )
}

export default Layout
