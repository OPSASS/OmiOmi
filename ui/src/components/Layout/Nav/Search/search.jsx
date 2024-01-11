import { findChat } from '@/redux/slice/chatSlice'
import { findMessage } from '@/redux/slice/messageSlice'
import { resetSearch, searchOptions } from '@/redux/slice/searchSlice'
import { SearchOutlined } from '@ant-design/icons'
import { AutoComplete, Avatar, Input } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import noAvt from '../../../../assets/images/avt.jpg'
import './search.scss'

export default function SearchMain({ type, searchType }) {
  const dispatch = useDispatch()
  const { users, search } = useSelector((state) => state.searchs)
  const { meData } = useSelector((state) => state.users)
  const [data, setData] = useState()

  useEffect(() => {
    if (searchType === 'chat' && meData) {
      dispatch(
        findChat({
          filterQuery: {
            search: data ? data : undefined,
            membersId: meData._id,
          },
        }),
      )
    } else if (data) {
      if (!data.trim()) {
        dispatch(resetSearch())
        setData(undefined)
        return
      } else {
        if (searchType === 'following')
          dispatch(
            searchOptions({
              key: data,
              body: { filterQuery: { _id: meData.relationshipsData.following }, type: 'user' },
            }),
          )
        if (searchType === 'post')
          dispatch(
            searchOptions({
              key: data,
              body: { filterQuery: { _id: meData.relationshipsData.following }, type: 'post' },
            }),
          )
        if (searchType === 'user, post')
          dispatch(
            searchOptions({
              key: data,
            }),
          )
        if (searchType === 'message') dispatch(findMessage({ filterQuery: { text: data } }))
        if (searchType === 'chat') dispatch(findMessage({ filterQuery: { title: data } }))
        else dispatch(findChat(data))
      }
    } else if (!data) {
      dispatch(resetSearch())
      setData(undefined)
      return
    }
  }, [data])

  const AVT = import.meta.env.VITE_IMAGES_FOLDER

  const renderItem = (value, user, type) => ({
    value: value,
    label:
      (searchType === 'chat' && (
        <div className='user-search d-space-c'>
          <div className='d-space-cl'>
            <Avatar src={user.avtPicture ? AVT + user.avtPicture : noAvt} />
            <h4 className='m10'>{user.fullname}</h4>
            {user.nickname ? <p>@{user.nickname}</p> : null}
          </div>
        </div>
      )) ||
      (type === 'user' && (
        <Link to={'/user/' + user._id} className='user-search d-space-c'>
          <div className='d-space-cl'>
            <Avatar src={user.avtPicture ? AVT + user.avtPicture : noAvt} />
            <h4 className='m10'>{user.fullname}</h4>
            {user.nickname ? <p>@{user.nickname}</p> : null}
          </div>
        </Link>
      )) ||
      (type === 'post' && (
        <Link to={'/post/' + user._id} className='user-search d-space-c'>
          <div className='dangerHTMLOneLine'>{user.desc}</div>
        </Link>
      )),
  })
  const [options, setOptions] = useState([])

  useEffect(() => {
    if (searchType !== 'user, post' && users?.length > 0)
      setOptions([{ label: 'Kết quả', options: users?.map((option) => renderItem(option._id, option)) }])
    else if (searchType === 'user, post' && (search?.users || search?.posts)) {
      setOptions([
        { label: 'Tài khoản cá nhân', options: search?.users?.map((option) => renderItem(option._id, option, 'user')) },
        { label: 'Bài viết', options: search?.posts?.map((option) => renderItem(option._id, option, 'post')) },
      ])
    } else setOptions([])
  }, [users, search])

  if (type === 'autoComplete')
    return (
      <AutoComplete
        style={{
          width: '100%',
        }}
        options={options}
      >
        <Input
          addonBefore={<SearchOutlined />}
          placeholder={
            (searchType === 'message' && 'Tìm kiếm đoạn chat...') ||
            (searchType === 'chat' && 'Tìm kiếm tin nhắn...') ||
            (searchType === 'post' && 'Tìm kiếm bài viết...') ||
            (searchType === 'user, post' && 'Tìm kiếm gì đó...') ||
            'Tìm kiếm tài khoản…'
          }
          size='large'
          allowClear
          onChange={debounce((e) => setData(e.target.value), 500)}
        />
      </AutoComplete>
    )

  return (
    <Input
      addonBefore={<SearchOutlined />}
      placeholder={
        (searchType === 'message' && 'Tìm kiếm đoạn chat...') ||
        (searchType === 'chat' && 'Tìm kiếm tin nhắn...') ||
        (searchType === 'post' && 'Tìm kiếm bài viết...') ||
        (searchType === 'user, post' && 'Tìm kiếm gì đó...') ||
        'Tìm kiếm tài khoản…'
      }
      size='large'
      allowClear
      onChange={debounce((e) => setData(e.target.value), 500)}
    />
  )
}
