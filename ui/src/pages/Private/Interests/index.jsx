import SearchMain from '@/components/Layout/Nav/Search/search'
import UserCard from '@/components/UserCard'
import { findUser, getMeData } from '@/redux/slice/userSlice'
import { Card, Col, Row, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Interests = () => {
  const dispatch = useDispatch()
  const { meData, users } = useSelector((state) => state.users)
  const { successDetail } = useSelector((state) => state.relationships)
  const [userList, setUserList] = useState([])
  useEffect(() => {
    dispatch(findUser({ options: { sort: { createdAt: -1 } } }))
  }, [])

  useEffect(() => {
    if (successDetail) dispatch(getMeData())
  }, [successDetail])

  useEffect(() => {
    if (meData) {
      const userData = users.filter(
        (u) => u._id !== meData._id && !meData?.relationshipsData?.following.includes(u._id),
      )
      setUserList(userData)
    }
  }, [meData])

  return (
    <Card style={{ margin: 24 }}>
      <Space direction='vertical' className='d-flex' size='large'>
        <Row justify='space-between' align='center'>
          <Col>
            <h2>Gợi ý theo dõi</h2>
          </Col>
          <Col span={5}>
            <SearchMain type='user' />
          </Col>
        </Row>
        <UserCard userData={userList} md={6} />
      </Space>
    </Card>
  )
}

export default Interests
