import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "../firebase/firebase";
import { LOGIN_STATE } from "../constants/local-storage";
import { LoginStateType, UserState } from "../type";

const { auth, provider } = firebaseAuth();

let loginInfoValue: LoginStateType = {
  login: false,
  name: null,
  email: null,
  photo: null,
};

const loginInfoString: string | null = localStorage.getItem(LOGIN_STATE);

if (loginInfoString !== null) {
  loginInfoValue = JSON.parse(loginInfoString);
}

const initialState: UserState = {
  loginInfo: loginInfoValue,
  loginStatus: "",
  error: "",
  userMenu: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<LoginStateType>) => {
      state.loginInfo = action.payload;
    },
    userMenu: (state, action: PayloadAction<string>) => {
      state.userMenu = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userLogin.pending, (state, action) => {
        state.loginStatus = "loading";
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loginStatus = "succeeded";
        state.loginInfo = action.payload ?? loginInfoValue;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loginStatus = "failed";
        state.error = action.error.message ?? "";
      });
  },
});

export const userLogin = createAsyncThunk("user/userLoginData", async () => {
  const result = await signInWithPopup(auth, provider);
  const credential = GoogleAuthProvider.credentialFromResult(result);
  if (credential == null) {
    return;
  }
  const token = credential.accessToken;
  const user = result.user;
  console.log("token:", token, "user:", user);
  const loginState: LoginStateType = {
    login: true,
    name: user.displayName,
    email: user.email,
    photo: user.photoURL,
  };
  localStorage.setItem(LOGIN_STATE, JSON.stringify(loginState));
  return loginState;
});

export const { logout, userMenu } = userSlice.actions;
export default userSlice.reducer;
