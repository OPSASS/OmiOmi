import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../service/authService';

// lay thong tin us tu localStorage
const user = JSON.parse(localStorage.getItem('profile'));
const initData = {
  user: user ? user : null,
};
const initialState = {
  error: false,
  loading: false,
  updateLoading: false,
  success: false,
  message: '',
};

// register
export const register = createAsyncThunk('register', async (user, thunkAPI) => {
  try {
    return await authService.register(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// login
export const login = createAsyncThunk('login', async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// logout
export const logout = createAsyncThunk('logout', async () => {
  await authService.logout();
});

// searchAcc
export const searchAcc = createAsyncThunk('searchAcc', async (data, thunkAPI) => {
  try {
    return await authService.searchAcc(data);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// resetPassword
export const resetPassword = createAsyncThunk('resetPassword', async (data, thunkAPI) => {
  try {
    return await authService.resetPassword(data);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

// changePassword
export const changePassword = createAsyncThunk('changePassword', async (data, thunkAPI) => {
  try {
    const id = thunkAPI.getState().auth.user.user?._id;

    return await authService.changePassword(id, data);
  } catch (error) {
    const message = error.response.data.message;
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: { ...initData, ...initialState },
  reducers: {
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })

      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      })

      .addCase(searchAcc.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(searchAcc.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
        state.success = true;
      })
      .addCase(searchAcc.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })

      //resetPassword
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
        state.user = null;
      })

      // changePassword
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.message = action.payload;
      });
  },
});
export const { resetAuth } = authSlice.actions;
export default authSlice.reducer;
