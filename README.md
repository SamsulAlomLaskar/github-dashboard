## GitHub Dashboard

This is a frontend assignment project that allows you search GitHub repositories, view detailed repository and user profiles, explore issues in a kanban view, and switch between dark/light modes — all with a slick, responsive UI.

## ✨ Features

Search GitHub Repositories by name and language.

View Repository Details including top contributors, languages, and quick access to issues.

Profile Page for GitHub users with:

Top starred repositories

Recent commits

List of followers (with drill-down)

Kanban-style Issues View (open/closed)

Dark/Light Mode Toggle with persistent theme

Persistent Search State using localStorage

Fully Responsive UI

## App Flow

1. Search Page
   Default search loads popular repositories (e.g. “React”).

You can filter by language, change pages, and see trimmed repo descriptions.

Clicking a repo opens a details page.

2. Repo Details Page
   Shows languages used, stars, forks, and contributors.

Contributor links open their Profile Page, with back-navigation support.

3. Profile Page
   Displays user's name, avatar, bio, followers, top repos, and recent commits.

Click a follower to dive deeper into their profile.

Go back to previous users or the previous page (if redirected from a card).

4. Issues Page
   Kanban-style board with "To Do" (open issues) and "Done" (closed issues).

Option to switch to a list view.

5. Header
   Navigation links to "Search" and "Profile".

Theme switcher powered by localStorage.

## Tech Stack

React Frontend Framework
TypeScript Type safety
React Router Routing between pages
React Query API data fetching & caching
Redux Toolkit Issues management (Kanban)
SCSS Modular, themeable styling
GitHub REST API Data Source
Lucide Icons Icon Library for UI polish

## 🚀 Getting Started

1. Clone the Repository

   git clone https://github.com/SamsulAlomLaskar/github-dashboard.git
   cd github-dashboard

2. Install Dependencies
   Make sure you have Node.js (v20+) and npm installed.

npm install 3. Run the App Locally

npm run dev
Open http://localhost:5173 in your browser to see the app in action.

## Environment Configuration

.env setup is required as the app uses GitHub’s APIs
.env File Setup

1. Create the .env file at the project root
2. Add GitHub token inside provided in the word doc
   VITE_GITHUB_TOKEN=token

## 📷 Preview

Light Mode Dark Mode

🧪 Bonus Features
Pagination buttons that auto-adjust as you browse.

Back buttons that are smart — they appear based on navigation context.

Persistent theme and search state across reloads.

Custom icons using Lucide (Search, ChevronLeft, etc.)

🙌 Author
Samsul Alom Laskar
Frontend Developer | React & TypeScript Enthusiast
📫 LinkedIn
