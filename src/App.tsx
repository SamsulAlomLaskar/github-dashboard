import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { SearchPage } from "./features/search/SearchPage";
import { RepoDetailsPage } from "./features/repo/RepoDetailsPage";
import { IssuesPage } from "./features/issues/IssuesPage";
import { ProfilePage } from "./features/profile/ProfilePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/repo/:owner/:repo" element={<RepoDetailsPage />} />
        <Route path="/repo/:owner/:repo/issues" element={<IssuesPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile/:username" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
