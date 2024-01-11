import { PostUpload } from '@/components/Posts/PostUpload'
import { postRepost } from '@/redux/slice/adminSlice'
import { updateInteraction } from '@/redux/slice/interactionSlice'
import { deletePost } from '@/redux/slice/postSlice'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import { useSocket } from '@/socket'
import {
  DeleteOutlined,
  EditOutlined,
  FundProjectionScreenOutlined,
  HeartFilled,
  HeartOutlined,
  MoreOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Button, Card, Carousel, Form, Image, Modal, Popover, Radio, Space, Tooltip, notification } from 'antd'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './profilePost.scss'

function ProfilePost({ data }) {
  const dispatch = useDispatch()
  const socket = useSocket()
  const [openRepost, setOpenRepost] = useState(false)
  const { user, meData } = useSelector((state) => state.users)
  const [form] = Form.useForm()
  const repostOption = ['Bạo lực', 'Khiêu dâm', 'Khủng bố', 'Quấy rối', 'Thông tin sai sự thật', 'Spam', 'Khác']
  const image = data.images
  const POST = import.meta.env.VITE_IMAGES_FOLDER

  const handleDelete = (id) => {
    dispatch(deletePost(id))
    notification.success({
      message: 'Thông báo',
      description: `Đã xóa bài viết`,
    })
  }

  const [countFa, setCountFa] = useState(0)
  const [postFa, setPostFa] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (data && data.interactionData?.favorites.length > 0) {
      setCountFa(data.interactionData?.favorites.length)
      setPostFa(data.interactionData?.favorites.includes(meData._id))
    }
  }, [data])
  const handbleFa = () => {
    setPostFa(!postFa)

    if (postFa) {
      setCountFa((pv) => pv - 1)
      dispatch(updateInteraction({ id: data.interactionId, body: { type: 'favorites', targetId: meData._id } }))
    } else {
      // const sendfa = {
      //   sendId: meId,
      //   userId: postData.userId,
      //   postId: postData._id,
      //   text: 'Đã thả cảm xúc tới bài viết!',
      //   createdAt: new Date(),
      // }
      // if (postData.userId !== meId && postData.sendId !== meId) {
      //   socket.emit('notification', sendfa)
      //   dispatch(postNotifications(sendfa))
      // }
      setCountFa((pv) => pv + 1)
      dispatch(updateInteraction({ id: data.interactionId, body: { type: 'favorites', targetId: meData } }))
    }
  }

  const { Meta } = Card

  return (
    <Card
      cover={
        image.length > 0 ? (
          <Carousel autoplay>
            {image.map((img) => (
              <Image.PreviewGroup
                items={image.map((image) => {
                  return POST + image
                })}
                key={img}
              >
                <Image src={POST + img} style={{ objectFit: 'cover' }} />
              </Image.PreviewGroup>
            ))}
          </Carousel>
        ) : undefined
      }
      className='card-img'
      size='small'
      hoverable
    >
      <Space direction='vertical' className='d-flex'>
        <Meta description={<Link to={'/post/' + data._id}> {moment(data.createdAt).fromNow()}</Link>} />
        <Meta description={image.length > 0 ? <i>{data.desc}</i> : null} />
        <div className='d-space-c'>
          <Tooltip title={postFa ? 'Bỏ yêu thích' : 'Yêu thích'} onClick={() => setPostFa(!postFa)}>
            <Button size='large' type='text' icon={postFa ? <HeartFilled /> : <HeartOutlined />} onClick={handbleFa}>
              {countFa}
              {''}
            </Button>
          </Tooltip>
          <Tooltip title='Xem thêm'>
            <Popover
              content={
                <Space direction='vertical'>
                  {meData?._id === user.id && (
                    <>
                      <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
                        Sửa bài viết
                      </Button>
                      <Button onClick={() => handleDelete(data._id)} icon={<DeleteOutlined />} type='primary' danger>
                        Xóa bài viết
                      </Button>
                    </>
                  )}
                  <Link to={'/post/' + data._id}>
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
        </div>
      </Space>
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
            dispatch(
              updateRelationships({
                id: meData.relationshipsId,
                body: {
                  type: 'hiddedPost',
                  targetId: data._id,
                },
              }),
            )
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
      {isOpen && <PostUpload isOpen={isOpen} setOpen={setIsOpen} data={data} type='update' />}
    </Card>
  )
}

export default ProfilePost
