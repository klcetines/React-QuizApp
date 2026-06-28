# Quiz App — FastAPI + React/TypeScript

A small full-stack quiz application: a **FastAPI** backend that serves questions and scores submissions, and a **React + TypeScript (Vite)** single-page frontend that consumes it over a REST API.

![Python](https://img.shields.io/badge/Python-3.12%2B-3776AB?logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?logo=fastapi&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

<!-- TODO: add a short GIF or screenshot of the quiz flow here — it makes the repo far more clickable.
     ![Demo](docs/demo.gif) -->

---

## Overview

The app is split into two independent services that talk over HTTP:

```
React + TypeScript SPA  ──fetch (axios)──►  FastAPI REST API
   (Vite dev server :5173)                  (uvicorn :8000)
        renders quiz UI                     serves questions,
        tracks answers                      validates & scores
```

The frontend fetches the full question set, walks the user through one question at a time, collects their answers in local state, and posts them back as a single submission. The backend validates the submission against the correct answers and returns a score.

## Features

- REST API built with FastAPI and typed request/response models (Pydantic).
- Endpoints to list questions, fetch a single question, and submit a full answer set for scoring.
- CORS configured for local frontend development.
- React SPA with clear UI states (loading, in-progress quiz, results) and a progress indicator.
- Answer selection tracked in component state and submitted in one request; restart without reload.

## Tech stack

| Layer    | Tech                                            |
|----------|-------------------------------------------------|
| Backend  | Python, FastAPI, Pydantic, Uvicorn              |
| Frontend | React, TypeScript, Vite, Axios                  |

## Project structure

```
.
├── backend/
│   ├── main.py            # uvicorn entry point
│   └── app/
│       └── api.py         # FastAPI app: models, routes, scoring
└── react-quizapp/
    └── src/
        ├── App.tsx        # quiz UI + state/flow
        └── api.ts         # axios instance (API base URL)
```

## Getting started

You'll run two processes: the API and the frontend.

### 1. Backend (FastAPI)

```bash
cd backend
python -m venv .venv
# Windows:  .venv\Scripts\activate
# macOS/Linux:  source .venv/bin/activate
pip install -r requirements.txt
python main.py            # serves http://localhost:8000  (auto-reload)
```

Quick check: open `http://localhost:8000/docs` for the auto-generated Swagger UI.

### 2. Frontend (React + Vite)

```bash
cd react-quizapp
npm install
npm run dev               # serves http://localhost:5173
```

Open `http://localhost:5173` and take the quiz. The frontend expects the API at `http://localhost:8000`.

## API reference

| Method | Endpoint           | Description                                            |
|--------|--------------------|--------------------------------------------------------|
| GET    | `/questions`       | Returns all questions (without the correct answers).   |
| GET    | `/question/{id}`   | Returns a single question by id (404 if not found).    |
| POST   | `/submissions`     | Body: `{ "answers": [{ "question_id": 1, "answer": "Paris" }] }` → returns `{ "score", "total" }`. |

## Possible extensions

The question set is currently held in memory in `api.py`. Natural next steps would be moving questions to a database, adding categories/difficulty, and reading the API base URL from an environment variable on the frontend.

## License
<!-- TODO: add a LICENSE file (MIT is a common, permissive choice) and state it here. -->
