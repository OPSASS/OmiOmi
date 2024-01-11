import { message } from 'antd'
import moment from 'moment-timezone'
import 'moment/dist/locale/vi'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sendVisit } from './redux/slice/adminSlice'
import RouteElements from './router'
import { useSocket } from './socket'

function App() {
  moment.locale('vi')
  const dispatch = useDispatch()
  const socket = useSocket()
  const { notification: notifiData } = useSelector((state) => state.notifications)

  useEffect(() => {
    const recordVisit = async () => {
      try {
        const response = await fetch('https://api.ipify.org?format=json')
        const data = await response.json()
        if (data && data.ip) {
          const payload = {
            ip: data.ip,
            timestamp: new Date(),
          }
          dispatch(sendVisit(payload))
        }
      } catch (error) {
        message.error('Failed to record visit')
      }
    }

    recordVisit()
  }, [])

  useEffect(() => {
    if (notifiData && socket) {
      socket.emit('notification', notifiData)
    }
  }, [notifiData, socket])
  return <RouteElements />
}

export default App
