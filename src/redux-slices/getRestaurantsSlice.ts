import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Restaurants } from "core/models/restaurants";
import { getRestaurantsApi } from "core/services/restaurants";

const initialState: { restaurants: Restaurants[], isLoading: boolean, count: number } = {
  restaurants: [],
  isLoading: false,
  count: 0
}

type Payload = {
  restaurants: Restaurants[],
  count: number
}

export const getRestaurantsThunk = createAsyncThunk<Payload, void, {}>(
  "restaurantsState",
  async () => {
    const response = await getRestaurantsApi()
    if (response.data && response.status) {
      const { restaurants, count } = response.data
      return { restaurants, count }
    } else {
      return { restaurants: [], count: 0 }
    }
  }
)

const restaurantsSlice = createSlice({
  name: "restaurantSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getRestaurantsThunk.pending, state => {
      state.restaurants = []
      state.isLoading = true
    })
    builder.addCase(getRestaurantsThunk.fulfilled, (state, action) => {
      state.restaurants = action.payload.restaurants
      state.isLoading = false
      state.count = action.payload.count
    })
    builder.addCase(getRestaurantsThunk.rejected, (state) => {
      state.restaurants = []
      state.isLoading = false
      state.count = 0
    })
  }
}
)

export default restaurantsSlice.reducer
