import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface SidebarState {
  isSidebarOpen: boolean;
  isSearchOpen: boolean;
  showProfile: boolean;
  isSwitchOrgOpen: boolean;
  showPassword:boolean;
}

const initialState: SidebarState = {
  isSidebarOpen: false,
  isSearchOpen: false,
  showProfile: false,
  isSwitchOrgOpen: false,
  showPassword: false
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    closeSidebar: (state) => {
      state.isSidebarOpen = false;
    },
    openSidebar: (state) => {
      state.isSidebarOpen = true;
    },
    toggleSearch: (state) => {
      state.isSearchOpen = !state.isSearchOpen;
    },
    toggleProfile: (state) => {
      state.showProfile = !state.showProfile;
    },
    toggleOrganisation: (state) => {
        state.isSwitchOrgOpen = !state.isSwitchOrgOpen
    },
    toggleShowpassword: (state) => {
      state.showPassword = !state.showPassword
    }
  },
});

export const {
  toggleSidebar,
  closeSidebar,
  openSidebar,
  toggleSearch,
  toggleProfile,
  toggleOrganisation,
  toggleShowpassword
} = sidebarSlice.actions;

export const selectIsSidebarOpen = (state: RootState) => state.sidebar.isSidebarOpen;
export const selectIsSearchOpen = (state: RootState) => state.sidebar.isSearchOpen;
export const selectShowProfile = (state: RootState) => state.sidebar.showProfile;
export const selectOrganisation = (state: RootState) => state.sidebar.isSwitchOrgOpen
export const selectShowpassword = (state: RootState) =>state.sidebar.showPassword

export default sidebarSlice.reducer;
