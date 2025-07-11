'# 📅 Agenda Pro

A modern appointment scheduling web app built with **React**, **Firebase**, and **Tailwind CSS**, designed for independent professionals such as therapists, coaches, and personal trainers.

---

## 🚀 Features

- 🔐 Firebase Authentication (email & password)
- 👤 Persistent user login
- 🔒 Private and protected routes
- 📊 Dashboard with appointments overview
- ➕ Modal to create new appointments (work in progress)
- ⚙️ Scalable folder structure (components, pages, context, services)
- 💅 Tailwind CSS for responsive styling
- 🌙 Dark mode-ready structure (planned)

---

## 🛠️ Stack

- React (with Vite)
- Firebase (Auth + Firestore)
- Tailwind CSS
- React Router DOM
- Headless UI (for modal)

---

## 📁 Project Structure

\`\`\`
src/
├── components/
│ ├── Layout.jsx
│ ├── Sidebar.jsx
│ ├── Header.jsx
│ └── AppointmentModal.jsx
├── context/
│ └── UserContext.jsx
├── pages/
│ ├── Login.jsx
│ ├── Dashboard.jsx
│ ├── Appointments.jsx
│ ├── Clients.jsx
│ └── Calendar.jsx
├── services/
│ └── firebase.js
├── styles/
│ └── global.css
└── App.jsx
\`\`\`

---

## ✅ To-Do

- [x] Firebase authentication
- [x] Dashboard structure
- [x] Layout with sidebar + routing
- [x] Appointment modal trigger
- [ ] Modal UI styling and animation
- [ ] Edit/Delete appointment logic
- [ ] User-specific appointment filtering

---

## 🧪 Setup Locally

1. Clone the repo:
   \`\`\`bash
   git clone https://github.com/EduardoVisconti/agenda-pro.git
   cd agenda-pro
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Add your Firebase config to \`/src/services/firebase.js\`

4. Start the dev server:
   \`\`\`bash
   npm run dev
   \`\`\`

---

## 📸 Preview

Coming soon!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
'
