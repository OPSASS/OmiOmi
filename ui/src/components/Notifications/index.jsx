import svg from '@/assets'
import { useSocket } from '@/socket'
import { Badge, Popover, Space } from 'antd'
import _ from 'lodash'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { useSelector } from 'react-redux'
import NotificationDetail from './NotificationDetail'
import './notifications.scss'

export default function Notifications({ buttShow, type }) {
  const socket = useSocket()
  const { notifications } = useSelector((state) => state.notifications)

  const [notificationList, setNotificationList] = useState([])

  useEffect(() => {
    if (notifications?.length > 0) setNotificationList(notifications)
  }, [notifications])

  useEffect(() => {
    if (socket) {
      socket.on('get-notification', (data) => {
        if (data.text) {
          setNotificationList((prev) => [data, ...prev])
        }
      })
    }
  }, [socket])
  const sortList = _.orderBy(notificationList, ['createdAt'], ['desc'])

  return (
    <Popover
      placement={type === 'br' ? 'bottomRight' : 'left'}
      trigger={'click'}
      content={
        <div className='notifi-box'>
          <h3>Thông báo</h3>
          <Scrollbars style={{ height: 400, width: 320 }} autoHide autoHideTimeout={1000}>
            {sortList?.length > 0 ? (
              <Space direction='vertical' className='d-flex' style={{ margin: '5px' }}>
                {sortList.map((notifiDetail) => (
                  <NotificationDetail notifiDetail={notifiDetail} key={notifiDetail._id} />
                ))}
              </Space>
            ) : (
              <div className='d-col-c p15'>
                <h3>Hiện không có thông báo nào</h3>
                <img src={svg.notify} alt='notify' style={{ marginTop: 25, width: 300 }} />
              </div>
            )}
          </Scrollbars>
        </div>
      }
    >
      <Badge count={0}> {buttShow}</Badge>
    </Popover>
  )
}
