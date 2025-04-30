# Salesmgmt-front

## Introduction

**Salesmgmt-front** is a front-end project built with **Next.js App Router** and structured around the **Feature-Sliced Design (FSD)** architecture.  
This project is designed to support a real-time mock investment service, integrating with stock brokerage APIs and focusing on modular scalability, maintainability, and reusability.

The system emphasizes clear responsibility boundaries and flexible growth by separating business logic, domain states, and UI layers. It is well-suited for real-time stock chart rendering and user interaction features such as login, signup, and dashboard views.

## Purpose

- Build a robust front-end for a real-time stock trading simulation platform.
- Adopt the **Feature-Sliced Design** architecture to ensure **modular scalability** and **separation of concerns**.
- Enable efficient development of feature-level units (login, signup, stock chart, etc.).
- Prepare for integration with external stock brokerage APIs via REST or WebSocket.
- Support maintainable and reusable UI composition in complex business environments.

## Architecture

The project follows the **Feature-Sliced Design (FSD)** architectural methodology, which divides the system based on functional responsibility rather than technical layering. This allows each unit to scale independently, remain isolated in logic, and stay testable throughout the lifecycle.

### Key Layers

- **app/**: Next.js App Router pages. This is where individual pages are built by composing widgets and features. Replaces the traditional `pages/` directory.
- **features/**: Self-contained feature units responsible for user interaction, such as login forms or search bars. Each feature contains:

  - `ui/`: UI components
  - `model/`: Local state logic and hooks
  - `api/`: Fetch logic to external services
  - `lib/`: Pure helper functions
  - `types/`: Internal types

- **entities/**: Domain-level global state such as authenticated users or posts. Often powered by `zustand`. Each entity contains:

  - `model/`: Global state stores and handlers
  - `ui/`: Domain-level UI elements
  - `types/`: Shared domain types

- **widgets/**: Composite UI blocks made by combining features and entities. Examples include `LoginSection`, `DashboardHeader`, etc.

- **shared/**: Application-wide shared resources, including:
  - `api/`: Axios or fetch base instances
  - `ui/`: Global UI components (e.g., buttons)
  - `constants/`: Static route or config values
  - `types/`: Common types used across layers

## Getting Started

```bash
npm run dev
```

### Prerequisites

- Node 20.X

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/GiHoon1123/Salesmgmt-front.git
   ```
2. Install the library in `package.json.`:
   ```bash
   npm install
   ```

## Software Stack

- **Node 20.18.1** – Language of implementation
- **Next 15.3.0** – Application framework

## Building the Project

To Package the application:

```bash
npm run build
```
