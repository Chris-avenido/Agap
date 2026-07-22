# Modular Architecture Guide

This project follows a strict modular folder structure to maintain clean, scalable, and easily maintainable code. We enforce an anti-spaghetti architecture that ensures clear separation of concerns across the stack.

## Backend Structure (Express.js + TypeScript)

We utilize an MVC-lite (Model-View-Controller) pattern with decoupled domain modules. The core philosophy is that `src/index.ts` must remain lean and strictly act as a server entry point.

### Directory Layout
```text
backend/
├── src/
│   ├── index.ts                 # Main entry point. Minimal logic. Mounts routes & middleware.
│   ├── database.ts              # Centralized PostgreSQL connection pool
│   │
│   ├── applicants/              # Domain Module: Applicants
│   │   ├── applicants.routes.ts # Express router defining `/api/applicants/*` endpoints
│   │   ├── applicants.service.ts# Core business logic and database queries
│   │
│   ├── vacancies/               # Domain Module: Vacancies
│   │   ├── vacancies.routes.ts  # Express router defining `/api/vacancies/*` endpoints
│   │   ├── vacancies.service.ts # Core business logic and database queries
│   │   ├── vacancies.cron.ts    # Scheduled tasks specific to this domain (e.g. expiration)
```

### Backend Principles
1. **No Spaghetti Routing:** Never write inline logic or endpoints (`app.get('/api/example', ...)`) inside `index.ts`. All endpoints must be defined in their respective `<domain>.routes.ts` file and exported as an Express Router.
2. **Service Layer Isolation:** The `.routes.ts` file handles only HTTP requests and responses (extracting req.body, managing res.status). It delegates all actual database interaction and business rules to methods defined in `<domain>.service.ts`.
3. **Module Encapsulation:** If a background task (e.g., node-cron) only modifies vacancy statuses, it lives inside `vacancies/vacancies.cron.ts`, rather than floating globally in the root directory.

---

## Frontend Structure (React + TypeScript)

The frontend is built to heavily separate UI building blocks from top-level page views, ensuring maximum reusability and keeping large files readable.

### Directory Layout
```text
frontend/
├── src/
│   ├── main.tsx                 # App bootstrap and Router Provider
│   ├── App.tsx                  # Global layout wrapper
│   │
│   ├── components/              # Reusable, generic UI components
│   │   ├── CustomDatePicker.tsx
│   │   ├── ApplicantHeader.tsx
│   │
│   ├── pages/                   # Top-level Page components tied to routes
│   │   ├── ApplicationPage.tsx
│   │   ├── ApplicantJobList.tsx
│   │   ├── ApplicantJobDetails.tsx
│   │   ├── PublicCareers.tsx
```

### Frontend Principles
1. **Component Extraction:** If a piece of UI (like a header, modal, or a customized date picker) is used across multiple pages, it must be extracted into `src/components/`.
2. **Page Containers:** `src/pages/` should only contain the "smart" components that manage local state, hook into `react-router-dom` navigation, handle API fetching, and compose layouts using smaller components.
3. **Clean Handlers:** Keep JSX clean. If a form requires complex payload manipulation (like deep-uppercasing nested JSON data), extract it into a helper function inside the submission handler rather than clogging up the return block.
