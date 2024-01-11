import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import watchedService from '../service/watchedService'

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
  watched: {},
  watcheds: [],
}

// create Watched
export const createWatched = createAsyncThunk('createWatched', async (data, thunkAPI) => {
  try {
    const meId = thunkAPI.getState().auth.user.user?._id
    const payload = {
      userId: meId,
    }
    return await watchedService.createWatched(data, payload)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// post Watched user
export const updateWatched = createAsyncThunk('updateWatched', async (data, thunkAPI) => {
  try {
    return await watchedService.updateWatched(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// removed
export const getWatched = createAsyncThunk('getWatched', async (id, thunkAPI) => {
  try {
    const meId = thunkAPI.getState().auth.user.user?._id
    return await watchedService.getWatched(meId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const watchedSlice = createSlice({
  name: 'watched',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetWatchedAction: (state) => {
      return { watcheds: state.watcheds, watched: state.watched, ...initialState }
    },
    resetWatchedData: () => initData,
  },
  extraReducers: (builder) => {
    builder
      // create Watched
      .addCase(createWatched.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createWatched.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.watched = action.payload
      })
      .addCase(createWatched.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(updateWatched.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateWatched.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.watched = action.payload
      })
      .addCase(updateWatched.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(getWatched.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getWatched.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.watcheds = action.payload
      })
      .addCase(getWatched.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
  },
})
export const { resetWatchedAction, resetWatchedData } = watchedSlice.actions
export default watchedSlice.reducer
