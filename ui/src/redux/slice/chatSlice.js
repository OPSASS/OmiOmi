import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import chatService from '../service/chatService'

const initialState = {
  error: false,
  loading: false,
  success: false,
  message: '',
  errorDetail: false,
  loadingDetail: false,
  successDetail: false,
  messageDetail: '',
}

const initData = {
  chats: [],
  chat: {},
}

// create chat
export const createChat = createAsyncThunk('createChat', async (data, thunkAPI) => {
  try {
    return await chatService.createChat(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const findChat = createAsyncThunk('findChat', async (filter, thunkAPI) => {
  try {
    return await chatService.findChat(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateChat = createAsyncThunk('updateChat', async (data, thunkAPI) => {
  try {
    return await chatService.updateChat(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const removeChat = createAsyncThunk('removeChat', async (id, thunkAPI) => {
  try {
    return await chatService.removeChat(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get chat member
export const getChatDetail = createAsyncThunk('getChatDetail', async (id, thunkAPI) => {
  try {
    return await chatService.getChatDetail(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// readAll
export const readAll = createAsyncThunk('readAll', async (id, thunkAPI) => {
  try {
    const usId = thunkAPI.getState().auth.user.user?._id

    return await chatService.readAll(id, { usId: usId })
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const chatSlice = createSlice({
  name: 'chats',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetChatAction: (state) => {
      return { chats: state.chats, chat: state.chat, ...initialState }
    },
    resetChatData: () => initData,
  },
  extraReducers: (builder) => {
    builder
      // create chat
      .addCase(createChat.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createChat.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.chat = action.payload
      })
      .addCase(createChat.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(findChat.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findChat.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.chats = action.payload
      })
      .addCase(findChat.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload
      })

      .addCase(updateChat.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateChat.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.chats.push(action.payload)
      })
      .addCase(updateChat.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(removeChat.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(removeChat.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.chats.push(action.payload)
      })
      .addCase(removeChat.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // get chat member
      .addCase(getChatDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getChatDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.chat = action.payload
      })
      .addCase(getChatDetail.rejected, (state, action) => {
        state.loadingDetail = false
        state.messageDetail = action.payload
      })
      // readAll
      .addCase(readAll.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(readAll.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(readAll.rejected, (state, action) => {
        state.loading = false
        state.message = action.payload
      })
  },
})
export const { resetChatAction, resetChatData } = chatSlice.actions
export default chatSlice.reducer
