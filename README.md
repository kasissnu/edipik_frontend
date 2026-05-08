# Edipik Frontend

Edipik Frontend is the React-based user interface for Edipik, an AI-powered photo editing platform. It provides the client-side experience for uploading images, interacting with AI editing tools, comparing before/after results, authenticating users, and communicating with the backend through REST APIs and WebSockets.

This repository contains the frontend application for the Edipik full-stack platform.

---

## 🚀 Features

- AI photo editing user interface
- Image upload support
- Drag-and-drop file handling
- Before/after image comparison
- Google OAuth authentication support
- REST API communication with backend
- WebSocket support for real-time updates
- Redux-based global state management
- Responsive UI built with React and Material UI
- Animated user experience using Framer Motion
- Carousel and marquee-based UI components
- Environment-based dev/prod backend configuration

---

## 🧠 Project Overview

Edipik is designed as a full-stack AI photo editing platform.

The frontend handles:

- User interaction
- Authentication flow
- Image selection and upload
- Displaying editing results
- Comparing original and processed images
- Communicating with backend APIs
- Receiving real-time status updates through WebSockets

The backend handles image processing, AI model execution, storage, authentication, and asynchronous task management.

---

## 🛠️ Tech Stack

### Core

- React 18
- Create React App
- JavaScript
- React Router DOM

### State Management

- Redux
- Redux Toolkit
- React Redux

### UI & Styling

- Material UI
- MUI Joy
- MUI Icons
- Tailwind CSS
- Emotion
- Framer Motion

### API & Communication

- Axios
- React Use WebSocket

### Authentication

- Google OAuth

### File & Image Handling

- React Drag Drop Files
- React Compare Slider
- AWS SDK

### Other UI Libraries

- React Slick
- Slick Carousel
- React Fast Marquee
- React Tilt

---

## 📁 Project Structure

```text
edipik_frontend/
│
├── public/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── redux/
│   ├── assets/
│   ├── utils/
│   ├── App.js
│   └── index.js
│
├── .env.example
├── package.json
└── README.md
```

👨‍💻 Author

Built by Kasissnu Ssinha
