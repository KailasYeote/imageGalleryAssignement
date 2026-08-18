import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userService from "../service/userService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userRegister = createAsyncThunk("/register",
    async (data, thunkApi) => {
        try {
            const dataResponse = await userService.userRegister(data)
            if (dataResponse.token) {
                await AsyncStorage.setItem("token", dataResponse.token);
                console.log("token from register service ", dataResponse.token)
            }
            return dataResponse;
        }
        catch (error) {
            const errorMessage = error?.response?.data?.message || error?.response?.data || error.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
)

export const userLogin = createAsyncThunk(
    "/login", async (loginData, thunkApi) => {
        try {
            const dataResponse = await userService.userLogin(loginData)
            await AsyncStorage.setItem("token", dataResponse.token);
            console.log("token from login service ", dataResponse.token)
            return dataResponse;
        }
        catch (error) {
            const errorMessage = error?.response?.data?.message || error?.response?.data || error.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
)

export const fetchUser = createAsyncThunk(
    "/getuser", async (_, thunkApi) => {
        try {
            const dataResponse = await userService.fetchUser()
            return dataResponse;
        }
        catch (error) {
            const errorMessage = error?.response?.data?.message || error?.response?.data || error.message;
            return thunkApi.rejectWithValue(errorMessage);
        }
    }
)


const userSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        loading: false,
        error: false

    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.loading = false;
            state.error = false;
            AsyncStorage.removeItem("token");
        }
    }
    ,
    extraReducers(builder) {
        builder
            .addCase(userRegister.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(userRegister.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload.user;
            })
            .addCase(userRegister.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(userLogin.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload.user;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
                state.error = false;
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.user = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }

})
export default userSlice.reducer
export const { clearError, logout } = userSlice.actions
