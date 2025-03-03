// userSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface Users{
  id: string;
  organisation: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  status: "active" | "inactive" | "pending" | "blacklisted";
  bvn: string;
  gender: string;
  maritalstatus: string;
  children: number;
  typeofresidence: string;
  levelofeducation: string;
  employmentstatus: string;
  sectorofemployment: string;
  durationofemployment: string;
  officemail: string;
  monthlyincome: string;
  loanrepayment: string;
  twitter: string;
  facebook: string;
  instagram: string;
  relationship: string;
}

interface UserState {
  users: Users[];
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://67c14e7461d8935867e27cf7.mockapi.io/api/users/users"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      return data as Users[];
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    // add any synchronous reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
