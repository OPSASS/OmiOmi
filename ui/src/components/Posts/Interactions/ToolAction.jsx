import CommentAction from '@/components/CommentAction'
import { updateInteraction } from '@/redux/slice/interactionSlice'
import { createMessage } from '@/redux/slice/messageSlice'
import { createNotifications } from '@/redux/slice/notificationsSlice'
import { useSocket } from '@/socket'
import { CommentOutlined, HeartFilled, HeartOutlined, ShareAltOutlined } from '@ant-design/icons'
import { Avatar, Button, Flex, Modal, Popover, Space, Tooltip, notification } from 'antd'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaCommentDots, FaShareAlt } from 'react-icons/fa'
import { LuReply } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import Comment from './Comment'

const RenderChats = ({ chat, meId, link, socket }) => {
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const { message, successDetail } = useSelector((state) => state.messages)
  useEffect(() => {
    if (socket && message && successDetail) {
      socket.emit('send-message', message)
    }
  }, [message, socket])
  const user = chat.userData.find((us) => us._id !== meId)
  return (
    <Button
      type='link'
      size='small'
      onClick={() => {
        const newChat = {
          chatId: chat._id,
          userId: meId,
          text: link,
          type: 'link',
        }
        dispatch(createMessage(newChat))
        notification.success({ message: 'Thông báo', description: 'Chia sẻ thành công' })
      }}
      style={{ height: 60 }}
    >
      <Flex vertical align='center'>
        <Avatar src={user?.avtPicture ? AVT + user?.avtPicture : noAvt} size={45} />
        <h4>{user?.fullname}</h4>
      </Flex>
    </Button>
  )
}

const ToolAction = ({ postData, type }) => {
  const dispatch = useDispatch()
  const { chats } = useSelector((state) => state.chats)
  const { meData } = useSelector((state) => state.users)
  const { targetId } = useParams()
  const { shortId } = useParams()
  const socket = useSocket()
  const [countFa, setCountFa] = useState(0)
  const [postFa, setPostFa] = useState(false)
  const [postCm, setPostCm] = useState(targetId ? true : false)
  const [postSh, setPostSh] = useState(false)
  const [reply, setReply] = useState(false)

  useEffect(() => {
    if (postData && postData.interactionData?.favorites.length > 0 && meData) {
      setCountFa(postData.interactionData?.favorites.length)
      setPostFa(postData.interactionData?.favorites.includes(meData._id))
    }
  }, [postData, meData])

  const handbleFa = () => {
    setPostFa(!postFa)

    if (postFa) {
      setCountFa((pv) => pv - 1)
      dispatch(updateInteraction({ id: postData.interactionId, body: { type: 'favorites', targetId: meData._id } }))
    } else {
      const sendfa = {
        sendId: meData._id,
        userId: postData.userId,
        targetId: postData._id,
        type: (type === 'comment' && 'COMMENT') || (type === 'short' && 'SHORT') || 'POST',
        text: `Đã thả cảm xúc tới ${
          (type === 'comment' && 'bình luận') || (type === 'short' && 'khoảnh khắc') || 'bài viết'
        } của bạn!`,
      }
      dispatch(createNotifications(sendfa))

      setCountFa((pv) => pv + 1)
      dispatch(updateInteraction({ id: postData.interactionId, body: { type: 'favorites', targetId: meData._id } }))
    }
  }

  return (
    <Space direction={type !== 'short' ? 'vertical' : 'horizontal'} className='d-flex'>
      {type === 'comment' ? (
        <Space direction='vertical' className='d-flex'>
          <Space>
            <Tooltip title={postFa ? 'Bỏ yêu thích' : 'Yêu thích'}>
              <Button
                size='large'
                type='text'
                icon={postFa || type === 'short' ? <HeartFilled /> : <HeartOutlined />}
                onClick={handbleFa}
              >
                {countFa}
                {''}
              </Button>
            </Tooltip>
            <Tooltip title='Trả lời'>
              <Button size='large' type='text' icon={<LuReply />} onClick={() => setReply(!reply)} />
            </Tooltip>
          </Space>
          {reply && (
            <CommentAction
              type='create'
              userId={postData.userId}
              targetId={postData.targetId}
              parentId={postData._id}
              reply={reply}
            />
          )}
        </Space>
      ) : (
        <Space direction={type === 'short' ? 'vertical' : 'horizontal'}>
          <div style={{ marginRight: 10, width: 65 }}>
            <Tooltip title={postFa ? 'Bỏ yêu thích' : 'Yêu thích'}>
              <Button
                className='favoriteButt'
                size='large'
                type='text'
                icon={
                  postFa || type === 'short' ? (
                    <HeartFilled style={{ color: postFa && type === 'short' ? '#ff6565' : undefined }} />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={handbleFa}
              >
                {countFa}
                {''}
              </Button>
            </Tooltip>
          </div>

          <Tooltip title='Bình luận'>
            <Button
              size='large'
              type='text'
              icon={type === 'short' ? <FaCommentDots /> : <CommentOutlined />}
              onClick={() => {
                setPostCm(!postCm)
              }}
            >
              {postData.countComment}
              {''}
            </Button>
          </Tooltip>
          <Popover
            title='Chia sẻ tới tin nhắn'
            content={
              <Scrollbars style={{ width: '100%', height: 70 }} autoHide autoHideTimeout={1000}>
                <Space>
                  {chats.map((item) => (
                    <RenderChats
                      key={item._id}
                      chat={item}
                      meId={meData._id}
                      link={
                        ((targetId || postData._id) && '/post/' + (targetId || postData._id)) ||
                        (shortId && '/shorts/' + shortId)
                      }
                      socket={socket}
                    />
                  ))}
                </Space>
              </Scrollbars>
            }
            trigger='click'
          >
            <Tooltip title='Chia sẻ'>
              <Button
                size='large'
                type='text'
                icon={type === 'short' ? <FaShareAlt /> : <ShareAltOutlined />}
                onClick={() => setPostSh(!postSh)}
              />
            </Tooltip>
          </Popover>
        </Space>
      )}
      {postCm &&
        (type === 'short' ? (
          <Modal open={postCm} footer={null} onCancel={() => setPostCm(false)}>
            <Comment userId={postData.userId} targetId={postData._id} />
          </Modal>
        ) : (
          <Comment userId={postData.userId} targetId={postData._id} />
        ))}
    </Space>
  )
}

export default ToolAction
