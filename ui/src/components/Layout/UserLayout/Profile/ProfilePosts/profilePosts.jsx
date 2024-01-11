import { findPost } from '@/redux/slice/postSlice'
import { Empty } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'
import ProfilePost from '../ProfilePost/profilePost'

function ProfilePosts() {
  const dispatch = useDispatch()
  const { posts, loading, error, successDetail } = useSelector((state) => state.posts)
  const { userId } = useParams()
  useEffect(() => {
    dispatch(
      findPost({
        filterQuery: {
          userId,
        },
      }),
    )
  }, [error, userId, successDetail])

  // const Skele = () => (
  //   <div className="postskele">
  //     <Skeleton variant="rounded" className="postskele bo" height={75} />
  //     <Skeleton animation="wave" width={'30%'} />
  //     <Skeleton animation="wave" width={'60%'} />
  //   </div>
  // );
  // const SkeleImg = () => (
  //   <div className="postskele">
  //     <Skeleton variant="rounded" className="postskele bo" height={300} />
  //   </div>
  // );
  return posts?.length > 0 ? (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1600: 3 }}>
      <Masonry columnsCount={2} gutter='12px'>
        {posts?.flatMap((post, id) => (
          <ProfilePost key={id} data={post} />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  ) : (
    <Empty description='Hiện không có bài viết nào' style={{ padding: 50 }}></Empty>
  )
}

export default ProfilePosts
