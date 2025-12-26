# Uzhavan Sahay - MongoDB Authentication Setup

## Backend Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB installed and running locally OR MongoDB Atlas account

### Installation Steps

1. **Navigate to the server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure MongoDB:**
   - **Option 1: Local MongoDB**
     - Make sure MongoDB is running on `mongodb://localhost:27017`
     - The database name will be `uzhavan-sahay`
   
   - **Option 2: MongoDB Atlas (Cloud)**
     - Create a free account at https://www.mongodb.com/cloud/atlas
     - Create a new cluster
     - Get your connection string
     - Update `server/.env` file with your MongoDB Atlas connection string:
       ```
       MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/uzhavan-sahay
       ```

4. **Update JWT Secret (Important for Production):**
   - Open `server/.env`
   - Change `JWT_SECRET` to a secure random string

5. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

   The server will run on http://localhost:5000

## Frontend Setup

1. **Navigate to the main directory:**
   ```bash
   cd ..
   ```

2. **Install dependencies (if not already installed):**
   ```bash
   npm install
   ```

3. **Start the frontend:**
   ```bash
   npm run dev
   ```

   The frontend will run on http://localhost:8080

## Usage

1. **Register a new account:**
   - Go to http://localhost:8080/register
   - Fill in all the details (name, email, password, phone, state, farm size, crops)
   - Click Register

2. **Login:**
   - Go to http://localhost:8080/login
   - Use the registered email and password
   - Click Login

3. **Dashboard:**
   - After successful login, you'll be redirected to the dashboard
   - The dashboard will display your registered user details from MongoDB

## API Endpoints

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/me` - Get current logged-in user details (requires authentication token)

## Features

✅ User registration with MongoDB storage
✅ Password hashing with bcrypt
✅ JWT token-based authentication
✅ Protected routes
✅ User details display on dashboard
✅ Automatic token validation
✅ Secure logout functionality

## Security Features

- Passwords are hashed before storing in database
- JWT tokens for secure authentication
- Token expiration (7 days by default)
- Protected API routes
- Email validation
- Password minimum length validation

## Troubleshooting

**MongoDB Connection Error:**
- Make sure MongoDB is running on your system
- Check the connection string in `server/.env`
- For MongoDB Atlas, ensure your IP is whitelisted

**Port Already in Use:**
- Change the PORT in `server/.env` file
- Update the API_URL in frontend accordingly

**CORS Issues:**
- The backend has CORS enabled for all origins in development
- For production, configure specific allowed origins
