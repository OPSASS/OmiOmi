import CommentAction from '@/components/CommentAction'
import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Flex, Popconfirm, Popover, Space, notification } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import ToolAction from './ToolAction'

const CommentDetail = ({ data }) => {
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const [openAction, setOpenAction] = useState(false)
  const menuItems = [
    {
      label: (
        <Button icon={<EditOutlined />} onClick={() => setOpenAction(true)}>
          Sửa bình luận
        </Button>
      ),
    },

    {
      label: (
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa bình luận'
          description={'Bạn có chắc chắn muốn xóa bình luận này không?'}
          onConfirm={() => {
            notification.success({
              message: 'Thông báo',
              description: `Xóa bình luận thành công!`,
            })
          }}
        >
          <Button icon={<DeleteOutlined />} type='primary' danger>
            Xóa bình luận
          </Button>
        </Popconfirm>
      ),
    },
  ]
  if (data)
    return (
      <Card size='small' hoverable>
        <Space direction='vertical' className='d-flex'>
          <Flex justify='space-between'>
            <Link>
              <Space>
                <Avatar src={data.userData?.avtPicture ? AVT + data.userData?.avtPicture : noAvt} />
                <div>
                  <h4 className='posts_name'>{data.userData?.fullname}</h4>
                  {moment(data.createdAt).fromNow()}
                </div>
              </Space>
            </Link>
            <Popover
              content={<Space direction='vertical'>{menuItems.map((item) => item.label)}</Space>}
              arrow
              placement='bottomRight'
            >
              <Button shape='circle' type='text' icon={<MoreOutlined />} />
            </Popover>
          </Flex>
          {openAction ? (
            <CommentAction data={data} type='update' setOpenAction={setOpenAction} />
          ) : (
            <p style={{ paddingLeft: 30, margin: '0 10px' }}>{data.text}</p>
          )}

          <ToolAction postData={data} showShare={false} type='comment' />
          {data.countChild > 0 && data.childData.map((child) => <CommentDetail data={child} key={child._id} />)}
        </Space>
      </Card>
    )
}

export default CommentDetail
