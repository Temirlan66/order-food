import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../../lib/fetchAPI";

export const basketActionTypes = {
  ADD_ITEM_SUCCESS: " ADD_ITEM_SUCCESS",
  GET_BASKET_SUCCESS: "GET_BASKET_SUCCESS",
};

const initialState = {
  items: [],
  error: "",
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getBasketSuccess(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateBasketItem.fulfilled, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = "";
    });
    builder.addCase(updateBasketItem.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getBasket.rejected, (state, action) => {
      state.isLoading = false;
      state.items=action.payload
    });
  },
});

export const basketAction = basketSlice.actions;

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await fetchApi("basket");
      return data.items;
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);
export const addToBasket = createAsyncThunk(
  "basket/addToBasket",
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const updateBasketItem = createAsyncThunk(
  "basket/updateBasketItem",
  async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketitem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const deleteBasketItem = createAsyncThunk(
  "basket/delelteBasketItem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketitem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch(getBasket());
    } catch (error) {
      console.log(error);
    }
  }
);