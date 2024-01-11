import { getFeedback } from '@/redux/slice/adminSlice'
import { Avatar, Card, Carousel, Empty, Flex, Rate, Space } from 'antd'
import moment from 'moment-timezone'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import noAvt from '../../../../assets/images/avt.jpg'
import './styles.scss'
const Feedback = () => {
  const dispatch = useDispatch()
  const { feedbacks } = useSelector((state) => state.admin)
  useEffect(() => {
    dispatch(getFeedback({ options: { sort: { createdAt: -1 } } }))
  }, [])
  const location = useLocation().pathname
  return (
    <Space direction='vertical' className='d-flex feedback'>
      <p style={{ fontSize: 20 }}>Phản hồi</p>
      {feedbacks.length > 0 ? (
        <Carousel
          autoplay
          dots={location !== 'admin'}
          draggable
          speed={1500}
          autoplaySpeed={5000}
          slidesToScroll={1}
          slidesToShow={3}
          responsive={[
            { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1, arrows: false } },
            { breakpoint: 992, settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false } },
            { breakpoint: 1200, settings: { slidesToShow: 3, slidesToScroll: 3, arrows: false } },
          ]}
          className='carousel-cuttom'
        >
          {feedbacks.map((item) => (
            <Card key={item._id} size='small'>
              <Space direction='vertical' className='d-flex'>
                <Flex justify='space-between'>
                  <Space>
                    <Avatar src={item.userData.avtPicture ? item.userData.avtPicture : noAvt} alt='avt' />
                    <div>
                      <h3>{item.userData.fullname}</h3>
                      <Rate value={item.stars} disabled style={{ fontSize: 16 }} /> ({item.stars})
                    </div>
                  </Space>
                  <p>{moment(item.createdAt).fromNow()}</p>
                </Flex>
                <p>{item.text}</p>
              </Space>
            </Card>
          ))}
          {feedbacks.length < 3 &&
            Array.from({ length: Math.abs(4 - feedbacks.length) }, (_, index) => index + 1)?.map((item) => (
              <p key={item} />
            ))}
        </Carousel>
      ) : (
        <Empty description='Không có đánh giá nào' />
      )}
    </Space>
  )
}

export default Feedback
