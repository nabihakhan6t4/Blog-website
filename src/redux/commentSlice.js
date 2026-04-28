import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comment",
  initialState: {
    loading: false,
    commentText: "",
    comments: [],
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCommentText: (state, action) => {
  state.commentText = action.payload;
},
setComments: (state, action) => {
  state.comments = action.payload;
},
addComment: (state, action) => {
  state.comments.unshift(action.payload);
},
  },
});

export const { setLoading, setCommentText, setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
