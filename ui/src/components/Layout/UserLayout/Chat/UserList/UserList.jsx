import SearchMain from '@/components/Layout/Nav/Search/search'
import { userFollowings } from '@/redux/slice/userSlice'
import { useSocket } from '@/socket'
import { PlusOutlined } from '@ant-design/icons'
import { Button, Col, Collapse, Empty, Modal, Row, Space, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import UserCard from '../UserCard/UserCard'
import './styles.scss'
const UserList = ({ userOnline }) => {
  const dispatch = useDispatch()
  const { search } = useSelector((state) => state.searchs)
  const { meData, userFollowing } = useSelector((state) => state.users)
  const { chats, success, loading } = useSelector((state) => state.chats)
  const { message } = useSelector((state) => state.messages)
  const [chatsData, setChatsData] = useState([])
  const [keys, setKeys] = useState([])
  const [isNew, setIsNew] = useState(0)
  const socket = useSocket()
  const { chatId } = useParams()
  useEffect(() => {
    if (success) {
      setChatsData(chats)
    }
  }, [chats, success])

  useEffect(() => {
    if (meData?.relationshipsData?.following?.length > 0)
      dispatch(
        userFollowings({
          filterQuery: {
            _id: meData.relationshipsData.following,
          },
        }),
      )
  }, [meData])

  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (messageData) => {
        setChatsData((prevData) => {
          return prevData.map((item) => {
            if (item._id === messageData.chatId) {
              return {
                ...item,
                latestData: messageData,
              }
            }
            return item
          })
        })
        // setKeys(chatId ? keys : ['1'])
      })
    }
  }, [socket])

  useEffect(() => {
    if (message) {
      setChatsData((prevData) => {
        return prevData.map((item) => {
          if (item._id === message.chatId) {
            return {
              ...item,
              latestData: message,
            }
          }
          return item
        })
      })
      // setKeys(chatId ? keys : ['1'])
    }
  }, [message])

  console.log(chatsData)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  useEffect(() => {
    setIsModalOpen(false)
  }, [chatId])
  const ChatEmpty = () => (
    <div className='d-col-c'>
      <Empty description='Hiện không có cuộc trò chuyện nào!'>
        <div className='content'></div>
        <Button type='primary' onClick={showModal}>
          Thêm cuộc trò truyện
        </Button>
      </Empty>
    </div>
  )

  const isSended = chatsData?.filter((item) => {
    return item.chatData?.some((chat) => chat.userId === chatId && chat?.chat?.userId === meData._id)
  })
  const isUnReadData = chatsData?.filter((item) => {
    return item.chatData?.some((chat) => chat.userId === meData._id && chat.countUnRead > 0)
  })

  const items = [
    {
      key: '1',
      label: 'Chưa đọc',
      children: (
        <Space direction='vertical' className='sp100'>
          {isUnReadData.length === 0 ? (
            <ChatEmpty />
          ) : (
            isUnReadData.map((chatData) => {
              const userId = chatData.members.find((memberId) => memberId !== meData._id)
              const status = userOnline.find((chatData) => chatData.userId === userId)

              return (
                <UserCard
                  type={userId === userId ? 'active' : 'unactive'}
                  action='unread'
                  userId={userId}
                  meId={meData._id}
                  status={status ? true : false}
                  chatData={chatData?.chatData[isNew]}
                  key={userId}
                />
              )
            })
          )}
        </Space>
      ),
    },
    {
      key: '2',
      label: 'Đã trả lời',
      children: (
        <Space direction='vertical' className='sp100'>
          {isSended.length === 0 ? (
            <ChatEmpty />
          ) : (
            isSended.map((chatData) => {
              const userId = chatData.members.find((memberId) => memberId !== meData._id)
              const status = userOnline.find((chatData) => chatData.userId === userId)

              return (
                <UserCard
                  type={userId === userId ? 'active' : 'unactive'}
                  action='unread'
                  userId={userId}
                  meId={meData._id}
                  status={status ? true : false}
                  chatData={chatData?.chatData[isNew]}
                  key={userId}
                />
              )
            })
          )}
        </Space>
      ),
    },
    {
      key: '3',
      label: 'Tất cả',
      children: (
        <Space direction='vertical' className='sp100'>
          {chatsData.length === 0 ? <ChatEmpty /> : <UserCard type='userList' userData={chatsData} />}
        </Space>
      ),
    },
  ]
  const onChange = (key) => {
    setKeys(key)
  }
  return (
    <Space direction='vertical' className='d-flex'>
      <Row gutter={12} justify='space-between'>
        <Col span={20}>
          <SearchMain searchType='chat' />
        </Col>
        <Col span={4}>
          <Tooltip title='Thêm cuộc trò chuyện'>
            <Button icon={<PlusOutlined />} size='large' type='primary' onClick={showModal}></Button>
          </Tooltip>
        </Col>
      </Row>

      <Collapse
        onChange={onChange}
        items={items}
        defaultActiveKey={['3']}
        activeKey={keys.length > 0 ? keys : ['3']}
        bordered={false}
        expandIconPosition='end'
        accordion
        ghost
      />

      <Modal
        title='Người theo dõi'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        width={450}
      >
        <Scrollbars autoHide autoHideTimeout={1000} style={{ height: '60vh' }}>
          <Space direction='vertical' className='d-flex' style={{ padding: '0 5px' }}>
            <SearchMain searchType='following' />
            <UserCard userData={search.length > 0 ? search : userFollowing} />
          </Space>
        </Scrollbars>
      </Modal>
    </Space>
  )
}

export default UserList
