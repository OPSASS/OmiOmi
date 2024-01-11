import UserCard from '@/components/UserCard'
import { Card, Space } from 'antd'
import { useSelector } from 'react-redux'

export default function AdminUsers() {
  document.title = `Đội ngũ Admin - OmiOmi`

  const { users } = useSelector((state) => state.users)
  const admins = users?.filter((us) => {
    return us.isAdmin
  })

  return (
    <Card style={{ margin: '0 24px' }}>
      <Space direction='vertical' className='d-flex'>
        <h2>Tất cả nhân viên: {admins.length}</h2>
        {admins?.length > 0 ? <UserCard userData={admins} type='admin' md={6} /> : 'Hiện không có nhân viên nào!'}
      </Space>
    </Card>
  )
}
