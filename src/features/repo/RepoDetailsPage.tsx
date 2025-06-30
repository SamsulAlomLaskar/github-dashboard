import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { github } from "../../api/github";
import "./RepoDetailsPage.scss";
import { ChevronLeft } from "lucide-react";

export const RepoDetailsPage = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();

  const { data: repoData, isLoading: loadingRepo } = useQuery({
    queryKey: ["repo", owner, repo],
    queryFn: async () => {
      const res = await github.get(`/repos/${owner}/${repo}`);
      return res.data;
    },
  });

  const { data: contributors, isLoading: loadingContrib } = useQuery({
    queryKey: ["contributors", owner, repo],
    queryFn: async () => {
      const res = await github.get(`/repos/${owner}/${repo}/contributors`, {
        params: { per_page: 10 },
      });
      return res.data;
    },
  });

  const { data: languages } = useQuery({
    queryKey: ["languages", owner, repo],
    queryFn: async () => {
      const res = await github.get(`/repos/${owner}/${repo}/languages`);
      return res.data;
    },
  });

  return (
    <div className="repo-details-page">
      {loadingRepo ? (
        <p className="loading">Loading repository details...</p>
      ) : (
        <>
          <button onClick={() => navigate("/")} className="back-button">
            <ChevronLeft />
            Back
          </button>

          <h2>{repoData.full_name}</h2>
          <p>{repoData.description || "No description provided."}</p>

          <div className="stats">
            ⭐ {repoData.stargazers_count} | 🍴 {repoData.forks_count}
          </div>

          <div className="languages">
            <h4>Languages</h4>
            <ul>
              {languages &&
                Object.entries(languages).map(([lang, bytes]) => (
                  <li key={lang}>
                    {lang} ({bytes} bytes)
                  </li>
                ))}
            </ul>
          </div>

          <div className="contributors">
            <h4>Top Contributors</h4>
            {loadingContrib ? (
              <p>Loading contributors...</p>
            ) : (
              <ul>
                {contributors?.map((contrib: any) => (
                  <li key={contrib.id}>
                    <Link
                      to={`/profile/${contrib.login}`}
                      state={{ fromCard: true }}
                    >
                      {contrib.login}
                    </Link>
                    ({contrib.contributions} contributions)
                  </li>
                ))}
              </ul>
            )}
          </div>

          <Link to={`/repo/${owner}/${repo}/issues`} className="kanban-link">
            View Issues (Kanban)
          </Link>
        </>
      )}
    </div>
  );
};
