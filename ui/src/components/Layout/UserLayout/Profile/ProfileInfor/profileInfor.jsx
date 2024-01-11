import { userRepost } from '@/redux/slice/adminSlice'
import { resetFileData, uploadFile } from '@/redux/slice/filesSlice'
import { createPost, findPost } from '@/redux/slice/postSlice'
import { updateRelationships } from '@/redux/slice/relationshipsSlice'
import { updateUser } from '@/redux/slice/userSlice'
import { StopOutlined } from '@ant-design/icons'
import { Button, Flex, Form, Image, Modal, Radio, Space, Upload, notification } from 'antd'
import ImgCrop from 'antd-img-crop'
import { useEffect, useState } from 'react'
import { LuImagePlus } from 'react-icons/lu'
import { MdOutlineCamera, MdOutlineReportGmailerrorred } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../../../../assets/images/avt.jpg'
import './profileInfor.scss'

function ProfileInfor() {
  const dispatch = useDispatch()
  const [form] = Form.useForm()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const { user, meData, loadingDetail } = useSelector((state) => state.users)
  const { posts } = useSelector((state) => state.posts)
  const { file } = useSelector((state) => state.files)
  const [follow, setFollow] = useState(false)
  const [block, setBlock] = useState(false)
  const [uploadType, setUploadType] = useState(null)
  const [filePreview, setFilePreview] = useState(null)

  useEffect(() => {
    if (user) {
      dispatch(
        findPost({
          filterQuery: {
            userId: user._id,
          },
        }),
      )
    }
  }, [user])

  useEffect(() => {
    if (file.length > 0) {
      setFilePreview(file[0])
    }
  }, [file])

  const handleChange = (file, type) => {
    setUploadType(type)

    if (file) {
      dispatch(uploadFile({ type, data: file }))
    }
  }

  const handleUpload = () => {
    dispatch(
      updateUser({
        id: meData._id,
        body: {
          avtPicture: uploadType === 'avatar' ? file[0] : undefined,
          bgPicture: uploadType === 'background' ? file[0] : undefined,
        },
      }),
    )
    if (uploadType === 'avatar') {
      const newPost = {
        desc: meData.fullname + ' đã cập nhật ảnh đại diện',
        userId: meData._id,
        images: file,
      }
      dispatch(createPost(newPost))
    }
    notification.success({
      message: 'Thông báo',
      description: `Đã cập nhật ${uploadType === 'avatar' ? 'ảnh đại diện' : 'ảnh bìa'} thành công!`,
    })
    handleCancel()
  }

  const handleCancel = () => {
    setUploadType(null)
    dispatch(resetFileData())
  }

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
    if (follow) {
      dispatch(
        updateRelationships({
          id: meData.relationshipsId,
          body: {
            type: 'follow',
            targetId: user._id,
          },
        }),
      )
    }
    notification.success({ message: 'Thông báo', description: `Đã ${block ? 'bỏ' : ''} chặn người dùng` })
    setBlock(!block)
    setFollow(false)
  }
  const [repostOpen, setRepostOpen] = useState(false)
  const repostOption = [
    'Giả mạo người khác',
    'Tài khoản giả mạo',
    'Tên giả mạo',
    'Quấy rối',
    'Nội dung không phù hợp',
    'Giúp đỡ',
    'Khác',
  ]
  if (user)
    return (
      <div className='profile-infor'>
        <div className='prf-top'>
          {user?._id === meData?._id ? (
            <Upload
              name='bg'
              accept='image/*'
              showUploadList={false}
              beforeUpload={(_, file) => {
                handleChange(file, 'background')
              }}
              maxCount={1}
            >
              <Button icon={<LuImagePlus />}>Đổi ảnh bìa</Button>
            </Upload>
          ) : (
            <Button onClick={() => setRepostOpen(true)}>
              <Flex align='center'>
                <MdOutlineReportGmailerrorred size={16} /> Báo cáo người dùng
              </Flex>
            </Button>
          )}
        </div>
        {uploadType ? (
          <div className='formBg d-space-cl'>
            <Space>
              <p>Bạn có chắc muốn đổi ảnh {uploadType === 'avatar' ? 'ảnh đại diện' : 'ảnh bìa'} của bạn không?</p>
              <Button onClick={handleCancel}>Hủy</Button>
              <Button type='primary' loadingDetail={loadingDetail} onClick={handleUpload}>
                Tiếp tục
              </Button>
            </Space>
          </div>
        ) : null}

        <div className='d-col-c'>
          <Space direction='vertical' className='info d-col-c bong'>
            <div className='avt-prf tron'>
              {user._id === meData?._id ? (
                <div className='avt-update'>
                  <ImgCrop rotationSlider cropShape='round' showReset resetText='Đặt lại' aspect={1}>
                    <Upload
                      accept='image/*'
                      showUploadList={false}
                      beforeUpload={(_, file) => handleChange(file, 'avatar')}
                      maxCount={1}
                    >
                      <Image
                        src={
                          (uploadType === 'avatar' && AVT + filePreview) ||
                          (user.avtPicture && AVT + user.avtPicture) ||
                          noAvt
                        }
                        style={{ objectFit: 'cover' }}
                        width={'100%'}
                        title='Xem ảnh'
                        preview={false}
                      ></Image>

                      <Button shape='circle' className='avt-upload' type='text'>
                        <MdOutlineCamera size={60} color='white' />
                      </Button>
                    </Upload>
                  </ImgCrop>
                </div>
              ) : (
                <Image
                  src={user.avtPicture ? AVT + user.avtPicture : noAvt}
                  style={{ objectFit: 'cover' }}
                  width={'100%'}
                  title='Xem ảnh'
                  preview={user.avtPicture ? true : false}
                ></Image>
              )}
            </div>
            <h1>{user?.fullname}</h1>
            <p className='text-c' style={{ width: '50vw' }}>
              {user?.infor}
            </p>
            <div className='d-space' style={{ width: '350px', padding: 20 }}>
              <div className='text-c text-hv'>
                <b>{posts.length}</b>
                <p style={{ width: 90 }}>Số bài viết</p>
              </div>
              <div className='vr'></div>
              <div className='text-c text-hv'>
                <b>{user?.relationshipsData?.followers?.length}</b>
                <p>Người theo dõi</p>
              </div>
              <div className='vr'></div>
              <Link
                to={(user?._id === meData?._id ? '/profile/' : 'user') + user?._id + '/following'}
                className='text-c text-hv'
              >
                <b>{user?.relationshipsData?.following.length}</b>
                <p>Đang theo dõi</p>
              </Link>
            </div>
            {user?._id === meData?._id ? (
              <Link to={'/profile/' + meData?._id + '/settings'}>
                <Button type='primary' size='large'>
                  Sửa thông tin cá nhân
                </Button>
              </Link>
            ) : (
              <Space>
                <Button onClick={handleFollow} type={follow ? 'default' : 'primary'} size='large'>
                  {follow ? 'Bỏ theo' : 'Theo'} dõi
                </Button>
                {(block || follow) && (
                  <Button onClick={handleBlock} danger size='large' icon={<StopOutlined />}>
                    {!block ? 'Chặn' : 'Hủy chặn'} người dùng
                  </Button>
                )}
              </Space>
            )}
          </Space>
        </div>
        <Modal
          open={repostOpen}
          title={`Báo cáo ${user.fullname}`}
          onCancel={() => setRepostOpen(false)}
          onOk={() => {
            form.submit()
          }}
        >
          <Form
            form={form}
            onFinish={(value) => {
              const newRepost = {
                sendId: meData._id,
                userId: user._id,
                reason: value.repost,
              }

              dispatch(userRepost(newRepost))
              setRepostOpen(false)

              notification.success({
                message: 'Thông báo',
                description: `Báo cáo thành công!`,
              })
            }}
          >
            <Form.Item
              name='repost'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn 1 nội dung!',
                },
              ]}
            >
              <Radio.Group
                options={repostOption.map((i) => {
                  return { label: i, value: i }
                })}
              ></Radio.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    )
}

export default ProfileInfor
