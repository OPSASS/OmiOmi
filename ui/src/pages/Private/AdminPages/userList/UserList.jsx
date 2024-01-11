import UserCard from '@/components/UserCard'
import { Card, Space } from 'antd'
import { useSelector } from 'react-redux'
import './userList.scss'

export default function UserList() {
  document.title = 'Người dùng - OmiOmi'
  const { users } = useSelector((state) => state.users)

  const admins = users.filter((u) => u.isAdmin)
  const userList = users.filter((u) => !u.isAdmin)
  return (
    <Card style={{ margin: '0 24px' }}>
      <Space direction='vertical' className='d-flex'>
        <h2>Tất cả người dùng: {users?.length}</h2>
        <b>Admin</b>
        <UserCard userData={admins} type='admin' md={6} />
        <b>User</b>
        <UserCard userData={userList} type='admin' md={6} />
      </Space>
    </Card>
  )
}
