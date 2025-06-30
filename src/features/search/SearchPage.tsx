import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { github } from "../../api/github";
import { Link } from "react-router-dom";
import { usePersistentSearch } from "../../hooks/usePersistentSearch";
import "./SearchPage.scss";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";

const PER_PAGE = 10;
const DEFAULT_QUERY = "react";

const languageOptions = [
  "",
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "c++",
];

export const SearchPage = () => {
  const { query, setQuery, language, setLanguage, page, setPage } =
    usePersistentSearch();

  useEffect(() => {
    if (!query.trim()) {
      setQuery(DEFAULT_QUERY);
      setPage(1);
    }
  }, []);

  const searchQuery = query.trim()
    ? `${query.trim()}${language ? `+language:${language}` : ""}`
    : null;

  const { data, isLoading, error } = useQuery({
    queryKey: ["repos", searchQuery, page],
    queryFn: async () => {
      const res = await github.get(`/search/repositories`, {
        params: { q: searchQuery, per_page: PER_PAGE, page },
      });
      return res.data;
    },
    enabled: !!searchQuery,
    keepPreviousData: true,
  });

  const totalCount = data?.total_count || 0;
  const totalPages = Math.min(1000, Math.ceil(totalCount / PER_PAGE));
  const visiblePages = 3;

  const getPageRange = () => {
    const start = Math.max(1, page - 1);
    const end = Math.min(totalPages, start + visiblePages - 1);
    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="search-page">
      <h1>GitHub Repository Explorer</h1>

      <div className="search-controls">
        <div className="input-wrapper">
          <Search className="input-icon" />
          <input
            type="text"
            value={query}
            placeholder="Search repositories..."
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <select
          value={language}
          onChange={(e) => {
            setLanguage(e.target.value);
            setPage(1);
          }}
        >
          {languageOptions.map((lang) => (
            <option key={lang} value={lang}>
              {lang === ""
                ? "All Languages"
                : lang.charAt(0).toUpperCase() + lang.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {!searchQuery && (
        <p className="info">Please enter a search query to see results.</p>
      )}
      {isLoading && <p className="info">Loading...</p>}
      {error && <p className="error">Error fetching data.</p>}

      <div className="repo-grid">
        {data?.items?.map((repo: any) => (
          <div key={repo.id} className="repo-card">
            <h3>
              <Link to={`/repo/${repo.owner.login}/${repo.name}`}>
                {repo.full_name}
              </Link>
            </h3>
            <p>
              {repo.description?.length > 150
                ? `${repo.description.slice(0, 150)}...`
                : repo.description || "No description provided."}
            </p>
            <div className="repo-meta">
              <span>⭐ {repo.stargazers_count}</span>
              <span>🍴 {repo.forks_count}</span>
              <span>💻 {repo.language}</span>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          {page > 1 && (
            <button onClick={() => setPage(page - 1)}>
              <ArrowLeft />
            </button>
          )}
          {getPageRange().map((p) => (
            <button
              key={p}
              className={p === page ? "active" : ""}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
          {page < totalPages && (
            <button onClick={() => setPage(page + 1)}>
              <ArrowRight />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
