import Profile from '@/components/Layout/UserLayout/Profile/ProfileLayout'
import { ShortUpload } from '@/components/Shorts/ShortUpload'
import { postRepost } from '@/redux/slice/adminSlice'
import { deleteShort, findShorts } from '@/redux/slice/shortSlice'
import { DeleteOutlined, EditOutlined, MoreOutlined, StopOutlined } from '@ant-design/icons'
import { Button, Card, Empty, Flex, Form, Modal, Popover, Radio, Space, Tooltip, notification } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { Link, useParams } from 'react-router-dom'
import './profileShorts.scss'

const VideoRender = ({ video }) => {
  const { meData } = useSelector((state) => state.users)
  const { userId } = useParams()
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const repostOption = ['Bạo lực', 'Khiêu dâm', 'Khủng bố', 'Quấy rối', 'Thông tin sai sự thật', 'Spam', 'Khác']
  const [openRepost, setOpenRepost] = useState(false)

  const SHORT = import.meta.env.VITE_BASE_URL
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef(null)
  let timeout

  const handleMouseEnter = () => {
    timeout = setTimeout(() => {
      setIsHovered(true)
      if (videoRef.current) {
        videoRef.current.play()
      }
    }, 1000)
  }

  const handleMouseLeave = () => {
    clearTimeout(timeout)
    setIsHovered(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>
      <Card
        cover={
          <Link
            to={'/shorts/' + video._id}
            key={video._id}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className='videoCard'>
              <video ref={videoRef} src={SHORT + video.files[0]} width={'100%'} />
              {!isHovered && <FaPlay className='videoPlay' />}
            </div>
          </Link>
        }
        hoverable
        size='small'
      >
        <Flex justify='space-between'>
          <Card.Meta description={video.desc} />
          <Tooltip title='Xem thêm'>
            <Popover
              content={
                <Space direction='vertical'>
                  {meData?._id === userId && (
                    <>
                      <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
                        Sửa khoảnh khắc
                      </Button>
                      <Button
                        onClick={() => {
                          dispatch(deleteShort(video._id))
                          notification.success({
                            message: 'Thông báo',
                            description: `Đã xóa khoảnh khắc`,
                          })
                        }}
                        icon={<DeleteOutlined />}
                        type='primary'
                        danger
                      >
                        Xóa khoảnh khắc
                      </Button>
                    </>
                  )}

                  <Button icon={<StopOutlined />} onClick={() => setOpenRepost(true)} danger>
                    Báo cáo
                  </Button>
                </Space>
              }
              trigger='click'
              placement='bottomRight'
              arrow
            >
              <Button icon={<MoreOutlined />} type='text'></Button>
            </Popover>
          </Tooltip>
        </Flex>
      </Card>
      {openRepost && (
        <Modal
          title='Báo cáo khoảnh khắc'
          open={openRepost}
          onCancel={() => setOpenRepost(!openRepost)}
          footer={
            <Space>
              <Button onClick={() => setOpenRepost(!openRepost)}>Hủy</Button>
              <Button onClick={() => form.submit()} type='primary'>
                Báo cáo
              </Button>
            </Space>
          }
        >
          <Form
            form={form}
            onFinish={(value) => {
              const newRepost = {
                sendId: meData._id,
                userId: video.userId,
                postId: video._id,
                reason: value.repost,
              }

              dispatch(postRepost(newRepost))
              setOpenRepost(false)

              notification.success({
                message: 'Thông báo',
                description: `Báo cáo thành công!`,
              })
            }}
          >
            <Form.Item
              name='repost'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn 1 nội dung!',
                },
              ]}
            >
              <Radio.Group
                options={repostOption.map((i) => {
                  return { label: i, value: i }
                })}
              ></Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      )}
      {isOpen && <ShortUpload isOpen={isOpen} setOpen={setIsOpen} data={video} type='update' />}
    </div>
  )
}

function ProfileShorts() {
  const dispatch = useDispatch()
  const { shorts, successDetail } = useSelector((state) => state.shorts)
  const { userId } = useParams()

  useEffect(() => {
    if (userId) {
      dispatch(
        findShorts({
          filterQuery: {
            userId,
          },
        }),
      )
    }
  }, [userId, successDetail])

  return (
    <Profile>
      <Space direction='vertical' className='d-flex'>
        <Space>
          <h1>Short</h1>
          <b>({shorts?.length})</b>
        </Space>
        {shorts?.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1600: 3 }}>
            <Masonry columnsCount={2} gutter='12px'>
              {shorts.map((item) => (
                <VideoRender video={item} key={item._id} />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <Empty description='Hiện chưa có shorts nào' style={{ padding: 50 }}></Empty>
        )}
      </Space>
    </Profile>
  )
}

export default ProfileShorts
