import ProfilePosts from '@/components/Layout/UserLayout/Profile/ProfilePosts/profilePosts'
import { useSelector } from 'react-redux'
import Profile from '../../../../components/Layout/UserLayout/Profile/ProfileLayout'
import './profilePost.scss'

function ProfilePost() {
  const { user, meData } = useSelector((state) => state.users)

  const time = () => {
    const d = new Date()
    let hour = d.getHours()
    if (hour >= 5 && hour <= 10) return 'Buổi sáng tốt lành ' + meData.lastName + '☀️'
    else if (hour >= 10 && hour <= 13) return 'Buổi trưa vui vẻ ' + meData.lastName + '😎'
    else if (hour >= 14 && hour <= 21) return 'Buổi chiều hạnh phúc ' + meData.lastName + '🌇'
    else if (hour >= 22 && hour <= 24) return 'Buổi đêm an lành ' + meData.lastName + '🌙'
    else return 'Chúc ngủ ngon ' + meData.lastName + '😴'
  }
  if (user)
    return (
      <Profile users={user}>
        {meData?._id === user?._id ? <h1>{time()}</h1> : <h1>{'Chào ' + meData?.lastName + ' đã ghé thăm'}</h1>}

        <ProfilePosts />
      </Profile>
    )
}

export default ProfilePost
