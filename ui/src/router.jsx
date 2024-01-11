import { Avatar, Space, notification } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, Route, BrowserRouter as Router, Routes, useLocation, useParams } from 'react-router-dom'
import noAvt from './assets/images/avt.jpg'
import AdminLayout from './components/Layout/AdminLayout'
import Layout from './components/Layout/UserLayout'
import AdminUsers from './pages/Private/AdminPages/admin/Admin'
import Dashboard from './pages/Private/AdminPages/dashboard'
import Reports from './pages/Private/AdminPages/report/report'
import Requests from './pages/Private/AdminPages/request/request'
import UserList from './pages/Private/AdminPages/userList/UserList'
import Chat from './pages/Private/Chat/Chat'
import Home from './pages/Private/Home'
import Interests from './pages/Private/Interests'
import ProfileBlocks from './pages/Private/Profile/ProfileBlocks/ProfileBlocks'
import AccountEdit from './pages/Private/Profile/ProfileEdit/AccountEdit/AccountEdit'
import AccountSecurity from './pages/Private/Profile/ProfileEdit/AccountSecurity/AccountSecurity'
import ProfileFollowing from './pages/Private/Profile/ProfileFollowing/ProfileFollowing'
import ProfileGallery from './pages/Private/Profile/ProfileGallery/ProfileGallery'
import ProfilePost from './pages/Private/Profile/ProfilePost/profilePost'
import ProfileShorts from './pages/Private/Profile/ProfileShorts/profileShorts'
import SingerPost from './pages/Private/SingerPost'
import SingerShort from './pages/Private/SingerShort'
import Auth from './pages/Public/Auth/auth'
import Notfound from './pages/Public/NotFound/notFound'
import Standard from './pages/Public/Standard/Standard'
import Support from './pages/Public/Support/Support'
import Welcome from './pages/Public/Welcome'
import { findChat } from './redux/slice/chatSlice'
import { getNotificationsByUser } from './redux/slice/notificationsSlice'
import { getMeData } from './redux/slice/userSlice'
import { getWatched, updateWatched } from './redux/slice/watchedSlice'
import { useSocket } from './socket'

const ProtectedRoute = () => {
  const { user } = useSelector((state) => state.auth)
  const location = useLocation().pathname
  const { chatId } = useParams()
  const dispatch = useDispatch()
  const socket = useSocket()
  const AVT = import.meta.env.VITE_IMAGES_FOLDER
  useEffect(() => {
    if (user && socket) socket.emit('user-status', user.user._id)
  }, [user, socket])

  useEffect(() => {
    if (user) {
      dispatch(getMeData())
      dispatch(getWatched())
      dispatch(
        findChat({
          filterQuery: {
            membersId: user.user._id,
          },
        }),
      )
      dispatch(getNotificationsByUser(user.user._id))
    }
  }, [user, location])

  useEffect(() => {
    if (chatId) {
      dispatch(updateWatched(chatId))
    }
  }, [chatId])

  useEffect(() => {
    if (socket) {
      socket.on('get-notification', (data) => {
        if (data) {
          notification.info({
            message: (
              <Space>
                <Avatar src={data.userData.avtPicture ? AVT + data.userData.avtPicture : noAvt} size={45} />
                {data.userData.fullname}
              </Space>
            ),
            description: data.text,
          })
        }
      })
    }
  }, [socket])

  if (location === '/login') return <Navigate to='/' />

  if (user) {
    return <Outlet />
  } else {
    return <Navigate to='/login' />
  }
}

const ProtectedAdminRoute = () => {
  const { user } = useSelector((state) => state.auth)

  const location = useLocation().pathname
  const dispatch = useDispatch()

  useEffect(() => {
    if (user) {
      dispatch(getMeData())
    }
  }, [user, location])

  if (user.user.isAdmin) {
    return <Outlet />
  } else {
    return <Navigate to='/404' />
  }
}

const RejectedRoute = () => {
  const { user } = useSelector((state) => state.auth)

  if (!user) {
    return <Outlet />
  } else {
    return <Navigate to='/' />
  }
}

const RouteElements = () => {
  const { user } = useSelector((state) => state.auth)

  const publicRoutes = [
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: '/',
          element: <Navigate to='/welcome' />,
        },
        {
          path: '/welcome',
          element: <Welcome />,
        },
        {
          path: '/standard',
          element: <Standard />,
        },
        {
          path: '/support',
          element: <Support />,
        },
        {
          path: '/login',
          element: <Auth />,
        },
        {
          path: '/register',
          element: <Auth />,
        },
        {
          path: '/forgot-password',
          element: <Auth />,
        },

        {
          path: '/404',
          element: <Notfound />,
        },
        {
          path: '*',
          element: <Navigate to='/welcome' />,
        },
      ],
    },
  ]

  const privateRoutes = [
    // privateRoutes
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: '/',
          element: (
            <Layout title='Trang chủ'>
              <Home />
            </Layout>
          ),
        },
        {
          path: '/post/:postId',
          element: (
            <Layout>
              <SingerPost />
            </Layout>
          ),
        },
        {
          path: '/shorts/:shortId',
          element: (
            <Layout>
              <SingerShort />
            </Layout>
          ),
        },
        {
          path: '/shorts',
          element: (
            <Layout>
              <SingerShort />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId',
          element: (
            <Layout>
              <ProfilePost />
            </Layout>
          ),
        },
        {
          path: '/user/:userId',
          element: (
            <Layout>
              <ProfilePost />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/shorts',
          element: (
            <Layout>
              <ProfileShorts />
            </Layout>
          ),
        },
        {
          path: '/user/:userId/shorts',
          element: (
            <Layout>
              <ProfileShorts />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/gallery',
          element: (
            <Layout>
              <ProfileGallery />
            </Layout>
          ),
        },
        {
          path: '/user/:userId/gallery',
          element: (
            <Layout>
              <ProfileGallery />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/following',
          element: (
            <Layout>
              <ProfileFollowing />
            </Layout>
          ),
        },
        {
          path: '/user/:userId/following',
          element: (
            <Layout>
              <ProfileFollowing />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/blocks',
          element: (
            <Layout>
              <ProfileBlocks />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/settings',
          element: (
            <Layout>
              <AccountEdit />
            </Layout>
          ),
        },
        {
          path: '/profile/:userId/security',
          element: (
            <Layout>
              <AccountSecurity />
            </Layout>
          ),
        },
        {
          path: '/chat',
          element: (
            <Layout>
              <Chat />
            </Layout>
          ),
        },
        {
          path: '/chat/:chatId',
          element: (
            <Layout>
              <Chat />
            </Layout>
          ),
        },
        {
          path: '/interests',
          element: (
            <Layout>
              <Interests />
            </Layout>
          ),
        },
        {
          path: '/404',
          element: <Notfound />,
        },
        {
          path: '*',
          element: <Navigate to='/404' />,
        },
      ],
    },
    {
      path: '',
      element: <ProtectedAdminRoute />,
      children: [
        {
          path: '/admin',
          element: (
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          ),
        },
        {
          path: '/admin/users',
          element: (
            <AdminLayout>
              <UserList />
            </AdminLayout>
          ),
        },
        {
          path: '/admin/users/:userId',
          element: (
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          ),
        },
        {
          path: '/admin/reposts',
          element: (
            <AdminLayout>
              <Reports />
            </AdminLayout>
          ),
        },
        {
          path: '/admin/requests',
          element: (
            <AdminLayout>
              <Requests />
            </AdminLayout>
          ),
        },
        {
          path: '/admin/admin-users',
          element: (
            <AdminLayout>
              <AdminUsers />
            </AdminLayout>
          ),
        },
      ],
    },
  ]

  const routes = user ? privateRoutes : publicRoutes
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}>
            {route.children &&
              route.children.map((childRoute, childIndex) => (
                <Route key={childIndex} path={childRoute.path} element={childRoute.element} />
              ))}
          </Route>
        ))}
      </Routes>
    </Router>
  )
}

export default RouteElements
