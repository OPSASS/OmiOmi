import svg from '@/assets'
import { Button } from 'antd'
import { Link } from 'react-router-dom'

function Notfound() {
  document.title = '404 - OmiOmi'
  return (
    <div className='d-col-c'>
      <img src={svg.error} alt='error' className='mt15' />
      <h1 className='ptb15'>Trang không tồn tại hoặc đã bị xóa</h1>

      <Link to='/'>
        <Button type='primary' size='large'>
          Trở về trang chủ
        </Button>
      </Link>
    </div>
  )
}

export default Notfound
