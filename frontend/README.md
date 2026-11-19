# My Tasks — Todo Management App

A modern, responsive task management web application built with **React**, **TypeScript**, **Vite**, and **Tailwind CSS**. It lets users organize daily and weekly tasks with priority tags, live search, progress summaries, and automatic `localStorage` persistence.

---

## Features

- **Onboarding Screen:** Clean welcome flow (`Onboarding`) saved to `localStorage` so returning users jump straight into their dashboard.
- **Task CRUD Operations:** Create, edit, toggle completion status, and delete tasks via a modal form (`TaskModal`) with validation.
- **Weekly Organization:** Interactive 7-day week selector (`WeekStrip`) and collapsible weekly task groups (`WeekSection`) with completed/open counters.
- **Weekly Summary Cards:** At-a-glance metrics (`SummaryCards`) tracking completed vs. pending tasks for the week.
- **Instant Search:** Real-time filtering (`SearchView`) across task titles and descriptions.
- **Local Persistence:** Pre-populated with starter tasks (`seedTasks`) and automatically synced to browser `localStorage`.

---

## Tech Stack

- **Framework:** React + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Package Manager:** Yarn

---

## Project Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── Onboarding.tsx      # Welcome screen for first-time visitors
│   │   ├── SearchHeader.tsx    # Top dashboard header with quick actions
│   │   ├── SearchView.tsx      # Full-screen real-time task search
│   │   ├── SummaryCards.tsx    # Weekly completed & pending task counters
│   │   ├── TaskCard.tsx        # Individual task item with toggle/edit/delete
│   │   ├── TaskModal.tsx       # Modal form to create or update tasks
│   │   ├── WeekSection.tsx     # Collapsible weekly task list
│   │   └── WeekStrip.tsx       # 7-day interactive calendar strip
│   ├── data/
│   │   └── seedTask.ts         # Default starter tasks
│   ├── pages/
│   │   └── Dashboard.tsx       # Main task dashboard view
│   ├── types/
│   │   └── task.ts             # Shared TypeScript interfaces
│   ├── utils/
│   │   └── dateUtils.ts        # Date & week formatting helpers
│   ├── App.tsx                 # Root state, localStorage sync & routing
│   └── main.tsx                # Application entry point
├── package.json
└── yarn.lock
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Yarn** (`corepack enable` or `npm install -g yarn`)

### Installation & Running Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd todo-assignment/frontend
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   ```

3. **Start the development server:**
   ```bash
   yarn dev
   ```

4. **Build for production:**
   ```bash
   yarn build
   ```
