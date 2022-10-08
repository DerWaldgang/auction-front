import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  loading: false,
};

export const fetchProduct = createAsyncThunk(
  "fetch/product",
  async (_, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:3030/Product");
      const data = await res.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const patchProd = createAsyncThunk('patch/product', async ({ id, priceStart }, thunkAPI) => {
  try {
      await fetch(`http://localhost:3030/Product/pat/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ priceStart: priceStart })
    });
    return { id, priceStart };
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.loading = false
        state.product = action.payload;
      })
      .addCase(fetchProduct.pending, (state, action) => {
        state.loading = true
      })
      .addCase(patchProd.fulfilled, (state, action) => {
        state.product.map((item) => {
          if (item._id === action.payload.id) {
            return item.priceStart = action.payload.priceStart;
          }
          return item;
        })
      })
  },
});

export default productSlice.reducer;