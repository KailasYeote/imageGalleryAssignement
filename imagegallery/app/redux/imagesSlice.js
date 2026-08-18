import imagesService from "../service/imagesService";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getImagesAsync = createAsyncThunk(
    "images/getImages",
    async ({ page = 1, limit = 20 } = {}, { rejectWithValue }) => {
        try {
            const response = await imagesService.getImages(page, limit);
            return { data: response, page };
        } catch (error) {
            console.log("error from images slice", error);
            return rejectWithValue(error.message);
        }
    }
);

const imagesSlice = createSlice({
    name: "images",
    initialState: {
        images: [],
        loading: false,
        loadingMore: false,
        error: null,
        page: 1,
        hasMore: true,
        searchQuery: "",
        favorites: [],
    },
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        toggleFavorite: (state, action) => {
            const item = action.payload;
            const existingIndex = state.favorites.findIndex((fav) => fav.id === item.id);
            if (existingIndex >= 0) {
                state.favorites.splice(existingIndex, 1);
            } else {
                state.favorites.push(item);
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getImagesAsync.pending, (state, action) => {
            const isFirstPage = !action.meta.arg || action.meta.arg.page === 1;
            if (isFirstPage) {
                state.loading = true;
            } else {
                state.loadingMore = true;
            }
            state.error = null;
        });
        builder.addCase(getImagesAsync.fulfilled, (state, action) => {
            state.loading = false;
            state.loadingMore = false;
            
            const { data, page } = action.payload;
            state.images = data;
            state.page = page;
            state.hasMore = data.length === 8;
        });
        builder.addCase(getImagesAsync.rejected, (state, action) => {
            state.loading = false;
            state.loadingMore = false;
            state.error = action.payload || "Failed to fetch images";
        });
    }
})

export const { setSearchQuery, toggleFavorite } = imagesSlice.actions;
export default imagesSlice.reducer
