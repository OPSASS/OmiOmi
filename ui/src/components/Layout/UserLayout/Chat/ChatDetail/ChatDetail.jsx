import UserCard from '@/components/UserCard'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import { DeleteOutlined, IdcardOutlined, LogoutOutlined, TeamOutlined, UsergroupAddOutlined } from '@ant-design/icons'
import { Avatar, Button, Card, Col, Collapse, Image, Popconfirm, Row, Space, Spin, Tooltip, notification } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { LuBell, LuBellOff, LuEye, LuEyeOff } from 'react-icons/lu'
import { useDispatch, useSelector } from 'react-redux'
import Masonry from 'react-responsive-masonry'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import noAvt from '../../../../../assets/images/avt.jpg'

const ChatDetail = () => {
  const dispatch = useDispatch()
  const { messages, messLoading } = useSelector((state) => state.messages)
  const { users, user, meData } = useSelector((state) => state.users)
  const { chat } = useSelector((state) => state.chats)
  const [bell, setBell] = useState(true)
  const [hidden, setHidden] = useState(true)
  const [openList, setOpenList] = useState(false)

  const navitage = useNavigate()
  const imgData = messages
    ?.filter((item) => item.type === 'images')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  const files = messages
    ?.filter((item) => item.type === 'files')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  const location = useLocation()
  const urlImage = []

  imgData.forEach((item) => {
    const imgUrls = item.files.map((file) => ({ img: file }))
    urlImage.push(...imgUrls)
  })

  const IMG = import.meta.env.VITE_IMAGES_FOLDER
  const FILE = import.meta.env.VITE_FILES_FOLDER
  const handleDownload = (href) => {
    const link = document.createElement('a')
    link.href = href
    link.target = '_blank'
    link.download = 'ten_file'
    link.click()
  }

  const items = [
    {
      key: '1',
      label: (
        <div className='title d-space'>
          <Space>
            <h3>Ảnh & Video</h3>
            <div className='count'>{urlImage.length}</div>
          </Space>
          {/* <Button type="link">Xem tất cả</Button> */}
        </div>
      ),
      children: (
        <div className='image'>
          {messLoading ? (
            <Spin tip='Vui lòng chờ...  '>
              <div className='content' />
            </Spin>
          ) : (
            <Masonry columnsCount={2} gutter='12px'>
              {urlImage.slice(0, 4).map((item) => (
                <Image.PreviewGroup
                  key={item.img}
                  items={urlImage.map((image) => {
                    return IMG + image.img
                  })}
                >
                  <Image src={IMG + item.img} style={{ maxHeight: 250, objectFit: 'cover', borderRadius: 15 }} />
                </Image.PreviewGroup>
              ))}
            </Masonry>
          )}
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div className='title d-space'>
          <Space>
            <h3>Tệp tài liệu</h3>
            <div className='count'>{files.length}</div>
          </Space>
          {/* <Button type="link">Xem tất cả</Button> */}
        </div>
      ),
      children: (
        <div className='file'>
          <Space direction='vertical' className='sp100'>
            {files.map((item) => (
              <Card size='small' key={item._id}>
                <Row gutter={12}>
                  <Col span={24} md={4}>
                    <Button type='text'>Text</Button>
                  </Col>
                  <Col span={24} md={16}>
                    <div>
                      <b style={{ overflowWrap: 'break-word' }}>
                        {item.files[0].replace('http://localhost:3001/files/', '')}
                      </b>
                      <p>{moment(item.createdAt).format('HH:mm A - DD/MM/YYYY')}</p>
                    </div>
                  </Col>
                  <Col span={24} md={4}>
                    <Button onClick={() => handleDownload(item.files[0])}>download</Button>
                  </Col>
                </Row>
              </Card>
            ))}
          </Space>
        </div>
      ),
    },
    // {
    //   key: '3',
    //   label: (
    //     <div className="title d-space">
    //       <Space>
    //         <h3>Liên kết</h3>
    //         <div className="count">12</div>
    //       </Space>
    //       {/* <Button type="link">Xem tất cả</Button> */}
    //     </div>
    //   ),
    //   children: (
    //     <div className="link">
    //       <Space direction="vertical" className="sp100">
    //         <Card size="small">
    //           <Space>
    //             <Button icon={<PublicOutlined />} type="text"></Button>
    //             <div>
    //               <b>Facebook</b>
    //               <p>
    //                 <Link to="https://www.facebook.com/">https://www.facebook.com/</Link>
    //               </p>
    //             </div>
    //           </Space>
    //         </Card>
    //         <Card size="small">
    //           <Space>
    //             <Button icon={<PublicOutlined />} type="text"></Button>
    //             <div>
    //               <b>Meta</b>
    //               <p>
    //                 {' '}
    //                 <Link to="https://about.meta.com/">https://about.meta.com/</Link>
    //               </p>
    //             </div>
    //           </Space>
    //         </Card>
    //       </Space>
    //     </div>
    //   ),
    // },
  ]

  if (chat)
    return (
      <Space className='sp100' direction='vertical'>
        <Card className='action-list bo' size='small'>
          <Space direction='vertical' className='sp100' size='large'>
            <Space>
              <Avatar
                size={45}
                src={
                  chat.membersId?.length === 2
                    ? chat?.userData?.find((u) => u._id !== meData._id).avtPicture
                      ? IMG + chat?.userData?.find((u) => u._id !== meData._id).avtPicture
                      : noAvt
                    : noAvt
                }
              />
              <h3>
                {chat.membersId?.length === 2
                  ? chat?.userData?.find((u) => u._id !== meData._id)?.fullname
                  : chat.title}
              </h3>
            </Space>
            <div className='d-space'>
              <Tooltip title={(bell ? 'Tắt' : 'Bật') + ' thông báo'}>
                <Button icon={bell ? <LuBell /> : <LuBellOff />} size='large' onClick={() => setBell(!bell)}></Button>
              </Tooltip>
              {chat.userData?.length < 3 ? (
                <>
                  <Tooltip title='Xem trang cá nhân'>
                    <Link to={'/user/' + chat?.membersId.find((u) => u !== meData._id)}>
                      <Button icon={<IdcardOutlined />} size='large'></Button>
                    </Link>
                  </Tooltip>
                  <Tooltip title={(hidden ? 'Ẩn' : 'Bỏ ẩn') + ' cuộc hội thoại'}>
                    <Popconfirm
                      destroyTooltipOnHide
                      arrow
                      title='Ẩn đoạn chat'
                      description={'Bạn có chắc chắn muốn ẩn đoạn chat này không?'}
                      onConfirm={() => {
                        dispatch(
                          updateRelationships({
                            id: meData.relationshipsId,
                            body: {
                              type: 'hiddenChat',
                              targetId: chat._id,
                            },
                          }),
                        )

                        notification.success({
                          message: 'Thông báo',
                          description: `Ẩn đoạn chat thành công!`,
                        })
                        navitage('/chat')
                      }}
                    >
                      <Button
                        icon={hidden ? <LuEye /> : <LuEyeOff />}
                        size='large'
                        onClick={() => setHidden(!hidden)}
                      ></Button>
                    </Popconfirm>
                  </Tooltip>
                  <Tooltip title='Xóa cuộc hội thoại'>
                    <Popconfirm
                      destroyTooltipOnHide
                      arrow
                      title='Xóa đoạn chat'
                      description={'Bạn có chắc chắn muốn xóa đoạn chat này không?'}
                      onConfirm={() => {
                        dispatch(
                          updateRelationships({
                            id: meData.relationshipsId,
                            body: {
                              type: 'deleteChat',
                              targetId: chat._id,
                            },
                          }),
                        )

                        notification.success({
                          message: 'Thông báo',
                          description: `Xóa đoạn chat thành công!`,
                        })
                        navitage('/chat')
                      }}
                    >
                      <Button icon={<DeleteOutlined />} type='primary' size='large' danger></Button>
                    </Popconfirm>
                  </Tooltip>
                </>
              ) : (
                <>
                  <Tooltip title='Danh sách thành viên'>
                    <Button icon={<TeamOutlined />} size='large' onClick={() => setOpenList(!openList)}></Button>
                  </Tooltip>
                  <Tooltip title='Thêm thành viên'>
                    <Button icon={<UsergroupAddOutlined />} size='large'></Button>
                  </Tooltip>
                  <Tooltip title='Rời khỏ nhóm chat'>
                    <Popconfirm
                      destroyTooltipOnHide
                      arrow
                      title='Rời khỏ nhóm chat'
                      description={'Bạn có chắc chắn muốn rời khỏ nhóm chat này không?'}
                      onConfirm={() => {
                        dispatch(
                          updateRelationships({
                            id: meData.relationshipsId,
                            body: {
                              type: 'deleteChat',
                              targetId: chat._id,
                            },
                          }),
                        )

                        notification.success({
                          message: 'Thông báo',
                          description: `Rời khỏ nhóm chat thành công!`,
                        })
                        navitage('/chat')
                      }}
                    >
                      <Button icon={<LogoutOutlined />} size='large' danger></Button>
                    </Popconfirm>
                  </Tooltip>
                </>
              )}
            </div>
          </Space>
        </Card>
        <Scrollbars style={{ height: '70vh' }} autoHide autoHideTimeout={1000}>
          <Collapse items={items} defaultActiveKey={['1']} bordered={false} expandIconPosition='end' accordion ghost />
          {openList && (
            <Space direction='vertical' className='d-flex'>
              <Space>
                <h3>Danh sách thành viên</h3>
                {chat.userData?.length}
              </Space>
              <div style={{ margin: '0 5px' }}>
                <UserCard userData={chat.userData}></UserCard>
              </div>
            </Space>
          )}
        </Scrollbars>
      </Space>
    )
}

export default ChatDetail
