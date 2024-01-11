import svg from '@/assets'
import ToolAction from '@/components/Posts/Interactions/ToolAction'
import { PostUpload } from '@/components/Posts/PostUpload'
import { postRepost } from '@/redux/slice/adminSlice'
import { deletePost, getPostDetail } from '@/redux/slice/postSlice'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  FundProjectionScreenOutlined,
  MoreOutlined,
  StopOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Flex,
  Form,
  Image,
  Modal,
  Popover,
  Radio,
  Row,
  Space,
  Tooltip,
  notification,
} from 'antd'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import './styles.scss'

function SingerPost() {
  const dispatch = useDispatch()
  const { post, loadingDetail, errorDetail, messageDetail } = useSelector((state) => state.posts)
  const { meData } = useSelector((state) => state.users)
  const { postId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPostDetail(postId))
  }, [postId])

  const [openRepost, setOpenRepost] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const POST = import.meta.env.VITE_IMAGES_FOLDER
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const [form] = Form.useForm()
  const repostOption = ['Bạo lực', 'Khiêu dâm', 'Khủng bố', 'Quấy rối', 'Thông tin sai sự thật', 'Spam', 'Khác']

  const handleDelete = (id) => {
    dispatch(deletePost(id))
    notification.success({
      message: 'Thông báo',
      description: `Đã xóa bài viết`,
    })
  }

  return post ? (
    <Card className='post-detail-main'>
      <Row gutter={24}>
        <Col span={24} md={16}>
          {post?.images?.length > 0 && (
            <Carousel autoplay style={{ borderRadius: 25, overflow: 'hidden' }}>
              {post?.images?.map((img) => (
                <Image.PreviewGroup
                  items={post?.images?.map((image) => {
                    return POST + image
                  })}
                  key={img}
                >
                  <div className='image'>
                    <Image src={POST + img} />
                  </div>
                </Image.PreviewGroup>
              ))}
            </Carousel>
          )}
        </Col>

        <Col span={24} md={post?.images?.length > 0 ? 8 : 24}>
          <Scrollbars autoHide autoHideTimeout={1000} style={{ height: '87vh' }}>
            <Space direction='vertical' size='large' className='d-flex'>
              <Flex justify='space-between'>
                <Link
                  to={meData._id === post.userData?._id ? '/profile/' + meData._id : '/user/' + post.userData?._id}
                  className='d-space-c'
                >
                  <Space>
                    <Avatar src={post.userData?.avtPicture ? AVT + post.userData?.avtPicture : noAvt} size={45} />
                    <div>
                      <h4>{post.userData?.fullname}</h4>
                      <p>
                        <ClockCircleOutlined /> {moment(post.createdAt).fromNow()}
                      </p>
                    </div>
                  </Space>
                </Link>

                <Tooltip title='Xem thêm'>
                  <Popover
                    content={
                      <Space direction='vertical'>
                        {meData?._id === post?.userData?._id && (
                          <>
                            <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
                              Sửa bài viết
                            </Button>
                            <Button
                              onClick={() => handleDelete(post._id)}
                              icon={<DeleteOutlined />}
                              type='primary'
                              danger
                            >
                              Xóa bài viết
                            </Button>
                          </>
                        )}
                        <Link to={'/post/' + post._id}>
                          <Button icon={<FundProjectionScreenOutlined />}>Xem chi tiết bài viết</Button>
                        </Link>
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
              <i>{post.desc}</i>
              <ToolAction postData={post} meId={meData._id} />
            </Space>{' '}
          </Scrollbars>
          {isOpen && <PostUpload isOpen={isOpen} setOpen={setIsOpen} data={post} type='update' />}
          <Modal
            title='Báo cáo bài viết'
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
                  userId: post.userId,
                  postId: post._id,
                  reason: value.repost,
                }
                dispatch(postRepost(newRepost))
                setOpenRepost(false)
                dispatch(
                  updateRelationships({
                    id: meData.relationshipsId,
                    body: {
                      type: 'hiddedPost',
                      targetId: post._id,
                    },
                  }),
                )
                notification.success({
                  message: 'Thông báo',
                  description: `Báo cáo thành công!`,
                })
                setTimeout(() => {
                  navigate('/')
                }, 1000)
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
        </Col>
      </Row>
    </Card>
  ) : (
    <Flex vertical align='center'>
      <img src={svg.post204} alt='204' width={'40%'} />
      <Space direction='vertical' align='center' size='large' className='d-flex'>
        <p>Bài viết không tồn tại hoặc đã bị xóa!</p>
        <Link to='/'>
          <Button size='large' type='primary'>
            Trở về trang chủ
          </Button>
        </Link>
      </Space>
    </Flex>
  )
}
export default SingerPost
