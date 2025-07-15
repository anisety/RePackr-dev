# 🚚 AI Moving Helper

Welcome to **AI Moving Helper**, your intelligent assistant for managing every aspect of a residential move — from packing to internet transfer, address updates, and furniture fitting. This tool empowers users to efficiently plan their move while maintaining visibility over key steps and logistics.

Built with **TypeScript**, **Tailwind CSS**, **Firebase Auth**, and **MongoDB**.

---

## 🛠️ Tech Stack

| Layer       | Technology         |
|-------------|--------------------|
| Frontend    | React + TypeScript |
| Styling     | Tailwind CSS       |
| Backend     | Node.js + Express  |
| Database    | MongoDB (Mongoose) |
| Auth        | Firebase Auth      |
| Hosting     | (e.g., Vercel / Render) |

---

## ✨ Features

- 🔐 **Secure login & user sessions** via Firebase Authentication
- 📦 **Pack Label Generator** to categorize and print box labels
- 🏠 **Address Update Portal** for quick USPS / utility address changes
- 🪑 **Furniture Fit Checker** to ensure furniture fits in your new place
- 🌐 **ISP Transfer Helper** to manage internet provider moves
- 🧠 **AI Recommendations** for packing tips, reminders, and budgeting
- 📆 **Move Timeline Tracker** with countdown and milestones
- 🗂️ **Data Persistence** using MongoDB for user progress and saved tasks

---

## 🧭 Project Structure

ai-moving-helper/
├── backend/ # Express + MongoDB API
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── controllers/ # Route logic
│ └── server.ts # Main server entry
│
├── frontend/ # React app
│ ├── components/ # Reusable UI components
│ ├── pages/ # Route-based pages (e.g., /pack, /fit)
│ ├── hooks/ # Custom React hooks
│ ├── services/ # Firebase + API utility wrappers
│ ├── App.tsx # App wrapper
│ └── main.tsx # Vite entry point
│
├── shared/ # Shared TypeScript types & interfaces
├── .env # Environment variables
├── README.md
└── package.json

yaml
Copy
Edit

---

## 🔐 Authentication Setup (Firebase)

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project
3. Enable **Email/Password** under Authentication → Sign-in method
4. Copy Firebase config and place it in `.env`:
```env
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
...
Use onAuthStateChanged in React to listen for user login state.

🧾 Environment Variables
makefile
Copy
Edit
# Frontend
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=

# Backend
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
🧪 Sample User Flow
User logs in with Firebase.

Lands on Dashboard (/dashboard) showing Move Summary (T-32 days, From ZIP ⇨ To ZIP, Budget Tier).

Clicks on:

Pack Labels to print QR-coded tags

Furniture Fit to enter room dimensions and test couch measurements

Address Update to input old/new addresses for transfer

ISP Helper to search local ISPs and transfer service

User’s progress is saved to MongoDB.

System uses AI to nudge tasks (e.g. “Don’t forget to update your voter registration!”).

📦 Installation
Prerequisites:
Node.js 18+

MongoDB Atlas or local instance

Firebase project

Frontend
bash
Copy
Edit
cd frontend
npm install
npm run dev
Backend
bash
Copy
Edit
cd backend
npm install
npm run dev
✅ To Do
 Improve AI prompt system for smart nudges

 Add drag-and-drop to Pack Label UI

 Enable SMS reminders via Twilio

 Add analytics dashboard for user engagement

📄 License
MIT License. Use freely for personal or commercial projects — but give credit if you fork or build upon it.

💡 Notes
The current deployed site reflects the final filled-out state. To use this project interactively, start from a blank slate and fill in information progressively to reach the end state.

Do not modify the current layout or structure; instead, simulate user input from an empty state to reach completion.

🙌 Contributing
Pull requests are welcome! Please follow conventional commit messages and add comments to major logic changes. See CONTRIBUTING.md for more details (coming soon).
