import { updateInteraction } from '@/redux/slice/interactionSlice'
import { DeleteOutlined, SmileOutlined } from '@ant-design/icons'
import { Button, Card, Col, Image, Popover, Row, Space, Tooltip } from 'antd'
import moment from 'moment-timezone'

import { BsReply } from 'react-icons/bs'
import { FiRotateCcw } from 'react-icons/fi'
import { MdFileDownload, MdOutlineFilePresent, MdOutlineMoreVert } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
const MessageDetail = ({ data, meId, group, length, index }) => {
  const { loadingDetail } = useSelector((state) => state.messages)
  const dispatch = useDispatch()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const handleAction = (type) => {
    switch (type) {
      case 'deletes':
        return () => dispatch(updateInteraction({ index: data.interactionId, body: { type, targetId: meId } }))

      case 'recalls':
        return () => dispatch(updateInteraction({ index: data.interactionId, body: { type, targetId: meId } }))

      case 'emotions':
        return () => dispatch(updateInteraction({ index: data.interactionId, body: { type, targetId: meId } }))

      case 'reply':
        return () => {
          // console.log("Reply to message",data);
          window.electron.ipcRenderer.send('open-modal', 'replyMessage')
          setTimeout(() => window.electron.ipcRenderer.send('set-content', { ...data, action: 'reply' }), 100)
        }
      default:
        return null
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
        <div className={`${data.userId !== meId ? 'user-text' : 'me-text'}`} style={{ padding: 0 }}>
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
        <Card className={`${data.userId !== meId ? 'user-text user-bg' : 'me-text me-bg'}`} size='small'>
          <Space>
            <MdOutlineFilePresent />
            {data.files[0]}
            <Button icon={<MdFileDownload />} onClick={() => handleDownload(data.files[0])}></Button>
          </Space>
        </Card>
      )
    }
  }

  const checkString = (text, id) => {
    const emojiRegex = /[\uD800-\uDFFF]./g

    const emojis = text?.match(emojiRegex)

    if (emojis && emojis.length > 0) {
      if (emojis.join('') === text) {
        return (
          <div className={`${id !== meId ? 'user-text' : 'me-text'} ${text.length > 2 ? 'iconSizeMd' : 'iconSizeLg'}`}>
            {text}
          </div>
        )
      } else {
        return <div className={`${id !== meId ? 'user-text user-bg' : 'me-text me-bg'}`}>{text}</div>
      }
    } else {
      return <div className={`${id !== meId ? 'user-text user-bg' : 'me-text me-bg'}`}>{text}</div>
    }
  }
  if (data)
    return (
      <div className='ms-item'>
        <Tooltip title={moment(data.createdAt).fromNow()}>
          <div className='item'>
            <Space className={`${group.userId !== meId ? 'us-more' : 'me-more'} chat-more`}>
              <Tooltip title='Trả lời'>
                <Button icon={<BsReply />} type='text' shape='circle' />
              </Tooltip>
              <Popover
                content={
                  <Space>
                    <Button
                      type='link'
                      icon={<p style={{ fontSize: 30, marginTop: 10, marginLeft: -5 }}>❤️</p>}
                    ></Button>

                    <Button
                      type='link'
                      icon={<p style={{ fontSize: 30, marginTop: 10, marginLeft: -5 }}>😁</p>}
                    ></Button>
                    <Button
                      type='link'
                      icon={<p style={{ fontSize: 30, marginTop: 10, marginLeft: -5 }}>😒</p>}
                    ></Button>

                    <Button
                      type='link'
                      icon={<p style={{ fontSize: 30, marginTop: 10, marginLeft: -5 }}>😮</p>}
                    ></Button>

                    <Button
                      type='link'
                      icon={<p style={{ fontSize: 30, marginTop: 10, marginLeft: -5 }}>🥲</p>}
                    ></Button>
                  </Space>
                }
              >
                <Button icon={<SmileOutlined />} type='text' shape='circle' />
              </Popover>

              <Popover
                content={
                  <Space direction='vertical'>
                    {group.userId === meId && <Button icon={<FiRotateCcw />}>Thu hồi tin nhắn</Button>}
                    <Button icon={<DeleteOutlined />} type='primary' danger>
                      Xóa tin nhắn
                    </Button>
                  </Space>
                }
                trigger='click'
                arrow
              >
                <Button icon={<MdOutlineMoreVert />} type='text' shape='circle' />
              </Popover>
            </Space>

            <Space className={`${group.userId !== meId ? 'user-align' : 'me-align'}`}>
              {data.files.length > 0 ? renderFiles(data, data.type) : checkString(data.text, group.userId)}
            </Space>
            {group.userId === meId && length === index + 1 && (
              <p className='show-time'>{loadingDetail ? 'Đang gửi' : 'Đã gửi'}</p>
            )}
          </div>
        </Tooltip>
      </div>
    )
}

export default MessageDetail
