import { deleteRepost } from '@/redux/slice/adminSlice'
import { deletePost } from '@/redux/slice/postSlice'
import { DeleteOutlined, EyeOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, Tooltip, notification } from 'antd'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../../../../assets/images/avt.jpg'

export default function PostRepost({ repost }) {
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  return (
    <div className='rq-us'>
      <div className='us-repost bo bong d-space-c'>
        <div className='d-space-cl'>
          <p>id:</p>
          <Link to={'/post/' + repost.postId} className='m10'>
            {repost.postId}
          </Link>
          <Tooltip title='Xem chi tiết bài viết'>
            <Link to={'/post/' + repost.postId}>
              <EyeOutlined />
            </Link>
          </Tooltip>
        </div>

        <div className='d-space-cl'>
          <p>Người đăng:</p>
          <div className='d-space-cl ml10'>
            <Avatar src={repost.userData.avtPicture ? AVT + repost.userData.avtPicture : noAvt} />
            <h4>{repost.userData?.fullname}</h4>
          </div>
        </div>

        <div className='d-flex'>
          <p>Nội dung báo cáo:</p>
          <b className='ml10'>{repost.reason}</b>
        </div>
        <div className='d-flex'>
          <p>Số lượt báo cáo:</p>
          <b className='ml10'>1</b>
        </div>
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa bài viết'
          description={`Bạn có chắc chắn muốn xóa bài viết này?`}
          onConfirm={() => {
            dispatch(deletePost(repost.userId))
            dispatch(deleteRepost(repost._id))
            notification.success({
              message: 'Thông báo',
              description: `Đã xóa bài viết`,
            })
          }}
        >
          <Button icon={<DeleteOutlined />} type='primary' danger>
            Xóa bài viết
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}
