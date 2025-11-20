# 🏃 Dubai Run CTF 2024 - Zayed University

**SEC 432 Cybersecurity Competition Platform**  
College of Technological Innovation

A full-stack Capture The Flag (CTF) competition platform themed around Dubai Run, featuring real-time leaderboard, team management, and flag submission system with millisecond-precision timing.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.2.0-blue.svg)
![Zayed University](https://img.shields.io/badge/Zayed%20University-CTI-gold.svg)

---

## 🎓 About This Platform

This CTF platform was developed for the SEC 432 Cybersecurity course at Zayed University's College of Technological Innovation. Themed around the iconic Dubai Run event, it provides students with hands-on experience in cybersecurity challenges while tracking their progress with millisecond precision.

**Course:** SEC 432 - Cybersecurity  
**Institution:** Zayed University  
**College:** College of Technological Innovation (CTI)  
**Theme:** Dubai Run 2025

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Technologies Used](#-technologies-used)
- [Security](#-security)
- [Troubleshooting](#-troubleshooting)
- [Deployment](#-deployment)

---

## 🎯 Features

### 👨‍💼 Admin Features
- ✅ **Team Management**: Create and delete teams with secure credentials
- ✅ **Challenge Management**: Add/edit/delete challenges with flags
- ✅ **Full Visibility**: View all flags and challenge details
- ✅ **Real-time Monitoring**: Track all submissions and scores
- ✅ **Analytics Dashboard**: View comprehensive statistics

### 👨‍🎓 Student Features
- ✅ **Secure Login**: Team-based authentication
- ✅ **Challenge Browser**: View available challenges by category
- ✅ **Flag Submission**: Submit flags and earn points instantly
- ✅ **Progress Tracking**: See solved challenges and team progress
- ✅ **Live Leaderboard**: Real-time rankings and scores

### 🎨 General Features
- ✅ **Dubai Run Theme**: Vibrant orange-red gradient design inspired by Dubai Run
- ✅ **Zayed University Branding**: Official ZU logo and CTI college identification
- ✅ **Real-time Updates**: Automatic leaderboard refresh every 10 seconds
- ✅ **Beautiful UI**: Modern, responsive design with Tailwind CSS
- ✅ **Data Visualizations**: Charts and graphs for statistics
- ✅ **Millisecond Precision**: Exact submission timestamps for analysis
- ✅ **Category Organization**: Web, Pwn, Crypto, Reverse, Forensics, Misc
- ✅ **Difficulty Levels**: Easy, Medium, Hard challenge classification
- ✅ **Secure Authentication**: JWT-based authentication system
- ✅ **Database Persistence**: SQLite database for all data
- ✅ **Export Capabilities**: Download statistics as CSV or JSON

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation (5 minutes)

**Step 1: Backend Setup**
```bash
# Navigate to project directory
cd ctf-platform

# Install dependencies
npm install

# Start backend server
npm start
```
✅ Backend runs on `http://localhost:5000`

**Step 2: Frontend Setup**
```bash
# Open new terminal and navigate to frontend
cd ctf-platform/frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
✅ Frontend runs on `http://localhost:8080`

**Step 3: Access Platform**

Open your browser and go to: **http://localhost:8080**

**Default Admin Credentials:**
- Username: `Instructor` / Password: `admin`
- Username: `Admin` / Password: `admin123`

**Default Team Credentials:**
- Team: `Falcon_Hunt` / Password: `student`
- Team: `Eagles_Eye` / Password: `student`

---

## 📦 Installation

### Detailed Setup Instructions

#### 1. Clone or Download
```bash
# If using git
git clone <repository-url>
cd ctf-platform

# Or extract the ZIP file
unzip ctf-platform.zip
cd ctf-platform
```

#### 2. Backend Setup
```bash
# Install backend dependencies
npm install

# Dependencies installed:
# - express (web framework)
# - sqlite3 (database)
# - bcryptjs (password hashing)
# - jsonwebtoken (authentication)
# - cors (cross-origin requests)

# Start the server
npm start

# For development with auto-reload
npm run dev
```

#### 3. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install frontend dependencies
npm install

# Dependencies installed:
# - react (UI library)
# - react-dom (React DOM renderer)
# - vite (build tool)
# - tailwindcss (styling)
# - recharts (data visualization)
# - lucide-react (icons)

# Start development server
npm run dev
```

#### 4. Verify Installation
- Backend: Visit `http://localhost:5000/api/leaderboard` (should return empty array)
- Frontend: Visit `http://localhost:8080` (should see login page)

---

## 📖 Usage Guide

### For Administrators

#### Step 1: Login as Admin
1. Go to `http://localhost:8080`
2. Click **"Admin"** button
3. Enter credentials (either):
   - Username: `Instructor` / Password: `admin`
   - Username: `Admin` / Password: `admin123`
4. Click **"Login"**

#### Step 2: Create Teams
**Note:** Two teams are already created by default:
- `Falcon_Hunt` with password `student`
- `Eagles_Eye` with password `student`

To create additional teams:
1. Navigate to **"Admin"** tab
2. In the "Create New Team" section:
   - Enter **Team Name** (e.g., "Team Alpha")
   - Enter **Password** (e.g., "password123")
   - Click **"Create Team"**
3. Repeat for all teams
4. **Important**: Write down credentials to share with students

**Example Teams:**
```
Team Alpha    / password123
Team Beta     / password456
Team Gamma    / password789
Team Delta    / passwordabc
Team Epsilon  / passwordxyz
```

#### Step 3: Add Challenges
1. Stay in **"Admin"** tab
2. In the "Create New Challenge" section:
   - **Challenge Name**: e.g., "SQL Injection 101"
   - **Category**: Select from dropdown (Web, Pwn, Crypto, etc.)
   - **Points**: Point value (e.g., 100, 300, 500)
   - **Difficulty**: Easy, Medium, or Hard
   - **Description**: Brief description of the challenge
   - **Flag**: The correct flag (e.g., `CTF{sql_is_fun}`)
   - Click **"Create Challenge"**

**Example Challenges:**
```
Name: Easy Web Challenge
Category: Web
Points: 100
Difficulty: Easy
Description: Find the hidden flag in the HTML source
Flag: CTF{view_source_ftw}

Name: Buffer Overflow
Category: Pwn
Points: 300
Difficulty: Medium
Description: Exploit the buffer overflow vulnerability
Flag: CTF{buffer_overflow_master}

Name: RSA Encryption
Category: Crypto
Points: 500
Difficulty: Hard
Description: Break the RSA encryption
Flag: CTF{rsa_cracked_successfully}
```

#### Step 4: Manage Competition
1. **View Leaderboard**: Monitor team rankings in real-time
2. **Check Analytics**: View statistics and charts
3. **Manage Teams**: Delete teams if needed
4. **Manage Challenges**: View all flags or delete challenges

#### Step 5: Share Credentials
Share team credentials with students via:
- Email
- Printed sheets
- Discord/Slack
- In-person

---

### For Students

#### Step 1: Login
1. Go to `http://localhost:8080`
2. Click **"Team"** button (if not already selected)
3. Enter your team credentials:
   - **Team Name**: Provided by admin
   - **Password**: Provided by admin
4. Click **"Login"**

#### Step 2: View Challenges
1. Navigate to **"Challenges"** tab
2. Browse available challenges:
   - See category badges (color-coded)
   - View difficulty levels
   - Check point values
   - Read descriptions
   - See solve counts
3. **Note**: Solved challenges are marked with ✓ and show as green

#### Step 3: Solve Challenges
1. Work on solving the challenge
2. Find the flag (format: `CTF{...}`)
3. Copy the flag exactly as it appears

#### Step 4: Submit Flags
1. Navigate to **"Submit Flag"** tab
2. Select the challenge from dropdown
3. Paste or type the flag
4. Click **"Submit Flag"**
5. Success: See "+[points] points" message
6. Failure: See "Incorrect flag" message (try again!)

#### Step 5: Track Progress
1. **Leaderboard Tab**: See your team's ranking
2. **Challenges Tab**: View solved challenges (marked with ✓)
3. **Analytics Tab**: View overall statistics
4. Your score updates automatically on each correct submission

---

## 📁 Project Structure

```
ctf-platform/
├── server.js                 # Backend Express server
├── package.json              # Backend dependencies
├── ctf.db                    # SQLite database (auto-created on first run)
├── README.md                 # This file
├── QUICKSTART.md            # Quick reference guide
├── .gitignore               # Git ignore rules
│
└── frontend/
    ├── src/
    │   ├── App.jsx          # Main React application component
    │   ├── main.jsx         # React entry point
    │   └── index.css        # Tailwind CSS styles
    │
    ├── index.html           # HTML template
    ├── package.json         # Frontend dependencies
    ├── vite.config.js       # Vite configuration
    ├── tailwind.config.js   # Tailwind CSS configuration
    └── postcss.config.js    # PostCSS configuration
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Key Endpoints

#### Authentication
- `POST /api/admin/login` - Admin login
- `POST /api/team/login` - Team login

#### Teams
- `GET /api/teams` - Get all teams (Protected)
- `POST /api/admin/teams` - Create team (Admin only)
- `DELETE /api/admin/teams/:id` - Delete team (Admin only)

#### Challenges
- `GET /api/challenges` - Get challenges (Protected)
- `POST /api/admin/challenges` - Create challenge (Admin only)
- `DELETE /api/admin/challenges/:id` - Delete challenge (Admin only)

#### Submissions
- `POST /api/submit` - Submit flag (Protected)
- `GET /api/team/solved` - Get solved challenges (Protected)

#### Statistics
- `GET /api/leaderboard` - Get rankings (Protected)
- `GET /api/statistics/categories` - Category stats (Protected)

---

## 🗄️ Database Schema

### Tables

**teams**
- `id` - Primary key
- `team_name` - Unique team name
- `password` - Hashed password
- `score` - Current score
- `created_at` - Timestamp

**challenges**
- `id` - Primary key
- `name` - Challenge name
- `description` - Challenge description
- `category` - Category (Web, Pwn, Crypto, etc.)
- `points` - Point value
- `flag` - Correct flag
- `difficulty` - Easy, Medium, or Hard
- `created_at` - Timestamp

**submissions**
- `id` - Primary key
- `team_id` - Foreign key to teams
- `challenge_id` - Foreign key to challenges
- `submitted_at` - Timestamp
- Unique constraint on (team_id, challenge_id)

**admins**
- `id` - Primary key
- `username` - Unique username
- `password` - Hashed password

---

## 🛠️ Technologies Used

### Backend
- **Express.js** - Web framework
- **SQLite3** - Database
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **Lucide React** - Icons

---

## 🔒 Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Protected API routes
- SQL injection prevention with parameterized queries
- Role-based access control
- Unique constraints prevent duplicate submissions

---

## 🐛 Troubleshooting

### Backend Won't Start

**Problem:** Port 5000 already in use

**Solution:**
```bash
# Change port in server.js
const PORT = process.env.PORT || 5001;
```

### Frontend Connection Issues

**Problem:** Cannot connect to backend

**Solution:**
1. Verify backend is running: `http://localhost:5000/api/leaderboard`
2. Check CORS settings in `server.js`
3. Verify API_URL in `App.jsx` matches backend port

### Login Fails

**Problem:** "Invalid credentials" on correct password

**Solution:**
1. Check backend console for errors
2. Try resetting database: Delete `ctf.db` and restart backend

### Database Reset

To start fresh:
```bash
# Stop both servers
# Delete database
rm ctf.db

# Restart backend (creates fresh database with default admin)
npm start
```

---

## 🚀 Deployment

### Production Checklist
- [ ] Change default admin password
- [ ] Update JWT_SECRET to random strong value
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Set up database backups

### Build Frontend for Production
```bash
cd frontend
npm run build
# Dist folder ready for deployment
```

---

## 💡 Best Practices

### Flag Format
- Use consistent format: `CTF{...}`
- Make flags memorable but not guessable
- Avoid special characters

### Point Values
- Easy: 100-200 points
- Medium: 250-400 points
- Hard: 450-600 points

### Competition Tips
- Test all challenges before starting
- Create all teams in advance
- Monitor leaderboard during competition
- Have database backups ready

---

## 📝 License

MIT License - Feel free to use for your CTF competitions!

---

## 📧 Support

For issues or questions:
1. Check this README
2. Review QUICKSTART.md
3. Create an issue in the repository

---

**Happy Hacking! 🚩🎯**

Made with ❤️ for CTF competitions
