# KIU Explorer — Project Report (Thesis)

**Course:** Scripting (JavaScript)  
**Project Title:** KIU Explorer — Interactive Website for Kutaisi International University  
**Author:** [Your Full Name]  
**Student ID:** [Your Student ID]  
**Submission Date:** June 2026  
**Exam Period:** 22.06.2026 – 11.07.2026  

---

## Abstract

This report describes the design, implementation, and technical features of **KIU Explorer**, an interactive single-page website about Kutaisi International University (KIU). The project was built using only HTML, CSS, and vanilla JavaScript, as required by the final project guidelines. The website allows users to explore academic programs, learn about campus facilities, save favorite programs, personalize their visit, and view live weather data for Kutaisi. The implementation demonstrates core JavaScript competencies including DOM manipulation, ES6+ syntax, asynchronous programming patterns, REST API integration via the Fetch API, and client-side data persistence using Web Storage.

---

## 1. Introduction

### 1.1 Background

Kutaisi International University (KIU) is a public research university located in Kutaisi, Georgia. Founded in 2020, it aims to become an international hub of education, science, and technology. Given the recommendation to create a project themed around KIU, this website serves both as an academic deliverable and as a practical demonstration of modern client-side web development techniques.

### 1.2 Project Objectives

The primary objectives of this project are:

1. Build a functional, visually appealing website about KIU using HTML, CSS, and JavaScript only.
2. Demonstrate all required JavaScript concepts specified in the grading criteria.
3. Provide a user-friendly interface for exploring university information.
4. Integrate external and local data sources using asynchronous techniques.

### 1.3 Scope and Limitations

The project is a front-end application with no server-side backend. Data is loaded from a local JSON file and a public weather API. User preferences and favorites are stored in the browser's `localStorage`. The project does not use frameworks (React, Vue, etc.) or libraries (jQuery, Bootstrap JS) to comply with assignment restrictions.

---

## 2. Literature Review / Theoretical Background

### 2.1 The Document Object Model (DOM)

The DOM represents the HTML document as a tree of objects that JavaScript can access and modify. Through methods such as `getElementById`, `querySelector`, and `querySelectorAll`, developers can select elements and change their content, attributes, and styles dynamically. Event listeners (`addEventListener`) enable reactive user interfaces.

### 2.2 ECMAScript 2015+ (ES6+)

Modern JavaScript introduces concise syntax that improves readability and maintainability:

- **Arrow functions** — compact function expressions with lexical `this` binding.
- **Template literals** — string interpolation using backticks and `${}` expressions.
- **Destructuring** — extracting values from objects and arrays into variables.
- **Spread/Rest operators** — expanding iterables (`...array`) and collecting arguments.

### 2.3 Asynchronous JavaScript

JavaScript is single-threaded; long-running operations use asynchronous patterns:

- **Callbacks** — functions passed as arguments, invoked when an operation completes (e.g., `setTimeout`).
- **Promises** — objects representing eventual completion or failure, chained with `.then()` and `.catch()`.
- **Async/Await** — syntactic sugar over Promises for writing asynchronous code in a synchronous style.

### 2.4 Fetch API and JSON

The Fetch API provides a modern interface for making HTTP requests. It returns Promises and works seamlessly with `response.json()` to parse JSON payloads from REST APIs.

### 2.5 Web Storage API

`localStorage` and `sessionStorage` allow storing key-value pairs in the browser. `localStorage` persists across sessions; `sessionStorage` is cleared when the tab closes. Both store string values; objects are serialized with `JSON.stringify` and parsed with `JSON.parse`.

---

## 3. System Design

### 3.1 Architecture Overview

The application follows a simple client-side architecture:

```
index.html          → Structure and semantic markup
css/styles.css      → Presentation and responsive layout
js/app.js           → Application logic and interactivity
data/programs.json  → Local data source for academic programs
```

### 3.2 Page Sections

| Section    | Purpose                                              |
|-----------|------------------------------------------------------|
| Hero      | Welcome message, call-to-action buttons, key stats   |
| About     | University overview, interactive cards, weather    |
| Programs  | Searchable/filterable program cards from JSON        |
| Campus    | Tabbed view of facilities, housing, and location     |
| Favorites | Saved programs persisted in localStorage             |
| Contact   | Contact details and newsletter subscription form     |

### 3.3 User Flow

1. User opens the website in a browser (via local server).
2. Programs load asynchronously from `data/programs.json`.
3. Weather loads via async/await from Open-Meteo API.
4. User can search/filter programs, save favorites, toggle theme, and personalize with their name.
5. All preferences persist in `localStorage` for return visits.

---

## 4. Implementation

### 4.1 DOM Manipulation and Event Listeners

**Element selection** is performed at startup using `document.getElementById` and stored in an `elements` object for reuse.

**Dynamic content** is created with `document.createElement` and `innerHTML` using template literals. Program cards are rendered programmatically based on fetched data.

**Style manipulation** includes toggling CSS classes (`classList.add/remove/toggle`) for theme switching, navigation state, tab panels, and favorite button states. The `data-theme` attribute on `<html>` drives CSS custom properties for light/dark mode.

**Event listeners** are attached for:
- Navigation toggle and smooth scrolling
- Theme toggle button
- Search input and degree filter (input/change events)
- Campus tab buttons
- Modal open/close
- Newsletter form submission
- Event delegation on program and favorites lists (click events)

### 4.2 ES6+ Features

| Feature           | Usage in Project                                      |
|------------------|-------------------------------------------------------|
| Arrow functions  | `loadFavorites`, `toggleTheme`, `filterPrograms`, etc. |
| Template literals| Program cards, weather widget, favorites list HTML    |
| Destructuring    | `const { id, name, degree } = program`, weather coords |
| Spread operator  | `[...programs]`, `[...favorites, programId]`          |
| Rest/defaults    | Filter options object, function parameters            |

### 4.3 Asynchronous JavaScript

**Callback approach** — `simulateNetworkDelay` uses `setTimeout` to demonstrate callback-based async before fetching programs:

```javascript
simulateNetworkDelay(() => {
  fetchProgramsWithPromise()
    .then((data) => { /* handle success */ })
    .catch(() => { /* handle error */ });
});
```

**Promise approach** — `fetchProgramsWithPromise` wraps `fetch('data/programs.json')` in a Promise chain with `.then()` and `.catch()`.

**Async/Await approach** — `fetchKutaisiWeather` and `loadWeather` use `async/await` to fetch live weather from the Open-Meteo API:

```javascript
const fetchKutaisiWeather = async () => {
  const response = await fetch(url);
  const data = await response.json();
  return data.current;
};
```

### 4.4 API Integration

1. **Local JSON** — `data/programs.json` contains structured program data fetched via the Fetch API.
2. **External API** — Open-Meteo (https://open-meteo.com) provides free weather data for Kutaisi coordinates without requiring an API key.

### 4.5 Web Storage

| Key               | Storage      | Data Stored                    |
|------------------|--------------|--------------------------------|
| `kiu-theme`      | localStorage | `"light"` or `"dark"`          |
| `kiu-favorites`  | localStorage | JSON array of program IDs      |
| `kiu-visitor-name` | localStorage | User's display name          |
| `kiu-subscribers` | localStorage | Newsletter subscription list |
| `kiu-subscribed` | sessionStorage | Session subscription flag    |

---

## 5. Testing

### 5.1 Manual Test Cases

| # | Test Case                    | Expected Result                          | Status |
|---|------------------------------|------------------------------------------|--------|
| 1 | Open page via local server   | Page loads, programs appear after delay  | ✓      |
| 2 | Search "Computer"            | Only CS-related programs shown           | ✓      |
| 3 | Filter by Master degree      | Only MSc programs displayed              | ✓      |
| 4 | Click "Save" on a program    | Program appears in Favorites section     | ✓      |
| 5 | Refresh page                 | Favorites and theme persist              | ✓      |
| 6 | Toggle dark mode             | Colors change, preference saved          | ✓      |
| 7 | Personalize with name        | Greeting appears, name saved             | ✓      |
| 8 | Submit newsletter form       | Success message, data in localStorage    | ✓      |
| 9 | Weather widget (online)      | Kutaisi temperature displayed            | ✓      |
| 10| Mobile navigation toggle     | Menu opens/closes correctly              | ✓      |

### 5.2 Browser Compatibility

Tested on modern browsers supporting ES6+, Fetch API, and localStorage (Chrome, Firefox, Edge).

---

## 6. Results

The completed **KIU Explorer** website fulfills all project requirements:

- ✅ HTML structure with semantic sections
- ✅ CSS styling with responsive design and dark mode
- ✅ DOM element selection, manipulation, and event listeners
- ✅ ES6+ features (arrow functions, template literals, destructuring, spread)
- ✅ Callbacks, Promises, and Async/Await
- ✅ Fetch API with JSON (local and external)
- ✅ localStorage and sessionStorage

The website presents KIU information in an accessible, interactive format suitable for prospective students and visitors.

---

## 7. Conclusion

This project successfully demonstrates fundamental and advanced JavaScript concepts through a real-world themed application. The KIU Explorer website combines static content, dynamic data loading, user personalization, and persistent storage to create a complete client-side web experience. Future improvements could include multi-language support (Georgian/English), integration with KIU's official news API, and accessibility enhancements (ARIA live regions, keyboard navigation).

---

## 8. References

1. Kutaisi International University. (2026). *Official Website*. https://www.kiu.edu.ge/
2. MDN Web Docs. *JavaScript Guide*. https://developer.mozilla.org/en-US/docs/Web/JavaScript
3. MDN Web Docs. *Using the Fetch API*. https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
4. MDN Web Docs. *Web Storage API*. https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API
5. Open-Meteo. *Weather API*. https://open-meteo.com/

---

## Appendix A: File Structure

```
scripting-final/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── app.js
├── data/
│   └── programs.json
├── docs/
│   └── PROJECT_REPORT.md
└── README.md
```

## Appendix B: How to Run

```bash
cd scripting-final
python3 -m http.server 8080
```

Open `http://localhost:8080` in your browser.

---

*End of Report*
