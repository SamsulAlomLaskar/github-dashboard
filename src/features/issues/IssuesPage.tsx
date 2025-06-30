import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { fetchIssuesByRepo } from "./issuesSlice";
import "./IssuesPage.scss";
import { ChevronLeft } from "lucide-react";

export const IssuesPage = () => {
  const { owner, repo } = useParams<{ owner: string; repo: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [viewMode, setViewMode] = useState<"list" | "kanban">("kanban");

  const { open, closed, status } = useSelector(
    (state: RootState) => state.issues
  );

  useEffect(() => {
    if (owner && repo) {
      dispatch(fetchIssuesByRepo({ owner, repo }));
    }
  }, [owner, repo]);

  const renderIssue = (issue: any) => (
    <div key={issue.id} className="issue-card">
      <a href={issue.html_url} target="_blank" rel="noreferrer">
        #{issue.number} - {issue.title}
      </a>
      <div className="labels">
        {issue.labels?.map((label: any) => (
          <span
            key={label.id}
            className="label"
            style={{ backgroundColor: `#${label.color}` }}
          >
            {label.name}
          </span>
        ))}
      </div>
    </div>
  );

  if (status === "loading") return <p>Loading issues...</p>;
  if (status === "failed") return <p>Failed to load issues.</p>;

  return (
    <div className="issues-page">
      <button className="back-button" onClick={() => navigate(-1)}>
        <ChevronLeft />
        Back
      </button>

      <div className="toolbar">
        <h2>
          Issues for {owner}/{repo}
        </h2>
        <button
          onClick={() => setViewMode(viewMode === "kanban" ? "list" : "kanban")}
        >
          Switch to {viewMode === "kanban" ? "List" : "Kanban"} View
        </button>
      </div>

      {viewMode === "kanban" ? (
        <div className="kanban-board">
          <div className="column">
            <h3>🟦 To Do (Open)</h3>
            {open.map(renderIssue)}
          </div>
          <div className="column">
            <h3>✅ Done (Closed)</h3>
            {closed.map(renderIssue)}
          </div>
        </div>
      ) : (
        <div className="list-view">
          <h3>🟦 To Do (Open)</h3>
          {open.map(renderIssue)}
          <h3>✅ Done (Closed)</h3>
          {closed.map(renderIssue)}
        </div>
      )}
    </div>
  );
};
