import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import filesService from '../service/filesService'

// lay thong tin us tu localStorage

const initialState = {
  error: false,
  loading: false,
  success: false,
  uploading: false,
  message: '',
  errorDetail: false,
  loadingDetail: false,
  successDetail: false,
  uploadingDetail: false,
  messageDetail: '',
}

const initFile = {
  file: [],
}
const initFiles = {
  files: [],
}
export const uploadFile = createAsyncThunk('uploadFile', async (data, thunkAPI) => {
  try {
    const id = thunkAPI.getState().auth.user.user?._id
    return await filesService.uploadFile(data, id)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const getFile = createAsyncThunk('getFile', async (userId, thunkAPI) => {
  try {
    return await filesService.getFile(userId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})
export const getFileByUs = createAsyncThunk('getFileByUs', async (userId, thunkAPI) => {
  try {
    return await filesService.getFileByUs(userId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})
export const deleteFile = createAsyncThunk('deleteFile', async (userId, thunkAPI) => {
  try {
    return await filesService.deleteFile(userId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const filesSlice = createSlice({
  name: 'files',
  initialState: { ...initFile, ...initFiles, ...initialState },
  reducers: {
    resetFileAction: (state) => {
      return { files: state.files, file: state.file, ...initialState }
    },
    resetFileData: () => initFile,
    resetFilesData: () => initFiles,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.file = action.payload
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
      .addCase(getFile.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getFile.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.files = action.payload
      })
      .addCase(getFile.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
      })
      .addCase(getFileByUs.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(getFileByUs.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.files = action.payload
      })
      .addCase(getFileByUs.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
      .addCase(deleteFile.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deleteFile.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.files = action.payload
      })
      .addCase(deleteFile.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetFileAction, resetFileData, resetFilesData } = filesSlice.actions
export default filesSlice.reducer
