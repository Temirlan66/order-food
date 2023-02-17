import { applyMiddleware, combineReducers, createStore } from "redux";
import { mealsSlice } from "./meals/mealsSlice";
import thunk from "redux-thunk";
import { basketSlice } from "./basket/basketSlice";

export const rootReducer = combineReducers({
  [mealsSlice.name]: mealsSlice.reducer,
  [basketSlice.name]: basketSlice.reducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
