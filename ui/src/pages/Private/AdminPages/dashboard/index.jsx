import Chart from '@/components/Layout/AdminLayout/chart/Chart'
import FeaturedInfo from '@/components/Layout/AdminLayout/featuredInfo/FeaturedInfo'
import Feedback from '@/components/Layout/AdminLayout/feedback'
import { getVisit } from '@/redux/slice/adminSlice'
import { Card, Col, Row, Select } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './styles.scss'

export default function Dashboard() {
  const dispatch = useDispatch()
  const { visits } = useSelector((state) => state.admin)
  const [data, setData] = useState([])
  document.title = 'Dashboard - OmiOmi'
  const [filter, setFilter] = useState('day')

  useEffect(() => {
    if (filter) dispatch(getVisit({ type: filter }))
  }, [filter])

  useEffect(() => {
    if (filter.length > 0) {
      let newData = []
      if (filter === 'day') {
        newData = visits.map((item) => {
          return {
            name: item._id,
            'Lượt truy cập': item.count,
          }
        })
      } else if (filter === 'week') {
        newData = visits.map((item) => {
          return {
            name: item._id === 8 ? 'CN' : `Thứ ${item._id}`,
            'Lượt truy cập': item.count,
          }
        })
      } else if (filter === 'month') {
        newData = visits.map((item) => {
          return {
            name: `Ngày ${item._id}`,
            'Lượt truy cập': item.count,
          }
        })
      } else if (filter === 'quarter') {
        newData = visits.map((item) => {
          return {
            name: `Quý ${item._id}`,
            'Lượt truy cập': item.count,
          }
        })

        setData(newData)
      } else {
        newData = visits.map((item) => {
          return {
            name: `Tháng ${item._id}`,
            'Lượt truy cập': item.count,
          }
        })
      }
      setData(newData)
    }
  }, [filter, visits])

  return (
    <div style={{ margin: '0 24px' }}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <FeaturedInfo />
        </Col>

        <Col span={24}>
          <Card hoverable>
            <div className='chart-ad'>
              <Select
                value={filter}
                label='Xếp theo'
                onChange={(e) => setFilter(e)}
                options={[
                  { label: 'Ngày', value: 'day' },
                  { label: 'Tuần', value: 'week' },
                  { label: 'Tháng', value: 'month' },
                  { label: 'Quý', value: 'quarter' },
                  { label: 'Năm', value: 'year' },
                ]}
                className='select-ad'
              />
              <Chart data={data} title='Lượt Truy Cập' grid dataKey='Lượt truy cập' />
            </div>
          </Card>
        </Col>
        <Col span={24}>
          <Card hoverable>
            <Feedback />
          </Card>
        </Col>
      </Row>
    </div>
  )
}
