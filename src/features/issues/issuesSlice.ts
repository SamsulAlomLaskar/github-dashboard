import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { github } from "../../api/github";

export const fetchIssuesByRepo = createAsyncThunk(
  "issues/fetchIssuesByRepo",
  async ({ owner, repo }: { owner: string; repo: string }) => {
    const [openRes, closedRes] = await Promise.all([
      github.get(`/repos/${owner}/${repo}/issues`, {
        params: { state: "open", per_page: 100 },
      }),
      github.get(`/repos/${owner}/${repo}/issues`, {
        params: { state: "closed", per_page: 100 },
      }),
    ]);

    return {
      open: openRes.data,
      closed: closedRes.data,
    };
  }
);

const issuesSlice = createSlice({
  name: "issues",
  initialState: {
    open: [],
    closed: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssuesByRepo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchIssuesByRepo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.open = action.payload.open;
        state.closed = action.payload.closed;
      })
      .addCase(fetchIssuesByRepo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default issuesSlice.reducer;
