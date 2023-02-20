import { fetchApi } from "../../lib/fetchAPI";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
export const mealsActionTypes = {
  GET_MEALS_SUCCESS: "GET_MEALS_SUCCESS",
  GET_MEALS_STARTED: "GET_MEALS_STARTED",
  GET_MEALS_FAILED: " GET_MEALS_FAILED",
};

const initialState = {
  meals: [],
  isLoading: false,
  error: "",
};

export const mealsSlice = createSlice({
  name: "meals",
  initialState,
  reducers: {
    getMealsSuccess(state, action) {
      state.meals = action.payload;
      state.isLoading = false;
      state.error = "";
    },
    getMealsStarted(state) {
      state.isLoading = true;
    },

    getMealsFailed(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getMeals.fulfilled, (state, action) => {
      state.meals = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(getMeals.pending, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getMeals.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

export const mealsAction = mealsSlice.actions;

export const getMeals = createAsyncThunk(
  "meals/getMeals",
  async (payload, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchApi("foods");
      dispatch(mealsAction.getMealsSuccess(data));
      return data;
    } catch (error) {
      return rejectWithValue("Something went wornt ");
    }
  }
);

// export const getMeals = () => {
//   return async (dispatch) => {
//     try {
//       dispatch(mealsAction.getMealsStarted());

//       const { data } = await fetchApi("foods");
//       dispatch(mealsSlice.actions.getMealsSuccess(data));
//     } catch (error) {
//       dispatch(mealsAction.getMealsFailed("Something wornt"));
//     }
//   };
// };
