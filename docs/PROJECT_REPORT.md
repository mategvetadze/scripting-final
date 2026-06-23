# KIU Explorer — Project Report

**Course:** Scripting  
**Project:** KIU Explorer — Interactive Website for Kutaisi International University  
**Author:** [Your Full Name]  
**Student ID:** [Your Student ID]  
**Date:** June 2026  

---

## Abstract

This report describes my final project — a website about Kutaisi International University (KIU). The site was built using HTML, CSS, and JavaScript. Users can browse academic programs, read about the campus, save favorite programs, switch between light and dark mode, and see current weather in Kutaisi.

---

## 1. Introduction

Kutaisi International University is a public university in Kutaisi, Georgia. It opened in 2020 and offers programs in English in fields like Computer Science, Management, Mathematics, and others. I chose this topic because KIU was recommended for the project and I already know the university.

The goal of my project was to create a simple but useful website that shows information about KIU and uses the JavaScript topics we studied during the course.

The project works only on the front end. Program data is loaded from a JSON file, and weather data comes from an online API. User settings are saved in the browser.

---

## 2. Theoretical Background

### 2.1 DOM

The DOM (Document Object Model) lets JavaScript access and change HTML elements. I used `getElementById` and `querySelector` to select elements, and `addEventListener` to handle user actions like clicks and form submission.

### 2.2 ES6+ JavaScript

In my code I used:

- Arrow functions for shorter function syntax
- Template literals to build HTML strings
- Destructuring to get values from objects (for example program data)
- Spread and rest operators (for example `[...programs]` and `...entries`)

### 2.3 Asynchronous JavaScript

I used three approaches:

- **Callbacks** — `setTimeout` before loading programs
- **Promises** — `fetch` with `.then()` and `.catch()` for program data
- **Async/await** — loading weather data from an external API

### 2.4 Fetch API

The Fetch API is used to load `data/programs.json` and to get weather data from Open-Meteo. The responses are parsed as JSON.

### 2.5 Web Storage

`localStorage` saves the theme, favorite programs, visitor name, and newsletter subscribers. `sessionStorage` is used to mark when a user subscribes during the current session.

---

## 3. Project Structure

```
index.html
css/styles.css
js/app.js
data/programs.json
```

The website has these main sections:

- Hero — introduction and quick stats
- About — information about KIU and weather widget
- Programs — list of academic programs with search and filter
- Campus — tabs for facilities, housing, and location
- Favorites — saved programs
- Contact — contact details and newsletter form

---

## 4. Implementation

### 4.1 HTML and CSS

The page structure is in `index.html`. I used semantic tags like `header`, `main`, `section`, and `footer`. The layout is responsive and works on mobile devices. CSS variables are used for colors, and the user can switch between light and dark theme.

### 4.2 JavaScript

All logic is in `app.js`. On page load, the app:

1. Loads saved theme and visitor name from localStorage
2. Fetches programs from JSON
3. Fetches weather for Kutaisi
4. Sets up event listeners for navigation, search, favorites, and forms

Program cards are created dynamically with `createElement` and template literals. When the user searches or changes the degree filter, the list updates without reloading the page.

Favorites are stored as an array of program IDs in localStorage. When the user clicks Save on a program, it is added or removed from the list.

### 4.3 APIs Used

- **Local JSON** — `data/programs.json` contains program names, degrees, descriptions, etc.
- **Open-Meteo** — free weather API for Kutaisi coordinates (no API key needed)

---

## 5. Testing

I tested the website in Chrome using a local server (`python3 -m http.server 8080`).

| Test | Result |
|------|--------|
| Page loads and programs appear | Works |
| Search and filter programs | Works |
| Save and remove favorites | Works |
| Theme persists after refresh | Works |
| Weather loads with internet | Works |
| Newsletter form validation | Works |
| Mobile menu | Works |

---

## 6. Conclusion

I built a working website about KIU that uses DOM manipulation, modern JavaScript, asynchronous code, the Fetch API, and browser storage. The project helped me practice the topics from the course in a real example.

If I had more time, I would add a Georgian language version and more program details from the official KIU website.

---

## 7. References

1. Kutaisi International University — https://www.kiu.edu.ge/
2. MDN Web Docs — JavaScript Guide
3. MDN Web Docs — Fetch API
4. MDN Web Docs — Web Storage API
5. Open-Meteo — https://open-meteo.com/

---

## Appendix: How to Run

```bash
cd scripting-final
python3 -m http.server 8080
```

Open http://localhost:8080 in your browser.
