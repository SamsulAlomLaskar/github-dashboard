import React, { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { github } from "../../api/github";
import "./ProfilePage.scss";
import { ChevronLeft } from "lucide-react";

export const ProfilePage = () => {
  const params = useParams<{ username?: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const defaultUsername = "samsulalomlaskar";
  const initialUsername = params.username || defaultUsername;
  const showBackButton = location.state?.fromCard;

  const [history, setHistory] = useState<string[]>([]);
  const [currentUsername, setCurrentUsername] = useState(initialUsername);
  const [inputUsername, setInputUsername] = useState(initialUsername);

  const { data: user, isLoading } = useQuery({
    queryKey: ["user", currentUsername],
    queryFn: async () => {
      const res = await github.get(`/users/${currentUsername}`);
      return res.data;
    },
    enabled: !!currentUsername,
  });

  const { data: repos } = useQuery({
    queryKey: ["repos", currentUsername],
    queryFn: async () => {
      const res = await github.get(
        `/users/${currentUsername}/repos?sort=stars&per_page=5`
      );
      return res.data;
    },
    enabled: !!currentUsername,
  });

  const { data: followers } = useQuery({
    queryKey: ["followers", currentUsername],
    queryFn: async () => {
      const res = await github.get(
        `/users/${currentUsername}/followers?per_page=5`
      );
      return res.data;
    },
    enabled: !!currentUsername,
  });

  const { data: events } = useQuery({
    queryKey: ["events", currentUsername],
    queryFn: async () => {
      const res = await github.get(`/users/${currentUsername}/events/public`);
      return res.data
        .filter((event: any) => event.type === "PushEvent")
        .slice(0, 5);
    },
    enabled: !!currentUsername,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername.trim()) {
      setCurrentUsername(inputUsername.trim());
      setHistory([]);
    }
  };

  const handleFollowerClick = (followerLogin: string) => {
    setHistory((prev) => [...prev, currentUsername]);
    setCurrentUsername(followerLogin);
    setInputUsername(followerLogin);
  };

  const handleBackToPreviousUser = () => {
    const previous = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentUsername(previous);
    setInputUsername(previous);
  };

  return (
    <div className="profile-page">
      <div className="nav-buttons">
        {showBackButton && (
          <button className="back-button" onClick={() => navigate(-1)}>
            <ChevronLeft /> Back
          </button>
        )}
        {history.length > 0 && (
          <button className="back-button" onClick={handleBackToPreviousUser}>
            <ChevronLeft /> {history[history.length - 1]}
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="profile-search">
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={inputUsername}
          onChange={(e) => setInputUsername(e.target.value)}
        />
        <button type="submit">View Profile</button>
      </form>

      {isLoading && <p>Loading profile...</p>}

      {user && (
        <div className="profile-card">
          <img src={user.avatar_url} alt={user.login} />
          <div>
            <h2>{user.name || user.login}</h2>
            <p>{user.bio}</p>
            <p>👥 {user.followers} followers</p>
            <a href={user.html_url} target="_blank" rel="noreferrer">
              View on GitHub
            </a>
          </div>
        </div>
      )}

      {repos && (
        <div className="section">
          <h3>⭐ Top Starred Repositories</h3>
          <ul className="repo-list">
            {repos.map((repo: any) => (
              <li key={repo.id}>
                <a href={repo.html_url} target="_blank" rel="noreferrer">
                  {repo.name}
                </a>{" "}
                ({repo.stargazers_count} ⭐)
              </li>
            ))}
          </ul>
        </div>
      )}

      {followers && (
        <div className="section">
          <h3>👥 Followers</h3>
          <ul className="follower-list">
            {followers.map((follower: any) => (
              <li key={follower.id}>
                <button
                  className="follower-button"
                  onClick={() => handleFollowerClick(follower.login)}
                >
                  {follower.login}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {events && (
        <div className="section">
          <h3>🕒 Recent Commits</h3>
          {events.length === 0 ? (
            <p>No recent commits available.</p>
          ) : (
            <ul className="commit-list">
              {events.map((event: any, index: number) => (
                <li key={index}>
                  <strong>{event.repo.name}</strong>
                  <ul>
                    {event.payload.commits?.map((commit: any, i: number) => (
                      <li key={i}>- {commit.message}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};
