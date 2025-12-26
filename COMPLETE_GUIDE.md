# 🌾 Uzhavan Sahay - Complete Setup Guide

## ✅ What Has Been Implemented

Your application now has a **complete MongoDB authentication system**:

1. ✅ **Backend API Server** (Node.js + Express + MongoDB)
   - User registration with password hashing (bcrypt)
   - User login with JWT token authentication
   - Secure API endpoints
   - MongoDB database integration

2. ✅ **Frontend Integration**
   - Register page stores user details in MongoDB
   - Login page authenticates against MongoDB
   - Dashboard displays logged-in user details from database
   - Automatic session management with JWT tokens

3. ✅ **Security Features**
   - Password hashing before storage
   - JWT token-based authentication
   - Protected routes
   - Automatic token validation

---

## 🚀 Quick Start Guide

### Option 1: Using Startup Scripts (Easiest)

**Double-click** one of these files:
- `start.bat` (for Command Prompt)
- `start.ps1` (for PowerShell - right-click and select "Run with PowerShell")

This will automatically start both backend and frontend servers!

### Option 2: Manual Start

**Terminal 1 - Backend Server:**
```powershell
cd server
npm start
```

**Terminal 2 - Frontend Server:**
```powershell
npm run dev
```

---

## 📝 How to Use the Application

### 1. **Register a New User**

1. Open your browser and go to: `http://localhost:8080/register`
2. Fill in the registration form:
   - **Name**: Your full name (e.g., "Rajesh Kumar")
   - **Email**: Your email address (e.g., "rajesh@example.com")
   - **Password**: Minimum 6 characters
   - **Confirm Password**: Must match password
   - **Phone**: Your contact number
   - **State**: Select Tamil Nadu (TN) or Kerala (KL)
   - **Farm Size**: e.g., "5 acres"
   - **Main Crops**: Comma-separated list (e.g., "Paddy, Groundnut")
3. Click **Register**
4. You'll be automatically logged in and redirected to the dashboard

### 2. **Login with Registered Credentials**

1. Go to: `http://localhost:8080/login`
2. Enter your registered email and password
3. Click **Login**
4. You'll be redirected to the dashboard

### 3. **View Your Profile on Dashboard**

After login, the dashboard displays:
- ✅ Your Name and Email
- ✅ Phone Number
- ✅ Farm Size
- ✅ Main Crops
- ✅ State/Location
- ✅ All data comes directly from MongoDB!

---

## 🗄️ Database Information

**Database**: MongoDB (Local)
- **Connection**: `mongodb://localhost:27017`
- **Database Name**: `uzhavan-sahay`
- **Collection**: `users`

### View Your Data in MongoDB

If you have MongoDB Compass installed:
1. Open MongoDB Compass
2. Connect to: `mongodb://localhost:27017`
3. Browse to `uzhavan-sahay` → `users`
4. You'll see all registered users (with hashed passwords)

---

## 🔐 Security Features

1. **Password Hashing**: 
   - Passwords are hashed using bcrypt before storing
   - Original passwords are never stored in the database

2. **JWT Authentication**:
   - Secure token-based authentication
   - Tokens expire after 7 days
   - Stored in browser's localStorage

3. **Protected Routes**:
   - Dashboard requires authentication
   - Invalid/expired tokens redirect to login

---

## 📂 Project Structure

```
uzhavan-sahay-main/
├── server/                      # Backend API
│   ├── config/
│   │   └── database.js         # MongoDB connection
│   ├── middleware/
│   │   └── auth.js             # JWT authentication middleware
│   ├── models/
│   │   └── User.js             # User schema with password hashing
│   ├── routes/
│   │   └── auth.js             # Register, Login, Get User routes
│   ├── .env                    # Environment variables
│   ├── package.json            # Backend dependencies
│   └── server.js               # Express server
│
├── src/
│   ├── contexts/
│   │   └── AuthContext.tsx     # Authentication state & API calls
│   ├── pages/
│   │   ├── auth/
│   │   │   ├── Login.tsx       # Login page
│   │   │   └── Register.tsx    # Registration page
│   │   └── Dashboard.tsx       # Main dashboard with user details
│
├── start.bat                    # Windows batch startup script
├── start.ps1                    # PowerShell startup script
└── SETUP_MONGODB.md            # Detailed setup instructions
```

---

## 🛠️ API Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login user | No |
| GET | `/api/auth/me` | Get current user | Yes (JWT) |

### Example API Usage

**Register:**
```javascript
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "name": "Rajesh Kumar",
  "email": "rajesh@example.com",
  "password": "password123",
  "phone": "+91 9876543210",
  "state": "TN",
  "farmSize": "5 acres",
  "mainCrops": ["Paddy", "Groundnut"]
}
```

**Login:**
```javascript
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "rajesh@example.com",
  "password": "password123"
}
```

---

## 🔧 Configuration

### Backend Configuration (`server/.env`)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/uzhavan-sahay
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRE=7d
```

### Frontend Configuration (`.env`)

```env
VITE_API_URL=http://localhost:5000
```

---

## ❗ Troubleshooting

### MongoDB Not Connected

**Error**: `MongoDB Connection Error`

**Solution**:
1. Make sure MongoDB is installed and running
2. Check if MongoDB service is active:
   ```powershell
   net start MongoDB
   ```
3. Or install MongoDB from: https://www.mongodb.com/try/download/community

### Port Already in Use

**Error**: `Port 5000 is already in use`

**Solution**:
1. Change the PORT in `server/.env`
2. Update API_URL in frontend accordingly

### Login Not Working

**Solution**:
1. Make sure backend server is running
2. Check browser console for errors
3. Verify MongoDB is connected
4. Ensure you're using the correct email/password you registered with

---

## 🎯 What You Can Do Now

✅ **Register** multiple users with different details
✅ **Login** with any registered user's email and password
✅ **View** personalized dashboard with user's information
✅ **Logout** and login as a different user
✅ **Data persists** - even if you restart the servers!

---

## 📱 Next Steps (Optional Enhancements)

- Add password reset functionality
- Add profile update feature
- Add email verification
- Deploy to cloud (Vercel/Heroku + MongoDB Atlas)
- Add user profile pictures
- Add more farmer-specific features

---

## 📞 Support

For issues:
1. Check MongoDB is running
2. Check both servers are running
3. Check browser console for errors
4. Check server terminal for backend errors

---

## 🎉 Summary

You now have a **fully functional** authentication system with:
- ✅ MongoDB database storage
- ✅ Secure password hashing
- ✅ JWT token authentication
- ✅ Register and Login pages working
- ✅ Dashboard displaying user details from database
- ✅ Session management
- ✅ Complete backend API

**Everything is ready to use!** Just start the servers and begin registering users! 🚀
