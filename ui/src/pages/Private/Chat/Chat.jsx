import svg from '@/assets/index'
import ChatDetail from '@/components/Layout/UserLayout/Chat/ChatDetail/ChatDetail'
import Messages from '@/components/Layout/UserLayout/Chat/Messages'
import UserList from '@/components/Layout/UserLayout/Chat/UserList/UserList'
import { getChatDetail } from '@/redux/slice/chatSlice'
import { createWatched } from '@/redux/slice/watchedSlice'
import { useSocket } from '@/socket'
import { Col, Row } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import './chat.scss'

function Chat() {
  const dispatch = useDispatch()
  const { meData } = useSelector((state) => state.users)

  const socket = useSocket()
  const [userOnline, setUserOnline] = useState([])
  socket?.on('get-user-status', (online) => {
    setUserOnline(online)
  })

  const { chatId } = useParams()

  useEffect(() => {
    if (chatId) {
      dispatch(getChatDetail(chatId))
      dispatch(createWatched(chatId))
    }
  }, [chatId])

  const EmptyChat = () => (
    <div className='d-col-c chat-empty'>
      <img src={svg.chat} alt='chat' width='80%' />
      <h1 className='title'>Trò chuyện trực tuyến</h1>
      <p className='desc'>
        Hãy bắt đầu cuộc trò chuyện hấp dẫn với bạn bè ngay hôm nay, để chia sẻ những khoảnh khắc và suy nghĩ thú vị
        cùng nhau!
      </p>
    </div>
  )

  return (
    <div className='chat-main'>
      <Row justify='space-between' gutter={12}>
        <Col span={24} sm={chatId ? 11 : 6} md={6}>
          <div className={`${chatId && 'hidden'} chat-left`}>
            <UserList userOnline={userOnline} />
          </div>
        </Col>
        <Col span={24} sm={chatId ? 13 : 18} md={chatId ? 12 : 18}>
          <div className={`${!chatId && 'hidden'} chat-middle`}>
            {chatId ? <Messages userOnline={userOnline} chatId={chatId} /> : <EmptyChat />}
          </div>
        </Col>
        {chatId && (
          <Col span={24} md={6}>
            <div className='chat-right'>
              <ChatDetail />
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Chat
