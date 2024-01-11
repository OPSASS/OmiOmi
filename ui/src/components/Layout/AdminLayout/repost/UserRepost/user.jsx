import { deleteRepost, deleteUser } from '@/redux/slice/adminSlice'
import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, notification } from 'antd'
import { useDispatch } from 'react-redux'
import noAvt from '../../../../../assets/images/avt.jpg'
import './user.scss'

export default function UserRepost({ repost }) {
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  return (
    <div className='rq-us'>
      <div className='us-repost bo bong d-space-c'>
        <div className='d-space-cl'>
          <p>Người dùng:</p>
          <div className='d-space-cl ml10'>
            <Avatar src={repost.userData.avtPicture ? AVT + repost.userData.avtPicture : noAvt} />
            <h4>{repost.userData?.fullname}</h4>
          </div>
        </div>

        <div className='d-flex'>
          <p>Nội dung báo cáo:</p>
          <b className='ml10'>{repost?.reason}</b>
        </div>
        <div className='d-flex'>
          <p>Số lượt báo cáo:</p>
          <b className='ml10'>1</b>
        </div>
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa tài khoản'
          description={`Bạn có chắc chắn muốn xóa tài khoản này?`}
          onConfirm={() => {
            dispatch(deleteUser(repost.userId))
            dispatch(deleteRepost(repost._id))
            notification.success({
              message: 'Thông báo',
              description: `Đã xóa người dùng`,
            })
          }}
        >
          <Button icon={<DeleteOutlined />} type='primary' danger>
            Xóa người dùng
          </Button>
        </Popconfirm>
      </div>
    </div>
  )
}
