import Profile from '@/components/Layout/UserLayout/Profile/ProfileLayout'
import { getFileByUs } from '@/redux/slice/filesSlice'
import { Empty, Image, Space } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import { useParams } from 'react-router-dom'

function ProfileGallery() {
  const dispatch = useDispatch()
  const { files, loading, success } = useSelector((state) => state.files)
  const IMG = import.meta.env.VITE_IMAGES_FOLDER
  const { userId } = useParams()
  useEffect(() => {
    if (userId) {
      dispatch(getFileByUs(userId))
    }
  }, [userId])

  const [urlImage, setUrlImage] = useState([])

  useEffect(() => {
    if (files?.length > 0 && !loading && success) {
      const result = files.flatMap((post) => post.url.map((url) => ({ title: post.title, img: IMG + url })))
      setUrlImage(result)
    }
  }, [files, loading, success])

  return (
    <Profile>
      <Space direction='vertical' className='d-flex'>
        <Space>
          <h1>Thư viện ảnh</h1>
          <b>({urlImage.length})</b>
        </Space>
        {urlImage.length > 0 ? (
          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 1600: 3 }}>
            <Masonry columnsCount={2} gutter='12px'>
              {urlImage.map((item) => (
                <Image.PreviewGroup
                  items={urlImage.map((image) => {
                    return image.img
                  })}
                  key={item.img}
                >
                  <Image src={item.img} />
                </Image.PreviewGroup>
              ))}
            </Masonry>
          </ResponsiveMasonry>
        ) : (
          <Empty description='Hiện chưa có ảnh nào' style={{ padding: 50 }} />
        )}
      </Space>
    </Profile>
  )
}
export default ProfileGallery
