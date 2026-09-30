import { create } from "zustand";

interface UiState {
  isFilterModalOpen: boolean;
  isLoginModalOpen: boolean,
  isRegisterModalOpen: boolean,
  isMakeReservationModalOpen: boolean;
  isCancelReservationModalOpen: boolean;
  isCreateOrEditAccommodationModalOpen: boolean;
  isDeleteAccommodationModalOpen: boolean;
  isViewAccommodationModalOpen: boolean;
  toggleFilterModal: () => void;
  setFilterModalOpen: (value: boolean) => void;
  toggleCreateOrEditAccommodationModal: () => void;
  setLoginModalOpen: (value: boolean) => void;
  setRegisterModalOpen: (value: boolean) => void;
  setMakeReservationModalOpen: (value: boolean) => void;
  setCancelReservationModalOpen: (value: boolean) => void;
  setCreateOrEditAccommodationModalOpen: (value: boolean) => void;
  setDeleteAccommodationModalOpen: (value: boolean) => void;
  setViewAccommodationModalOpen: (value: boolean) => void;
}

export const uiStore = create<UiState>((set) => ({
  isFilterModalOpen: false,
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isCreateOrEditAccommodationModalOpen: false,
  isCancelReservationModalOpen: false,
  isMakeReservationModalOpen: false,
  isDeleteAccommodationModalOpen: false,
  isViewAccommodationModalOpen: false,
  toggleFilterModal: () => set((state) => ({ isFilterModalOpen: !state.isFilterModalOpen })),
  setFilterModalOpen: (value) => set({ isFilterModalOpen: value }),
  toggleCreateOrEditAccommodationModal: () =>
    set((state) => ({ isCreateOrEditAccommodationModalOpen: !state.isCreateOrEditAccommodationModalOpen })),
  setLoginModalOpen: (value) =>
    set({ isLoginModalOpen: value }),
  setRegisterModalOpen: (value) =>
    set({ isRegisterModalOpen: value }),
  setMakeReservationModalOpen: (value) =>
    set({ isMakeReservationModalOpen: value }),
  setCancelReservationModalOpen: (value) =>
    set({ isCancelReservationModalOpen: value }),
  setCreateOrEditAccommodationModalOpen: (value) =>
    set({ isCreateOrEditAccommodationModalOpen: value }),
  setDeleteAccommodationModalOpen: (value) =>
    set({ isDeleteAccommodationModalOpen: value }),
  setViewAccommodationModalOpen: (value) =>
    set({ isViewAccommodationModalOpen: value }),
}));
