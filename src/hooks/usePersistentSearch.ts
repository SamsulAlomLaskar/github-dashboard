import { useState, useEffect } from "react";

export const usePersistentSearch = () => {
  const [query, setQuery] = useState(() => localStorage.getItem("query") || "");
  const [language, setLanguage] = useState(
    () => localStorage.getItem("language") || ""
  );
  const [page, setPage] = useState(
    () => Number(localStorage.getItem("page")) || 1
  );

  useEffect(() => {
    localStorage.setItem("query", query);
    localStorage.setItem("language", language);
    localStorage.setItem("page", page.toString());
  }, [query, language, page]);

  return {
    query,
    setQuery,
    language,
    setLanguage,
    page,
    setPage,
  };
};
