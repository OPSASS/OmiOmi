import ToolAction from '@/components/Posts/Interactions/ToolAction'
import { ShortUpload } from '@/components/Shorts/ShortUpload'
import { postRepost } from '@/redux/slice/adminSlice'
import { deleteShort, findShorts, getShortDetail } from '@/redux/slice/shortSlice'
import {
  ClockCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  IdcardOutlined,
  LeftOutlined,
  MoreOutlined,
  RightOutlined,
  StopOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Form, Modal, Popconfirm, Popover, Radio, Space, notification } from 'antd'
import moment from 'moment-timezone'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import './styles.scss'

const SingerShort = () => {
  const { short, shorts, successDetail } = useSelector((state) => state.shorts)
  const dispatch = useDispatch()
  const navitage = useNavigate()
  const { shortId } = useParams()
  const { meData } = useSelector((state) => state.users)
  const [current, setCurrent] = useState()
  useEffect(() => {
    if (meData) {
      const following = meData.relationshipsData?.following
      const userId = following?.length > 0 ? [meData._id, ...following] : meData._id
      dispatch(
        findShorts({
          filterQuery: {
            userId,
          },
          options: {
            sort: { createdAt: -1 },
          },
        }),
      )
    }
  }, [meData, successDetail])

  useEffect(() => {
    if (shortId) {
      dispatch(getShortDetail(shortId))
    } else if (shorts.length > 0) {
      navitage('/shorts/' + shorts?.[0]?._id)
    } else navitage('/')
  }, [shortId])

  const [openRepost, setOpenRepost] = useState(false)
  const SHORT = import.meta.env.VITE_BASE_URL
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const [isOpen, setIsOpen] = useState(false)
  const user = short?.userData
  const initItem = [
    {
      label: (
        <Link to={meData._id === user?._id ? '/profile/' + meData._id : '/user/' + user?._id}>
          <Button icon={<IdcardOutlined />}>Xem trang cá nhân</Button>
        </Link>
      ),
    },

    {
      label: (
        <Button icon={<StopOutlined />} onClick={() => setOpenRepost(true)}>
          Báo cáo khảnh khắc
        </Button>
      ),
    },
  ]
  const itemsAdd = [
    {
      label: (
        <Button icon={<EditOutlined />} onClick={() => setIsOpen(true)}>
          Sửa khoảnh khắc
        </Button>
      ),
    },
    {
      label: (
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa khoảnh khắc'
          description={'Bạn có chắc chắn muốn xóa khoảnh khắc này không?'}
          onConfirm={() => {
            dispatch(deleteShort(short._id))
            notification.success({
              message: 'Thông báo',
              description: `Xóa khoảnh khắc thành công!`,
            })
          }}
        >
          <Button icon={<DeleteOutlined />} type='primary' danger>
            Xóa khoảnh khắc
          </Button>
        </Popconfirm>
      ),
    },
  ]

  useEffect(() => {
    if (shorts.length > 0) {
      const index = shorts.findIndex((item) => item._id === shortId)
      setCurrent(index)
    }
  }, [shorts])

  const handleNext = () => {
    if (current < shorts.length) {
      navitage('/shorts/' + shorts?.[current + 1]._id)
    }
  }
  const handlePrev = () => {
    if (current >= 0) {
      navitage('/shorts/' + shorts?.[current - 1]._id)
    }
  }

  const menuItems = meData._id === user?._id || meData.isAdmin ? [...itemsAdd, ...initItem] : [...initItem]
  const [form] = Form.useForm()
  const repostOption = ['Bạo lực', 'Khiêu dâm', 'Khủng bố', 'Quấy rối', 'Thông tin sai sự thật', 'Spam', 'Khác']

  if (short)
    return (
      <Flex justify='center'>
        <Flex justify='space-between' align='center' className='short-main' gap={12}>
          <Button
            size='large'
            shape='circle'
            icon={<LeftOutlined />}
            onClick={handlePrev}
            disabled={current === 0 || !shorts?.length}
          />
          <Card className='short-cards'>
            <Flex justify='space-between' vertical className='short-body'>
              <div className='short-us'>
                <Flex justify='space-between' align='center'>
                  <Link
                    to={meData._id === user?._id ? '/profile/' + meData._id : '/user/' + user?._id}
                    className='d-space-c'
                  >
                    <Space>
                      <Avatar src={user?.avtPicture ? AVT + user?.avtPicture : noAvt} size={45} />
                      <div>
                        <h4>{user?.fullname}</h4>
                        <p>
                          <ClockCircleOutlined /> {moment(short.createdAt).fromNow()}
                        </p>
                      </div>
                    </Space>
                  </Link>
                  <Popover
                    content={<Space direction='vertical'>{menuItems.map((item) => item.label)}</Space>}
                    arrow
                    placement='bottomRight'
                  >
                    <Button shape='circle' icon={<MoreOutlined />} />
                  </Popover>
                </Flex>
              </div>

              <div className='video-body'>
                <video autoPlay loop src={SHORT + short.files?.[0]} width={'100%'} controls className='video-top' />
              </div>
              <div className='short-tool'>
                <ToolAction postData={short} meId={meData._id} type='short' />
              </div>

              <div className='short-desc'>
                <i>{short.desc}</i>
              </div>
            </Flex>

            {isOpen && <ShortUpload isOpen={isOpen} setOpen={setIsOpen} data={short} type='update' />}
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
                      userId: short.userId,
                      postId: short._id,
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
                    />
                  </Form.Item>
                </Form>
              </Modal>
            )}
          </Card>
          <Button
            size='large'
            shape='circle'
            icon={<RightOutlined />}
            onClick={handleNext}
            disabled={current === shorts?.length - 1 || !shorts?.length}
          />
        </Flex>
      </Flex>
    )
}

export default SingerShort
