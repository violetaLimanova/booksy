# Booksy

Booksy is a responsive landing page for a bookstore. It showcases featured
books, customer feedback, upcoming events and the store location, with a
mobile-friendly navigation menu and smooth scrolling between sections.

**Live demo:**
[violetalimanova.github.io/booksy](https://violetalimanova.github.io/booksy/)

<!-- Add a screenshot: ![Booksy preview](./assets/preview.png) -->

## Features

- Responsive layout for mobile, tablet and desktop
- Header with desktop navigation and a fullscreen mobile menu
- Smooth scrolling to page sections
- Sections: Home, Books, Feedbacks, Events, Location
- Modal window component
- Automatic deployment to GitHub Pages

## Tech Stack

- HTML5 (component-based markup via partials)
- CSS3 (mobile-first, media queries)
- JavaScript (ES modules)
- [Vite](https://vitejs.dev/) for development and build
- GitHub Actions and GitHub Pages for CI/CD

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (LTS version)
- npm (comes with Node.js)

### Installation

```bash
git clone https://github.com/violetaLimanova/booksy.git
cd booksy
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The page
reloads automatically when you save changes.

### Production build

```bash
npm run build
npm run preview
```

## Project Structure

```
booksy/
├── .github/workflows/   # GitHub Actions deploy workflow
├── assets/              # Images used in documentation
├── src/
│   ├── css/             # Stylesheets (one file per component)
│   ├── img/             # Images (optimized on production build)
│   ├── js/              # Scripts (one file per component)
│   ├── partials/        # HTML components (header, footer, etc.)
│   ├── index.html       # Main page
│   └── main.js          # JavaScript entry point
├── package.json
└── vite.config.js
```

### Components

| Component            | HTML                         | CSS                    | JS                   |
| -------------------- | ---------------------------- | ---------------------- | -------------------- |
| Header & mobile menu | `partials/header.html`       | `css/header.css`       | `js/header.js`       |
| Hero                 | `partials/hero.html`         | `css/hero.css`         | `js/hero.js`         |
| Books                | `partials/books.html`        | `css/books.css`        | `js/books.js`        |
| Feedbacks            | `partials/feedbacks.html`    | `css/feedbacks.css`    | `js/feedbacks.js`    |
| Events               | `partials/events.html`       | `css/events.css`       | `js/events.js`       |
| Location             | `partials/location.html`     | `css/location.css`     | `js/location.js`     |
| Footer               | `partials/footer.html`       | `css/footer.css`       | `js/footer.js`       |
| Modal window         | `partials/modal-window.html` | `css/modal-window.css` | `js/modal-window.js` |

Shared styles live in `css/container.css` (page container), `css/main.css` and
`css/styles.css` (entry point that imports all styles).

## Responsive Breakpoints

The project uses a mobile-first approach.

| Device  | Breakpoint          | Container max-width | Side padding |
| ------- | ------------------- | ------------------- | ------------ |
| Mobile  | default             | 375px               | 20px         |
| Tablet  | `min-width: 768px`  | 768px               | 32px         |
| Desktop | `min-width: 1440px` | 1440px              | 64px         |

## Code Style

The project uses [Prettier](https://prettier.io/) (`.prettierrc.json`) and
EditorConfig (`.editorconfig`) to keep formatting consistent. Install the
corresponding editor extensions for automatic formatting.

## Workflow

1. Create a feature branch from `main`, for example `feature/header`.
2. Commit your changes with clear messages.
3. Push the branch and open a pull request.
4. After the pull request is merged into `main`, the site is rebuilt and
   deployed automatically.

## Deployment

The site is deployed to GitHub Pages with GitHub Actions
(`.github/workflows/deploy.yml`). Every push to `main` triggers a build and
publishes the result.

To enable it for a new repository, go to **Settings → Pages** and set **Source**
to **GitHub Actions**.

Deployment status is shown next to the latest commit:

- Yellow: build and deployment in progress
- Green: deployed successfully
- Red: build or deployment failed (open **Actions** for details)

## Team

<!-- Add team members, for example: -->
<!-- - [Name](https://github.com/username) — role -->

## License

<!-- Specify the license, for example MIT. -->

---

_This project was generated from
[goitacademy/web-team-project-template](https://github.com/goitacademy/web-team-project-template)._
