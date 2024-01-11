import RenderPosts from '@/components/Posts'
import RenderShorts from '@/components/Shorts/RenderShorts'
import { getFileByUs } from '@/redux/slice/filesSlice'
import { findUser } from '@/redux/slice/userSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const { meData } = useSelector((state) => state.users)
  const { successDetail } = useSelector((state) => state.posts)

  const dispatch = useDispatch()

  useEffect(() => {
    if (meData._id) dispatch(getFileByUs(meData._id))
  }, [successDetail, meData])

  useEffect(() => {
    dispatch(findUser({ options: { sort: { createdAt: -1 } } }))
  }, [])

  return (
    <div style={{ margin: '24px 0 24px 10px' }}>
      <RenderShorts />
      <RenderPosts />
    </div>
  )
}

export default Home
