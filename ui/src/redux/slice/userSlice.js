import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import userService from '../service/userService'

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
  users: [],
  userFollowing: [],
  user: {},
  meData: {},
}

// edit user
export const editUser = createAsyncThunk('editUser', async (data, thunkAPI) => {
  try {
    const userId = thunkAPI.getState().auth.user.user?._id
    return await userService.editUser(userId, data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get a users
export const getUserDetail = createAsyncThunk('getUserDetail', async (id, thunkAPI) => {
  try {
    return await userService.getUserDetail(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const updateUser = createAsyncThunk('updateUser', async (data, thunkAPI) => {
  try {
    return await userService.updateUser(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const findUser = createAsyncThunk('findUser', async (filter, thunkAPI) => {
  try {
    return await userService.findUser(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const userFollowings = createAsyncThunk('userFollowings', async (filter, thunkAPI) => {
  try {
    return await userService.findUser(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getMeData = createAsyncThunk('getMeData', async (_, thunkAPI) => {
  try {
    const meId = thunkAPI.getState().auth.user.user?._id
    return await userService.getMeData(meId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const userSlice = createSlice({
  name: 'users',
  initialState: { ...initialState, ...initData },
  reducers: {
    resetUserActionData: () => initData,
    resetUserAction: (state) => {
      return { users: state.users, user: state.user, ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder

      // edit user
      .addCase(editUser.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.user = action.payload
      })
      .addCase(editUser.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      .addCase(updateUser.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.userDetail = action.payload
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
        state.userDetail = null
      })

      .addCase(getUserDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getUserDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.user = action.payload
      })
      .addCase(getUserDetail.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
        state.user = null
      })

      // get all user
      .addCase(findUser.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.users = action.payload
      })
      .addCase(findUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.users = null
      })

      .addCase(userFollowings.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(userFollowings.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.userFollowing = action.payload
      })
      .addCase(userFollowings.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.userFollowing = null
      })

      .addCase(getMeData.pending, (state) => {
        state.loadingDetail = true
      })
      .addCase(getMeData.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.meData = action.payload
      })
      .addCase(getMeData.rejected, (state, action) => {
        state.loadingDetail = false
        state.meData = null
      })
  },
})
export const { resetUserActionData, resetUserAction } = userSlice.actions
export default userSlice.reducer
