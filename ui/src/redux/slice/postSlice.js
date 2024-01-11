import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import postService from '../service/postService'

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
  posts: [],
  post: {},
}

// posts upload
export const createPost = createAsyncThunk('createPost', async (data, thunkAPI) => {
  try {
    return await postService.createPost(data)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get posts
// get a posts
export const getPostDetail = createAsyncThunk('getPostDetail', async (postId, thunkAPI) => {
  try {
    return await postService.getPostDetail(postId)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// get all posts
export const findPost = createAsyncThunk('findPost', async (filter, thunkAPI) => {
  try {
    return await postService.findPost(filter)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// edit Post
export const updatePost = createAsyncThunk('updatePost', async (data, thunkAPI) => {
  try {
    const res = await postService.updatePost(data)
    return res.data
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

// delete post
export const deletePost = createAsyncThunk('deletePost', async (posts, thunkAPI) => {
  try {
    return await postService.deletePost(posts)
  } catch (error) {
    const message = error.response.data.message
    return thunkAPI.rejectWithValue(message)
  }
})

export const postSlice = createSlice({
  name: 'posts',
  initialState: { ...initialState, ...initData },
  reducers: {
    resetPostData: () => initData,
    resetPostAction: (state) => {
      return {
        posts: state.posts,
        post: state.post,
        ...initialState,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // post upload
      .addCase(createPost.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.posts.push(action.payload)
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })

      // get a post
      .addCase(getPostDetail.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(getPostDetail.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.post = action.payload
      })
      .addCase(getPostDetail.rejected, (state) => {
        state.loadingDetail = false
        state.post = {}
      })

      // get all posts
      .addCase(findPost.pending, (state) => {
        state.loading = true
        state.success = false
      })
      .addCase(findPost.fulfilled, (state, action) => {
        state.loading = false
        state.success = true
        state.posts = action.payload
      })
      .addCase(findPost.rejected, (state, action) => {
        state.loading = false
        state.error = true
        state.message = action.payload
        state.posts = null
      })

      // edit post
      .addCase(updatePost.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.post = action.payload
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.post = {}
        state.messageDetail = action.payload
      })

      // delete post
      .addCase(deletePost.pending, (state) => {
        state.loadingDetail = true
        state.successDetail = false
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loadingDetail = false
        state.successDetail = true
        state.messageDetail = action.payload
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loadingDetail = false
        state.errorDetail = true
        state.messageDetail = action.payload
      })
  },
})
export const { resetPostData, resetPostAction } = postSlice.actions
export default postSlice.reducer
