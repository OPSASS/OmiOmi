import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import relationshipsService from '../service/relationshipService'

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
  relationships: [],
  relationship: {},
}

// relationships upload
export const createRelationships = createAsyncThunk('createRelationships', async (data, thunkAPI) => {
  try {
    return await relationshipsService.createRelationships(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get relationships
// get a relationships
export const getRelationshipsDetail = createAsyncThunk('getRelationshipsDetail', async (relationshipsId, thunkAPI) => {
  try {
    return await relationshipsService.getRelationshipsDetail(relationshipsId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get all relationships
export const findRelationships = createAsyncThunk('findRelationships', async (filter, thunkAPI) => {
  try {
    return await relationshipsService.findRelationships(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// edit relationship
export const updateRelationships = createAsyncThunk('updateRelationships', async (data, thunkAPI) => {
  try {
    const meId = thunkAPI.getState().auth.user.user?._id
    const res = await relationshipsService.updateRelationships(data, meId)
    return res.data
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// delete relationship
export const deleteRelationships = createAsyncThunk('deleteRelationships', async (relationships, thunkAPI) => {
  try {
    return await relationshipsService.deleteRelationships(relationships)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const relationshipsSlice = createSlice({
  name: 'relationships',
  initialState: { ...initialState, ...initData },
  reducers: {
    resetRelationshipsData: () => initData,
    resetRelationshipsAction: (state) => {
      return { relationships: state.relationships, relationship: state.relationship, ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      // relationship upload
      .addCase(createRelationships.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createRelationships.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.relationships.push(action.payload)
      })
      .addCase(createRelationships.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // get a relationship
      .addCase(getRelationshipsDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getRelationshipsDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.relationship = action.payload
      })
      .addCase(getRelationshipsDetail.rejected, (state) => {
        state.loadingDetail = false
        state.relationship = {}
      })

      // get all relationships
      .addCase(findRelationships.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findRelationships.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.relationships = action.payload
      })
      .addCase(findRelationships.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.relationships = null
      })

      // edit relationship
      .addCase(updateRelationships.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateRelationships.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.relationship = action.payload
      })
      .addCase(updateRelationships.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.relationship = {}
      })

      // delete relationship
      .addCase(deleteRelationships.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deleteRelationships.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.messageDetail = action.payload
      })
      .addCase(deleteRelationships.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetRelationshipsData, resetRelationshipsAction } = relationshipsSlice.actions
export default relationshipsSlice.reducer
