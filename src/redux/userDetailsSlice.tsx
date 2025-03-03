import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface UserDetails {
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
  // Add more fields as needed
}

// Initial state
const initialState = {
  user: null as UserDetails | null,
  loading: false,
  error: null as string | null,
};

// Async thunk for fetching user details
export const fetchUserDetails = createAsyncThunk(
  "user/fetchUserDetails",
  async (id: string, { rejectWithValue }) => {
    try {
      // Check localStorage first
      const storedUser = localStorage.getItem("selectedUser");
      if (storedUser) {
        const parsedUser: UserDetails = JSON.parse(storedUser);
        if (parsedUser.id === id) {
          return parsedUser;
        }
      }

      // Fetch from API if not found in localStorage
      const res = await fetch(
        `https://67c14e7461d8935867e27cf7.mockapi.io/api/users/users/${id}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch user details.");
      }
      const data: UserDetails = await res.json();

      // Save to localStorage
      localStorage.setItem("selectedUser", JSON.stringify(data));

      return data;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

// Create slice
const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("selectedUser"); // Remove from localStorage if needed
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearUser } = userDetailsSlice.actions;
export default userDetailsSlice.reducer;
