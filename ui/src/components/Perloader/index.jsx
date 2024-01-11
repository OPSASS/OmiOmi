import { Progress } from 'antd'
import { useEffect, useState } from 'react'
import Logo from '../Logo/logo'

export default function Perloader() {
  const [loading, setLoading] = useState(true)
  const [percentage, setPercentage] = useState(0)
  useEffect(() => {
    const interval = setInterval(() => {
      if (percentage < 100) {
        setPercentage(percentage + 1)
      } else {
        window.addEventListener('load', () => {
          setLoading(false)
        })
        setTimeout(() => {
          setLoading(false)
          clearInterval(interval)
        }, 250)
      }
    }, 10)

    return () => {
      clearInterval(interval)
    }
  }, [percentage])

  return (
    <div className={`${loading ? null : 'preload-finish'} preloader`}>
      <div className='p-c'>
        <div className='d-col-c animate__animated animate__tada'>
          <Logo type='null' />
        </div>
        <Progress percent={percentage} showInfo={false} size='small'></Progress>
      </div>
    </div>
  )
}
