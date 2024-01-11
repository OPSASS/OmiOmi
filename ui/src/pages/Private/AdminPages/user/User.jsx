import { resetPass } from '@/Redux/slice/adminSlice'
import {
  AdminPanelSettingsRounded,
  CalendarToday,
  DeleteSweepRounded,
  HomeRounded,
  PermIdentity,
  PermIdentityRounded,
  ReportRounded,
  Wc,
} from '@mui/icons-material'
import { Avatar, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import './user.scss'

export default function User() {
  const dispatch = useDispatch()
  const { userId } = useParams()

  const { users } = useSelector((state) => state.users)
  const { error, message } = useSelector((state) => state.admin)

  const [user] = users?.filter((user) => {
    return user._id === userId
  })
  document.title = `Thông tin của ${user?.fullname} - OmiOmi`
  const AVT = process.env.REACT_APP_PUBLIC_IMAGES_FOLDER

  const birthday = () => {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return [day, month, year].join('-')
  }

  const [random, setRandom] = useState('')

  const [data, setData] = useState({
    id: '',
    CCCD: '',
    dateCCCD: '',
    password: '',
  })
  const handleRandom = () => {
    setRandom(true)
    const r = Math.random().toString(36).slice(-8)
    setData({ ...data, password: r })
    setCPassword(r)
  }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const [cPassword, setCPassword] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    setData({ ...data, id: user?._id })
  }, [data, user])

  useEffect(() => {
    if (error) {
      toast.error(message)
      return
    }
  }, [error, message])

  const handlePassword = (e) => {
    e.preventDefault()

    if (!data.CCCD || !data.dateCCCD || !data.password) {
      toast.error('Vui lòng nhập đầy đủ thông tin rồi thử lại!')
      return
    }
    if (data.password !== cPassword) {
      toast.error('Mật khẩu không trùng khớp! Vui lòng thử lại!')
      return
    }
    if (error) return
    else {
      dispatch(resetPass(data))
      toast.success('Đổi mật khẩu thành công! Mật khẩu mới là: ' + data.password)
      setPassword(data.password)
    }
  }

  return (
    <div className='container2'>
      <div className='sidebar sticky bo'>
        <h3 className='sidebar-title'>Bảng điều khiển</h3>
        <Link to='/admin'>
          <div className='sidebarListItem d-space-cl bo'>
            <HomeRounded />
            <p>Trang chủ</p>
          </div>
        </Link>

        <h3 className='sidebar-title'>Quản lý</h3>
        <Link to='/admin/users'>
          <div className='sidebarListItem d-space-cl bo active'>
            <PermIdentityRounded />
            <p>Người dùng</p>
          </div>
        </Link>

        <Link to='/admin/reports'>
          <div className='sidebarListItem d-space-cl bo'>
            <ReportRounded />
            <p>Báo cáo</p>
          </div>
        </Link>

        <Link to='/admin/requests'>
          <div className='sidebarListItem d-space-cl bo'>
            <DeleteSweepRounded sx={{ marginLeft: '3px', marginRight: '-3px' }} />
            <p>Yêu cầu xóa tài khoản</p>
          </div>
        </Link>

        <h3 className='sidebar-title'>Nhân viên</h3>
        <Link to='/admin/adminusers'>
          <div className='sidebarListItem d-space-cl bo'>
            <AdminPanelSettingsRounded />
            <p>Đội ngũ Admin</p>
          </div>
        </Link>
      </div>
      <div className='user'>
        <h2>Thông tin người dùng</h2>

        <div className='userContainer'>
          <div className='userShow bo bong'>
            <div className='d-space-cl'>
              {user?.avtPicture ? <Avatar src={AVT + user?.avtPicture} /> : <Avatar />}
              <div className='ml10'>
                <h4>{user?.fullname}</h4>
                {user?.nickname ? <p>@{user?.nickname}</p> : null}
              </div>
            </div>

            <div className='userShowBottom'>
              <span className='userShowTitle'>Thông tin cá nhân</span>
              <div className='userShowInfo'>
                <PermIdentity className='userShowIcon' />
                <span className='userShowInfoTitle'>{user?.username}</span>
              </div>
              <div className='userShowInfo'>
                <CalendarToday className='userShowIcon' />
                <span className='userShowInfoTitle'>{birthday(user?.birthday)}</span>
              </div>
              <div className='userShowInfo'>
                <Wc className='userShowIcon' />
                <span className='userShowInfoTitle'>{user?.sex}</span>
              </div>
            </div>
          </div>
          <div className='userUpdate bo bong'>
            <h2>Cấp lại mật khẩu</h2>

            <div>
              <div className='d-space-cl'>
                <p className='mr10'>Id:</p>
                <TextField variant='standard' name='id' value={user?._id} disabled sx={{ width: 300 }} />
              </div>
              <div className='d-flex'>
                <div className='d-space-cl'>
                  <p className='mr10'>CCCD:</p>
                  <TextField
                    type='number'
                    maxLength={12}
                    minLength={8}
                    variant='standard'
                    name='CCCD'
                    value={data.CCCD}
                    placeholder='01234...'
                    onChange={handleChange}
                    sx={{ width: 300 }}
                    required
                  />
                </div>
                <div className='d-space-cl m15'>
                  <p className='mr10'>Ngày cấp: </p>
                  <TextField
                    type='date'
                    variant='standard'
                    name='dateCCCD'
                    value={data.dateCCCD}
                    onChange={handleChange}
                    sx={{ width: 245 }}
                    required
                  />
                </div>
              </div>
              <div className='d-space-cl'>
                <div className='d-space-cl'>
                  <TextField
                    type='password'
                    minLength={6}
                    label='Mật khẩu mới'
                    variant='standard'
                    name='password'
                    value={data.password}
                    placeholder='*********'
                    onChange={handleChange}
                    disabled={random ? true : false}
                    sx={{ width: 300 }}
                    required
                  />
                  <button
                    className='butt bong m5'
                    style={{ padding: 7 }}
                    onClick={handleRandom}
                    disabled={random ? true : false}
                  >
                    Random
                  </button>
                </div>

                <div className='ml15'>
                  <TextField
                    type='password'
                    minLength={6}
                    label='Nhập lại mật khẩu mới'
                    variant='standard'
                    name='cPassword'
                    value={cPassword}
                    placeholder='*********'
                    onChange={(e) => setCPassword(e.target.value)}
                    disabled={random ? true : false}
                    sx={{ width: 300 }}
                    required
                  />
                </div>
              </div>

              {password ? (
                <div className='mt15'>
                  Mật khẩu đã cấp lại: <h3>{data.password}</h3>
                </div>
              ) : null}
            </div>

            <button className='butt mt15 bong' onClick={handlePassword}>
              Cấp lại
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
