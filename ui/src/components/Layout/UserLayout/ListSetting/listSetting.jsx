import TextAreaForm from '@/components/TextAreaForm'
import { userFeedback } from '@/redux/slice/adminSlice'
import { logout, resetAuth } from '@/redux/slice/authSlice'
import { SettingOutlined } from '@ant-design/icons'
import { Avatar, Button, Drawer, Flex, Form, Menu, Modal, Rate, Space, Tooltip, notification } from 'antd'
import { Fragment, useEffect, useState } from 'react'
import { BsPostcardHeart } from 'react-icons/bs'
import { CgBlock } from 'react-icons/cg'
import { FiLogOut } from 'react-icons/fi'
import { MdOutlineFeedback, MdOutlineWhatshot } from 'react-icons/md'
import { RiUserFollowLine } from 'react-icons/ri'
import { TbUserEdit } from 'react-icons/tb'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import noAvt from '../../../../assets/images/avt.jpg'
export default function ListSetting() {
  const dispatch = useDispatch()
  const location = useLocation().pathname
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  const [form] = Form.useForm()
  const { meData } = useSelector((state) => state.users)

  const [stars, setStars] = useState(5)

  const handleFeedback = (value) => {
    const newFeedback = {
      text: value.text,
      userId: meData?._id,
      stars: stars,
    }

    notification.success({ message: 'Thông báo', description: 'Đã gửi phản hồi! Cảm ơn sự đóng góp của bạn!' })
    dispatch(userFeedback(newFeedback))
    form.resetFields()
  }

  const handleLogout = () => {
    dispatch(logout())
    dispatch(resetAuth())
  }

  const [openRate, setOpenRate] = useState(false)
  const handleRate = () => {
    form.submit()
    setOpenRate(!openRate)
  }

  const [openSetting, setOpenSetting] = useState(false)

  useEffect(() => {
    setOpenSetting(false)
  }, [location])

  const menuItem = [
    {
      icon: <TbUserEdit size={16} />,
      label: 'Cài đặt trang cá nhân',
      href: '/profile/' + meData._id + '/settings',
      key: '/profile/' + meData._id + '/settings',
    },
    {
      icon: <BsPostcardHeart size={14} />,
      label: 'Bài viết của tôi',
      href: '/profile/' + meData._id,
      key: '/profile/' + meData._id,
    },
    {
      icon: <MdOutlineWhatshot size={16} />,
      label: 'Tin của tôi',
      href: '/profile/' + meData._id + '/shorts',
      key: '/profile/' + meData._id + '/shorts',
    },
    {
      icon: <RiUserFollowLine size={16} />,
      label: 'Đang theo dõi',
      href: '/profile/' + meData._id + '/following',
      key: '/profile/' + meData._id + '/following',
    },
    {
      icon: <CgBlock size={16} />,
      label: 'Đang chặn',
      href: '/profile/' + meData._id + '/blocks',
      key: '/profile/' + meData._id + '/blocks',
    },
    {
      icon: <MdOutlineFeedback size={16} />,
      label: 'Góp ý và đánh giá',
      key: 'feedback',
      onClick: () => setOpenRate(true),
    },
  ]
  return (
    <div>
      <Fragment>
        <Tooltip title='Cài đặt'>
          <Button
            className='buttMenu'
            icon={<SettingOutlined />}
            type='text'
            shape='circle'
            size='large'
            onClick={() => setOpenSetting(!openSetting)}
          ></Button>
        </Tooltip>
        <Drawer
          open={openSetting}
          closeIcon={null}
          placement='left'
          width={300}
          onClose={() => setOpenSetting(false)}
          footer={
            <Button type='text' size='large' onClick={handleLogout} style={{ width: '100%' }}>
              <Flex align='center'>
                <FiLogOut size={24} /> <h3 style={{ marginLeft: 5 }}>Đăng xuất</h3>
              </Flex>
            </Button>
          }
          title={
            <Link to={'/profile/' + meData._id}>
              <Space>
                <Avatar size={50} src={meData.avtPicture ? AVT + meData.avtPicture : noAvt} />
                <h3>{meData.fullname}</h3>
              </Space>
            </Link>
          }
        >
          <Menu>
            {menuItem?.map((item) => (
              <Menu.Item key={`${item?.key}`} onClick={item.onClick} icon={item.icon}>
                {item.href ? <Link to={`${item?.href}`}>{item?.label}</Link> : item?.label}
              </Menu.Item>
            ))}
          </Menu>
        </Drawer>
      </Fragment>

      <Modal title='Gửi đánh giá' open={openRate} onCancel={() => setOpenRate(false)} onOk={handleRate} okText='Gửi'>
        <Space direction='vertical' className='d-flex'>
          <Form form={form} onFinish={handleFeedback}>
            <TextAreaForm form={form} name='text' minRows={5} maxLength={300} showButtonSend={false} />
          </Form>

          <p>Mức độ hài lòng của bạn với OmiOmi là?</p>
          <Rate
            value={stars}
            onChange={(e) => {
              setStars(e)
            }}
          />
        </Space>
      </Modal>
    </div>
  )
}
