import { createChat } from '@/redux/slice/chatSlice'
import { Avatar, Badge, Card, Flex, Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import noAvt from '../../../../../assets/images/avt.jpg'
import './styles.scss'
const UserCard = ({ type, userData }) => {
  const navitage = useNavigate()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const dispatch = useDispatch()
  const { chat, successDetail } = useSelector((state) => state.chats)
  const { meData } = useSelector((state) => state.users)
  const { chatId } = useParams()
  const { watcheds } = useSelector((state) => state.watched)
  useEffect(() => {
    if (successDetail && chat) {
      navitage('/chat/' + chat._id)
    }
  }, [successDetail])

  const handleCreate = (user) => {
    const payload = { title: user.fullname, membersId: [meData._id, user._id] }
    dispatch(createChat(payload))
  }

  return (
    <Space direction='vertical' className='d-flex user-card'>
      {userData.map((user) => (
        <div key={user._id}>
          {type == 'userList' ? (
            <Link to={'/chat/' + user._id}>
              <Card hoverable size='small' className={`${chatId === user._id ? 'active' : 'unactive'}`}>
                <Flex justify='space-between' align='center'>
                  <Space>
                    <p className='avt-badge'>
                      <Avatar
                        size={45}
                        src={
                          user.membersId?.length === 2
                            ? user.userData.find((u) => u._id !== meData._id)?.avtPicture
                              ? AVT + user.userData.find((u) => u._id !== meData._id)?.avtPicture
                              : noAvt
                            : noAvt
                        }
                      ></Avatar>
                      {/* <div className={`badge-status ${successDetail ? 'succ' : 'err'}`}></div> */}
                    </p>
                    <h3 className='user-if '>
                      {user.membersId?.length === 2
                        ? user.userData.find((u) => u._id !== meData._id)?.fullname
                        : user.title}
                    </h3>
                  </Space>
                  <p>{user.latestData?.createdAt && moment(user.latestData?.createdAt).fromNow()}</p>
                </Flex>
                <Flex justify='space-between'>
                  <p className='dangerHTMLOneLine desc' style={{ width: 'calc(100% - 25px)' }}>
                    {user.latestData?.userId === meData._id
                      ? 'Bạn: '
                      : user.userData.find((u) => u._id === user.latestData?.userId)
                      ? user.userData.find((u) => u._id === user.latestData?.userId)?.lastName + ': '
                      : ''}
                    {user.latestData?.text ? user.latestData?.text : ''}
                  </p>
                  <Badge count={watcheds?.find((w) => w.targetId === user._id)?.count}></Badge>
                </Flex>
              </Card>
            </Link>
          ) : (
            <Card hoverable size='small' onClick={() => (type == 'userList' ? {} : handleCreate(user))}>
              <Space className='d-flex'>
                <Avatar src={user.avtPicture ? AVT + user.avtPicture : noAvt}></Avatar>
                <h3>{user.fullname}</h3>
              </Space>
            </Card>
          )}
        </div>
      ))}
    </Space>
  )
}

export default UserCard
