import { getUserDetail } from '@/redux/slice/userSlice'
import { PictureOutlined } from '@ant-design/icons'
import { Card, Col, Row, Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { BsPostcardHeart } from 'react-icons/bs'
import { IoMale, IoMaleFemale } from 'react-icons/io5'
import { LiaBirthdayCakeSolid } from 'react-icons/lia'
import { MdOutlineAddReaction, MdOutlineWhatshot } from 'react-icons/md'
import { RiMapPin5Line, RiUserFollowLine, RiUserForbidLine } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import ProfileInfor from './ProfileInfor/profileInfor'
import './ProfileLayout.scss'
function Profile({ children }) {
  const BG = import.meta.env.VITE_IMAGES_FOLDER
  const { file, successDetail } = useSelector((state) => state.files)
  const { user, meData, errorDetail, messageDetail } = useSelector((state) => state.users)
  const dispatch = useDispatch()
  const { userId } = useParams()
  const loaction = useLocation().pathname
  useEffect(() => {
    if (userId) dispatch(getUserDetail(userId))
  }, [userId, successDetail])

  document.title = user?._id === meData?._id ? 'Trang cá nhân | OmiOmi' : user?.fullname + ' | OmiOmi'

  if (userId)
    return (
      <div className='bg-prf'>
        <div className='bg-img'>
          <img
            className='bg'
            src={
              (file.length > 0 && !file[0].type && file[0]?.includes('/background') && BG + file?.[0]) ||
              (user.bgPicture && BG + user.bgPicture) ||
              'https://picsum.photos/1500/750'
            }
            alt='bg'
          />
          {user?.bgPicture && <img className='bg2' src={BG + user.bgPicture} alt='bg2' />}
        </div>

        <div className='prf-main'>
          <Scrollbars autoHide autoHideTimeout={1000} style={{ height: '100vh' }}>
            <ProfileInfor />
            <div className='child-prf'>
              <Row justify='space-between' gutter={24}>
                <Col span={24} md={5}>
                  <Card hoverable className='prf-tab'>
                    <NavLink
                      to={(user?._id === meData?._id ? '/profile/' : '/user/') + user?._id}
                      className={({ isActive }) => (isActive ? 'active bo tab d-space-cl' : 'bo tab d-space-cl')}
                      end
                    >
                      <BsPostcardHeart />
                      <h4>Bài viết</h4>
                    </NavLink>
                    <NavLink
                      to={(user?._id === meData?._id ? '/profile/' : '/user/') + user?._id + '/shorts'}
                      className={({ isActive }) => (isActive ? 'active bo tab d-space-cl' : 'bo tab d-space-cl')}
                      end
                    >
                      <MdOutlineWhatshot size={25} />
                      <h4>Shorts</h4>
                    </NavLink>
                    <NavLink
                      to={(user?._id === meData?._id ? '/profile/' : '/user/') + user?._id + '/gallery'}
                      className={({ isActive }) => (isActive ? 'active bo tab d-space-cl' : 'bo tab d-space-cl')}
                      end
                    >
                      <PictureOutlined />
                      <h4>Thư viện ảnh</h4>
                    </NavLink>
                    <NavLink
                      to={(user?._id === meData?._id ? '/profile/' : '/user/') + user?._id + '/following'}
                      className={({ isActive }) => (isActive ? 'active bo tab d-space-cl' : 'bo tab d-space-cl')}
                      end
                    >
                      <RiUserFollowLine />
                      <h4>Đang theo dõi</h4>
                    </NavLink>
                    {user?._id === meData?._id && (
                      <NavLink
                        to={'/profile/' + user?._id + '/blocks'}
                        className={({ isActive }) => (isActive ? 'active bo tab d-space-cl' : 'bo tab d-space-cl')}
                        end
                      >
                        <RiUserForbidLine />
                        <h4>Đang chặn</h4>
                      </NavLink>
                    )}
                  </Card>
                </Col>
                <Col
                  span={24}
                  md={
                    loaction.includes('setting') || loaction.includes('blocks') || loaction.includes('following')
                      ? 19
                      : 13
                  }
                >
                  <Card hoverable>{children}</Card>
                </Col>
                {!loaction.includes('setting') && !loaction.includes('blocks') && !loaction.includes('following') && (
                  <Col span={24} md={6}>
                    <Card hoverable>
                      <Space direction='vertical' className='d-flex'>
                        <h2>Giới thiệu:</h2>

                        <Space>
                          {user?.gender === 'male' ? <IoMale /> : <IoMaleFemale style={{ color: 'pink' }} />}
                          <b>Giới tính:</b>
                          <p style={{ marginLeft: 5 }}>
                            {(user?.gender === 'male' && 'Nam') || (user?.gender === 'famale' && 'Nữ') || 'Khác'}
                          </p>
                        </Space>
                        {user?.marital ? (
                          <Space>
                            <MdOutlineAddReaction style={{ color: 'red' }} />
                            <b>Trạng thái:</b>
                            <p>{user?.marital}</p>
                          </Space>
                        ) : null}
                        {user?.city ? (
                          <Space>
                            <RiMapPin5Line style={{ color: 'orange' }} />
                            <b>Đến từ:</b>
                            <p>{user?.city}</p>
                          </Space>
                        ) : null}
                        <Space>
                          <LiaBirthdayCakeSolid style={{ color: 'pink' }} />
                          <b>Sinh nhật:</b>
                          <p>{moment(user?.birthday).format('DD/MM/YYYY')}</p>
                        </Space>
                      </Space>
                    </Card>
                  </Col>
                )}
              </Row>
            </div>
          </Scrollbars>
        </div>
      </div>
    )
}

export default Profile
