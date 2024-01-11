import '@fontsource/sigmar-one'
import 'animate.css'
import { ConfigProvider } from 'antd'
import viVN from 'antd/locale/vi_VN'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.jsx'

import GlobalStyles from './components/GlobalStyles/index.jsx'
import Perloader from './components/Perloader/index.jsx'
import store from './redux/store/ReduxStore.js'
import { SocketProvider } from './socket/index.jsx'

const styles = {
  f1: `
    font-size: 70px;
    color: red;
    font-weight: bold;
  `,
  f2: `
    font-size: 40px;
  `,
}

console.log('%cDừng lại!', ` ${styles.f1}`)
console.log('%cĐây là tính năng chỉ dành cho nhà phát triển, vui lòng thoát khỏi!', ` ${styles.f2}`)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SocketProvider>
      <GlobalStyles>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#74576d',
              colorPrimaryActive: '#74576d',
              colorPrimaryBorder: '#74576d',
              colorPrimaryHover: '#ba8eb0',
              colorPrimaryBg: '#FFFFFF',
              colorInfo: '#1EA69A',
              colorLink: '#74576d',
              colorLinkActive: '#f1385d',
              colorLinkHover: '#ba8eb0',
              borderRadius: 25,
              borderRadiusLG: 25,
              borderRadiusSM: 18,
              borderRadiusXS: 18,
            },
          }}
          locale={viVN}
        >
          <App />
        </ConfigProvider>

        <Perloader />
      </GlobalStyles>
    </SocketProvider>
  </Provider>,
)
