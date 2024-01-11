import { Avatar, Badge, Card, Flex, Space } from 'antd'
import moment from 'moment-timezone'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../assets/images/avt.jpg'
export default function NotificationDetail({ notifiDetail }) {
  const dispatch = useDispatch()
  console.log(notifiDetail)
  const { users } = useSelector((state) => state.users)
  const [turned, setTurned] = useState(false)

  const [seen, setSeen] = useState(false)

  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  if (notifiDetail)
    return (
      <Link to={'/post/' + notifiDetail.targetId}>
        <Card size='small' hoverable className='unRead'>
          <Flex align='center' justify='space-between'>
            <Space>
              <Avatar
                src={notifiDetail.userData.avtPicture ? AVT + notifiDetail.userData.avtPicture : noAvt}
                size={45}
              />
              <div>
                <Space>
                  <h4 className='posts_name'>{notifiDetail.userData.fullname}</h4>
                  {moment(notifiDetail.createdAt).fromNow()}
                </Space>
                <div>{notifiDetail.text}</div>
              </div>
            </Space>

            <Badge dot color='var(--secondary)'></Badge>
          </Flex>
        </Card>
      </Link>
    )
}
