# 🎬 Movie Search

**Movie Search** is a lightweight web application that lets users search for movies and get AI-generated plot summaries and actor lists using the [OMDB API](https://www.omdbapi.com/) and [Google Gemini API](https://ai.google.dev/). It emphasizes simplicity, responsive design, and seamless interaction with external APIs.

![App Demo](./demo.gif)

## ✨ Features

- 🔍 Search for movies in real time using OMDB
- 🧠 Get AI-generated plot summaries powered by Gemini
- 🎭 Fetch actor lists with roles using AI prompts
- 📄 Clean movie cards with poster, title, year, and type
- ⚙️ Handles loading, error, and empty state scenarios
- 📱 Fully responsive layout with smooth transitions
- 🧼 Clears input automatically after search submission

## 🔧 Tech Stack

### Frontend

- **React** – Functional component-based UI
- **Vite** – Fast development build tool
- **Tailwind CSS** – Utility-first CSS framework
- **Zustand** – Lightweight state management
- **Framer Motion** – Smooth animation and transitions

### Backend

- **Express.js** – Lightweight API server
- **Node.js** – JavaScript runtime
- **Google Gemini API** – AI-powered content generation

## 💡 Goal

The project demonstrates how to build an interactive movie exploration interface using:

- Controlled form input and real-time API search
- Prompt engineering for LLMs (Gemini)
- React state handling and modular component structure
- Semantic UI, accessible modals, and reusable layouts

## 📦 API Sources

- 🎥 Movie data from: [OMDB API](https://www.omdbapi.com/)
- 🧠 Summaries & actors from: [Gemini API](https://ai.google.dev/)
