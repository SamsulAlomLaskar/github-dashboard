import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Github, Moon, SunDim } from "lucide-react";
import "./Header.scss";

export const Header = () => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <header className="main-header">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <Github />
            GitHub Dashboard
          </Link>
        </div>
        <nav className="nav">
          <Link to="/">Search</Link>
          <Link to="/profile">Profile</Link>
          <div
            className="theme-switch"
            title={
              theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"
            }
          >
            <input
              type="checkbox"
              id="theme-toggle"
              checked={theme === "dark"}
              onChange={toggleTheme}
              aria-label="Toggle theme"
            />
            <label htmlFor="theme-toggle">
              <span className="icons">
                <span className="sun">
                  <SunDim />
                </span>
                <span className="moon">
                  <Moon />
                </span>
              </span>
              <span className="slider"></span>
            </label>
          </div>
        </nav>
      </div>
    </header>
  );
};
