import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Cuisine } from "core/models/restaurants";
import { getCuisinesApi } from "core/services/restaurants";

const initialState: { cuisines: Cuisine[] } = {
  cuisines: []
}

export const getCuisinesThunk = createAsyncThunk<Cuisine[], void, {}>(
  'cuisinesState',
  async () => {
    const response = await getCuisinesApi()
    if (response.data && response.status) {
      const { cuisines } = response.data;
      return cuisines
    } else {
      return []
    }
  }
)

const cuisinesSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCuisinesThunk.pending, (state) => {
      state.cuisines = initialState.cuisines
    })
      .addCase(getCuisinesThunk.fulfilled, (state, action) => {
        state.cuisines = action.payload
      })
      .addCase(getCuisinesThunk.rejected, (state) => {
        state.cuisines = []
      })
  },
})

export default cuisinesSlice.reducer;