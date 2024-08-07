import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  id: number;
  name: String;
  email: String;
  provider: Provider | null;
  token: string;
}

enum Provider {
  CREDENTIALS,
  GOOGLE,
}

const initialState: UserState = {
  id: 0,
  name: "",
  email: "",
  provider: null,
  token: "",
};

export const userSLice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginAction: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.provider = action.payload.provider;
      state.token = action.payload.token;
    },
    logoutAction: (state) => {
      state.id = 0;
      state.name = "";
      state.email = "";
      state.provider = null;
      state.token = "";
    },
  },
});

export const { loginAction, logoutAction } = userSLice.actions;
export default userSLice.reducer;
