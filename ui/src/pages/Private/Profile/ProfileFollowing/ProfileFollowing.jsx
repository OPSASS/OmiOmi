import Profile from '@/components/Layout/UserLayout/Profile/ProfileLayout'
import UserCard from '@/components/UserCard'
import { userFollowings } from '@/redux/slice/userSlice'
import { Empty, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ProfileFollowing() {
  const dispatch = useDispatch()
  const { userFollowing, user, successDetail: success } = useSelector((state) => state.users)
  const { successDetail } = useSelector((state) => state.relationships)
  const [userList, setUserList] = useState([])
  useEffect(() => {
    if (user?.relationshipsData?.following || successDetail)
      dispatch(
        userFollowings({
          filterQuery: {
            _id: user.relationshipsData.following,
          },
        }),
      )
  }, [user, successDetail])

  useEffect(() => {
    const userData = userFollowing.filter(
      (u) => u._id !== user._id && user?.relationshipsData?.following.includes(u._id),
    )
    setUserList(userData)
  }, [success, userFollowing])

  return (
    <Profile>
      <Space direction='vertical' className='d-flex'>
        <Space>
          <h1>Đang theo dõi</h1>
          <b>({userList.length})</b>
        </Space>
        {userList.length > 0 ? (
          <UserCard userData={userList} type='following' md={8} />
        ) : (
          <Empty description='Hiện chưa theo dõi ai' style={{ padding: 50 }}></Empty>
        )}
      </Space>
    </Profile>
  )
}
export default ProfileFollowing
