import svg from '@/assets'
import { findShorts, resetShortAction } from '@/redux/slice/shortSlice'
import { Button, Card, Flex, Space, Tooltip } from 'antd'
import { useEffect, useState } from 'react'
import Scrollbars from 'react-custom-scrollbars-2'
import { FaFire } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../../assets/images/avt.jpg'
import { ShortUpload } from '../ShortUpload'
import './styles.scss'

const RenderShorts = () => {
  const { short, shorts, successDetail } = useSelector((state) => state.shorts)
  const { meData } = useSelector((state) => state.users)
  const { successDetail: relationships } = useSelector((state) => state.relationships)
  const dispatch = useDispatch()
  const [openUpload, setOpenUpload] = useState(false)
  useEffect(() => {
    dispatch(resetShortAction())
  }, [])
  useEffect(() => {
    if (meData) {
      const following = meData.relationshipsData?.following
      const userId = following?.length > 0 ? [meData._id, ...following] : meData._id
      dispatch(
        findShorts({
          filterQuery: {
            userId,
          },
          options: {
            limit: 15,
            sort: { createdAt: -1 },
          },
        }),
      )
    }
  }, [meData, successDetail, relationships])

  const meShort = shorts.filter((item) => item.userId === meData._id)?.[0]
  const usShort = shorts.filter((item) => item.userId !== meData._id)

  const ShortCard = ({ data }) => {
    const AVT = import.meta.env.VITE_IMAGES_FOLDER

    return (
      <Link to={'/shorts/' + data._id}>
        <Card
          size='small'
          cover={
            <img
              src={data.userData?.avtPicture ? AVT + data.userData?.avtPicture : noAvt}
              alt={data._id}
              style={{ width: '100%', objectFit: 'cover' }}
            />
          }
          style={{ margin: 5, height: 165, width: 120 }}
          hoverable
        >
          <Card.Meta title={data.userData?._id === meData._id ? 'Short của tôi' : data.userData?.fullname} />
        </Card>
      </Link>
    )
  }
  return (
    <Card hoverable size='small'>
      <Scrollbars style={{ width: '100%', height: 175 }} autoHide autoHideTimeout={1000}>
        <Flex gap={5}>
          <Tooltip title='Tạo short'>
            <Button icon={<FaFire />} size='large' shape='circle' type='primary' onClick={() => setOpenUpload(true)} />
          </Tooltip>

          {shorts.length > 0 ? (
            <>
              {meShort && <ShortCard data={meShort} />}
              {usShort.map((item) => (
                <ShortCard key={item._id} data={item} />
              ))}
            </>
          ) : (
            <Space>
              <img src={svg.shorts} alt='noshort' height={150} />
              <Space direction='vertical'>
                <p>Bạn cần theo dõi nhiều bạn hơn hoặc có thể tạo khoảnh khắc của bạn!</p>
                <Button type='primary' onClick={() => setOpenUpload(true)}>
                  Tạo khoảnh khắc ngay
                </Button>
              </Space>
            </Space>
          )}
        </Flex>
      </Scrollbars>
      <ShortUpload isOpen={openUpload} setOpen={setOpenUpload} type='create' />
    </Card>
  )
}

export default RenderShorts
