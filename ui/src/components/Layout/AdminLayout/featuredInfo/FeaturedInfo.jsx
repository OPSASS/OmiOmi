import { getDashboardData } from '@/redux/slice/adminSlice'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Card, Col, Flex, Row } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './featuredInfo.scss'
export default function FeaturedInfo() {
  const dispatch = useDispatch()
  const { feedbacks, dashboardData } = useSelector((state) => state.admin)
  const { users } = useSelector((state) => state.users)
  const { posts } = useSelector((state) => state.posts)
  useEffect(() => {
    dispatch(getDashboardData())
  }, [])

  return (
    <Row gutter={24}>
      <Col span={24} md={8}>
        <Card hoverable>
          <div className='featuredTitle'>Người dùng</div>
          <Flex justify='space-between' align='center' className='featuredMoneyContainer'>
            <h1>{users.length}</h1>
            <Flex
              gap={15}
              className={`featuredMoneyRate featuredIcon ${dashboardData.userGrowth > 0 ? '' : ' negative'}`}
              align='baseline'
            >
              <h2>{dashboardData.newUserCount}</h2>
              <Flex gap={5}>
                <p>{dashboardData.userGrowth > 0 ? '+' + dashboardData.userGrowth : dashboardData.userGrowth}%</p>{' '}
                {dashboardData.userGrowth > 0 ? <UpOutlined /> : <DownOutlined />}
              </Flex>
            </Flex>
          </Flex>
          <span className='featuredSub'>Xét theo tuần</span>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card hoverable>
          <div className='featuredTitle'>Bài viết</div>
          <Flex justify='space-between' align='center' className='featuredMoneyContainer'>
            <h1>{posts.length}</h1>

            <Flex
              gap={15}
              className={`featuredMoneyRate featuredIcon ${dashboardData.postGrowth > 0 ? '' : ' negative'}`}
              align='baseline'
            >
              <h2>{dashboardData.newPostCount}</h2>
              <Flex gap={5}>
                <p>{dashboardData.postGrowth > 0 ? '+' + dashboardData.postGrowth : dashboardData.postGrowth}%</p>{' '}
                {dashboardData.postGrowth > 0 ? <UpOutlined /> : <DownOutlined />}
              </Flex>
            </Flex>
          </Flex>
          <span className='featuredSub'>Xét theo tuần</span>
        </Card>
      </Col>
      <Col span={24} md={8}>
        <Card hoverable>
          <div className='featuredTitle'>Lượt đánh giá</div>
          <Flex justify='space-between' align='center' className='featuredMoneyContainer'>
            <h1>{feedbacks.length}</h1>

            <Flex
              gap={15}
              className={`featuredMoneyRate featuredIcon ${dashboardData.feedbackGrowth > 0 ? '' : ' negative'}`}
              align='baseline'
            >
              <h2>{dashboardData.newFeedbackCount}</h2>
              <Flex gap={5}>
                <p>
                  {dashboardData.feedbackGrowth > 0 ? '+' + dashboardData.feedbackGrowth : dashboardData.feedbackGrowth}
                  %
                </p>
                {dashboardData.feedbackGrowth > 0 ? <UpOutlined /> : <DownOutlined />}
              </Flex>
            </Flex>
          </Flex>
          <span className='featuredSub'>Xét theo tuần</span>
        </Card>
      </Col>
    </Row>
  )
}
