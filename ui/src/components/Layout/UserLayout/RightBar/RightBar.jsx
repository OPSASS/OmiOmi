import './styles.scss'

import Notifications from '@/components/Notifications'
import { PostUpload } from '@/components/Posts/PostUpload'
import UserCard from '@/components/UserCard'
import { userFollowings } from '@/redux/slice/userSlice'
import { BellOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Card, Col, Empty, Image, Row, Space, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import SearchMain from '../../Nav/Search/search'

function RightBar() {
  const dispatch = useDispatch()
  const { users, meData, userFollowing } = useSelector((state) => state.users)
  const { successDetail } = useSelector((state) => state.relationships)
  const { files, loading, success } = useSelector((state) => state.files)

  useEffect(() => {
    if (meData?.relationshipsData?.following)
      dispatch(
        userFollowings({
          filterQuery: {
            _id: meData.relationshipsData.following,
          },
        }),
      )
  }, [meData])

  const [urlImage, setUrlImage] = useState([])

  useEffect(() => {
    if (files?.length > 0 && !loading && success) {
      const posts = files.filter((item) => item.type === 'posts')
      const result = posts.flatMap((post) =>
        post.url.map((url) => ({ title: post.title, img: import.meta.env.VITE_IMAGES_FOLDER + url })),
      )

      setUrlImage(result)
    }
  }, [files, loading, success])

  const [open, setOpen] = useState(false)

  const userList = users.filter((u) => u._id !== meData._id && !meData?.relationshipsData?.following.includes(u._id))

  return (
    <Scrollbars autoHide autoHideTimeout={1000} style={{ position: 'fixed', right: 0, height: '100vh', width: '34%' }}>
      <Card className='user_container' hoverable>
        <div className='user-main'>
          <Row gutter={10}>
            <Col span={18}>
              <SearchMain type='autoComplete' searchType={'user, post'} />
            </Col>
            <Col span={6}>
              <Space>
                <Tooltip title='Thông báo' placement='bottom'>
                  <Notifications type='br' buttShow={<Button icon={<BellOutlined />} size='large' shape='circle' />} />
                </Tooltip>

                <Tooltip title='Tạo bài viết' placement='bottom'>
                  <Button
                    icon={<PlusOutlined />}
                    size='large'
                    shape='circle'
                    type='primary'
                    onClick={() => setOpen(true)}
                  />
                </Tooltip>
              </Space>
              <PostUpload isOpen={open} setOpen={setOpen} type='create' />
            </Col>
          </Row>
          <div className='user_follow_container'>
            <Space direction='vertical' className='d-flex'>
              <div className='user_follow_new'>
                <div className='d-space-c'>
                  <h3>Có thể bạn quan tâm:</h3>
                  <Link to='/interests'>Xem tất cả</Link>
                </div>

                <UserCard userData={userList} type='follow' maxCount={5} />
              </div>

              <div className='user_follows'>
                <div className='d-space-c'>
                  <h3>Đang theo dõi:</h3>
                  <Link to={`/profile/${meData._id}/following`}>Xem tất cả</Link>
                </div>
                {userFollowing?.length > 0 ? (
                  <div className='user_follow_item '>
                    <UserCard userData={userFollowing} maxCount={5} />
                  </div>
                ) : (
                  <Empty description='Hiện bạn chưa theo dõi ai'>
                    <Link to='/interested'>
                      <Button>Xem gợi ý</Button>
                    </Link>
                  </Empty>
                )}
              </div>

              <div className='user_images'>
                <div className='d-space-c'>
                  <h3>Thư viện ảnh:</h3>
                </div>
                <Row gutter={[12, 12]}>
                  {urlImage.slice(0, 4).map((item) => (
                    <Col span={12} key={item.img}>
                      <Image.PreviewGroup
                        items={urlImage.map((image) => {
                          return image.img
                        })}
                      >
                        <Image src={item.img} style={{ maxHeight: 180, objectFit: 'cover' }} />
                      </Image.PreviewGroup>
                    </Col>
                  ))}
                </Row>
              </div>
            </Space>
          </div>
        </div>
      </Card>
    </Scrollbars>
  )
}
export default RightBar
