import Sending from '@/components/Sending/Sending'
import { createMessage, findMessage } from '@/redux/slice/messageSlice'
import { useSocket } from '@/socket'
import { LeftOutlined, SearchOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Empty, Image, Row, Space, Spin, Tag } from 'antd'
import moment from 'moment-timezone'
import { useCallback, useEffect, useRef, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { MdFileDownload, MdOutlineFilePresent } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import noAvt from '../../../../../assets/images/avt.jpg'
import MessageDetail from './MessageDetail'
import './styles.scss'

export default function Messages({ userOnline, chatId }) {
  const dispatch = useDispatch()

  const { users, meData } = useSelector((state) => state.users)
  const { chat, loadingDetail } = useSelector((state) => state.chats)
  const { messages, message, successDetail } = useSelector((state) => state.messages)
  const navitage = useNavigate()
  const socket = useSocket()
  const [messageData, setMessageData] = useState([])
  useEffect(() => {
    if (chatId) {
      setMessageData([])
      dispatch(
        findMessage({
          filterQuery: {
            chatId,
          },
          options: {
            sort: { createdAt: 1 },
          },
        }),
      )
    }
  }, [chatId])

  const handleNewChat = () => {
    const newChat = {
      chatId: chat._id,
      userId: meData?._id,
      text: 'Một ngày tốt lành nha!',
    }

    dispatch(createMessage(newChat))
  }

  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const FILE = import.meta.env.VITE_FILES_FOLDER
  const scrollRef = useRef(null)

  useEffect(() => {
    if (messages?.length > 0) setMessageData(messages)
  }, [messages])
  // useEffect(() => {
  //   if (message._id) setMessageData((prev) => [...prev, message])
  // }, [message])

  useEffect(() => {
    if (socket) {
      socket.on('recieve-message', (message) => {
        if (message.chatId === chatId) setMessageData((prev) => [...prev, message])
      })
    }
  }, [socket])

  useEffect(() => {
    if (scrollRef?.current)
      setTimeout(() => {
        const isMainScrollbarAtBottom =
          scrollRef.current?.scrollTop + scrollRef.current?.clientHeight === scrollRef.current?.scrollHeight
        if (isMainScrollbarAtBottom) {
          scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
        }
      }, 300)
  }, [messageData, successDetail, scrollRef])

  const groupMessagesByUserId = useCallback((messages) => {
    const groupedMessages = []
    let currentGroup = null

    for (const message of messages) {
      if (!currentGroup || currentGroup.userId !== message.userId) {
        currentGroup = {
          userId: message.userId,
          messages: [message],
        }
        groupedMessages.push(currentGroup)
      } else {
        currentGroup.messages.push(message)
      }
    }

    return groupedMessages
  }, [])
  const groupedMessages = groupMessagesByUserId(messageData)
  // const checkChat =
  //   (groupedMessages.some((item) => item.userId !== meData._id) && //1
  //     groupedMessages.some((item) => item.userId === meData._id)) ||
  //   (groupedMessages.some((item) => item.userId !== meData._id) && meData._id) //1

  const status = userOnline.find((chatData) => chatData.userId !== meData._id)
  const checkString = (text, id) => {
    const emojiRegex = /[\uD800-\uDFFF]./g

    const emojis = text?.match(emojiRegex)

    if (emojis && emojis.length > 0) {
      if (emojis.join('') === text) {
        return (
          <div
            className={`${id !== meData._id ? 'user-text' : 'me-text'} ${
              text.length > 2 ? 'iconSizeMd' : 'iconSizeLg'
            }`}
          >
            {text}
          </div>
        )
      } else {
        return <div className={`${id !== meData._id ? 'user-text user-bg' : 'me-text me-bg'}`}>{text}</div>
      }
    } else {
      return <div className={`${id !== meData._id ? 'user-text user-bg' : 'me-text me-bg'}`}>{text}</div>
    }
  }

  const renderFiles = (data, type) => {
    const handleDownload = (href) => {
      const link = document.createElement('a')
      link.href = href
      link.target = '_blank'
      link.download = 'ten_file'
      link.click()
    }

    if (type === 'images' && data.files.length > 0) {
      return (
        <div className={`${data.userId !== meData._id ? 'user-text' : 'me-text'}`} style={{ padding: 0 }}>
          <Row>
            {data.files.map((item) => (
              <Col
                span={24}
                md={(data.files.length === 1 && 24) || (data.files.length > 1 && 12) || (data.files.length > 4 && 8)}
                key={item}
              >
                <Image src={AVT + item} />
              </Col>
            ))}
          </Row>
        </div>
      )
    } else {
      return (
        <Card className={`${data.userId !== meData._id ? 'user-text user-bg' : 'me-text me-bg'}`} size='small'>
          <Space>
            <MdOutlineFilePresent />
            {data.files[0]}
            <Button icon={<MdFileDownload />} onClick={() => handleDownload(data.files[0])}></Button>
          </Space>
        </Card>
      )
    }
  }
  const user = chat?.userData?.find((us) => us._id !== meData._id)
  return (
    <div className='chat-body'>
      <Space direction='vertical' className='nav-message sp100'>
        <div className='chat-name d-space-c'>
          <Space>
            <Button icon={<LeftOutlined />} onClick={() => navitage('/chat')} shape='circle' type='text'></Button>
            <h2>
              {chat.membersId?.length === 2 ? chat.userData?.find((u) => u._id !== meData._id)?.fullname : chat.title}
            </h2>
            <Tag color={status ? 'success' : 'error'}>{status ? 'online' : 'offline'}</Tag>
          </Space>
          <Space>
            <Button icon={<SearchOutlined style={{ fontSize: 16 }} />} type='text' shape='circle'></Button>
          </Space>
        </div>
        <Card size='small' style={{ backgroundColor: 'var(--bgColor)' }}>
          <div className='message-main'>
            <Scrollbars autoHide autoHideTimeout={1000} style={{ height: '80vh' }} className='message-body'>
              {
                <div className='message-list'>
                  {loadingDetail ? (
                    <Spin tip='Vui lòng chờ...  ' style={{ marginTop: '40%' }}>
                      <div className='content' />
                    </Spin>
                  ) : (
                    <>
                      {groupedMessages?.length ? (
                        groupedMessages?.map((group, id) => {
                          const userData = chat?.userData?.find((us) => us._id === group.userId)
                          return (
                            <div
                              className={`${group.userId !== meData._id ? 'user-align' : 'me-align'} group-mess`}
                              key={id}
                            >
                              {group.userId !== meData._id && (
                                <Space size='small' className='show-if'>
                                  <Avatar src={userData?.avtPicture ? AVT + userData.avtPicture : noAvt} />
                                  <b>{userData?.fullname}</b>
                                  {(groupedMessages.length - 1 === id || groupedMessages.length - 2 === id) && (
                                    <p>{moment(group.messages[0].createdAt).fromNow()}</p>
                                  )}
                                </Space>
                              )}
                              {group.messages.map((item) => (
                                <MessageDetail
                                  key={item._id}
                                  data={item}
                                  meId={meData._id}
                                  group={group}
                                  length={groupedMessages.length}
                                  index={id}
                                />
                              ))}
                            </div>
                          )
                        })
                      ) : (
                        <Empty
                          style={{ marginTop: 100 }}
                          description={
                            <Space direction='vertical'>
                              <Space>
                                <p>Chưa có đoạn hội thoại nào với</p>
                                <b>{user?.lastName}</b>
                              </Space>
                              <Button onClick={handleNewChat}>
                                Hãy gửi lời chào tới
                                <b style={{ margin: '0 5px' }}>
                                  {chat?.userData?.length > 2
                                    ? 'những người bạn trong nhóm'
                                    : chat?.userData?.find((u) => u._id !== meData._id)?.fullname}
                                </b>
                                nào!
                              </Button>
                            </Space>
                          }
                        />
                      )}
                    </>
                  )}
                  <div ref={scrollRef}></div>
                </div>
              }
            </Scrollbars>
            <Sending type='chats' chatId={chatId} userId={meData._id} />
          </div>
        </Card>
      </Space>
    </div>
  )
}
