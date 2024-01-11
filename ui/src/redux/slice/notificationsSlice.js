import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import NoticicationsService from '../service/notificationsService'
// lay thong tin tu localStorage

const initData = {
  notifications: [],
  notification: {},
}
const initialState = {
  error: false,
  loading: false,
  success: false,
  errorDetail: false,
  loadingDetail: false,
  successDetail: false,
  messageDetail: '',
}

export const createNotifications = createAsyncThunk('createNotifications', async (data, thunkAPI) => {
  try {
    return await NoticicationsService.createNotifications(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const putNotifications = createAsyncThunk('putNotifications', async (data, thunkAPI) => {
  try {
    return await NoticicationsService.putNotifications(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const findNotifications = createAsyncThunk('findNotifications', async (filter, thunkAPI) => {
  try {
    return await NoticicationsService.findNotifications(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getNotificationsByUser = createAsyncThunk('getNotificationsByUser', async (_, thunkAPI) => {
  try {
    const meId = thunkAPI.getState().auth.user.user?._id
    return await NoticicationsService.getNotificationsByUser(meId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteNotifications = createAsyncThunk('deleteNotifications', async (id, thunkAPI) => {
  try {
    return await NoticicationsService.deleteNotifications(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetNotificationAction: (state) => {
      return { notifications: state.notifications, notification: state.notification, initialState }
    },
    resetNotificationData: () => initData,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createNotifications.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createNotifications.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.notification = action.payload
      })
      .addCase(createNotifications.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(putNotifications.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(putNotifications.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.notification = action.payload
      })
      .addCase(putNotifications.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(findNotifications.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.notifications = action.payload
      })
      .addCase(findNotifications.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(getNotificationsByUser.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getNotificationsByUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.notifications = action.payload
      })
      .addCase(getNotificationsByUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(deleteNotifications.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deleteNotifications.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.notification = action.payload
      })
      .addCase(deleteNotifications.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetNotificationAction, resetNotificationData } = notificationsSlice.actions
export default notificationsSlice.reducer
