import svg from '@/assets'
import bg from '@/assets/images/bg-welcome.jpg'
import Feedback from '@/components/Layout/AdminLayout/feedback'
import LayoutPublic from '@/components/Layout/UserLayout/Public/LayoutPublic'
import Logo from '@/components/Logo/logo'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './welcome.scss'
function Welcome() {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  }
  document.title = 'Chào mừng bạn đến với OmiOmi'

  const [feedback, setFeedback] = useState(false)
  const [hide, setHide] = useState(false)
  const [stars, setStars] = useState(false)

  const onScroll = (event) => {
    var element = event.currentTarget
    var scroll = Math.round(element.scrollTop)
    if (scroll >= 50) setFeedback(true)
    if (scroll >= 1250 || scroll < 100) setFeedback(false)
    if (scroll >= 350) setHide(true)
    if (scroll >= 2700 || scroll < 520) setHide(false)
    if (scroll >= 850) setStars(true)
    if (scroll >= 2700 || scroll < 1150) setStars(false)
  }
  return (
    <LayoutPublic onScroll={onScroll}>
      <div className='bg'>
        <img src={bg} alt='bg' />
      </div>

      <div className='blacks d-col-c'>
        <div className='text_info'>
          <p style={{ color: 'var(--whiteColor)' }}>Trải nhiệm mạng xã hội mới dành cho</p>
          <p style={{ fontWeight: 'bold' }}>GIỚI TRẺ</p>
        </div>
        <Link to='/register' className='butt-bg'>
          Đăng ký ngay
        </Link>
      </div>

      <div className='wc-main'>
        <div className='container'>
          <Feedback />
          <div className='intro d-space-c'>
            <div
              className={hide ? 'animate__animated animate__bounceInLeft' : 'animate__animated animate__bounceOutLeft'}
            >
              <div>
                <Logo size={80} type='light' />
                <div>
                  Là một{' '}
                  <a href='https://vi.wikipedia.org/wiki/Ph%C6%B0%C6%A1ng_ti%E1%BB%87n_truy%E1%BB%81n_th%C3%B4ng_m%E1%BA%A1ng_x%C3%A3_h%E1%BB%99i'>
                    phương tiện truyền thông xã hội
                  </a>{' '}
                  và{' '}
                  <a href='https://vi.wikipedia.org/wiki/D%E1%BB%8Bch_v%E1%BB%A5_m%E1%BA%A1ng_x%C3%A3_h%E1%BB%99i'>
                    dịch vụ mạng xã hội
                  </a>{' '}
                  trực tuyến thành lập vào năm 2023. Phát triển bởi{' '}
                  <a href='https://www.facebook.com/chanhx.oanhx'>Oanh</a> học tại{' '}
                  <a href='https://vi.wikipedia.org/wiki/H%E1%BB%8Dc_vi%E1%BB%87n_N%C3%B4ng_nghi%E1%BB%87p_Vi%E1%BB%87t_Nam'>
                    Vietnam National University of Agriculture.
                  </a>{' '}
                </div>
              </div>
            </div>
            <img
              variants={item}
              initial='hidden'
              animate='show'
              transition={{
                delay: 3,
                x: { duration: 1 },
                default: { ease: 'linear' },
              }}
              className={
                hide
                  ? 'startup animate__animated animate__bounceInRight'
                  : 'startup animate__animated animate__bounceOutRight'
              }
              src={svg.startup}
              alt='startup'
              width={600}
            />
          </div>
        </div>
        <div
          className={
            stars ? 'call_for animate__animated animate__fadeInUp' : 'call_for animate__animated animate__fadeOutDown'
          }
        >
          <div className='d-space-c' style={{ position: 'absolute' }}>
            <img src={svg.emoji} alt='mos' className='emoji' />
            {stars ? (
              <div className='text_call' style={{ width: 500, zIndex: 10 }}>
                <p className='texts animate__animated animate__zoomIn delay025'>
                  Sự góp sức của bạn, sẽ giúp cộng đồng
                </p>
                <div className='d-flex animate__animated animate__jackInTheBox delay1'>
                  <Logo size={120} type='light' />
                </div>
                <p className='texts animate__animated animate__zoomInDown delay15'>ngày càng lớn mạnh!</p>
              </div>
            ) : null}
          </div>
          <div className='stars' />
        </div>
      </div>
    </LayoutPublic>
  )
}

export default Welcome
