import PostRepost from '@/components/Layout/AdminLayout/repost/PostRepost/post'
import UserRepost from '@/components/Layout/AdminLayout/repost/UserRepost/user'
import { getRepost } from '@/redux/slice/adminSlice'
import { Card, Space } from 'antd'
import { useEffect } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'

export default function Reports() {
  document.title = 'Báo cáo - OmiOmi'
  const dispatch = useDispatch()
  const { reposts } = useSelector((state) => state.admin)
  const repostUs = reposts?.filter((us) => us?.postId?.length === 0)
  const repostPost = reposts?.filter((post) => post?.postId?.length > 0)

  useEffect(() => {
    dispatch(getRepost())
  }, [])
  return (
    <Space direction='vertical' style={{ display: 'flex', margin: '0 24px' }}>
      <Card hoverable>
        <h2>Báo cáo người dùng</h2>
        <Scrollbars autoHide autoHideTimeout={1000} style={{ height: 366 }}>
          {repostUs?.length > 0
            ? repostUs?.map((repost) => <UserRepost repost={repost} key={repost._id} />)
            : 'Hiện không có báo cáo người dùng nào'}
        </Scrollbars>
      </Card>
      <Card hoverable>
        <h2>Báo cáo bài viết</h2>
        <Scrollbars autoHide autoHideTimeout={1000} style={{ height: 366 }}>
          {repostPost?.length > 0
            ? repostPost?.map((repost) => <PostRepost repost={repost} key={repost._id} />)
            : 'Hiện không có báo cáo bài viết nào'}
        </Scrollbars>
      </Card>
    </Space>
  )
}
