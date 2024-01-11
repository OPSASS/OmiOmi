import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import searchService from '../service/searchService'

const initialState = {
  users: [],
  search: {},
  error: false,
  loading: false,
  success: false,
  message: '',
}

export const searchKey = createAsyncThunk('searchKey', async (key, thunkAPI) => {
  try {
    return await searchService.searchKey(key)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const searchOptions = createAsyncThunk('searchOptions', async (data, thunkAPI) => {
  try {
    return await searchService.searchOptions(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const searchSlice = createSlice({
  name: 'searchs',
  initialState,
  reducers: {
    resetSearch: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      // get search
      .addCase(searchKey.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(searchKey.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users = action.payload
      })
      .addCase(searchKey.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(searchOptions.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(searchOptions.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.search = action.payload
      })
      .addCase(searchOptions.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
  },
})
export const { resetSearch } = searchSlice.actions
export default searchSlice.reducer
