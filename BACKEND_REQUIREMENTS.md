# Readongo Backend Requirements

This document outlines the necessary updates and feature implementations required for the [readongo-backend](https://github.com/Aakash-sittu/readongo-backend) to fully support the Readongo high-density frontend.

## 1. Core API Endpoints

### 1.1 `GET /api/news/db`
*   **Purpose:** Serve high-speed, cached, AI-processed news.
*   **Requirements:**
    *   Return only articles that have been successfully summarized and categorized.
    *   Implement sorting by `created_at` DESC.
    *   Support basic pagination (limit/offset).
    *   Target response time: < 50ms.

### 1.2 `GET /api/news/summary` (Trigger)
*   **Purpose:** Manual trigger for the AI pipeline.
*   **Requirements:**
    *   Accept request and return `202 Accepted` immediately.
    *   Initiate an asynchronous background job.
    *   The job should:
        1. Fetch raw data from providers (RSS, Reddit).
        2. Deduplicate against existing DB entries.
        3. Run LLM summarization (1-sentence punchy insight).
        4. Run LLM categorization (AI/ML, Tech, Product, etc.).
        5. Update the Database.

### 1.3 `GET /api/news/status`
*   **Purpose:** Monitor the state of background jobs.
*   **Requirements:**
    *   Return `jobStatus`: "idle" | "processing" | "error".
    *   Return `lastRun`: Timestamp of last successful sync.
    *   Return `totalProcessed`: Count of total intelligence items.
    *   Return `health`: "optimal" | "degraded".

### 1.4 `GET /api/news/all`
*   **Purpose:** Diagnostic endpoint for raw data.
*   **Requirements:**
    *   Return aggregated raw articles from all sources *before* AI processing.

## 2. Intelligence Pipeline Features

### 2.1 AI Logic (LLM Integration)
*   **Summarization:** Force a strict "one-sentence" constraint. Focus on technical "why it matters" rather than just a headline.
*   **Categorization:** Classify articles into a predefined set: `AI/ML`, `Tech`, `Product`, `Software Development`, `Hardware`.

### 2.2 Data Sourcing
*   **Reddit Ingestion:** Implementation of `GET /api/fetch` logic to pull from technical subreddits (e.g., r/MachineLearning, r/Programming).
*   **HackerNews Ingestion:** Implementation of `GET /api/rss` using HN Algolia API for the last 24h of top stories.

## 3. Infrastructure Updates

### 3.1 Rate Limiting (429 Handling)
*   The backend must return a structured error when rate limits are hit:
    ```json
    {
      "status": "error",
      "statusCode": 429,
      "message": "Too many requests, try again in X minutes."
    }
    ```

### 3.2 Database Schema
Ensure the `News` entity includes:
*   `title`: (string)
*   `url`: (string, unique)
*   `summary`: (text)
*   `category`: (string)
*   `source`: (string - e.g., "HackerNews", "Reddit")
*   `created_at`: (ISO timestamp)
