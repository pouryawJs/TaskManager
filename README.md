<div align="center">

# 📋 Task Manager Bot : **[`Task Manager`](https://t.me/daily_taskmanager_bot)**
**Gamified daily task management powered by Telegram & the Solar Hijri (Jalali) calendar.**

A personal productivity assistant that uses rewards, penalties, automated reminders, and customizable day-cycles to keep you accountable right where you already spend your time—inside Telegram.

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Telegraf](https://img.shields.io/badge/Telegraf-v4-2496ED?style=flat-square&logo=telegram&logoColor=white)](https://telegraf.js.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

</div>

---

## 📖 About The Project

**Task Manager Bot** is a Telegram bot designed to help users schedule, track, and adhere to their daily routines using time-slotted tasks (e.g., `Study from 09:00 to 10:30`). With a precise minute-by-minute cron job, the bot delivers punctual notifications right when a task starts and follows up at completion time to capture the final status.

### 🌟 What Makes It Unique?
* **Gamified Productivity System:** Earn or lose points based on your habits—punctual first-task registration, on-time task starts, completion rate, cancellations, and abandoned tasks directly impact your score and profile ranking.
* **Custom End-of-Day Cutoff:** Traditional planners assume midnight resets. Here, users can define their own daily cutoff time (ideal for night owls or non-standard schedules). All Solar Hijri (Jalali) `dayTag` calculations, streaks, and deadlines adjust accordingly.

---

## ✨ Key Features

- **⚡ Batch Task Creation via Single Message:** Submit multiple tasks at once. Each line represents a separate task using the format: `Title from HH:MM to HH:MM`.
- **⏰ Automated Start Reminders:** A cron scheduler runs every minute. At the exact start time, users receive an actionable message with inline buttons (`Start Activity ✅` / `Cancel Task ⛔️`).
- **📊 Task Status Tracking:** Update tasks seamlessly into states: `Completed ✅`, `Partially Completed ⚡`, or `Not Done 🚫`.
- **🧹 Auto-Resolution of Abandoned Tasks:** If 30 minutes elapse after the scheduled end time without user feedback, the bot automatically marks the task as "Not Done" and notifies the user.
- **🎮 Gamification & Detailed Scoring Log:**
  - Rewards/penalties for on-time first registration.
  - Punctuality bonus (starting within 5 minutes of scheduled time).
  - Penalties for uncompleted, abandoned, or cancelled tasks.
  - Every score adjustment is recorded in the `ScoreLog` table with an explicit reason for total transparency.
- **📅 28-Day Paginated History:** Review past schedules and performance across the last 28 days based on Jalali dates.
- **👤 User Profile & Statistics:** View cumulative points and total counts of completed, partially completed, missed, and cancelled tasks.
- **🌙 Configurable Day Cutoff:** Set the exact hour when your "day" ends to govern all date calculations and daily summaries.
- **🛡️ Admin Panel:** Dedicated administrative command to monitor active high-scoring users.

> 🚧 **Note:** The *Analytics & Performance Charts* module is currently under development.

---

## 🧱 Tech Stack

| Layer / Component | Technology | Description |
| :--- | :--- | :--- |
| **Runtime** | [Node.js](https://nodejs.org/) (v18+) | JavaScript execution engine |
| **Bot Framework** | [Telegraf](https://telegraf.js.org/) | Telegram Bot API framework with Wizard Scenes for multi-step forms |
| **ORM & Database** | [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) | Type-safe ORM & relational data persistence |
| **Task Scheduling** | [node-cron](https://github.com/node-cron/node-cron) | Minute-by-minute scheduler for start/end triggers |
| **Date & Calendar** | [Luxon](https://moment.github.io/luxon/) + [jalaali-js](https://github.com/jalaali/jalaali-js) | Timezone handling (`Asia/Tehran`) & Solar Hijri calendar conversions |
| **Configuration** | [dotenv](https://github.com/motdotla/dotenv) | Environment variable management |

---

## 🗺️ Roadmap

The project is currently built with vanilla Node.js / JavaScript. The planned development roadmap includes:

- [ ] **Full Backend Rewrite with NestJS + TypeScript:** Migrate to a clean, modular architecture with robust service/controller layers and end-to-end type safety.
- [ ] **Modern SPA Web Dashboard:** Build a companion web application for managing tasks via browser.
- [ ] **Unified Core Backend:** Serve both the Telegram Bot and the Web App from a single API and shared business logic.
- [ ] **Performance & Analytics Dashboard:** Visual score progression charts, task completion trends, and weekly productivity insights.

---

## 📂 Project Structure

```text
taskmanager/
├── app.js                     # Main entry point; initializes Telegraf, handlers, and cron jobs
├── configs.js                 # Configuration & environment loader (e.g., bot token)
├── prisma/
│   └── schema.prisma          # Database models (User, Task, ScoreLog)
└── src/
    ├── bot/
    │   ├── handlers/          # Command & inline action handlers (menu, profile, admin, etc.)
    │   ├── keyboards/         # Telegram inline & reply keyboards
    │   ├── messages/          # User-facing message templates and copies
    │   ├── scenes/            # Multi-step Wizard Scenes (adding tasks, setting day cutoff)
    │   ├── stage.js           # Stage manager for registering Wizard Scenes
    │   └── index.js           # Root bot orchestrator registering all handlers
    ├── cron/                  # Cron jobs for punctual start & auto-close triggers
    ├── services/
    │   ├── ui/                # UI rendering logic (message editing, dynamic keyboards)
    │   ├── task.service.js    # Task database queries & CRUD operations
    │   ├── user.service.js    # User operations & Jalali dayTag calculations
    │   ├── score.service.js   # Scoring rules & gamification calculations
    │   └── scoreLog.service.js# Audit logging for score adjustments
    └── utils/                 # Helpers (DateTime helpers, auto-delete messages, safe handlers)
