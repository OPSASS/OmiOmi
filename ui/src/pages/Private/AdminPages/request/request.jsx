import UserRequest from '@/components/Layout/AdminLayout/request/request'
import { getRequest } from '@/redux/slice/adminSlice'
import { Card } from 'antd'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'

export default function Requests() {
  document.title = 'Yêu cầu xóa tài khoản - OmiOmi'
  const dispatch = useDispatch()

  const { requests } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(getRequest())
  }, [])
  return (
    <Card style={{ margin: '0 24px' }}>
      <h2>Yêu cầu xóa tài khoản</h2>

      {requests?.length > 0
        ? requests?.map((request) => <UserRequest request={request} key={request._id} />)
        : 'Hiện không có yêu cầu nào!'}
    </Card>
  )
}
