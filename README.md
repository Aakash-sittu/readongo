# Readongo | Precision Tech Intelligence

Readongo is a high-density information architecture platform designed for technical leaders and architects. It distills the complexity of global technological trends into atomic, logic-driven intelligence signals.

## 🚀 Overview

The platform serves as a "Mission Control" for tech news, focusing on high-speed information delivery and minimal cognitive load. It features a custom "Swiss-Modern" UI aesthetic characterized by sharp edges, high contrast, and dense data presentation.

## 🛠 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS + ShadCN UI
- **AI Integration:** Google Genkit (Inference pipeline & categorization)
- **UI Architecture:** Precision-aligned grid systems and atomic components
- **Backend:** Readongo Intelligence API (Integrated via `/api/news/*` endpoints)

## 📡 Core Features

### 1. Precision Feed
High-speed delivery of cached, AI-processed news articles.
- **Endpoint:** `/api/news/db`
- **Logic:** Articles are summarized into a single punchy sentence and categorized into sectors like AI/ML, Tech, and Product.

### 2. AI Intelligence Pipeline
A backend-driven summarization engine that transforms raw RSS and Reddit data into intelligence cards.
- **Manual Trigger:** Ability to initiate a background sync of the latest signals.
- **Monitoring:** Real-time health check of the ingestion, distillation, and database layers.

### 3. High-Density UI
- **Grid Overlay:** Systematic background for architectural alignment.
- **Status Indicators:** Live system operational monitoring.
- **Responsive Logic:** Fluid transitions from desktop multi-column views to mobile information stacks.

## 📂 Project Structure

- `src/app/api`: Backend integration layer for news data and AI status.
- `src/components/v-insight`: Domain-specific UI components (Hero, Feed, NewsCard).
- `src/ai`: Genkit flows for content processing (Local fallback/diagnostic).
- `docs/BACKEND_REQUIREMENTS.md`: Specification for backend parity.

## ⚙️ Setup & Integration

1. **Environment:** Ensure `.env` is configured with necessary API keys (if using local AI features).
2. **Backend Sync:** Review `BACKEND_REQUIREMENTS.md` to ensure your external API matches the expected response structures for `/api/news/db` and `/api/news/status`.
3. **Development:**
   ```bash
   npm run dev
   ```

## 📐 Design Philosophy

Readongo follows the **Atomic Architecture** principles:
- **Density over whitespace:** Maximum information per square pixel.
- **Logic over aesthetics:** Every line and border serves a structural purpose.
- **Neutrality:** Objective information presentation without editorial bias.

---
*Built for the Hyper-Modern Architect.*