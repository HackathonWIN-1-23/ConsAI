import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from "../../axiosApi";

export const fetchCodes = createAsyncThunk('codes/fetchCodes', async () => {
    const response = await axiosApi.get('/codes');
    return response.data;
});

export const fetchArticlesByCode = createAsyncThunk('articles/fetchArticlesByCode', async (codeId) => {
    const response = await axiosApi.get(`/articles`, { params: { codeId } });
    return response.data;
});

export const fetchArticleById = createAsyncThunk('articles/fetchArticleById', async (id) => {
    const response = await axiosApi.get(`/articles/${id}`);
    return response.data;
});

const codesSlice = createSlice({
    name: 'codes',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCodes.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCodes.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchCodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        items: [],
        selectedArticle: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchArticlesByCode.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticlesByCode.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchArticlesByCode.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            .addCase(fetchArticleById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchArticleById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedArticle = action.payload;
            })
            .addCase(fetchArticleById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export const codesReducer = codesSlice.reducer;
export const articlesReducer = articlesSlice.reducer;
