import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoading: boolean } = {
  isLoading: false
}

const loaderSlice = createSlice({
  name: "loader slice",
  initialState,
  reducers: {
    showLoader: (state) => {
      state.isLoading = true
    },
    hideLoader: (state) => {
      state.isLoading = false
    }
  }
})

export const { showLoader, hideLoader } = loaderSlice.actions

export default loaderSlice.reducer
