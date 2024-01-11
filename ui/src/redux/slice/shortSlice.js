import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import shortsService from '../service/shortService'

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
  shorts: [],
  short: {},
}

// shorts upload
export const createShorts = createAsyncThunk('createShorts', async (data, thunkAPI) => {
  try {
    return await shortsService.createShorts(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get all shorts
export const findShorts = createAsyncThunk('findShorts', async (filter, thunkAPI) => {
  try {
    return await shortsService.findShorts(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get shorts user
export const getShortDetail = createAsyncThunk('getShortDetail', async (id, thunkAPI) => {
  try {
    return await shortsService.getShortDetail(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// edit Short
export const updateShorts = createAsyncThunk('updateShorts', async (data, thunkAPI) => {
  try {
    const res = await shortsService.updateShorts(data)
    return res.data
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// delete shorts
export const deleteShort = createAsyncThunk('deleteShort', async (shorts, thunkAPI) => {
  try {
    return await shortsService.deleteShort(shorts)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const shortSlice = createSlice({
  name: 'shorts',
  initialState: { ...initialState, ...initData },
  reducers: {
    resetShortData: () => initData,
    resetShortAction: (state) => {
      return { shorts: state.shorts, short: state.short, ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      // shorts upload
      .addCase(createShorts.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createShorts.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.shorts.push(action.payload)
      })
      .addCase(createShorts.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // get shorts user
      .addCase(getShortDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getShortDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.short = action.payload
      })
      .addCase(getShortDetail.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
        state.shortDetail = null
      })

      // get all shorts
      .addCase(findShorts.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findShorts.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.shorts = action.payload
      })
      .addCase(findShorts.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.shorts = null
      })

      // edit shorts
      .addCase(updateShorts.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateShorts.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.short = action.payload
      })
      .addCase(updateShorts.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // delete shorts
      .addCase(deleteShort.pending, (state) => {
        state.loadingDetail = false
      })
      .addCase(deleteShort.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.messageDetail = action.payload
      })
      .addCase(deleteShort.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetShortData, resetShortAction } = shortSlice.actions
export default shortSlice.reducer
