<h1 align="center" style="font-size:45px">🌱 Digital Life Lessons</h1>

<p align="center">
  <strong>A Full-Stack Wisdom Preservation & Premium Learning Platform</strong>
</p>

<p align="center">
  <a href="https://digital-life-lessons-flame.vercel.app" target="_blank">🌐 Live Project Link</a> •
  <a href="#-core-features" target="_blank">✨ Core Features</a> •
  <a href="#%EF%B8%8F-technical-toolkit" target="_blank">💻 Technical Toolkit</a> •
  <a href="#-getting-started-locally" target="_blank">🚀 Local Setup</a>
</p>

---

### 📝 Project Overview

**Digital Life Lessons** is a modern full-stack platform where users can preserve, organize, and share meaningful life lessons, personal experiences, and wisdom collected throughout their lives. The platform encourages mindful reflection while building a collaborative community where users can discover valuable insights from others.

Built with the **MERN Stack**, **Next.js**, **Better Auth**, and **Stripe**, the platform offers secure session-based authentication, premium content monetization, role-based dashboards, advanced lesson discovery, interactive engagement, and powerful moderation tools for administrators.

---

### ✨ Core Features

* 🔐 **Secure Better Auth Authentication:** Email/Password and Google Sign-In with secure HTTPOnly cookie-based session management.
* 💳 **Stripe Premium Membership:** One-time lifetime premium upgrade with Stripe Checkout and automatic account upgrades through secure webhook events.
* 📝 **Advanced Lesson Management:** Create, update, publish, unpublish, and organize life lessons with categories, emotional tones, visibility, and access level controls.
* ⭐ **Premium Content Access:** Premium lessons remain blurred and locked for free users, encouraging seamless subscription upgrades.
* ❤️ **Interactive Community:** Like lessons, save favorites, comment, report inappropriate content, and share meaningful stories.
* 🔍 **Powerful Search & Filtering:** Browse public lessons using keyword search, category filters, emotional tone filters, sorting, and server-side pagination.
* 📊 **Dual Dashboard Experience:** Personalized dashboards for users alongside comprehensive administrative tools for moderation, analytics, featured lessons, and user management.
* ⚡ **Modern User Experience:** Responsive layouts, loading states, toast notifications, Framer Motion animations, dark/light mode, and recruiter-friendly UI design.

---

### 💻 Technical Toolkit

#### **Frontend Ecosystem**

* **Framework:** Next.js 15 (App Router, Server Components, SSR, Route Handlers)
* **Libraries:** React.js, TypeScript, Tailwind CSS, Framer Motion
* **Authentication:** Better Auth Client
* **UI & Notifications:** Shadcn/UI, Sonner, React Icons
* **Forms & Validation:** React Hook Form, Zod
* **HTTP Client:** Axios

#### **Backend & Database**

* **Runtime:** Node.js & Next.js Route Handlers
* **Database:** MongoDB Atlas, Mongoose
* **Authentication:** Better Auth Server
* **Payments:** Stripe Checkout & Webhooks
* **Security:** HTTPOnly Cookies, Session Management
* **Utilities:** Cookie Parser, Zod Validation

---

### 📦 Production Dependencies

```json
"dependencies": {
  "axios": "^latest",
  "better-auth": "^latest",
  "framer-motion": "^latest",
  "mongodb": "^latest",
  "mongoose": "^latest",
  "next": "^15.x",
  "react": "^19.x",
  "react-dom": "^19.x",
  "react-hook-form": "^latest",
  "react-icons": "^latest",
  "react-share": "^latest",
  "sonner": "^latest",
  "stripe": "^latest",
  "tailwindcss": "^latest",
  "zod": "^latest"
}
```

---

### 🌐 Live Links & Resources

| Resource | Link |
|----------|------|
| 🚀 Live Website | https://digital-life-lessons-flame.vercel.app |
| 💻 GitHub Repository | https://github.com/jubairalamdev/digital-life-lessons/ |

---

### 🚀 Getting Started Locally

#### Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY

cd digital-life-lessons
```

#### Install dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a **.env.local** file in the project root.

```env
# ==========================================
# App
# ==========================================

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:3000/api

# ==========================================
# MongoDB
# ==========================================

MONGODB_URI=your_mongodb_connection_string

# ==========================================
# Better Auth
# ==========================================

BETTER_AUTH_SECRET=your_better_auth_secret
BETTER_AUTH_URL=http://localhost:3000

# ==========================================
# Google OAuth
# ==========================================

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# ==========================================
# Stripe
# ==========================================

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

#### Run the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

### 📂 Main Functional Modules

- 🏠 Home
- 🌱 Featured Life Lessons
- 📚 Public Lessons
- 📖 Lesson Details
- ➕ Add Lesson
- 📑 My Lessons
- ❤️ Favorites
- 👤 User Profile
- 💳 Premium Upgrade
- 📊 User Dashboard
- 🛡️ Admin Dashboard
- 👥 Manage Users
- 📝 Manage Lessons
- 🚩 Reported Lessons
- 🔐 Better Auth Authentication
- 🌙 Dark / Light Mode
- 🚫 Custom 404 Page

---

### 🎯 Future Improvements

- 🤖 AI-generated lesson summaries
- 📄 Export life lessons as PDF
- 📈 Personal reflection analytics
- 🔥 User activity streak tracker
- 🌍 Multi-language support
- 📱 Progressive Web App (PWA)
- 🔔 Email notifications
- 🧠 AI-powered lesson recommendations
