import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import adminService from '../service/adminService'

// lay thong tin us tu localStorage

const initialState = {
  maintenance: false,
  error: false,
  loading: false,
  success: false,
  message: '',
}
const initData = {
  dashboardData: {},
  feedbacks: [],
  reposts: [],
  requests: [],
  visits: [],
}

// dashboardData
export const getDashboardData = createAsyncThunk('getDashboardData', async (_, thunkAPI) => {
  try {
    return await adminService.getDashboardData()
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const resetPass = createAsyncThunk('resetPass', async (data, thunkAPI) => {
  try {
    return await adminService.resetPass(data.id, data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get feedback
export const getFeedback = createAsyncThunk('getFeedback', async (filter, thunkAPI) => {
  try {
    return await adminService.getFeedback(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteFeedback = createAsyncThunk('deleteFeedback', async (_, thunkAPI) => {
  try {
    return await adminService.deleteFeedback()
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const userRepost = createAsyncThunk('userRepost', async (data, thunkAPI) => {
  try {
    return await adminService.userRepost(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const userFeedback = createAsyncThunk('userFeedback', async (data, thunkAPI) => {
  try {
    return await adminService.userFeedback(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const userRequest = createAsyncThunk('userRequest', async (data, thunkAPI) => {
  try {
    return await adminService.userRequest(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const postRepost = createAsyncThunk('postRepost', async (data, thunkAPI) => {
  try {
    return await adminService.postRepost(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getRequest = createAsyncThunk('getRequest', async (filter, thunkAPI) => {
  try {
    return await adminService.getRequest(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getRepost = createAsyncThunk('getRepost', async (filter, thunkAPI) => {
  try {
    return await adminService.getRepost(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteRepost = createAsyncThunk('deleteRepost', async (id, thunkAPI) => {
  try {
    return await adminService.deleteRepost(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteUser = createAsyncThunk('deleteUser', async (id, thunkAPI) => {
  try {
    return await adminService.deleteUser(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleteRequest = createAsyncThunk('deleteRequest', async (id, thunkAPI) => {
  try {
    return await adminService.deleteRequest(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const system = createAsyncThunk('system', async (filter, thunkAPI) => {
  try {
    return await adminService.system(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const systemOn = createAsyncThunk('systemOn', async (_, thunkAPI) => {
  try {
    return await adminService.systemOn()
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const systemOff = createAsyncThunk('systemOff', async (_, thunkAPI) => {
  try {
    return await adminService.systemOff()
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const addAdmin = createAsyncThunk('addAdmin', async (id, thunkAPI) => {
  try {
    return await adminService.addAdmin(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const deleAdmin = createAsyncThunk('deleAdmin', async (id, thunkAPI) => {
  try {
    return await adminService.deleAdmin(id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getVisit = createAsyncThunk('getVisit', async (filter, thunkAPI) => {
  try {
    return await adminService.getVisit(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const sendVisit = createAsyncThunk('sendVisit', async (data, thunkAPI) => {
  try {
    return await adminService.sendVisit(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const adminSlice = createSlice({
  name: 'admin',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetAdminAction: (state) => {
      return {
        userNew: state.userNew,
        feedbacks: state.feedbacks,
        reposts: state.reposts,
        requests: state.requests,
        visits: state.visits,
        ...initialState,
      }
    },
    resetAdminData: () => initData,
  },
  extraReducers: (builder) => {
    builder

      // get post user
      .addCase(getDashboardData.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getDashboardData.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.dashboardData = action.payload
      })
      .addCase(getDashboardData.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.dashboardData = null
      })

      .addCase(resetPass.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(resetPass.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(resetPass.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      // get feedback
      .addCase(getFeedback.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getFeedback.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feedbacks = action.payload
      })
      .addCase(getFeedback.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.feedbacks = null
      })
      // delete feedback
      .addCase(deleteFeedback.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(deleteFeedback.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feedbacks = action.payload
      })
      .addCase(deleteFeedback.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(userRepost.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(userRepost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.reposts = action.payload
      })
      .addCase(userRepost.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(userFeedback.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(userFeedback.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.feedbacks = action.payload
      })
      .addCase(userFeedback.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(userRequest.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(userRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.requests = action.payload
      })
      .addCase(userRequest.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(postRepost.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(postRepost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.reposts = action.payload
      })
      .addCase(postRepost.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(getRequest.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.requests = action.payload
      })
      .addCase(getRequest.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(getRepost.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getRepost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.reposts = action.payload
      })
      .addCase(getRepost.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(deleteRepost.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(deleteRepost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(deleteRepost.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(deleteRequest.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(system.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(system.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.maintenance = action.payload
      })
      .addCase(system.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(systemOn.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(systemOn.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(systemOn.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(systemOff.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(systemOff.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(systemOff.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(addAdmin.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(addAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(addAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(deleAdmin.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(deleAdmin.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.message = action.payload
      })
      .addCase(deleAdmin.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(getVisit.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getVisit.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.visits = action.payload
      })
      .addCase(getVisit.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })

      .addCase(sendVisit.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(sendVisit.fulfilled, (state) => {
        state.loading = false
        state.success = true
      })
      .addCase(sendVisit.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
  },
})
export const { resetAdminAction } = adminSlice.actions
export const { resetAdminData } = adminSlice.actions
export default adminSlice.reducer
