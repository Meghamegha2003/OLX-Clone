
# 🛒 OLX Clone (React Frontend)

A modern OLX-inspired marketplace web application built using **React.js**, allowing users to browse ads, post listings, and explore products with a clean and responsive UI.

---

## 🌐 Live Demo

👉 [https://sellnbuy.web.app/](https://sellnbuy.web.app/)

---

## 📌 Project Overview

This is a **frontend-only OLX clone** designed to practice React, Context API, and Firebase integration.  
Users can:

- Browse ads by category
- Post new ads
- Search and filter listings
- View detailed ad pages
- Access promoted ads
- User authentication (Login/Signup)

---

## 🚀 Features

- 🏠 Home page with categorized listings
- 🔍 Search bar with location filter
- 📄 View detailed product/ad pages
- 📝 Post new advertisements
- 📢 Promoted ads section
- 🔐 Login & Signup UI
- 📱 Fully responsive design
- ⚡ Fast performance with React

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript (ES6+)
- HTML5, CSS3
- Firebase (Authentication & Storage)
- Context API (State Management)
- React Router DOM (Routing)

---

## 📂 Folder Structure

```bash
src
├── assets
├── Component
│   ├── ads
│   ├── categories
│   ├── common
│   ├── home
│   ├── Layout
│   │   ├── Footer
│   │   └── Header
│   │       ├── Location
│   │       └── SearchBar
│   ├── login
│   ├── myAd
│   ├── postAd
│   ├── promoted
│   ├── signUp
│   └── view
├── context
├── firebase
├── pages
├── route
├── services
├── store
└── utility
````

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Meghamegha2003/OLX-Clone.git
```

---

### 2️⃣ Install Dependencies

```bash
npm install
```

---

### 3️⃣ Setup Firebase

Add your Firebase config in:

```bash
src/firebase/config.js
```

Example:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export default firebaseConfig;
```

---

### 4️⃣ Run the App

```bash
npm start
```

App runs on: [http://localhost:3000](http://localhost:3000)

---

## 🔗 Key Concepts Used

* React Functional Components
* React Hooks (`useState`, `useEffect`, `useContext`)
* Context API for global state
* Component-based architecture
* Firebase for authentication & storage
* Routing with React Router DOM

---

