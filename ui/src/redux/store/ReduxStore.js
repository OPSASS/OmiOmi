import { configureStore } from '@reduxjs/toolkit'
import adminSlice from '../slice/adminSlice'
import authSlice from '../slice/authSlice'
import chatSlice from '../slice/chatSlice'
import commentSlice from '../slice/commentSlice'
import filesSlice from '../slice/filesSlice'
import interactionSlice from '../slice/interactionSlice'
import messageSlice from '../slice/messageSlice'
import notificationsSlice from '../slice/notificationsSlice'
import postSlice from '../slice/postSlice'
import relationships from '../slice/relationshipsSlice'
import searchSlice from '../slice/searchSlice'
import shortSlice from '../slice/shortSlice'
import userSlice from '../slice/userSlice'
import watchedSlice from '../slice/watchedSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    posts: postSlice,
    interactions: interactionSlice,
    users: userSlice,
    chats: chatSlice,
    messages: messageSlice,
    admin: adminSlice,
    comments: commentSlice,
    watched: watchedSlice,
    searchs: searchSlice,
    shorts: shortSlice,
    notifications: notificationsSlice,
    files: filesSlice,
    relationships: relationships,
  },
})

export default store
