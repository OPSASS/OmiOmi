import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import messageService from '../service/messageService'
// lay thong tin us tu localStorage

const initData = {
  messages: [],
  message: {},
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

// get message user
export const findMessage = createAsyncThunk('findMessage', async (filter, thunkAPI) => {
  try {
    return await messageService.findMessage(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// post message user
export const createMessage = createAsyncThunk('createMessage', async (data, thunkAPI) => {
  try {
    return await messageService.createMessage(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateMessage = createAsyncThunk('updateMessage', async (data, thunkAPI) => {
  try {
    return await messageService.updateMessage(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// removed
export const getDetail = createAsyncThunk('getDetail', async (id, thunkAPI) => {
  try {
    return await messageService.getDetail(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const messageSlice = createSlice({
  name: 'messages',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetMessageAction: (state) => {
      return { messages: state.messages, messageDetail: state.messageDetail, ...initialState }
    },
    resetMessageData: () => initData,
  },
  extraReducers: (builder) => {
    builder

      // get message user
      .addCase(findMessage.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findMessage.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.messages = action.payload
        state.error = false
      })
      .addCase(findMessage.rejected, (state, action) => {
        state.loading = false
        state.error = true
      })

      // post message user
      .addCase(createMessage.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.message = action.payload
        state.messages.push(action.payload)
      })
      .addCase(createMessage.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
      })

      .addCase(updateMessage.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.message = action.payload
      })
      .addCase(updateMessage.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
      })

      .addCase(getDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.message = action.payload
      })
      .addCase(getDetail.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = null
      })
  },
})
export const { resetMessageAction } = messageSlice.actions
export const { resetMessageData } = messageSlice.actions

export default messageSlice.reducer
