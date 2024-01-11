import { postRepost } from '@/redux/slice/adminSlice'
import { deletePost } from '@/redux/slice/postSlice'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeInvisibleOutlined,
  FundProjectionScreenOutlined,
  IdcardOutlined,
  MoreOutlined,
  StopOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Modal,
  Popconfirm,
  Popover,
  Radio,
  Result,
  Row,
  Space,
  notification,
} from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import ToolAction from '../Interactions/ToolAction'
import { PostUpload } from '../PostUpload'
import './styles.scss'

const PostDetail = ({ data }) => {
  const POST = import.meta.env.VITE_IMAGES_FOLDER
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const { meData } = useSelector((state) => state.users)
  const navitage = useNavigate()
  const dispatch = useDispatch()
  const [hidded, setHidded] = useState(false)
  const [repost, setRepost] = useState(false)
  const [openRepost, setOpenRepost] = useState(false)
  const RenderImage = ({ image, length }) => {
    if (length > 4)
      return (
        <div className='anhn'>
          <img className='bo image-b' src={POST + image[0]} alt={image[0]} />
          <Row justify='space-between' gutter={24} className='image-sm'>
            <Col span={8}>
              <img className='bo' src={POST + image[1]} alt={image[1]} />
            </Col>
            <Col span={8}>
              <img className='bo' src={POST + image[2]} alt={image[2]} />
            </Col>
            <Col span={8} className='pic-more'>
              <img className='bo' src={POST + image[3]} alt={image[3]} />
              <div className='more'>
                <h3>+{image.length - 4}</h3>
              </div>
            </Col>
          </Row>
        </div>
      )
    if (length > 3)
      return (
        <>
          <Row className='anh4' gutter={24}>
            <Col span={24} md={12}>
              <img className='bo' src={POST + image[0]} alt={image[0]} />
            </Col>
            <Col span={24} md={12}>
              <img className='bo' src={POST + image[1]} alt={image[1]} />
            </Col>
          </Row>
          <Row className='anh4' gutter={24} style={{ marginTop: 15 }}>
            <Col span={24} md={12}>
              <img className='bo' src={POST + image[2]} alt={image[2]} />
            </Col>
            <Col span={24} md={12}>
              <img className='bo' src={POST + image[3]} alt={image[3]} />
            </Col>
          </Row>
        </>
      )
    if (length > 2)
      return (
        <Row className='anh3' gutter={24} justify='space-between'>
          <Col span={24} md={8}>
            <img className='bo' src={POST + image[0]} alt={image[0]} />
          </Col>
          <Col span={24} md={8}>
            <img className='bo mt15' src={POST + image[1]} alt={image[1]} />
          </Col>
          <Col span={24} md={8}>
            <img className='bo' src={POST + image[2]} alt={image[2]} />
          </Col>
        </Row>
      )
    if (length > 1)
      return (
        <Row className='anh2' gutter={24} justify='space-between'>
          <Col span={24} md={12}>
            <img className='bo' src={POST + image[0]} alt={image[0]} />
          </Col>
          <Col span={24} md={12}>
            <img className='bo' src={POST + image[1]} alt={image[1]} />
          </Col>
        </Row>
      )

    return (
      <div className='anh1 d-col-c bo'>
        <img src={POST + image[0]} alt={image[0]} />
      </div>
    )
  }

  const user = data.userData
  const [isOpen, setIsOpen] = useState(false)
  const initItem = [
    {
      label: (
        <Button icon={<FundProjectionScreenOutlined />} onClick={() => navitage(`/post/${data._id}`)}>
          Xem chi tiết
        </Button>
      ),
    },
    {
      label: (
        <Button
          icon={<IdcardOutlined />}
          onClick={() => navitage(meData._id === user._id ? '/profile/' + meData._id : '/user/' + user._id)}
        >
          Xem trang cá nhân
        </Button>
      ),
    },

    {
      label: (
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Ẩn bài viết'
          description={'Bạn có chắc chắn muốn ẩn bài viết này không?'}
          onConfirm={() => {
            dispatch(
              updateRelationships({
                id: meData.relationshipsId,
                body: {
                  type: 'hiddedPost',
                  targetId: data._id,
                },
              }),
            )
            setHidded(true)
            notification.success({
              message: 'Thông báo',
              description: `Ẩn bài viết thành công!`,
            })
          }}
        >
          <Button icon={<EyeInvisibleOutlined />}>Ẩn bài viết</Button>
        </Popconfirm>
      ),
    },
    {
      label: (
        <Button icon={<StopOutlined />} onClick={() => setOpenRepost(true)}>
          Báo cáo bài viết
        </Button>
      ),
    },
  ]
  const itemsAdd = [
    {
      label: (
        <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
          Sửa bài viết
        </Button>
      ),
    },

    {
      label: (
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa bài viết'
          description={'Bạn có chắc chắn muốn xóa bài viết này không?'}
          onConfirm={() => {
            dispatch(deletePost(data._id))
            notification.success({
              message: 'Thông báo',
              description: `Xóa bài viết thành công!`,
            })
          }}
        >
          <Button icon={<DeleteOutlined />} type='primary' danger>
            Xóa bài viết
          </Button>
        </Popconfirm>
      ),
    },
  ]
  const menuItems = meData._id === user?._id || meData.isAdmin ? [...itemsAdd, ...initItem] : [...initItem]
  const [form] = Form.useForm()
  const repostOption = ['Bạo lực', 'Khiêu dâm', 'Khủng bố', 'Quấy rối', 'Thông tin sai sự thật', 'Spam', 'Khác']

  if (hidded || repost)
    return (
      <Card className='post-detail'>
        {repost ? (
          <Result
            style={{ padding: 10 }}
            status='success'
            title='Bài viết đã được báo cáo!'
            subTitle={
              <Space direction='vertical'>
                <p>Yêu cầu của bạn đã được phải hồi đến chúng tôi! Bài viết sẽ được xem xét và gỡ bỏ!</p>
                <i>Cảm ơn sự đóng góp tích cực của bạn đến với chúng tôi!</i>
              </Space>
            }
          />
        ) : (
          <Result
            style={{ padding: 10 }}
            status='info'
            title='Bài viết đã được ẩn!'
            subTitle='Sau khi tải lại trang bài viết sẽ bị ẩn vĩnh viễn!'
            extra={
              <Button
                onClick={() => {
                  dispatch(
                    updateRelationships({
                      id: meData.relationshipsId,
                      body: {
                        type: 'hiddedPost',
                        targetId: data._id,
                      },
                    }),
                  )
                  setHidded(false)
                  notification.success({
                    message: 'Thông báo',
                    description: `Hoàn tác thành công!`,
                  })
                }}
              >
                Hoàn tác
              </Button>
            }
          />
        )}
      </Card>
    )
  if (user)
    return (
      <Card className='post-detail' hoverable>
        {/* ======Post nav======= */}

        <div className='posts_nav'>
          <div className='d-space'>
            <Link to={meData._id === user._id ? '/profile/' + meData._id : '/user/' + user._id} className='d-space-c'>
              <Avatar src={user.avtPicture ? AVT + user.avtPicture : noAvt} size={45} />
              <div>
                <h4 className='posts_name'>{user.fullname}</h4>

                <p style={{ marginLeft: 15 }}>
                  <ClockCircleOutlined /> {moment(data.createdAt).fromNow()}
                </p>
              </div>
            </Link>
            <Popover
              content={<Space direction='vertical'>{menuItems.map((item) => item.label)}</Space>}
              arrow
              placement='bottomRight'
            >
              <Button shape='circle' icon={<MoreOutlined />} />
            </Popover>
          </div>
        </div>

        {/* =======Post images======= */}
        {/* co anh thi hien */}
        <Link to={'/post/' + data._id} className='posts_box an'>
          {data.images.length > 0 ? (
            <div className='image-post'>
              <div className='bong'>
                <RenderImage image={data.images} key={data._id} length={data.images.length} />
              </div>
              <p className='posts_desc'>{data?.desc}</p>
            </div>
          ) : (
            /* =======Post desc======= */
            <p className='posts_desc'>{data?.desc}</p>
          )}
        </Link>
        {/* =======Post tool======= */}
        <div style={{ margin: '0 15px' }}>
          <ToolAction postData={data} meId={meData._id} />
        </div>

        {/* =======Post comment======= */}

        {isOpen && <PostUpload isOpen={isOpen} setOpen={setIsOpen} data={data} type='update' />}
        {openRepost && (
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
                  userId: data.userId,
                  postId: data._id,
                  reason: value.repost,
                }

                dispatch(postRepost(newRepost))
                setOpenRepost(false)
                setHidded(!hidded)
                dispatch(
                  updateRelationships({
                    id: meData.relationshipsId,
                    body: {
                      type: 'hiddedPost',
                      targetId: data._id,
                    },
                  }),
                )
                setRepost(true)
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
                />
              </Form.Item>
            </Form>
          </Modal>
        )}
      </Card>
    )
}

export default PostDetail
