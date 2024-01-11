import svg from '@/assets'
import { findPost, resetPostAction } from '@/redux/slice/postSlice'
import { Card } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PostDetail from './PostDetail'

const RenderPosts = () => {
  const dispatch = useDispatch()
  const { posts, loading, successDetail, success } = useSelector((state) => state.posts)

  const { meData } = useSelector((state) => state.users)
  const [postData, setPostData] = useState([])
  useEffect(() => {
    dispatch(resetPostAction())
  }, [])

  useEffect(() => {
    if (meData) {
      const following = meData.relationshipsData?.following
      const userId = following?.length > 0 ? [meData._id, ...following] : meData._id

      if (userId?.length > 0)
        dispatch(
          findPost({
            filterQuery: { userId },
            options: {
              sort: { createdAt: -1 },
            },
          }),
        )
    }
  }, [successDetail, meData])

  useEffect(() => {
    if (success) {
      const hitedId =
        meData?.relationshipsData?.postHiddeds?.length > 0 ? meData?.relationshipsData?.postHiddeds : undefined
      const newData = posts.filter((item) => !hitedId?.includes(item._id))
      setPostData(newData)
    }
  }, [success])

  return postData.length > 0 ? (
    postData.map((item) => <PostDetail data={item} key={item._id} />)
  ) : (
    <Card style={{ width: '100%', background: 'var(--whiteBgColor)', marginTop: 20 }}>
      <div className='d-col-c m15'>
        <img src={svg.following} alt='follow' style={{ width: 500 }} />
        <h2>Bạn cần theo dõi nhiều người để có thêm nhiều bài viết hơn!</h2>
        <a href='/interests' className='butt m10'>
          Xem thêm gợi ý
        </a>
      </div>
    </Card>
  )
}

export default RenderPosts
