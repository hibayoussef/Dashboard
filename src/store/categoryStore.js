import { create } from "zustand";

export const categoryStore = create((set) => ({
  editedID: null,
  editPass: null,
  uplodaImage: null,
  addMembership: null,

  setEditedID: (id) => {
    set(() => ({ editedID: id }));
  },
  setEditPass: (id) => {
    set(() => ({ editPass: id }));
  },
  setUploadImage: (id) => {
    set(() => ({ uplodaImage: id }));
  },
  setAddMembership: (id) => {
    set(() => ({ addMembership: id }));
  },
}));
