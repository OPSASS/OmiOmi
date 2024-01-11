import { deleteRequest, deleteUser } from '@/redux/slice/adminSlice'
import { DeleteOutlined } from '@ant-design/icons'
import { Avatar, Button, Popconfirm, notification } from 'antd'
import { useDispatch } from 'react-redux'
import noAvt from '../../../../assets/images/avt.jpg'

export default function UserRequest({ request }) {
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  return (
    <div className='rq-us'>
      <div className='us-request bo bong d-space-c'>
        <div className='d-space-cl'>
          <p>Người dùng:</p>
          <div className='d-space-cl ml10'>
            <Avatar src={request.userData.avtPicture ? AVT + request.userData.avtPicture : noAvt} />
            <h4>{request.userData?.fullname}</h4>
          </div>
        </div>

        <div className='d-flex'>
          <p>Nội dung yêu cầu:</p>
          <b className='ml10'>{request?.reason}</b>
        </div>
        <Popconfirm
          destroyTooltipOnHide
          arrow
          title='Xóa tài khoản'
          description={`Bạn có chắc chắn muốn xóa tài khoản này?`}
          onConfirm={() => {
            dispatch(deleteUser(request.userId))
            dispatch(deleteRequest(request._id))
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
