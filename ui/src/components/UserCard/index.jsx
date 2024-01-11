import { deleteUser } from '@/redux/slice/adminSlice'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import { getMeData, updateUser } from '@/redux/slice/userSlice'
import {
  DeleteOutlined,
  IdcardOutlined,
  MessageOutlined,
  MoreOutlined,
  StopOutlined,
  UserAddOutlined,
} from '@ant-design/icons'
import { Avatar, Button, Card, Col, Popconfirm, Popover, Row, Space, notification } from 'antd'
import { useEffect, useState } from 'react'
import { RiUserAddLine, RiUserUnfollowLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../assets/images/avt.jpg'
const RenderUser = ({ user, type }) => {
  const dispatch = useDispatch()
  const { meData } = useSelector((state) => state.users)
  const [follow, setFollow] = useState(false)

  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  useEffect(() => {
    if (meData && meData.relationshipsData?.following?.includes(user._id)) {
      setFollow(true)
    }
  }, [meData])

  const handleFollow = () => {
    dispatch(
      updateRelationships({
        id: meData.relationshipsId,
        body: {
          type: 'follow',
          targetId: user._id,
        },
      }),
    )
    notification.success({ message: 'Thông báo', description: `Đã ${follow ? 'bỏ' : ''} theo dõi người dùng` })
    dispatch(getMeData())
    setFollow(!follow)
  }

  const handleAddAdmin = (user) => {
    dispatch(
      updateUser({
        id: user._id,
        body: {
          isAdmin: true,
        },
      }),
    )
    notification.success({
      message: 'Thông báo',
      description: `Đã ${user.isAdmin ? 'hủy' : 'thêm'} quyền quản trị cho người dùng ${user.fullname}`,
    })
    setFollow(!follow)
  }

  const handleBlock = () => {
    dispatch(
      updateRelationships({
        id: meData.relationshipsId,
        body: {
          type: 'block',
          targetId: user._id,
        },
      }),
    )
    notification.success({ message: 'Thông báo', description: `Đã ${follow ? 'bỏ' : ''} chặn người dùng` })
    setFollow(!follow)
    dispatch(getMeData())
  }

  return (
    <Card size='small' key={user._id} hoverable>
      <div className='d-space-c'>
        <Link to={'/user/' + user._id}>
          <Space align='center'>
            <Avatar src={user.avtPicture ? AVT + user.avtPicture : noAvt} />
            <h3 style={{ margin: 0 }}>{user.fullname}</h3>
          </Space>
        </Link>
        {type === 'follow' ? (
          <Button onClick={handleFollow} type={follow ? 'default' : 'primary'}>
            {follow ? 'Bỏ theo' : 'Theo'} dõi
          </Button>
        ) : (
          <Popover
            content={
              <Space direction='vertical'>
                {type === 'admin' ? (
                  <>
                    <Link to={`/admin/users/${user._id}`}>
                      <Button icon={<IdcardOutlined />}>Xem chi tiết</Button>
                    </Link>
                    <Button onClick={() => handleAddAdmin(user)} icon={<UserAddOutlined />}>
                      {user.isAdmin ? 'Hủy' : 'Cấp'} quyền Admin
                    </Button>

                    <Popconfirm
                      destroyTooltipOnHide
                      arrow
                      title='Xóa tài khoản'
                      description={`Bạn có chắc chắn muốn xóa tài khoản ${user.fullname}?`}
                      onConfirm={() => {
                        dispatch(deleteUser(user._id))
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
                  </>
                ) : (
                  <>
                    <Link to={`/user/${user._id}`}>
                      <Button icon={<IdcardOutlined />}>Trang cá nhân</Button>
                    </Link>
                    {type !== 'block' && (
                      <>
                        <Link to={`/chat/${user._id}`}>
                          <Button icon={<MessageOutlined />}>Nhắn tin</Button>
                        </Link>
                        <Button
                          onClick={handleFollow}
                          icon={follow ? <RiUserUnfollowLine /> : <RiUserAddLine />}
                          type={follow ? 'default' : 'primary'}
                        >
                          {follow ? 'Bỏ theo' : 'Theo'} dõi
                        </Button>
                      </>
                    )}
                    <Button onClick={handleBlock} icon={<StopOutlined />} danger>
                      {type === 'block' ? 'Bỏ chặn' : 'Chặn'}
                    </Button>
                  </>
                )}
              </Space>
            }
            trigger='click'
            placement='bottomRight'
            arrow
          >
            <Button icon={<MoreOutlined />} type='text' />
          </Popover>
        )}
      </div>
    </Card>
  )
}

const UserCard = ({ userData, type, maxCount, md }) => {
  return (
    <Row gutter={[12, 12]}>
      {userData.slice(0, maxCount ? maxCount : undefined).map((item) => (
        <Col key={item._id} span={24} md={md}>
          <RenderUser user={item} type={type} />
        </Col>
      ))}
    </Row>
  )
}

export default UserCard
