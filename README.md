# Unstuck Web

Frontend for **Unstuck**, an AI-powered task unblocker designed to
reduce decision overload by turning complex tasks into manageable
actions and presenting one executable step at a time.

## Overview

Unstuck is intentionally different from a traditional to-do list.

Instead of showing a user a long list of actions, the application helps
transform a complex task into a hierarchy of smaller steps and guides
the user through the work one actionable leaf at a time.

### Core Experience

``` text
Create a task
      |
      v
AI breaks it down
      |
      v
Hierarchical task steps
      |
      v
Focus Mode
      |
      v
One actionable step at a time
      |
      +---- Complete
      |
      +---- Park It
      |
      v
Time insight
```

## Features

-   User registration and login
-   JWT-based authentication
-   Forgot password / reset password
-   Task creation and management
-   Hierarchical task-step tree
-   AI-powered task decomposition
-   AI-powered step decomposition
-   Focus Mode
-   One executable leaf step at a time
-   Step timer and actual duration tracking
-   Park It
-   Estimated vs actual time insight
-   Responsive interface

## Tech Stack

-   **React**
-   **TypeScript**
-   **Vite**
-   **Redux Toolkit**
-   **TanStack React Query**
-   **React Router**
-   **Axios**
-   **Custom CSS**

## State Management

The application separates state based on responsibility.

### TanStack React Query

Used for server state:

-   Tasks
-   Task steps
-   Loading states
-   Errors
-   API mutations
-   Cache invalidation

### Redux Toolkit

Used for client/workflow state:

-   Focus Mode state
-   Current step index
-   Workflow-related UI state

### React `useState`

Used for small local UI state such as:

-   Form values
-   Modal state
-   Loading indicators
-   Temporary UI state

## Focus Mode

Focus Mode is the central interaction model.

The frontend receives the task-step hierarchy and converts it into
executable leaf steps.

A step is executable when:

``` text
- it has no children
- it is not completed
- it is not parked
```

Parent steps act as containers and are not directly executed when they
have children.

### Progress Handling

Focus Mode keeps the original session total separate from the
dynamically filtered executable list.

This prevents progress from incorrectly changing from:

``` text
Step 1 of 8
Step 1 of 7
Step 1 of 6
```

after completing the current step.

Instead:

``` text
Step 1 of 8
Step 2 of 8
Step 3 of 8
...
```

## AI Decomposition

The frontend sends task or step decomposition requests to the NestJS
API.

The browser never communicates directly with Gemini.

``` text
React
  |
  v
NestJS API
  |
  v
Gemini
```

This keeps the Gemini API key on the backend and centralizes AI-related
business rules.

## API Configuration

Create a `.env` file in the project root:

``` env
VITE_API_URL=http://localhost:3000
```

For the deployed application, the API URL points to the deployed NestJS
backend.

Never place backend secrets such as database passwords, JWT secrets,
Gemini keys, or Resend keys in the frontend environment.

## Getting Started

### 1. Clone the repository

``` bash
git clone https://github.com/Jayasuriya1/unstuck-web.git
cd unstuck-web
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Configure environment variables

Create:

``` text
.env
```

with:

``` env
VITE_API_URL=http://localhost:3000
```

### 4. Start development server

``` bash
npm run dev
```

The Vite development server runs on:

``` text
http://localhost:5173
```

## Build

``` bash
npm run build
```

## Preview Production Build

``` bash
npm run preview
```

## Project Structure

``` text
src/
├── api/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── focus/
│   └── tasks/
├── styles/
├── App.tsx
├── index.css
└── main.tsx
```

## Architecture

``` text
React UI
   |
   +----------------------+
   |                      |
   v                      v
TanStack Query        Redux Toolkit
Server State          Workflow State
   |                      |
   +----------+-----------+
              |
              v
         NestJS API
```

## Deployment

The frontend is deployed as a Vite application on Vercel.

The production application communicates with the deployed NestJS API
through the `VITE_API_URL` environment variable.

## Future Improvements

-   Automated frontend tests
-   Better offline/loading states
-   More detailed time analytics
-   Recovery and organization for parked steps
-   Accessibility improvements
-   Additional focus-session insights

## License

This project is currently maintained as a personal portfolio project.
