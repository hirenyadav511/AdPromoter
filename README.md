# AdPromoter - SaaS Advertisement Management Platform

AdPromoter is a full-stack MERN (MongoDB, Express, React, Node.js) application designed for businesses to manage their advertising campaigns across multiple platforms. This project was built with a focus on simplicity, usability, and performance.

## 🚀 Features

- **User Dashboard**: Real-time analytics, campaign management, and recent activity.
- **Admin Panel**: A separate, secure portal for managing users, moderating campaigns, and viewing platform-wide stats.
- **Campaign Management**: CRUD operations for advertisements with Cloudinary-powered media uploads.
- **Demo Payment System**: A simulated flow for upgrading subscription plans (Basic, Pro, Premium).
- **Dark/Light Mode**: Full system-wide support for theme toggling.
- **Responsive Design**: Mobile-first UI built with Tailwind CSS.
- **Secure Auth**: JWT-based authentication with protected routes and role-based access control.
- **Advanced UI**: Loading skeletons, toast notifications, and paginated data tables.

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide React, Recharts.
- **Admin**: React (Vite), Tailwind CSS, Lucide React.
- **Backend**: Node.js, Express.
- **Database**: MongoDB (Mongoose).
- **File Storage**: Cloudinary.
- **Notifications**: React Hot Toast (Frontend), Nodemailer (Backend utility).

---

## 📦 Getting Started

### 1. Prerequisites
- Node.js (v16 or higher)
- MongoDB (Local or Atlas)
- Cloudinary Account (for file uploads)

### 2. Environment Variables
Create a `.env` file in the `backend/` directory and add the following:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

For the `frontend` and `admin` folders, create `.env` files with:
```env
VITE_API_URL=http://localhost:5000
```

### 3. Installation

Install dependencies for all modules with a single command:

```bash
# Root directory
npm run install-all
```

### 4. Seed Data (Optional)
Populate your database with sample users and campaigns:
```bash
npm run seed
```
*Note: This will clear existing data. Credentials: Admin (admin@adpromoter.com / admin123), User (john@example.com / user123)*

### 5. Running the App
You can now run all three apps (Backend, Frontend, Admin) simultaneously from the root directory:

```bash
npm run dev
```

The apps will be available at:
- **Frontend**: http://localhost:5173
- **Admin**: http://localhost:5174
- **Backend**: http://localhost:5000

---

## ☁️ Deployment

### Backend (Render / Heroku)
1. Push your code to GitHub.
2. Connect your repo to Render/Heroku.
3. Set the Environment Variables in the provider's dashboard.
4. Set Build Command: `npm install`
5. Set Start Command: `node server.js`

### Frontend & Admin (Vercel / Netlify)
1. Deploy `frontend` and `admin` as separate projects.
2. Set `VITE_API_URL` to your deployed backend URL.
3. For Vercel, ensure you configure the output directory and handle SPA routing (e.g., a `vercel.json` with rewrites).

---

## 🤝 Contributing
This is a college project. Feel free to fork and enhance!

## 📄 License
This project is open-source under the MIT License.
