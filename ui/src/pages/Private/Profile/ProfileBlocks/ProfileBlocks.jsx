import Profile from '@/components/Layout/UserLayout/Profile/ProfileLayout'
import UserCard from '@/components/UserCard'
import { findUser } from '@/redux/slice/userSlice'
import { Empty, Space } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProfileBlocks = () => {
  const dispatch = useDispatch()
  const { users, user, successDetail: usSuccess } = useSelector((state) => state.users)
  const { successDetail } = useSelector((state) => state.relationships)
  useEffect(() => {
    if (user) {
      dispatch(
        findUser({
          filterQuery: {
            _id: user.relationshipsData?.blocks,
          },
        }),
      )
    }
  }, [user, successDetail, usSuccess])

  return (
    <Profile>
      <Space direction='vertical' className='d-flex'>
        <Space>
          <h1>Đang chặn</h1>
          <b>({users.length})</b>
        </Space>
        {users.length > 0 ? (
          <UserCard userData={users} type='block' md={8} />
        ) : (
          <Empty description='Hiện chưa chặn ai' style={{ padding: 50 }} />
        )}
      </Space>
    </Profile>
  )
}

export default ProfileBlocks
