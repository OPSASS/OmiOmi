import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import commnetService from '../service/commentService'
// lay thong tin us tu localStorage

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
  comments: [],
  comment: {},
}

// create Comment
export const createComment = createAsyncThunk('createComment', async (data, thunkAPI) => {
  try {
    return await commnetService.createComment(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get Comment
export const findComment = createAsyncThunk('findComment', async (filter, thunkAPI) => {
  try {
    return await commnetService.findComment(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// post Comment user
export const updateComment = createAsyncThunk('updateComment', async (data, thunkAPI) => {
  try {
    return await commnetService.updateComment(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// removed
export const deleteComment = createAsyncThunk('deleteComment', async (id, thunkAPI) => {
  try {
    return await commnetService.deleteComment(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const commentSlice = createSlice({
  name: 'comments',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetCommentAction: (state) => {
      return { comments: state.comments, comment: state.comment, initialState }
    },
    resetCommentData: () => initData,
  },
  extraReducers: (builder) => {
    builder
      // create Comment
      .addCase(createComment.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.comments.push(action.payload)
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(findComment.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findComment.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.comments = action.payload
      })
      .addCase(findComment.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(updateComment.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.comment = action.payload
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(deleteComment.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetCommentAction, resetCommentData } = commentSlice.actions
export default commentSlice.reducer
