# 🍲 Recipe Finder – Meal Discovery App

**Recipe Finder** is a web application that allows users to browse food categories and discover meals using data from [TheMealDB API](https://www.themealdb.com/). The app focuses on exploring modern data-fetching strategies with **TanStack Query**, while keeping the UI clean and responsive.

## ✨ Features

- Browse all available meal categories
- View meals under each category
- Dynamic URL-based routing (`?q=Category`) for fetching meals
- Loading, error, and empty-state handling
- Responsive grid layout for category and meal cards
- Integration with public meal API (TheMealDB)
- Uses **React Query (TanStack Query)** for data caching and background syncing

## 🔧 Tech Stack

### Frontend

- **React** – Modern component-based UI
- **Vite** – Fast build tool for efficient development
- **Tailwind CSS** – Utility-first CSS framework for rapid styling
- **TanStack Query (React Query)** – Powerful data-fetching and caching layer
- **React Router** – For routing between category and meals view

## 💡 Goal

The goal of this project is to demonstrate how to build a real-world app using:

- Public APIs for live data
- React Query for smart and efficient data fetching
- Clean separation of concerns between routing, components, and services

It also provides a learning ground for handling common UI states (loading, error, empty) and building a responsive grid-based layout with Tailwind.

## 📦 API Source

- All data comes from: [TheMealDB Public API](https://www.themealdb.com/api.php)

Endpoints used:

- `GET /categories.php` – Fetch all food categories
- `GET /filter.php?c=CategoryName` – Fetch meals in a category
- `GET /lookup.php?i=MealId` – (optional) Fetch full recipe details

[App Demo](./public/RecipeFinder.gif)
