import { Link } from 'react-router-dom'
import logo from '../../assets/Logo/darkLogo.png'
import logoLight from '../../assets/Logo/lightLogo.png'
import './logo.scss'

const Logo = ({ to, size, type }) => {
  return type !== 'null' ? (
    <Link to={to ? to : '/'}>
      {(type === 'hover' && (
        <div className='logo'>
          <img className='logo-dark' src={logo} alt='logo' width={size ? size : 60} />
          <img className='logo-light' src={logoLight} alt='logo' width={size ? size : 60} />
        </div>
      )) ||
        (type === 'light' && <img className='logo-light' src={logoLight} alt='logo' width={size ? size : 60} />) || (
          <img className='logo-dark' src={logo} alt='logo' width={size ? size : 60} />
        )}
    </Link>
  ) : (
    <img className='logo-dark' src={logo} alt='logo' width={size ? size : 60} />
  )
}

export default Logo
