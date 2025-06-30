import axios from "axios";

const token = import.meta.env.VITE_GITHUB_TOKEN;

export const github = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
