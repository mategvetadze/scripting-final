# KIU Explorer — Final Project

An interactive website about **Kutaisi International University (KIU)** built with HTML, CSS, and vanilla JavaScript for the Scripting course final exam.

## Features

- **About KIU** — Mission, campus overview, and live Kutaisi weather
- **Academic Programs** — Searchable and filterable program cards loaded from JSON
- **Campus Highlights** — Tabbed sections for facilities, housing, and location
- **Favorites** — Save programs locally with `localStorage`
- **Dark/Light Theme** — Toggle with persistent preference
- **Personalization** — Save your name for a personalized greeting
- **Newsletter** — Contact form with local storage

## JavaScript Requirements Covered

| Requirement | Implementation |
|-------------|----------------|
| DOM | Element selection, dynamic HTML, class/style toggling, event listeners |
| ES6+ | Arrow functions, template literals, destructuring, spread operator |
| Async JS | Callbacks (`setTimeout`), Promises (`.then`), Async/Await |
| Fetch API | Local `programs.json` + Open-Meteo weather API |
| Web Storage | `localStorage` (theme, favorites, name) + `sessionStorage` |

## Project Structure

```
scripting-final/
├── index.html              # Main page
├── css/styles.css          # Styles (responsive + dark mode)
├── js/app.js               # Application logic
├── data/programs.json      # Program data
├── docs/PROJECT_REPORT.md  # Project thesis/report
└── README.md
```

## How to Run

A local server is required (browsers block `fetch` for local files opened via `file://`).

```bash
cd scripting-final
python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

## Submission

Present at the exam:

1. **The project** — all files in this folder
2. **Project Report** — `docs/PROJECT_REPORT.md` (fill in your name and student ID)

## Links

- [Official KIU Website](https://www.kiu.edu.ge/)
- [Academic Calendar 2025–2026](https://www.kiu.edu.ge/uploads/2025-2026_academic%20calendar.pdf)
