import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import interactionService from '../service/interactionService'

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
  interactions: [],
  interaction: {},
}

// interactions upload
export const createInteraction = createAsyncThunk('createInteraction', async (data, thunkAPI) => {
  try {
    return await interactionService.createInteraction(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get interactions
// get a interactions
export const getInteractionDetail = createAsyncThunk('getInteractionDetail', async (interactionId, thunkAPI) => {
  try {
    return await interactionService.getInteractionDetail(interactionId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get all interactions
export const findInteraction = createAsyncThunk('findInteraction', async (filter, thunkAPI) => {
  try {
    return await interactionService.findInteraction(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// edit Interaction
export const updateInteraction = createAsyncThunk('updateInteraction', async (data, thunkAPI) => {
  try {
    const res = await interactionService.updateInteraction(data)
    return res.data
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// delete interaction
export const deleteInteraction = createAsyncThunk('deleteInteraction', async (interactions, thunkAPI) => {
  try {
    return await interactionService.deleteInteraction(interactions)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const interactionSlice = createSlice({
  name: 'interactions',
  initialState: { ...initialState, ...initData },
  reducers: {
    resetInteractionData: () => initData,
    resetInteractionAction: (state) => {
      return { interactions: state.interactions, interaction: state.interaction, ...initialState }
    },
  },
  extraReducers: (builder) => {
    builder
      // interaction upload
      .addCase(createInteraction.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createInteraction.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.interactions.push(action.payload)
      })
      .addCase(createInteraction.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // get a interaction
      .addCase(getInteractionDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getInteractionDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.interaction = action.payload
      })
      .addCase(getInteractionDetail.rejected, (state) => {
        state.loadingDetail = false
        state.interaction = {}
      })

      // get all interactions
      .addCase(findInteraction.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findInteraction.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.interactions = action.payload
      })
      .addCase(findInteraction.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.interactions = null
      })

      // edit interaction
      .addCase(updateInteraction.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updateInteraction.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.interaction = action.payload
      })
      .addCase(updateInteraction.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.interaction = {}
        state.messageDetail = action.payload
      })

      // delete interaction
      .addCase(deleteInteraction.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deleteInteraction.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.messageDetail = action.payload
      })
      .addCase(deleteInteraction.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetInteractionData, resetInteractionAction } = interactionSlice.actions
export default interactionSlice.reducer
